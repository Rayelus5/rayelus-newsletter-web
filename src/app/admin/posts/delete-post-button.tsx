'use client'

import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"
import { deletePost } from "@/actions/post"
import { useTransition } from "react"

export function DeletePostButton({ id, title }: { id: string, title: string }) {
    const [isPending, startTransition] = useTransition()

    const handleDelete = () => {
        if (confirm(`¿Estás seguro de que quieres eliminar el post "${title}"? Esta acción no se puede deshacer.`)) {
            startTransition(async () => {
                const result = await deletePost(id)
                if (!result.success) {
                    alert(result.message)
                }
            })
        }
    }

    return (
        <Button
            variant="ghost"
            size="icon"
            title="Eliminar"
            onClick={handleDelete}
            disabled={isPending}
            className="text-destructive hover:text-destructive hover:bg-destructive/10"
        >
            <Trash2 className="h-4 w-4" />
        </Button>
    )
}
