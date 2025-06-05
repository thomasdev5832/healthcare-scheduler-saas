import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqItems = [
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
        answer: "Aceitamos pagamentos via cartão, PIX, Bitcoin e algumas stablecoins.",
    },
    {
        question: "Existe garantia de satisfação?",
        answer:
            "Sim, 30 dias de total garantia. Se não ficar satisfeito, devolvemos todo o seu dinheiro.",
    }
]

function FaqSection() {
    return (
        <section id="faq" className="w-full max-w-4xl mx-auto mt-20 flex flex-col items-center space-y-8">
            <h2 className="text-4xl text-primary font-bold mb-6 text-center">Perguntas Frequentes</h2>
            <p className="text-muted-foreground text-lg text-center">
                Aqui estão algumas das perguntas mais comuns.
                <br />
                Se tiver outras dúvidas, não hesite em entrar em contato conosco!
            </p>
            <div className="w-full max-w-2xl">
                <Accordion type="single" collapsible className="space-y-4">
                    {faqItems.map((item, idx) => (
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
    );
}

export default FaqSection;