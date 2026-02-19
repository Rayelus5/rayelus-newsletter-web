import prisma from "@/lib/prisma"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"
import { es } from "date-fns/locale"

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

            <div className="rounded-md border bg-card">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Email</TableHead>
                            <TableHead>Estado</TableHead>
                            <TableHead>Fecha de Registro</TableHead>
                            <TableHead>Fecha Baja</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {subscribers.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={4} className="text-center h-24 text-muted-foreground">
                                    No hay suscriptores registrados.
                                </TableCell>
                            </TableRow>
                        ) : (
                            subscribers.map((sub: { id: string; email: string; active: boolean; createdAt: Date; unsubscribedAt: Date | null }) => (
                                <TableRow key={sub.id}>
                                    <TableCell className="font-medium">{sub.email}</TableCell>
                                    <TableCell>
                                        <Badge variant={sub.active ? "default" : "secondary"}>
                                            {sub.active ? "Activo" : "Inactivo"}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        {format(sub.createdAt, "d 'de' MMMM, yyyy", { locale: es })}
                                    </TableCell>
                                    <TableCell>
                                        {sub.unsubscribedAt
                                            ? format(sub.unsubscribedAt, "d 'de' MMMM, yyyy", { locale: es })
                                            : "-"}
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
