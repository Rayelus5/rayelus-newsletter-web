import { auth } from "@/auth"
import { redirect } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

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
            <div className="absolute bottom-10 left-1/2 translate-x-[-50%] z-50 flex gap-4">
                <Link href="/admin">
                    <Button className="bg-blue-600 text-white border-2 border-blue-600 hover:bg-blue-700 hover:text-white cursor-pointer" variant="ghost" size="sm"><ArrowLeft className="mr-2 h-4 w-4" /> Volver a inicio </Button>
                </Link>
            </div>
            <main className="flex-1 p-2 lg:py-10">
                {children}
            </main>
        </div >
    )
}
