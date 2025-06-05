"use client";
import { BarChart3, Bell, Brain, Facebook, HandCoins, Headset, Instagram, Linkedin, LucideFileBadge, Sparkles, Stethoscope, Users, Video } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { PageContainer } from "@/components/ui/page-container";
import { PageDescription, PageHeader, PageHeaderContent, PageTitle } from "@/components/ui/page-container";
import { PageContent } from "@/components/ui/page-container";

function HamburgerButton({ open, ...props }: { open: boolean } & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      aria-label={open ? "Fechar menu" : "Abrir menu"}
      aria-expanded={open}
      aria-controls="mobile-menu"
      className="md:hidden transition"
      {...props}
    >
      <svg width="30" height="30" viewBox="0 0 24 24" fill="none" className="block" aria-hidden="true">
        <rect
          x="3"
          y="6"
          width="20"
          height="1.5"
          rx="1"
          className={`transition-all duration-300 origin-center ${open ? 'rotate-45 translate-y-[5px]' : ''}`}
          fill="currentColor"
        />
        <rect
          x="3"
          y="12"
          width="20"
          height="1.5"
          rx="1"
          className={`transition-all duration-300 origin-center ${open ? 'opacity-0' : 'opacity-100'}`}
          fill="currentColor"
        />
        <rect
          x="3"
          y="18"
          width="20"
          height="1.5"
          rx="1"
          className={`transition-all duration-300 origin-center ${open ? '-rotate-45 translate-y-[-3px]' : ''}`}
          fill="currentColor"
        />
      </svg>
    </button>
  );
}

const features = [
  {
    icon: <Brain size={32} />,
    title: "Agendamento Smart",
    description: "Otimize o tempo da sua equipe e evite conflitos de horários com nosso sistema de agendamento fácil e rápido.",
  },
  {
    icon: <Users size={32} />,
    title: "Gestão de Pacientes",
    description: "Tenha o histórico completo dos pacientes, prontuários e informações centralizadas em um só lugar.",
  },
  {
    icon: <BarChart3 size={32} />,
    title: "Relatórios e Indicadores",
    description: "Acompanhe resultados, produtividade e indicadores essenciais para a gestão eficiente da clínica.",
  },
  {
    icon: <Stethoscope size={32} />,
    title: "Gestão de Profissionais",
    description: "Gerencie facilmente a agenda, especialidades e informações dos profissionais da clínica em um só lugar.",
  },
  {
    icon: <Headset size={32} />,
    title: "Suporte Premium",
    description: "Conte com atendimento especializado e consultoria para potencializar a gestão e o crescimento da sua clínica.",
  },
  {
    icon: <Bell size={32} />,
    title: "Lembretes Automáticos",
    description: "Reduza faltas com envio automático de lembretes de consultas por SMS, WhatsApp ou e-mail.",
    soon: true,
  },
  {
    icon: <Video size={32} />,
    title: "Telemedicina Integrada",
    description: "Realize atendimentos online com segurança, mantendo o histórico e registros integrados ao sistema.",
    soon: true,
  },
  {
    icon: <HandCoins size={32} />,
    title: "Gestão Financeira",
    description: "Controle receitas, despesas e fluxo de caixa da clínica de forma simples e integrada.",
    soon: true,
  },
  {
    icon: <LucideFileBadge size={32} />,
    title: "Prontuário Eletrônico",
    description: "Registre e acesse informações clínicas detalhadas com segurança e praticidade.",
    soon: true,
  },
];

function FeaturesSection() {
  return (
    <section
      id="features"
      className="w-full max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mt-10"
    >
      <div className="col-span-full text-center mb-8">
        <h2 className="text-3xl font-bold mb-2 text-primary">Funcionalidades</h2>
        <p className="text-muted-foreground text-lg">
          Simplifique a rotina da sua clínica com tecnologia de ponta: agende consultas, gerencie pacientes e acompanhe resultados em uma única plataforma intuitiva e segura.
        </p>
      </div>
      {features.map((feature) => (
        <div
          key={feature.title}
          className="bg-card rounded-xl border shadow-sm p-6 flex flex-col items-start text-left transition-transform hover:-translate-y-1 hover:shadow-lg group cursor-pointer relative"
        >
          {feature.soon && (
            <span className="absolute top-4 right-4 bg-primary/20 text-primary text-[9px] font-semibold px-2 py-1 rounded-lg shadow-sm z-10">
              Em breve
            </span>
          )}
          <span className="mb-3 text-primary">
            <i>{feature.icon}</i>
          </span>
          <h2 className="text-xl font-semibold mb-2 text-left">{feature.title}</h2>
          <p className="text-muted-foreground mb-4 text-left">{feature.description}</p>
        </div>
      ))}
    </section>
  );
}

export default function Home() {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <header className="w-full md:w-7xl mx-auto md:px-0 flex items-center justify-between px-4 py-3 border-b bg-background fixed top-0 left-0 z-30 md:static md:bg-transparent md:border-0">
        <div className="flex items-center justify-center">
          <Image
            src="/logo-alphon-health-no-bg.png"
            alt="Logo Alphon"
            width={50}
            height={50}
            className=""
          />
          <p
            className="text-3xl font-bold -tracking-tight bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent"
          >
            Alphon
          </p>
        </div>
        <nav className="hidden md:flex gap-6 items-center">
          <Link href="#features" className="text-sm font-medium hover:text-primary transition-colors">Funcionalidades</Link>
          <Link href="#about" className="text-sm font-medium hover:text-primary transition-colors">Sobre</Link>
          <Link href="#contact" className="text-sm font-medium hover:text-primary transition-colors">Contato</Link>
          <Link href="#faq" className="text-sm font-medium hover:text-primary transition-colors">FAQ</Link>
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
            href="#features"
            className="py-2 text-base font-medium hover:text-primary transition-colors"
            onClick={() => setOpen(false)}
          >
            Funcionalidades
          </Link>
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
          <PageHeader>
            <PageHeaderContent>
              <div className="w-full flex flex-col gap-10 md:flex-row items-center justify-center pb-10 md:items-center md:justify-center min-h-[70vh] md:min-h-[60vh]">
                {/* Coluna 1: texto e CTA */}
                <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left order-1 space-y-4">
                  <div
                    className="flex items-center justify-center md:justify-start text-primary text-sm border border-primary/30 rounded-lg px-3 py-1 mb-4 bg-primary/10 animate-bounce-smooth"
                  >
                    <span className="font-semibold tracking-wider">
                      <Sparkles className="inline-block mr-1" size={16} />
                      Software premium para gestão em saúde
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
                  <div className="space-y-2">
                    <PageTitle>
                      Gerencie sua clínica de forma <span className="text-primary">simples</span> e <span className="text-primary">eficiente</span>
                    </PageTitle>
                    <PageDescription>
                      Plataforma moderna para agendamento inteligente, gestão de pacientes e aumento da produtividade em clínicas e consultórios.
                    </PageDescription>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center md:justify-start">
                    <Link href="/authentication">
                      <Button size="lg" className="px-8 py-6 text-lg w-full sm:w-auto">Falar com especialista</Button>
                    </Link>
                    <Link href="#features">
                      <Button size="lg" variant="outline" className="px-8 py-6 text-lg w-full sm:w-auto">Ver funcionalidades</Button>
                    </Link>
                  </div>
                </div>
                {/* Coluna 2: imagem ilustrativa */}
                <div className="flex-1 flex items-center justify-center mb-8 md:mb-0 order-2 md:order-1">
                  <Image src="/globe.svg" alt="Ilustração clínica" width={340} height={340} className="w-full max-w-xs md:max-w-sm h-auto" />
                </div>
              </div>
            </PageHeaderContent>
          </PageHeader>
          <PageContent>
            {/* Seção de Funcionalidades */}
            <FeaturesSection />

            <section className="w-full max-w-4xl mx-auto mt-20 flex flex-col items-center space-y-4">
              <h2 className="text-3xl text-primary font-bold mb-6 text-center">Reconhecimento</h2>
              <p className="text-muted-foreground text-lg text-center">
                Somos orgulhosamente participantes de programas de aceleração que impulsionam startups inovadoras em todo o mundo
              </p>
              <Image src="/google-startups.png" alt="Google for Startups" width={200} height={200} className="shadow-lg rounded-md hover:shadow-2xl transition duration-300" />
              <p className="text-muted-foreground font-light mt-2">Ser parte destes programas nos permite oferecer soluções mais robustas e escaláveis para nossos clientes.</p>
            </section>

            {/* Seção de FAQ */}
            <section id="faq" className="w-full max-w-4xl mx-auto mt-20 flex flex-col items-center space-y-4">
              <h2 className="text-3xl text-primary font-bold mb-6 text-center">Perguntas Frequentes (FAQ)</h2>
              <p className="text-muted-foreground text-lg text-center">
                Aqui estão algumas das perguntas mais comuns sobre a plataforma Alphon.
                <br />
                Se você tiver outras dúvidas, não hesite em entrar em contato conosco!
              </p>
              <div className="w-full max-w-2xl">
                <Accordion type="single" collapsible className="space-y-4">
                  {[
                    {
                      question: "O que é a plataforma Alphon?",
                      answer:
                        "A Alphon é uma plataforma digital para gestão de clínicas e consultórios, oferecendo agendamento inteligente, gestão de pacientes, relatórios, suporte consultivo e muito mais.",
                    },
                    {
                      question: "Preciso instalar algum programa?",
                      answer:
                        "Não! A Alphon é 100% online, basta acessar pelo navegador de qualquer dispositivo conectado à internet.",
                    },
                    {
                      question: "Como funciona o suporte?",
                      answer:
                        "Oferecemos suporte premium consultivo, com atendimento especializado para ajudar sua clínica a crescer e tirar dúvidas sobre o uso da plataforma.",
                    },
                    {
                      question: "Os dados estão seguros?",
                      answer:
                        "Sim, utilizamos as melhores práticas de segurança e criptografia para proteger todas as informações da sua clínica e dos seus pacientes.",
                    },
                    {
                      question: "Posso testar a plataforma gratuitamente?",
                      answer:
                        "Sim! Você pode criar sua conta grátis e experimentar as funcionalidades disponíveis.",
                    },
                    {
                      question: "Quais tipos de clínicas podem usar a Alphon?",
                      answer:
                        "A Alphon é ideal para clínicas médicas, odontológicas, psicológicas, fisioterapia, consultórios individuais e multiprofissionais, entre outros estabelecimentos de saúde.",
                    },
                    {
                      question: "Posso acessar a plataforma pelo celular?",
                      answer:
                        "Sim, a Alphon é responsiva e pode ser acessada de qualquer dispositivo, incluindo smartphones e tablets.",
                    },
                    {
                      question: "Quais formas de pagamento são aceitas?",
                      answer: "Aceitamos pagamentos via cartão ou PIX.",
                    },
                    {
                      question: "Existe garantia de satisfação?",
                      answer:
                        "Sim! Você tem 30 dias para testar a plataforma. Se não ficar satisfeito, devolvemos todo o seu dinheiro.",
                    },
                  ].map((item, idx) => (
                    <AccordionItem
                      key={item.question}
                      value={`item-${idx + 1}`}
                      className="rounded-lg border border-border bg-muted/40 shadow-sm overflow-hidden"
                    >
                      <AccordionTrigger className="px-5 py-4 text-base font-semibold hover:bg-muted/60 transition-colors flex items-center gap-2">

                        {item.question}
                      </AccordionTrigger>
                      <AccordionContent className="px-6 pb-5 pt-2 text-muted-foreground text-base leading-relaxed bg-background">
                        {item.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </section>

            {/* Seção de CTA */}
            <section className="w-full max-w-3xl mx-auto mt-20 flex flex-col items-center space-y-4 bg-gradient-to-br from-primary/10 to-blue-50 rounded-2xl shadow-lg py-12 px-6 md:px-16 border border-primary/20">
              <h3 className="text-3xl md:text-4xl font-extrabold text-primary mb-4 text-center">
                Transforme sua clínica com uma plataforma moderna e intuitiva
              </h3>
              <p className="text-lg md:text-xl text-muted-foreground text-center max-w-2xl">
                Organize e reduza tarefas manuais e atenda melhor seus pacientes. Simplifique processos e foque no que importa: o cuidado com a saúde.
              </p>
              <Link href="/authentication" passHref>
                <Button
                  size="lg"
                  className="px-10 py-6 text-lg font-semibold shadow-md bg-gradient-to-r from-primary to-blue-500 hover:from-blue-500 hover:to-primary hover:scale-105 hover:shadow-lg transition-all duration-200"
                >
                  Falar com especialista
                </Button>
              </Link>
              <span className="mt-4 text-xs text-muted-foreground text-center">
                Teste sem custos. Suporte consultivo incluso desde o primeiro acesso.
              </span>
            </section>

            { /* Footer */}
            <footer className="w-full mt-20 pt-10">
              <div className="w-full md:w-7xl mx-auto px-4 md:px-0 flex flex-col md:flex-row items-center md:items-start justify-between gap-8">
                <div className="flex flex-col items-center md:items-start text-center md:text-left md:w-1/3">
                  {/* Coluna 1: Logo e Descrição */}
                  <div className="flex flex-col items-center md:items-start text-center md:text-left ">
                    <p className="text-2xl font-bold -tracking-tight bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent mb-2">
                      Alphon
                    </p>
                    <p className="text-sm text-muted-foreground max-w-xs">
                      Sua plataforma completa para gestão de clínicas e consultórios.
                      <br />
                      Simplifique, organize e cresça.
                    </p>
                  </div>
                  {/* Adicione ícones de redes sociais aqui se desejar */}
                  <div className="flex gap-4 mt-4">
                    <a href="#" aria-label="Facebook" className="text-muted-foreground hover:text-primary transition-colors"><Facebook size={20} /></a>
                    <a href="#" aria-label="Instagram" className="text-muted-foreground hover:text-primary transition-colors"><Instagram size={20} /></a>
                    <a href="#" aria-label="LinkedIn" className="text-muted-foreground hover:text-primary transition-colors"><Linkedin size={20} /></a>
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
                    <p>Email: <a href="mailto:contato@alphon.com" className="hover:text-primary transition-colors">contato@alphon.com</a></p>
                    <p>Telefone: (XX) XXXX-XXXX</p>
                    <p className="mt-2">Horário de Atendimento: Seg-Sex, 9h-18h</p>
                  </div>

                </div>
              </div>

              {/* Direitos Autorais */}
              <div className="w-full md:w-7xl mx-auto px-4 md:px-0 text-center mt-8 pt-8 border-t border-border">
                <p className="text-sm text-muted-foreground">
                  © {new Date().getFullYear()} Alphon. Todos os direitos reservados.
                </p>
              </div>
            </footer>

          </PageContent>
        </PageContainer >
      </main >
    </>
  );
}
