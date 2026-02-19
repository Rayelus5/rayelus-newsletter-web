'use client'

import { useState } from 'react'
import Tiptap from '@/components/tiptap'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface ClientEditorProps {
    initialData: any
    onSubmit: (formData: FormData) => Promise<any>
    onSend: () => Promise<any>
}

export function ClientEditor({ initialData, onSubmit, onSend }: ClientEditorProps) {
    const [content, setContent] = useState(initialData?.content || '<p>Empieza a escribir aquí...</p>')
    const [title, setTitle] = useState(initialData?.title || '')
    const [slug, setSlug] = useState(initialData?.slug || '')
    const [isPending, setIsPending] = useState(false)
    const [sendPending, setSendPending] = useState(false)

    // Wrapper to handle submit
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const submitter = (e.nativeEvent as SubmitEvent).submitter as HTMLButtonElement

        if (submitter?.name === 'published') {
            formData.set('published', submitter.value)
        }

        setIsPending(true)
        try {
            const result = await onSubmit(formData)
            if (result && !result.success) {
                let errorMessage = result.message || "Error al guardar"
                if (result.errors) {
                    const fieldErrors = Object.values(result.errors).flat().join(', ')
                    if (fieldErrors) errorMessage += `: ${fieldErrors}`
                }
                alert(errorMessage)
            }
        } catch (error: any) {
            // Check for redirect error
            if (error?.message === 'NEXT_REDIRECT' || error?.digest?.startsWith?.('NEXT_REDIRECT')) {
                return
            }
            console.error(error)
            alert("Ocurrió un error inesperado al guardar")
        } finally {
            setIsPending(false)
        }
    }


    const handleSend = async () => {
        if (!confirm('¿Estás seguro de que quieres enviar este newsletter a todos los suscriptores activos?')) return

        setSendPending(true)
        try {
            await onSend()
            alert('Newsletter enviado correctamente')
        } catch (error) {
            console.error(error)
            alert('Error al enviar el newsletter')
        } finally {
            setSendPending(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {initialData?.id && <input type="hidden" name="id" value={initialData.id} />}

            <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                    <Label htmlFor="title">Título</Label>
                    <Input
                        id="title"
                        name="title"
                        placeholder="El futuro del código..."
                        required
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="slug">Slug (URL)</Label>
                    <Input
                        id="slug"
                        name="slug"
                        placeholder="el-futuro-del-codigo"
                        required
                        value={slug}
                        onChange={(e) => setSlug(e.target.value)}
                    />
                </div>
            </div>

            <div className="space-y-2">
                <Label>Contenido</Label>
                <Tiptap content={content} onChange={(html) => setContent(html)} />
                <input type="hidden" name="content" value={content} />
            </div>

            <div className="flex gap-4 pt-4 border-t">
                <Button
                    type="submit"
                    name="published"
                    value="false"
                    variant="outline"
                    size="lg"
                    disabled={isPending}
                >
                    {isPending ? 'Guardando...' : 'Guardar Borrador'}
                </Button>

                <Button
                    type="submit"
                    name="published"
                    value="true"
                    size="lg"
                    disabled={isPending}
                >
                    {isPending ? 'Guardando...' : (initialData?.published ? 'Actualizar Post' : 'Subir Post')}
                </Button>

                {initialData && (
                    <Button
                        type="button"
                        variant="secondary"
                        size="lg"
                        onClick={handleSend}
                        disabled={sendPending}
                        className="ml-auto"
                    >
                        {sendPending ? 'Enviando...' : 'Enviar Newsletter'}
                    </Button>
                )}
            </div>
        </form>
    )
}
