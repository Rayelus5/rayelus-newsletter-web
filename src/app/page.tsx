import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Calendar, Mail, Map, UserCircle2, ArrowRight, Gift, Sparkles, Github, Linkedin } from "lucide-react";

export default function NewsletterPage() {
    return (
        <div className="relative flex flex-col space-y-24 py-12 lg:py-48 overflow-hidden">
            {/* Hero Section */}
            <section className="flex flex-col items-start justify-center space-y-8 max-w-4xl">
                <div className="space-y-6">
                    <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter text-primary leading-[1.1]">
                        Minimalismo,<br />
                        Código y
                        <span className="text-blue-500"> Estrategia.</span>
                    </h1>
                    <p className="text-md md:text-2xl text-muted-foreground leading-relaxed font-light">
                        Un espacio digital donde comparto, sin filtros ni ruido, mis aprendizajes sobre desarrollo de software, creación de proyectos y la vida misma.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto pt-4">
                    <Link href="/subscribe" passHref>
                        <Button size="lg" className="w-full sm:w-auto text-base px-8 h-12 cursor-pointer bg-primary text-primary-foreground hover:bg-primary/90">
                            Únete a la Newsletter <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </Link>
                    <Link href="/blog" passHref>
                        <Button variant="outline" size="lg" className="w-full sm:w-auto text-base px-8 h-12 cursor-pointer border-2 border-zinc-800 hover:bg-zinc-800 hover:text-white">
                            Leer artículos
                        </Button>
                    </Link>
                </div>
            </section>



            {/* Roadmap */}
            {/* <section className="space-y-8 max-w-3xl">
                <div className="space-y-2">
                    <h2 className="text-3xl font-bold tracking-tight flex items-center gap-3">
                        <Map className="h-8 w-8 text-zinc-400" />
                        Hacia dónde vamos
                    </h2>
                    <p className="text-lg text-muted-foreground">
                        Esto no es un pasatiempo, es un proyecto a largo plazo. Este es el roadmap de lo que se viene:
                    </p>
                </div>

                <div className="relative border-l-2 border-muted ml-4 md:ml-6 space-y-8 pb-4">
                    <div className="relative pl-8">
                        <div className="absolute w-4 h-4 bg-primary rounded-full -left-[9px] top-1.5" />
                        <h3 className="text-xl font-bold">Fase 1: Consolidar la base</h3>
                        <p className="text-muted-foreground mt-1">Escribir religiosamente, encontrar mi voz y construir una comunidad pequeña pero fiel de developers y curiosos.</p>
                    </div>

                    <div className="relative pl-8">
                        <div className="absolute w-4 h-4 bg-muted rounded-full -left-[9px] top-1.5 border-2 border-background" />
                        <h3 className="text-xl font-bold text-muted-foreground">Fase 2: Recursos Exclusivos</h3>
                        <p className="text-muted-foreground mt-1">Empezar a liberar herramientas, snippets de código y plantillas exclusivas para los suscriptores más activos.</p>
                    </div>

                    <div className="relative pl-8">
                        <div className="absolute w-4 h-4 bg-muted rounded-full -left-[9px] top-1.5 border-2 border-background" />
                        <h3 className="text-xl font-bold text-muted-foreground">Fase 3: El Siguiente Nivel</h3>
                        <p className="text-muted-foreground mt-1">Lanzamiento de proyectos más grandes impulsados por la propia comunidad que estamos formando aquí.</p>
                    </div>
                </div>
            </section> */}

            {/* About Me */}
            <section className="max-w-4xl bg-white dark:bg-zinc-900/50 rounded-3xl p-8 md:p-12 border-2 mt-12 md:mt-30">
                <div className="flex flex-col md:flex-row gap-8 items-center md:items-start text-center md:text-left">
                    <div className="w-48 h-48 shrink-0 rounded-full overflow-hidden bg-zinc-200 dark:bg-zinc-800 border-4 border-background shadow-lg">
                        <img
                            src='./img/pfp.webp'
                            alt="Foto de Ray"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="space-y-4">
                        <h2 className="text-3xl font-bold tracking-tight">Bienvenid@ a mi newsletter</h2>
                        <div className="space-y-3 text-muted-foreground leading-relaxed">
                            <p>
                                Soy Ray, un chaval joven apasionado por la informática y la tecnología. Me encanta crear, programar y jugar a videojuegos.
                            </p>
                            <p>
                                Creé esta newsletter como práctica personal y porque me gusta compartir lo que aprendo y lo que me apasiona.
                            </p>
                            <p>
                                Intentaré ser lo más puro y sincero en mis artículos. Sin filtros, sin usar demasiada IA y sin intentar venderte nada.
                            </p>
                        </div>
                        <div className="flex flex-col justify-end sm:flex-row gap-4 w-full sm:w-auto pt-4">
                            <Link href="https://github.com/Rayelus5" target="_blank" rel="noopener noreferrer" passHref>
                                <Button size="lg" className="w-full sm:w-auto text-lg px-4 h-14 cursor-pointer bg-blue-500 text-primary-foreground hover:bg-blue-600 rounded-full">
                                    <Github className="h-6 w-6 text-white" />
                                </Button>
                            </Link>
                            <Link href="https://www.linkedin.com/in/rayelus/" target="_blank" rel="noopener noreferrer" passHref>
                                <Button size="lg" className="w-full sm:w-auto text-lg px-4 h-14 cursor-pointer bg-blue-500 text-primary-foreground hover:bg-blue-600 rounded-full">
                                    <Linkedin className="h-6 w-6 text-white" />
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>


            {/* Qué esperar (Calendario) */}
            <section className="space-y-8 max-w-4xl mt-20">
                <div className="space-y-2">
                    <h2 className="text-3xl font-bold tracking-tight flex items-center gap-3">
                        <Calendar className="h-8 w-8 text-zinc-400" />
                        ¿Qué te vas a encontrar?
                    </h2>
                    <p className="text-lg text-muted-foreground">
                        No me gusta el spam, así que aquí te dejo claro lo que recibirás al suscribirte:
                    </p>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                    <div className="p-6 rounded-2xl border-2 bg-card space-y-4">
                        <div className="w-12 h-12 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
                            <Mail className="h-6 w-6 text-zinc-600 dark:text-zinc-300" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold mb-2">Todos los lunes</h3>
                            <p className="text-muted-foreground">
                                Novedades y noticias del mundo de la tecnología y la informática. Reflexiones sobre código, arquitectura y proyectos interesantes en marcha.
                            </p>
                        </div>
                    </div>

                    <div className="p-6 rounded-2xl border-2 bg-card space-y-4">
                        <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                            <Gift className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold mb-2">Fines de semana sueltos</h3>
                            <p className="text-muted-foreground">
                                Cosas más personales: anécdotas, aprendizajes, recursos que uso en mi día a día e ideas de negocio digitales que se me hayan ocurrido.
                            </p>
                        </div>
                    </div>
                </div>
            </section>


            <div className="flex flex-col m-auto sm:flex-row gap-4 w-full sm:w-auto pt-8 pb-4">
                <Link href="/subscribe" className="w-full sm:w-auto" passHref>
                    <div className="relative group w-full sm:w-auto">
                        {/* Resplandor trasero con animación de pulso */}
                        <div className="hidden sm:flex absolute -inset-1 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-xl blur opacity-50 group-hover:opacity-100 transition duration-900 animate-pulse"></div>

                        {/* Botón principal */}
                        <Button size="lg" className="relative w-full sm:w-auto text-xl h-14 cursor-pointer bg-black text-white hover:bg-black border-none transition-all duration-300 group-hover:scale-[1.02] group-hover:-translate-y-1 shadow-xl rounded-xl hover:bg-white hover:text-zinc-900">
                            Suscríbete Gratis
                            <Sparkles className="ml-3 h-5 w-5 text-blue-300 group-hover:text-zinc-900 animate-pulse" />
                        </Button>
                    </div>
                </Link>
            </div>
        </div>
    );
}
