'use client'

import { useActionState } from 'react' // Next.js 15 uses React 19 hooks
import { subscribe, type SubscribeState } from '@/actions/newsletter'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Loader2, Mail } from 'lucide-react'

const initialState: SubscribeState = {
    message: null,
    errors: {}
}

export default function SubscribePage() {
    const [state, formAction, isPending] = useActionState(subscribe, initialState)

    return (
        <div className="flex justify-center items-center min-h-[70vh] px-4">
            <Card className="w-full max-w-lg border-4 border-blue-500/40 shadow-2xl bg-card rounded-3xl">
                <CardHeader className="space-y-4 text-center pb-2">
                    <div className="mx-auto bg-blue-500/10 p-4 rounded-full w-fit mb-2">
                        <Mail className="w-8 h-8 text-blue-500" />
                    </div>
                    <CardTitle className="text-3xl md:text-4xl font-extrabold tracking-tight">
                        Únete a la newsletter
                    </CardTitle>
                    <CardDescription className="text-lg text-muted-foreground max-w-sm mx-auto">
                        Recibe mis reflexiones personales. Cero spam, contenido de valor.
                    </CardDescription>
                </CardHeader>
                <CardContent className="p-6 md:p-8">
                    <form action={formAction} className="space-y-6">
                        <div className="space-y-2">
                            <Input
                                id="email"
                                name="email"
                                placeholder="tu@email.com"
                                type="email"
                                required
                                className="h-12 text-lg px-4 border-2 focus-visible:ring-primary/20 transition-all"
                            />
                            {state.errors?.email && (
                                <p className="text-sm font-medium text-destructive mt-1 bg-destructive/10 p-2 rounded animate-in slide-in-from-top-1">{state.errors.email[0]}</p>
                            )}
                        </div>

                        <Button type="submit" disabled={isPending} className="w-full h-12 text-lg font-bold shadow-lg hover:shadow-xl transition-all cursor-pointer">
                            {isPending ? (
                                <>
                                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                    Suscribiendo...
                                </>
                            ) : (
                                "Suscribirme Gratis"
                            )}
                        </Button>

                        {state.message && (
                            <div aria-live="polite" className={`text-base font-medium p-4 rounded-lg text-center border-l-4 shadow-sm animate-in fade-in slide-in-from-bottom-2 ${state.success ? 'bg-green-50 text-green-700 border-green-500 dark:bg-green-900/20 dark:text-green-300' : 'bg-destructive/10 text-destructive border-destructive'}`}>
                                {state.message}
                            </div>
                        )}

                        <p className="text-xs text-center text-muted-foreground mt-4">
                            Puedes darte de baja en cualquier momento con un solo clic.
                        </p>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
