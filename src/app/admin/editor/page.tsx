import prisma from "@/lib/prisma"
import { createPost } from '@/actions/post'
import { sendNewsletter } from '@/actions/email'
import Tiptap from '@/components/tiptap'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ClientEditor } from './client-editor'

export const dynamic = 'force-dynamic'

interface EditorPageProps {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function EditorPage({ searchParams }: EditorPageProps) {
    const resolvedSearchParams = await searchParams
    const id = typeof resolvedSearchParams.id === 'string' ? resolvedSearchParams.id : null

    let post = null
    if (id) {
        post = await prisma.post.findUnique({
            where: { id }
        })
    }

    return (
        <div className="max-w-4xl mx-auto space-y-8 pb-20">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">
                    {post ? 'Editar Publicación' : 'Crear Nueva Publicación'}
                </h1>
            </div>

            <ClientEditor
                initialData={post}
                onSubmit={createPost}
                onSend={sendNewsletter}
            />
        </div>
    )
}
