'use client'

import { useActionState } from 'react'
import { unsubscribeAction, type SubscribeState } from '@/actions/newsletter'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Loader2, UserMinus } from 'lucide-react'

const initialState: SubscribeState = {
    message: null,
    errors: {}
}

export default function UnsubscribePage() {
    const [state, formAction, isPending] = useActionState(unsubscribeAction, initialState)

    return (
        <div className="flex justify-center items-center min-h-[70vh] px-4">
            <Card className="w-full max-w-lg border-4 border-destructive/30 shadow-2xl rounded-3xl">
                <CardHeader className="space-y-4 text-center pb-2">
                    <div className="mx-auto bg-destructive/10 p-4 rounded-full w-fit mb-2">
                        <UserMinus className="w-8 h-8 text-destructive" />
                    </div>
                    <CardTitle className="text-3xl font-extrabold tracking-tight text-destructive">
                        Darse de baja
                    </CardTitle>
                    <CardDescription className="text-lg">
                        Lamentamos verte partir. Introduce tu email para confirmar la baja y dejar de recibir correos.
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
                                className="h-12 text-lg px-4 border-2 focus-visible:ring-destructive/20 transition-all border-destructive/20"
                            />
                        </div>

                        <Button type="submit" variant="destructive" disabled={isPending} className="w-full h-12 text-lg font-bold shadow-lg hover:shadow-xl transition-all cursor-pointer">
                            {isPending ? (
                                <>
                                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                    Procesando...
                                </>
                            ) : (
                                "Confirmar Baja"
                            )}
                        </Button>

                        {state.message && (
                            <div aria-live="polite" className={`text-base font-medium p-4 rounded-lg text-center border-l-4 shadow-sm animate-in fade-in slide-in-from-bottom-2 ${state.success ? 'bg-secondary text-secondary-foreground border-secondary-foreground/50' : 'bg-destructive/10 text-destructive border-destructive'}`}>
                                {state.message}
                            </div>
                        )}

                        <p className="text-xs text-center text-muted-foreground mt-4">
                            Si cambias de opinión, siempre puedes volver a suscribirte.
                        </p>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
