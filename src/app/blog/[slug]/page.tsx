import { notFound } from "next/navigation"
import prisma from "@/lib/prisma"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import TiptapViewer from "@/components/tiptap-viewer"

interface BlogPostPageProps {
    params: Promise<{
        slug: string
    }>
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
    const { slug } = await params

    const post = await prisma.post.findUnique({
        where: {
            slug,
            published: true, // Only allow viewing published posts publically
        },
    })

    if (!post) {
        notFound()
    }

    return (
        <article className="py-10 space-y-8 animate-in fade-in duration-500">
            <div className="space-y-4">
                <Link href="/blog" passHref>
                    <Button variant="ghost" className="pl-0 hover:bg-transparent hover:text-primary mb-4">
                        <ArrowLeft className="mr-2 h-4 w-4" /> Volver al Blog
                    </Button>
                </Link>
                <div className="text-sm text-muted-foreground">
                    {format(post.createdAt, "d 'de' MMMM, yyyy", { locale: es })}
                </div>
                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight text-primary">
                    {post.title}
                </h1>
            </div>

            <TiptapViewer content={post.content} />

            <div className="pt-10 border-t mt-12">
                <p className="text-muted-foreground text-center italic">
                    ¿Te ha gustado este artículo? <Link href="/subscribe" className="text-primary underline hover:text-primary/80">Suscríbete a la newsletter</Link> para recibir más como este.
                </p>
            </div>
        </article>
    )
}
