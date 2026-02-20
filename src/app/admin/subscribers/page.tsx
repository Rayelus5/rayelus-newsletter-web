import prisma from "@/lib/prisma"
import { SubscribersTable } from "./subscribers-table"

export const dynamic = 'force-dynamic'

export default async function SubscribersPage() {
    const subscribers = await prisma.subscriber.findMany({
        orderBy: { createdAt: 'desc' },
    })

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">Suscriptores</h1>
            </div>

            <SubscribersTable subscribers={subscribers} />
        </div>
    )
}
