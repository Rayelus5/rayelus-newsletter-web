"use server"

import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function deleteSubscribers(ids: string[]) {
    await prisma.subscriber.deleteMany({
        where: { id: { in: ids } }
    })
    revalidatePath("/admin/subscribers")
}

export async function unsubscribeSubscribers(ids: string[]) {
    await prisma.subscriber.updateMany({
        where: { id: { in: ids } },
        data: {
            active: false,
            unsubscribedAt: new Date(),
        }
    })
    revalidatePath("/admin/subscribers")
}
