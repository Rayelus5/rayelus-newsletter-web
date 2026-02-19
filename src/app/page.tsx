import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NewsletterPage() {
    return (
        <div className="flex flex-col items-start justify-center min-h-[60vh] space-y-8">
            <div className="space-y-4 max-w-2xl">
                <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter text-primary">
                    Minimalismo,<br />
                    Código y Estrategia.
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                    Un espacio digital donde comparto reflexiones sobre desarrollo de software,
                    negocios digitales y la vida misma. Sin ruido.
                </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                <Link href="/subscribe" passHref>
                    <Button size="lg" className="w-full sm:w-auto text-base px-8 h-12 cursor-pointer">
                        Suscribirse
                    </Button>
                </Link>
                <Link href="/blog" passHref>
                    <Button variant="outline" size="lg" className="w-full sm:w-auto text-base px-8 h-12 cursor-pointer">
                        Leer el Blog
                    </Button>
                </Link>
            </div>
        </div>
    );
}
