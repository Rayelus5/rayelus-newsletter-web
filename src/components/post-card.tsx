import Link from "next/link"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface PostCardProps {
    title: string
    slug: string
    excerpt?: string
    date: Date
}

export function PostCard({ title, slug, excerpt, date }: PostCardProps) {
    return (
        <Link href={`/blog/${slug}`}>
            <Card className="h-full hover:bg-zinc-800 transition-colors shadow-none bg-transparent hover:border-zinc-800 hover:text-white group px-5 border-4 border-gray-800">
                <CardHeader className="px-0 pb-2">
                    <div className="text-sm text-muted-foreground mb-2">
                        {format(date, "d 'de' MMMM, yyyy", { locale: es })}
                    </div>
                    <CardTitle className="text-xl md:text-2xl font-bold group-hover:text-white transition-colors leading-tight">
                        {title}
                    </CardTitle>
                </CardHeader>
                {excerpt && (
                    <CardContent className="px-0 pt-0">
                        <p className="text-muted-foreground line-clamp-3 leading-relaxed group-hover:text-gray-300 transition-colors">
                            {excerpt}
                        </p>
                    </CardContent>
                )}
            </Card>
        </Link>
    )
}
