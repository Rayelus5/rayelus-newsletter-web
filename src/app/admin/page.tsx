import prisma from "@/lib/prisma"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { PlusCircle, Users, FileText } from "lucide-react"

export const dynamic = 'force-dynamic'

export default async function AdminDashboard() {
    const subscriberCount = await prisma.subscriber.count({ where: { active: true } })
    const postsCount = await prisma.post.count()

    const recentSubscribers = await prisma.subscriber.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
    })

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                <Link href="/admin/editor">
                    <Button>
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Nueva Publicación
                    </Button>
                </Link>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Link href="/admin/subscribers">
                    <Card className="hover:bg-muted/50 transition-colors cursor-pointer">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">Suscriptores Activos</CardTitle>
                            <Users className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{subscriberCount}</div>
                        </CardContent>
                    </Card>
                </Link>
                <Link href="/admin/posts">
                    <Card className="hover:bg-muted/50 transition-colors cursor-pointer">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">Publicaciones Totales</CardTitle>
                            <FileText className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{postsCount}</div>
                        </CardContent>
                    </Card>
                </Link>
            </div>

            <div className="space-y-4">
                <h2 className="text-xl font-semibold">Últimos Suscriptores</h2>
                <div className="rounded-md border bg-card">
                    {recentSubscribers.length === 0 ? (
                        <div className="p-4 text-sm text-muted-foreground">No hay suscriptores aún.</div>
                    ) : (
                        <div className="divide-y">
                            {recentSubscribers.map((sub: { id: string; email: string; createdAt: Date }) => (
                                <div key={sub.id} className="p-4 flex justify-between items-center text-sm">
                                    <span className="font-medium">{sub.email}</span>
                                    <span className="text-muted-foreground">
                                        {sub.createdAt.toLocaleDateString()}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
