import Image from "next/image";
import React from "react";

const Gratitude: React.FC = () => {
    return (
        <section className="w-full max-w-4xl mx-auto mt-20 flex flex-col items-center space-y-4">
            <h2 className="text-3xl text-primary font-bold mb-6 text-center">Reconhecimento</h2>
            <p className="text-muted-foreground text-lg text-center">
                Somos orgulhosamente participantes de programas de aceleração que impulsionam startups inovadoras em todo o mundo
            </p>
            <Image src="/google-startups.png" alt="Google for Startups" width={200} height={200} className="shadow-lg rounded-md hover:shadow-2xl transition duration-300" />
            <p className="text-muted-foreground font-light mt-2">Ser parte destes programas nos permite oferecer soluções mais robustas e escaláveis para nossos clientes.</p>
        </section>
    );
};

export default Gratitude;