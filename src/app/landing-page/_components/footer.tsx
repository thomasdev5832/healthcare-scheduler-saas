import { Facebook, Instagram, Linkedin } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

import LogoAlphon from '@/components/logo-alphon';

const Footer: React.FC = () => {
    return (
        <footer className="w-full mt-20 pt-10">
            <div className="w-full md:w-7xl mx-auto px-4 md:px-0 flex flex-col md:flex-row items-center md:items-start justify-between gap-8">
                <div className="flex flex-col items-center md:items-start text-center md:text-left md:w-1/3">
                    {/* Coluna 1: Logo e Descrição */}
                    <div className="flex flex-col items-center md:items-start text-center md:text-left ">
                        <LogoAlphon />
                        <p className="text-sm text-muted-foreground max-w-xs">
                            Sua plataforma completa para gestão de clínicas e consultórios.
                            <br />
                            Simplifique, organize e cresça.
                        </p>
                    </div>
                    {/* Adicione ícones de redes sociais aqui se desejar */}
                    <div className="flex gap-4 mt-4">
                        <a href="#" aria-label="Facebook" className="text-muted-foreground/60 hover:text-primary transition-colors"><Facebook size={20} /></a>
                        <a href="#" aria-label="Instagram" className="text-muted-foreground/60 hover:text-primary transition-colors"><Instagram size={20} /></a>
                        <a href="#" aria-label="LinkedIn" className="text-muted-foreground/60 hover:text-primary transition-colors"><Linkedin size={20} /></a>
                    </div>
                </div>

                {/* Coluna 2: Links Rápidos */}
                <div className="flex flex-col items-center md:items-start md:w-1/3">
                    <h3 className="text-lg font-semibold text-foreground mb-4">Links Rápidos</h3>
                    <nav className="flex flex-col gap-2 text-center md:text-left">
                        <Link href="#features" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                            Funcionalidades
                        </Link>
                        <Link href="#about" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                            Sobre Nós
                        </Link>
                        <Link href="#contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                            Contato
                        </Link>
                        <Link href="#faq" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                            FAQ
                        </Link>
                        <Link href="/privacy-policy" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                            Política de Privacidade
                        </Link>
                        <Link href="/terms-of-service" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                            Termos de Serviço
                        </Link>
                    </nav>
                </div>

                {/* Coluna 3: Contato e Redes Sociais (placeholder) */}
                <div className="flex flex-col items-center md:items-start md:w-1/3">
                    <h3 className="text-lg font-semibold text-foreground mb-4">Entre em Contato</h3>
                    <div className="text-sm text-muted-foreground text-center md:text-left">
                        <p>Email: <a href="mailto:contato@alphon.com" className="hover:text-primary transition-colors">contato@alphonlabs.com</a></p>
                        <p>Telefone: (XX) XXXX-XXXX</p>
                        <p className="mt-2">Horário de Atendimento: Seg-Sex, 9h-18h</p>
                    </div>

                </div>
            </div>

            {/* Direitos Autorais */}
            <div className="w-full md:w-7xl mx-auto px-4 md:px-0 text-center mt-8 pt-8">
                <p className="text-xs text-muted-foreground">
                    © 2025 Alphon Labs. Todos os direitos reservados.
                </p>
            </div>
        </footer>
    );
};

export default Footer;