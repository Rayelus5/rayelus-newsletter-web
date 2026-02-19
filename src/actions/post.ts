'use server'

import { z } from 'zod'
import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

const postSchema = z.object({
    id: z.string().optional(),
    title: z.string().min(1, "El título es obligatorio"),
    slug: z.string().min(1, "El slug es obligatorio").regex(/^[a-z0-9-]+$/, "El slug solo puede contener letras minúsculas, números y guiones"),
    content: z.string().min(1, "El contenido no puede estar vacío"),
    published: z.boolean().optional(),
})

export async function createPost(formData: FormData) {
    const published = formData.get('published') === 'true' // Handle string 'true' from form
    const id = formData.get('id') as string | null

    const validatedFields = postSchema.safeParse({
        id: id || undefined,
        title: formData.get('title') || '',
        slug: formData.get('slug') || '',
        content: formData.get('content') || '',
        published,
    })

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: "Error de validación",
            success: false
        }
    }

    const { title, slug, content } = validatedFields.data

    try {
        if (id) {
            await prisma.post.update({
                where: { id },
                data: {
                    title,
                    slug,
                    content,
                    published,
                },
            })
        } else {
            await prisma.post.create({
                data: {
                    title,
                    slug,
                    content,
                    published,
                    jsonContent: {},
                },
            })
        }
    } catch (error) {
        console.error("Save Post Error:", error)
        return {
            success: false,
            message: "Error al guardar el post (posible slug duplicado)"
        }
    }

    revalidatePath('/blog')
    revalidatePath('/admin')
    revalidatePath('/admin/posts')
    redirect('/admin/posts')
}

export async function deletePost(id: string) {
    try {
        await prisma.post.delete({
            where: { id }
        })
        revalidatePath('/blog')
        revalidatePath('/admin')
        revalidatePath('/admin/posts')
        return { success: true }
    } catch (error) {
        console.error("Delete Post Error:", error)
        return { success: false, message: "Error al eliminar el post" }
    }
}


