import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { Heart } from "lucide-react";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-geist-sans",
});

const jetbrainsMono = JetBrains_Mono({
    subsets: ["latin"],
    variable: "--font-geist-mono",
});

export const metadata: Metadata = {
    title: "Rayelus Newsletter",
    description: "Minimalismo, Código y Estrategia.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="es">
            <body
                className={`${inter.variable} ${jetbrainsMono.variable} antialiased min-h-screen bg-background text-foreground font-sans selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black`}
            >
                <div className="flex flex-col min-h-screen">
                    <header className="p-6 flex justify-between items-center max-w-4xl mx-auto w-full">
                        <a href="/" className="text-xl font-bold tracking-tight">Rayelus Newsletter</a>
                    </header>
                    <div className="relative flex flex-col flex-1 overflow-hidden">
                        <main className="max-w-4xl mx-auto w-full px-6 pb-20 flex-1">
                            {children}
                        </main>

                        <footer className="w-full pb-8 pt-4 text-center text-sm text-black z-10 relative border-t border-blue-300 bg-white">
                            Created with <Heart className="inline-block w-4 h-4 mx-1 text-blue-500 fill-blue-500" /> by{" "}
                            <a href="https://dev.rayelus.com" target="_blank" rel="noopener noreferrer" className="font-semibold text-foreground hover:underline transition-all">Rayelus</a>
                        </footer>

                        <div className="absolute bottom-0 left-0 right-0 translate-y-1/2 -z-10 w-full h-96 bg-blue-400/15 blur-[120px] rounded-[100%] pointer-events-none" aria-hidden="true" />
                    </div>
                </div>
                <Toaster richColors position="top-center" />
            </body>
        </html>
    );
}
