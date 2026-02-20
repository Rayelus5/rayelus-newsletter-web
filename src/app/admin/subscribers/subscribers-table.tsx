"use client"

import { useState } from "react"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { deleteSubscribers, unsubscribeSubscribers } from "./actions"
import { Trash2, UserMinus } from "lucide-react"

type Subscriber = {
    id: string
    email: string
    active: boolean
    createdAt: Date
    unsubscribedAt: Date | null
}

interface SubscribersTableProps {
    subscribers: Subscriber[]
}

export function SubscribersTable({ subscribers }: SubscribersTableProps) {
    const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())
    const [page, setPage] = useState(1)
    const [pageSize, setPageSize] = useState(10)
    const [isLoading, setIsLoading] = useState(false)

    // Pagination calculations
    const totalPages = Math.ceil(subscribers.length / pageSize) || 1
    const startIndex = (page - 1) * pageSize
    const endIndex = startIndex + pageSize
    const paginatedSubscribers = subscribers.slice(startIndex, endIndex)

    const toggleSelectAll = () => {
        if (selectedIds.size === paginatedSubscribers.length && paginatedSubscribers.length > 0) {
            // Deselect all on current page
            const newSelected = new Set(selectedIds)
            paginatedSubscribers.forEach(sub => newSelected.delete(sub.id))
            setSelectedIds(newSelected)
        } else {
            // Select all on current page
            const newSelected = new Set(selectedIds)
            paginatedSubscribers.forEach(sub => newSelected.add(sub.id))
            setSelectedIds(newSelected)
        }
    }

    const toggleSelect = (id: string) => {
        const newSelected = new Set(selectedIds)
        if (newSelected.has(id)) {
            newSelected.delete(id)
        } else {
            newSelected.add(id)
        }
        setSelectedIds(newSelected)
    }

    const isAllSelected = paginatedSubscribers.length > 0 && paginatedSubscribers.every(sub => selectedIds.has(sub.id))
    const isSomeSelected = paginatedSubscribers.some(sub => selectedIds.has(sub.id)) && !isAllSelected

    const handleDelete = async () => {
        if (selectedIds.size === 0) return
        if (!confirm(`¿Estás seguro de eliminar ${selectedIds.size} suscriptores? Esta acción no se puede deshacer.`)) return

        setIsLoading(true)
        try {
            await deleteSubscribers(Array.from(selectedIds))
            setSelectedIds(new Set())
        } catch (error) {
            console.error("Error al eliminar:", error)
        } finally {
            setIsLoading(false)
        }
    }

    const handleUnsubscribe = async () => {
        if (selectedIds.size === 0) return
        if (!confirm(`¿Estás seguro de dar de baja a ${selectedIds.size} suscriptores?`)) return

        setIsLoading(true)
        try {
            await unsubscribeSubscribers(Array.from(selectedIds))
            setSelectedIds(new Set())
        } catch (error) {
            console.error("Error al dar de baja:", error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="space-y-4">
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row justify-between gap-4 items-start sm:items-center">
                <div className="flex items-center gap-2">
                    <Button
                        variant="destructive"
                        size="sm"
                        disabled={selectedIds.size === 0 || isLoading}
                        onClick={handleDelete}
                        className="cursor-pointer"
                    >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Eliminar ({selectedIds.size})
                    </Button>
                    <Button
                        variant="secondary"
                        size="sm"
                        disabled={selectedIds.size === 0 || isLoading}
                        onClick={handleUnsubscribe}
                        className="cursor-pointer"
                    >
                        <UserMinus className="w-4 h-4 mr-2" />
                        Dar de baja ({selectedIds.size})
                    </Button>
                </div>

                <div className="flex items-center gap-4 text-sm">
                    <span className="text-muted-foreground">
                        Total: {subscribers.length}
                    </span>
                    <div className="flex items-center gap-2">
                        <span className="text-muted-foreground">
                            Filas por página
                        </span>
                        <Select
                            value={pageSize.toString()}
                            onValueChange={(val) => {
                                setPageSize(Number(val))
                                setPage(1) // Reset to first page
                            }}
                        >
                            <SelectTrigger className="w-[70px] h-8">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                {[10, 25, 50, 100].map(size => (
                                    <SelectItem key={size} value={size.toString()}>{size}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </div>

            {/* Table */}
            <div className="rounded-md border bg-card">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[50px] text-center">
                                <Checkbox
                                    checked={isAllSelected || (isSomeSelected ? "indeterminate" : false)}
                                    onCheckedChange={toggleSelectAll}
                                    aria-label="Seleccionar todos"
                                />
                            </TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Estado</TableHead>
                            <TableHead>Fecha de Registro</TableHead>
                            <TableHead>Fecha Baja</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {paginatedSubscribers.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center h-24 text-muted-foreground">
                                    No hay suscriptores registrados.
                                </TableCell>
                            </TableRow>
                        ) : (
                            paginatedSubscribers.map((sub) => (
                                <TableRow key={sub.id} data-state={selectedIds.has(sub.id) ? "selected" : undefined}>
                                    <TableCell className="text-center">
                                        <Checkbox
                                            checked={selectedIds.has(sub.id)}
                                            onCheckedChange={() => toggleSelect(sub.id)}
                                            aria-label={`Seleccionar ${sub.email}`}
                                        />
                                    </TableCell>
                                    <TableCell className="font-medium">{sub.email}</TableCell>
                                    <TableCell>
                                        <Badge variant={sub.active ? "default" : "secondary"}>
                                            {sub.active ? "Activo" : "Inactivo"}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        {format(new Date(sub.createdAt), "d 'de' MMMM, yyyy", { locale: es })}
                                    </TableCell>
                                    <TableCell>
                                        {sub.unsubscribedAt
                                            ? format(new Date(sub.unsubscribedAt), "d 'de' MMMM, yyyy", { locale: es })
                                            : "-"}
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Pagination Controls */}
            <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">
                    Página {page} de {totalPages}
                </div>
                <div className="flex items-center space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setPage((p) => Math.max(1, p - 1))}
                        disabled={page === 1}
                    >
                        Anterior
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                        disabled={page === totalPages}
                    >
                        Siguiente
                    </Button>
                </div>
            </div>
        </div>
    )
}
