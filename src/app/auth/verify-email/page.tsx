import Link from "next/link";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";

export default function VerifyEmailPage() {
    return (
        <div className="container flex h-screen w-screen flex-col items-center justify-center">
            <Card className="w-full max-w-lg">
                <CardHeader className="space-y-1">
                    <div className="flex justify-center">
                        <div className="rounded-full bg-primary/10 p-4">
                            <Mail className="h-8 w-8 text-primary" />
                        </div>
                    </div>
                    <CardTitle className="text-2xl text-center">
                        Verifique seu email
                    </CardTitle>
                    <CardDescription className="text-center">
                        Enviamos um link de confirmação para o seu email.
                        Por favor, clique no link para ativar sua conta.
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center space-y-4">
                    <p className="text-sm text-muted-foreground text-center">
                        Não recebeu o email? Verifique sua pasta de spam ou
                        solicite um novo link de confirmação.
                    </p>
                    <Button variant="outline" className="w-full max-w-xs">
                        Reenviar email
                    </Button>
                </CardContent>
                <CardFooter className="flex justify-center">
                    <Link
                        href="/auth/login"
                        className="text-sm text-muted-foreground hover:text-primary"
                    >
                        Voltar para o login
                    </Link>
                </CardFooter>
            </Card>
        </div>
    );
}
