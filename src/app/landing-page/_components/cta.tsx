import Link from "next/link";
import React from "react";

import { Button } from "@/components/ui/button";

export default function CtaSection() {
    return (
        <section id="cta" className="w-full max-w-3xl mx-auto mt-20 flex flex-col items-center space-y-4 bg-gradient-to-br from-blue-100/20 to-blue-100/30 rounded-2xl shadow-lg py-12 px-6 md:px-16 border border-primary/20">
            <h3 className="text-3xl md:text-4xl font-extrabold text-primary mb-4 text-center">
                Transforme sua clínica com uma plataforma moderna e intuitiva
            </h3>
            <p className="text-lg md:text-xl text-muted-foreground text-center max-w-2xl">
                Organize e reduza tarefas manuais e atenda melhor seus pacientes. Simplifique processos e foque no que importa: o cuidado com a saúde.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/authentication">
                    <Button
                        size="lg"
                        className="w-full px-10 py-6 text-lg font-semibold shadow-md bg-gradient-to-r from-primary to-blue-500 hover:from-blue-500 hover:to-primary hover:scale-105 hover:shadow-lg transition-all duration-200"
                    >
                        Testar grátis
                    </Button>
                </Link>
                <Link href="https://wa.link/2tgwzp">
                    <Button
                        size="lg"
                        className="w-full px-10 py-6 text-lg text-muted-foreground font-semibold shadow-md bg-gradient-to-r from-muted to-blue-50 hover:scale-105 hover:shadow-lg transition-all duration-200"
                    >
                        Falar com especialista
                    </Button>
                </Link>
            </div>
            <span className="mt-4 text-xs text-muted-foreground text-center">
                Teste sem custos. Suporte consultivo incluso desde o primeiro acesso.
            </span>
        </section>
    );
}