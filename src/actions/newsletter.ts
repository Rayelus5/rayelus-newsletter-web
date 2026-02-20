'use server'

// ... existing code ... (This tool rewrites the file, I need to append or rewrite all)
// Rewriting the whole file to include unsubscribe server action wrapper

import { z } from 'zod'
import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { headers } from 'next/headers'

const subscribeSchema = z.object({
    email: z.string().email({ message: "Por favor, introduce un email válido." }),
})

export type SubscribeState = {
    errors?: {
        email?: string[]
    }
    message?: string | null
    success?: boolean
}

export async function subscribe(prevState: SubscribeState, formData: FormData): Promise<SubscribeState> {
    const validatedFields = subscribeSchema.safeParse({
        email: formData.get('email'),
    })

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: "Error de validación. Revisa los campos.",
            success: false
        }
    }

    const { email } = validatedFields.data

    try {
        const headersList = await headers()
        const ip = headersList.get('x-forwarded-for') || headersList.get('x-real-ip') || 'unknown'

        // Rate limiting check
        if (ip !== 'unknown') {
            const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000)

            // Auto-limpieza: borrar registros antiguos para esta IP y endpoint (o todos los antiguos si lo prefieres, 
            // pero por rendimiento mejor limpiar solo ocasionalmente o de forma asíncrona. Aquí lo hacemos antes de contar).
            // Para no bloquear la respuesta, lo ejecutamos sin `await` o después, pero por simplicidad lo dejamos aquí.
            await prisma.rateLimit.deleteMany({
                where: {
                    createdAt: { lt: oneHourAgo }
                }
            })

            const count = await prisma.rateLimit.count({
                where: {
                    ip,
                    endpoint: 'subscribe',
                    createdAt: { gte: oneHourAgo }
                }
            })

            if (count >= 5) {
                return {
                    success: false,
                    message: "Has superado el límite de 5 peticiones por hora. Inténtalo más tarde."
                }
            }

            await prisma.rateLimit.create({
                data: {
                    ip,
                    endpoint: 'subscribe'
                }
            })
        }

        const existingSubscriber = await prisma.subscriber.findUnique({
            where: { email },
        })

        if (existingSubscriber) {
            if (!existingSubscriber.active) {
                // Reactivar si estaba dado de baja
                await prisma.subscriber.update({
                    where: { email },
                    data: { active: true, unsubscribedAt: null }
                })
                return {
                    success: true,
                    message: "¡Bienvenido de nuevo! Has sido reactivado en la lista."
                }
            }
            return {
                success: false, // O true si queremos ocultarlo
                message: "Este email ya está suscrito."
            }
        }

        await prisma.subscriber.create({
            data: {
                email,
                active: true,
            },
        })

        // Aquí se enviaría el email de bienvenida (TODO)

        revalidatePath('/admin')
        return {
            success: true,
            message: "¡Gracias por suscribirte! Revisa tu bandeja de entrada."
        }

    } catch (error) {
        console.error("Subscription error:", error)
        return {
            success: false,
            message: "Hubo un error al procesar tu solicitud. Inténtalo más tarde."
        }
    }
}

// Wrapper for unsubscribe compatible with useActionState
export async function unsubscribeAction(prevState: SubscribeState, formData: FormData): Promise<SubscribeState> {
    const email = formData.get('email') as string;

    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
        return { success: false, message: "Email inválido", errors: { email: ["Email inválido"] } }
    }

    try {
        const headersList = await headers()
        const ip = headersList.get('x-forwarded-for') || headersList.get('x-real-ip') || 'unknown'

        // Rate limiting check
        if (ip !== 'unknown') {
            const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000)

            // Auto-limpieza de registros de hace más de una hora
            await prisma.rateLimit.deleteMany({
                where: {
                    createdAt: { lt: oneHourAgo }
                }
            })

            const count = await prisma.rateLimit.count({
                where: {
                    ip,
                    endpoint: 'unsubscribe',
                    createdAt: { gte: oneHourAgo }
                }
            })

            if (count >= 5) {
                return {
                    success: false,
                    message: "Has superado el límite de 5 peticiones por hora. Inténtalo más tarde."
                }
            }

            await prisma.rateLimit.create({
                data: {
                    ip,
                    endpoint: 'unsubscribe'
                }
            })
        }

        await prisma.subscriber.update({
            where: { email },
            data: { active: false, unsubscribedAt: new Date() }
        })
        return { success: true, message: "Te has dado de baja correctamente." }
    } catch (error) {
        // P2025 is record not found
        return { success: false, message: "No se encontró el email en nuestra lista." }
    }
}
