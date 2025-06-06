import { headers } from "next/headers";
import Image from "next/image";
import { redirect } from "next/navigation";

import LogoAlphon from "@/components/logo-alphon";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import { auth } from "@/lib/auth";

import LoginForm from "./components/login-form";
import SignUpForm from "./components/sign-up-form";

const AuthenticationPage = async () => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });
    if (session?.user) {
        redirect("/dashboard");
    }

    return (
        <div className="min-h-screen w-full flex items-center justify-center overflow-x-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 w-full min-h-screen items-center gap-8">

                {/* Coluna Esquerda - Formulário */}
                <div className="flex flex-col items-center justify-center gap-2 px-4 min-h-screen">
                    <LogoAlphon />

                    <div className="mb-4 flex flex-col items-center gap-2">
                        <h2 className="text-3xl font-semibold">Seja bem-vindo!</h2>
                        <p className="text-xs sm:text-sm text-gray-500 text-center">
                            Faça login ou crie uma conta para continuar.
                        </p>
                    </div>

                    <Tabs defaultValue="login" className="w-full max-w-xs sm:max-w-md">
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="login">Login</TabsTrigger>
                            <TabsTrigger value="register">Criar Conta</TabsTrigger>
                        </TabsList>
                        <TabsContent value="login">
                            <LoginForm />
                        </TabsContent>
                        <TabsContent value="register">
                            <SignUpForm />
                        </TabsContent>
                    </Tabs>
                </div>

                {/* Coluna Direita - Imagem + Texto */}
                <div className="hidden md:flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-primary to-sky-600">
                    <div className="md:max-w-xl flex flex-col items-center justify-center space-y-8 mx-auto text-center">
                        <Image
                            src="/alphon-dashboard-screen.png"
                            alt="Promoção Alphon"
                            width={500}
                            height={500}
                            className="shadow-2xl rounded-2xl mx-auto"
                        />
                        <h2 className="text-2xl font-bold text-white mb-2 max-w-md">Economize tempo e melhore a produtividade do seu consultório.

                        </h2>
                        <p className="text-xl text-white/90 max-w-md">
                            Sua plataforma completa para gestão de clínicas e consultórios.
                            <br />Simplifique, organize e cresça.
                        </p>
                    </div>
                </div>

            </div>
        </div>


    );
}
export default AuthenticationPage;