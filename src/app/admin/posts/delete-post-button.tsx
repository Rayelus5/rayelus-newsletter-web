'use client'

import { Button } from "@/components/ui/button"
import { Trash2, Loader2 } from "lucide-react"
import { deletePost } from "@/actions/post"
import { useTransition, useState } from "react"
import { toast } from "sonner"
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog'

export function DeletePostButton({ id, title }: { id: string, title: string }) {
    const [isPending, startTransition] = useTransition()
    const [isOpen, setIsOpen] = useState(false)

    const handleDelete = () => {
        startTransition(async () => {
            const result = await deletePost(id)
            if (!result.success) {
                toast.error(result.message)
                setIsOpen(false)
            } else {
                toast.success(`Post "${title}" eliminado correctamente`)
            }
        })
    }

    return (
        <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
            <AlertDialogTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon"
                    title="Eliminar"
                    disabled={isPending}
                    className="text-destructive hover:text-destructive hover:bg-destructive/10 cursor-pointer"
                >
                    {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>¿Eliminar post?</AlertDialogTitle>
                    <AlertDialogDescription>
                        ¿Estás seguro de que quieres eliminar el post "{title}"? Esta acción no se puede deshacer.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel disabled={isPending} className="bg-zinc-600 text-white border-2 border-zinc-600 hover:bg-zinc-700 hover:text-white cursor-pointer mt-0">
                        Cancelar
                    </AlertDialogCancel>
                    <Button
                        disabled={isPending}
                        className="bg-red-600 text-white border-2 border-red-600 hover:bg-red-700 hover:text-white cursor-pointer"
                        onClick={(e) => {
                            e.preventDefault()
                            handleDelete()
                        }}
                    >
                        {isPending ? (
                            <>Eliminando... <Loader2 className="ml-2 h-4 w-4 animate-spin" /></>
                        ) : (
                            "Sí, eliminar"
                        )}
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
