import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

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
                    <main className="max-w-4xl mx-auto w-full px-6 pb-20 flex-1">
                        {children}
                    </main>
                </div>
            </body>
        </html>
    );
}
