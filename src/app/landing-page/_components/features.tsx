import { BarChart3, Bell, Brain, HandCoins, Headset, LucideFileBadge, Stethoscope, Users, Video } from "lucide-react";


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
        title: "Suporte Consultivo",
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
                <h2 className="text-4xl font-bold mb-2 text-primary">Tudo em um só lugar</h2>
                <p className="text-muted-foreground text-xl">
                    Uma plataforma criada para simplificar o agendamento, melhorar a experiência dos pacientes e aumentar o potencial da sua clínica.
                </p>
            </div>
            {features.map((feature) => (
                <div
                    key={feature.title}
                    className="bg-card rounded-xl border shadow-sm shadow-primary/20 p-6 flex flex-col items-start text-left transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg group cursor-pointer relative"
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

            <div className="col-span-full mt-6 text-center">
                <p className="text-muted-foreground text-md">
                    Novas funcionalidades estão a caminho!
                    <br />
                    Estamos em constante evolução, nossa plataforma foi desenvolvida a partir das necessidades reais dos clientes.
                    <br />
                    Inovação e eficiência são nossas prioridades.
                </p>
            </div>
        </section>
    );
}

export default FeaturesSection;