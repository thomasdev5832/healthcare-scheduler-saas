"use client";

import Link from "next/link";
import React from "react";

import LogoAlphon from "@/components/logo-alphon";
import { Button } from "@/components/ui/button";
import { PageContainer } from "@/components/ui/page-container";
import { PageContent } from "@/components/ui/page-container";

import HamburgerButton from "./_components/burguer-button";
import CtaSection from "./_components/cta";
import FaqSection from "./_components/faq";
import FeaturesSection from "./_components/features";
import Footer from "./_components/footer";
import Hero from "./_components/hero";


export default function LandingPage() {
    const [open, setOpen] = React.useState(false);

    return (
        <>
            <header className="w-full md:w-7xl mx-auto md:px-0 flex items-center justify-between px-4 py-3 border-b bg-background fixed top-0 left-0 z-30 md:static md:bg-transparent md:border-0">
                <LogoAlphon />
                <nav className="hidden md:flex gap-6 items-center">
                    <Link href="#about" className="text-sm font-medium hover:text-primary transition-colors">Sobre</Link>
                    <Link href="#faq" className="text-sm font-medium hover:text-primary transition-colors">FAQ</Link>
                    <Link href="#contact" className="text-sm font-medium hover:text-primary transition-colors">Contato</Link>
                    <Link href="/authentication">
                        <Button size="sm" variant="default">Comece já</Button>
                    </Link>
                </nav>
                <HamburgerButton open={open} onClick={() => setOpen((v) => !v)} />
            </header>
            {/* Menu mobile corrigido */}
            <div
                id="mobile-menu"
                className={`fixed top-[56px] left-0 w-full bg-background border-t border-border z-20 flex flex-col gap-2 p-6 md:hidden transition-all duration-300 ease-in-out ${open ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
                    }`}
            >
                <nav aria-label="Menu principal" className="flex flex-col gap-2">
                    <Link
                        href="#about"
                        className="py-2 text-base font-medium hover:text-primary transition-colors"
                        onClick={() => setOpen(false)}
                    >
                        Sobre
                    </Link>
                    <Link
                        href="#contact"
                        className="py-2 text-base font-medium hover:text-primary transition-colors"
                        onClick={() => setOpen(false)}
                    >
                        Contato
                    </Link>
                    <Link
                        href="#faq"
                        className="py-2 text-base font-medium hover:text-primary transition-colors"
                        onClick={() => setOpen(false)}
                    >
                        FAQ
                    </Link>
                    <Link href="/authentication" onClick={() => setOpen(false)}>
                        <Button className="w-full mt-4">Entrar</Button>
                    </Link>
                </nav>
            </div>
            <main className="pt-20 md:pt-0 md:w-7xl mx-auto px-4 md:px-0">
                <PageContainer>
                    <PageContent>
                        <Hero />
                        <FeaturesSection />
                        <FaqSection />
                        <CtaSection />
                        <Footer />
                    </PageContent>
                </PageContainer >
            </main >
        </>
    );
}
