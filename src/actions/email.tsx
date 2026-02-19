'use server'

import prisma from '@/lib/prisma'
import resend from '@/lib/resend'
import { NewsletterEmailTemplate } from '@/components/email-template'
import React from 'react'

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

        console.log(`Found ${subscribers.length} active subscribers.`)

        if (subscribers.length === 0) {
            return { success: false, message: "No hay suscriptores activos" }
        }

        // Dynamically import react-dom/server to avoid build issues with static imports in Server Actions
        const { renderToStaticMarkup } = await import('react-dom/server')

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const emailPromises = subscribers.map(async (sub: any) => {
            try {
                // Manually render to HTML to bypass Resend/React 19 issues
                const emailHtml = renderToStaticMarkup(
                    <NewsletterEmailTemplate content={post.content} title={post.title} />
                )
                
                const data = await resend.emails.send({
                    from: 'Rayelus Newsletter <onboarding@resend.dev>', // Use testing domain for now if custom domain not verified
                    to: sub.email,
                    subject: post.title,
                    html: `<!DOCTYPE html>${emailHtml}`,
                })
                console.log(`Email sent to ${sub.email}:`, data)
                return { email: sub.email, status: 'fulfilled', data }
            } catch (err) {
                console.error(`Failed to send email to ${sub.email}:`, err)
                return { email: sub.email, status: 'rejected', error: err }
            }
        })

        const results = await Promise.all(emailPromises)
        const successCount = results.filter(r => r.status === 'fulfilled' && !r.data?.error).length
        const failureCount = results.filter(r => r.status === 'rejected' || r.data?.error).length

        console.log(`Newsletter sending complete. Success: ${successCount}, Failed: ${failureCount}`)

        if (successCount === 0 && failureCount > 0) {
             return { success: false, message: `Fallo el envío a todos los suscriptores. Revisa los logs del servidor.` }
        }

        return { success: true, message: `Newsletter enviada a ${successCount} suscriptores. Fallaron: ${failureCount}.` }

    } catch (error) {
        console.error("Error sending newsletter:", error)
        return { success: false, message: "Error al enviar la newsletter" }
    }
}
