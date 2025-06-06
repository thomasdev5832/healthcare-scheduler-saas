import { Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from 'react';

import { Button } from "@/components/ui/button";
import { PageDescription, PageHeader, PageHeaderContent } from "@/components/ui/page-container";


const Hero: React.FC = () => {
    return (
        <PageHeader>
            <PageHeaderContent>
                <div className="pt-20 md:pt-0 w-full flex flex-col md:flex-row gap-10 sm:gap-2 items-center justify-center pb-10 min-h-[70vh] md:min-h-[70vh]">
                    {/* Coluna 1: texto e CTA */}
                    <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left order-1 space-y-4 mb-4 mt-2">
                        <div
                            className="flex items-center justify-center md:justify-start text-primary text-xs border border-primary/30 rounded-lg px-3 py-1 mb-4 bg-primary/10 animate-bounce-smooth"
                        >
                            <span className="font-semibold tracking-wider">
                                <Sparkles className="inline-block mr-1" size={16} />
                                Healthcare Software-as-a-Service
                            </span>
                        </div>
                        <style jsx global>{`
                @keyframes bounce-smooth {
                  0%, 100% { transform: translateY(0); }
                  50% { transform: translateY(-8px); }
                }
                .animate-bounce-smooth {
                  animation: bounce-smooth 3s infinite;
                }
                `}</style>
                        <div className="space-y-4 flex flex-col items-center md:items-start">

                            <h1 className="text-5xl font-extrabold tracking-tight text-gray-700 leading-[1.2em]">
                                Simples. Completo. Eficiente.
                            </h1>

                            <PageDescription>
                                Economize tempo e melhore a produtividade do seu consultório.
                            </PageDescription>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center md:justify-start items-center md:items-start">
                            <Link href="/authentication" className="flex-1 w-full sm:w-auto">
                                <Button size="lg" className="px-8 py-6 text-lg w-full">Testar grátis</Button>
                            </Link>
                            <Link href="https://wa.link/2tgwzp" className="flex-1 w-full sm:w-auto">
                                <Button size="lg" variant="outline" className="px-8 py-6 text-lg w-full">Falar com especialista</Button>
                            </Link>
                        </div>
                    </div>
                    {/* Coluna 2: imagem ilustrativa */}
                    <div className="flex-1 flex items-center justify-center mb-8 md:mb-0 order-2 md:order-2 relative">
                        {/* Blue shadow circles */}
                        <div className="absolute -left-10 -top-10 w-64 h-64 rounded-full bg-blue-400 opacity-30 blur-3xl z-0" />
                        <div className="absolute -right-10 -bottom-10 w-40 h-40 rounded-full bg-blue-600 opacity-20 blur-2xl z-0" />
                        <Image
                            src="/alphon-dashboard-screen.png"
                            alt="Alphon Dashboard Screen"
                            width={1920}
                            height={1024}
                            className="w-full max-w-full md:max-w-2xl h-auto rounded-2xl shadow-2xl animate-bounce-smooth relative z-10"
                        />
                    </div>
                </div>
            </PageHeaderContent>
        </PageHeader>
    );
};

export default Hero;