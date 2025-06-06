import Link from "next/link";
import React from "react";

import LogoAlphon from "@/components/logo-alphon";
import { Button } from "@/components/ui/button";

import HamburgerButton from "./burguer-button";

const Navbar: React.FC = () => {
    const [open, setOpen] = React.useState(false);

    const handleScrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        if (element) {
            const headerOffset = 80;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        }
        setOpen(false);
    };

    return (
        <>
            <header className="w-full max-w-7xl mx-auto flex items-center justify-between px-4 py-3 border-b bg-background fixed top-0 left-0 z-30 md:static md:bg-transparent md:border-0 transition-all">
                <LogoAlphon />
                <nav className="hidden md:flex gap-6 items-center">
                    <button onClick={() => handleScrollToSection('features')} className="text-sm font-medium hover:text-primary transition-colors">A plataforma</button>
                    <button onClick={() => handleScrollToSection('faq')} className="text-sm font-medium hover:text-primary transition-colors">FAQ</button>
                    <button onClick={() => handleScrollToSection('cta')} className="text-sm font-medium hover:text-primary transition-colors">Contato</button>
                    <Link href="/authentication">
                        <Button size="sm" variant="default">Comece já</Button>
                    </Link>
                </nav>
                <HamburgerButton open={open} onClick={() => setOpen((v) => !v)} className="md:hidden" />
            </header>
            {/* Mobile/Tablet Menu */}
            <div
                id="mobile-menu"
                className={`fixed top-[56px] left-0 w-full bg-background border-t border-border z-20 flex flex-col gap-2 p-6 transition-all duration-300 ease-in-out md:hidden ${open ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'
                    }`}
            >
                <nav aria-label="Menu principal" className="flex flex-col gap-2">
                    <button
                        onClick={() => handleScrollToSection('features')}
                        className="py-2 text-base font-medium hover:text-primary transition-colors text-left"
                    >
                        A plataforma
                    </button>
                    <button
                        onClick={() => handleScrollToSection('faq')}
                        className="py-2 text-base font-medium hover:text-primary transition-colors text-left"
                    >
                        FAQ
                    </button>
                    <button
                        onClick={() => handleScrollToSection('cta')}
                        className="py-2 text-base font-medium hover:text-primary transition-colors text-left"
                    >
                        Contato
                    </button>
                    <Link href="/authentication" onClick={() => setOpen(false)}>
                        <Button className="w-full mt-4">Comece já</Button>
                    </Link>
                </nav>
            </div>
        </>
    );
};

export default Navbar;