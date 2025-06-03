import { headers } from "next/headers";
import { redirect } from "next/navigation";

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
        <div className="h-screen flex items-center justify-center flex-col gap-4">
            <div className="flex items-center">
                <p className="text-3xl font-normal" >
                    Alphon
                    <span className="text-center text-primary font-semibold" >
                        Health
                    </span>
                </p>
            </div>
            <p className="text-sm text-gray-500">Faça login ou crie uma conta para continuar.</p>
            <Tabs defaultValue="login" className="w-[400px]">
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
    );
}
export default AuthenticationPage;