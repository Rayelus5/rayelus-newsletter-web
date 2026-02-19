'use server'

import prisma from '@/lib/prisma'
import resend from '@/lib/resend'
import { NewsletterEmailTemplate } from '@/components/email-template'

export async function sendNewsletter(postId: string) {
    try {
        const post = await prisma.post.findUnique({
            where: { id: postId },
        })

        if (!post) {
            return { success: false, message: "Post no encontrado" }
        }

        const subscribers = await prisma.subscriber.findMany({
            where: { active: true },
        })

        if (subscribers.length === 0) {
            return { success: false, message: "No hay suscriptores activos" }
        }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const emailPromises = subscribers.map((sub: any) =>
            resend.emails.send({
                from: 'Rayelus Newsletter <newsletter@rayelus.com>',
                to: sub.email,
                subject: post.title,
                react: NewsletterEmailTemplate({ content: post.content, title: post.title }) as React.ReactElement,
            })
        )

        await Promise.all(emailPromises)

        return { success: true, message: `Newsletter enviada a ${subscribers.length} suscriptores.` }

    } catch (error) {
        console.error("Error sending newsletter:", error)
        return { success: false, message: "Error al enviar la newsletter" }
    }
}
