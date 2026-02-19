import prisma from "@/lib/prisma"
import { PostCard } from "@/components/post-card"

// Force dynamic wrapper to ensure latest posts are fetched
export const dynamic = 'force-dynamic'

export default async function BlogPage() {
    const posts = await prisma.post.findMany({
        where: {
            published: true,
        },
        orderBy: {
            createdAt: 'desc',
        },
    })

    return (
        <div className="space-y-12 py-10">
            <div className="space-y-4">
                <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">Blog</h1>
                <p className="text-xl text-muted-foreground">
                    Artículos sobre desarrollo, diseño, tecnología y mis reflexiones personales.
                </p>
            </div>

            {posts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {posts.map((post: { id: string; title: string; slug: string; createdAt: Date; content: string }) => (
                        <PostCard
                            key={post.id}
                            title={post.title}
                            slug={post.slug}
                            date={post.createdAt}
                            excerpt={post.content.replace(/<[^>]*>?/gm, '').substring(0, 150) + "..."} // Simple excerpt from HTML
                        />
                    ))}
                </div>
            ) : (
                <div className="py-20 text-center text-muted-foreground">
                    <p>No hay artículos publicados aún.</p>
                </div>
            )}
        </div>
    )
}
