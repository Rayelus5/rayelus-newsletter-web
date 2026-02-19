import NextAuth from "next-auth"
import authConfig from "./auth.config"
import { NextResponse } from "next/server"

const { auth } = NextAuth(authConfig)

export default auth((req) => {
    const { nextUrl } = req
    const isLoggedIn = !!req.auth

    // Admin IP Restriction
    if (nextUrl.pathname.startsWith('/admin')) {
        const allowedIp = process.env.ADMIN_ALLOWED_IP

        if (allowedIp) {
            let ip = req.headers.get('x-forwarded-for') || (req as any).ip

            // Handle multiple IPs in x-forwarded-for (client, proxy1, proxy2...)
            if (ip && ip.includes(',')) {
                ip = ip.split(',')[0].trim()
            }

            console.log("Admin Access Attempt:")
            console.log(" - Allowed IP:", allowedIp)
            console.log(" - Detected IP:", ip)
            console.log(" - Headers X-Forwarded-For:", req.headers.get('x-forwarded-for'))


            if (ip !== allowedIp) {
                // Redirect to homepage or 404 to hide admin existence
                return NextResponse.redirect(new URL('/', nextUrl))
            }
        }
    }
})

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
