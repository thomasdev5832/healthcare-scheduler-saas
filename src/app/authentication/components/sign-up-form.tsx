"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form"
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";

const registerSchema = z.object({
    name: z.string().trim().min(1, "Nome é obrigatório").max(50, "Nome deve ter no máximo 50 caracteres"),
    email: z.string().trim().email("Email inválido").min(1, "Email é obrigatório").max(100, "Email deve ter no máximo 100 caracteres"),
    password: z.string().trim().min(8, "Senha deve ter pelo menos 8 caracteres"),
})

const SignUpForm = () => {
    const router = useRouter();
    const form = useForm<z.infer<typeof registerSchema>>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
    })

    async function onSubmit(values: z.infer<typeof registerSchema>) {
        await authClient.signUp.email({
            email: values.email,
            password: values.password,
            name: values.name,
            //callbackURL: "/dashboard",
        },
            {
                onSuccess: () => {
                    console.log("Conta criada com sucesso!");
                    router.push("/dashboard");
                },
                onError: (error) => {
                    console.error("Erro ao criar conta:", error);
                },
            }
        );
    }

    return (
        <Card>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <CardHeader className="space-y-2">
                        <CardTitle>Criar Conta</CardTitle>
                        <CardDescription>
                            Crie uma conta para começar a usar nossos serviços.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nome</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Seu nome" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>E-mail</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Seu email" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Senha</FormLabel>
                                    <FormControl>
                                        <Input type="password" placeholder="Sua senha" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </CardContent>
                    <CardFooter>
                        <Button
                            type="submit"
                            className="w-full cursor-pointer"
                            disabled={form.formState.isSubmitting}
                        >
                            {form.formState.isSubmitting ? (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            ) : "Criar Conta"}
                        </Button>
                    </CardFooter>
                </form>
            </Form>
        </Card>
    );
}
export default SignUpForm;