import { auth } from "@/auth"
import { redirect } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const session = await auth()

    if (!session?.user) {
        // In a real app, Middleware handles this, but explicit check is also safe
        // redirect("/api/auth/signin") 
        // Allowing access for now for development if auth is not fully configured with providers
        // UNCOMMENT GENERATED LINE:
        // redirect("/api/auth/signin")
    }

    return (
        <div className="flex flex-col min-h-screen">
            <header className="border-b bg-muted/40 px-6 py-4 flex items-center justify-between">
                <Link href="/admin" className="font-bold text-lg">
                    Newsletter Admin
                </Link>
                <div className="flex gap-4">
                    <Link href="/" target="_blank">
                        <Button variant="ghost" size="sm">Ver Sitio</Button>
                    </Link>
                    <div className="text-sm font-medium flex items-center">
                        {session?.user?.email || "Admin"}
                    </div>
                </div>
            </header>
            <main className="flex-1 p-6 lg:p-10">
                {children}
            </main>
        </div>
    )
}
