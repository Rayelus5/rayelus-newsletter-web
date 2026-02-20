'use client'

import { useState } from 'react'
import Tiptap from '@/components/tiptap'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Globe, Loader2, SaveIcon, SendIcon } from 'lucide-react'

interface ClientEditorProps {
    initialData: any
    onSubmit: (formData: FormData) => Promise<any>
    onSend: (postId: string) => Promise<any>
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
                toast.error(errorMessage)
            } else {
                toast.success("Guardado correctamente")
            }
        } catch (error: any) {
            // Check for redirect error
            if (error?.message === 'NEXT_REDIRECT' || error?.digest?.startsWith?.('NEXT_REDIRECT')) {
                return
            }
            console.error(error)
            toast.error("Ocurrió un error inesperado al guardar")
        } finally {
            setIsPending(false)
        }
    }


    const handleSend = async () => {
        if (!initialData?.id) {
            toast.error('Error: Guarda el post antes de enviarlo.')
            return
        }

        setSendPending(true)
        try {
            await onSend(initialData.id)
            toast.success('Newsletter enviado correctamente a los suscriptores activos')
        } catch (error) {
            console.error(error)
            toast.error('Error al enviar el newsletter')
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
                    className="cursor-pointer border-2 border-red-600 bg-red-600 text-white hover:bg-red-700 hover:text-white hover:border-red-700"
                >
                    {isPending ? 'Guardando...' : 'Guardar Borrador'} {isPending ? <Loader2 className="ml-2 h-4 w-4 animate-spin" /> : <SaveIcon className="ml-2 h-4 w-4" />}
                </Button>

                <Button
                    type="submit"
                    name="published"
                    value="true"
                    size="lg"
                    disabled={isPending}
                    className="cursor-pointer"
                >
                    {isPending ? 'Guardando...' : (initialData?.published ? 'Actualizar Post' : 'Subir Post')} {isPending ? <Loader2 className="ml-2 h-4 w-4 animate-spin" /> : <SendIcon className="ml-2 h-4 w-4" />}
                </Button>

                {initialData && (
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button
                                type="button"
                                variant="secondary"
                                size="lg"
                                disabled={sendPending}
                                className="ml-auto cursor-pointer border-2 border-zinc-800 hover:border-green-600 hover:bg-green-600 hover:text-white text-md"
                            >
                                {sendPending ? 'Enviando...' : 'Enviar Newsletter'} {sendPending ? <Loader2 className="ml-2 h-5 w-5 animate-spin" /> : <Globe className="ml-2 h-5 w-5" />}
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>¿Enviar newsletter?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    Esta acción enviará el newsletter a todos los suscriptores activos en este momento. Este paso no se puede deshacer.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel className="bg-red-600 text-white border-2 border-red-600 hover:bg-red-700 hover:text-white cursor-pointer">Cancelar</AlertDialogCancel>
                                <AlertDialogAction className="bg-green-600 text-white border-2 border-green-600 hover:bg-green-700 hover:text-white cursor-pointer" onClick={(e) => {
                                    e.preventDefault(); // Prevent closing the dialog immediately if we want to show loading
                                    handleSend();
                                    // Normally you might wait for send to finish, but for simplicity here we just fire it. 
                                    // A cleaner UX might close the dialog right away when we start sending.
                                    // To allow the dialog to close, we can just remove e.preventDefault().
                                    // Let's remove e.preventDefault() to let it close normally, handleSend is async and sets pending.
                                }}
                                >
                                    Sí, enviar
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                )}
            </div>
        </form>
    )
}
