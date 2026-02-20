import prisma from "@/lib/prisma"
import Link from "next/link"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Edit, Eye, ExternalLink } from "lucide-react"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { DeletePostButton } from "./delete-post-button"

export const dynamic = 'force-dynamic'

export default async function PostsPage() {
    const posts = await prisma.post.findMany({
        orderBy: { createdAt: 'desc' },
    })

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">Publicaciones</h1>
                <Link href="/admin/editor">
                    <Button>Nueva Publicación</Button>
                </Link>
            </div>

            <div className="rounded-md border bg-card">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Título</TableHead>
                            <TableHead>Estado</TableHead>
                            <TableHead>Fecha Creación</TableHead>
                            <TableHead className="text-right">Acciones</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {posts.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={4} className="text-center h-24 text-muted-foreground">
                                    No hay publicaciones creadas.
                                </TableCell>
                            </TableRow>
                        ) : (
                            posts.map((post: { id: string; title: string; slug: string; published: boolean; createdAt: Date }) => (
                                <TableRow key={post.id}>
                                    <TableCell className="font-medium">
                                        <div className="flex flex-col">
                                            <span>{post.title}</span>
                                            <span className="text-xs text-muted-foreground">/{post.slug}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant={post.published ? "default" : "secondary"}>
                                            {post.published ? "Publicado" : "Borrador"}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        {format(post.createdAt, "d 'de' MMMM, yyyy", { locale: es })}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                            {post.published && (
                                                <Link href={`/blog/${post.slug}`} target="_blank">
                                                    <Button variant="ghost" size="icon" title="Ver en vivo">
                                                        <ExternalLink className="h-4 w-4" />
                                                    </Button>
                                                </Link>
                                            )}
                                            <Link href={`/admin/editor?id=${post.id}`}>
                                                <Button className="cursor-pointer" variant="ghost" size="icon" title="Editar">
                                                    <Edit className="h-4 w-4" />
                                                </Button>
                                            </Link>
                                            <DeletePostButton id={post.id} title={post.title} />
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}
