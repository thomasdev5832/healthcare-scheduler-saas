import Image from "next/image";
import React from "react";

const LogoAlphon: React.FC = () => (
    <div className="flex flex-row items-center justify-center">
        <Image
            src="/logo-alphon-health-no-bg.png"
            alt="Logo Alphon"
            width={50}
            height={50}
            className="-mr-1.5"
        />
        <p
            className="text-3xl font-bold -tracking-tight bg-gradient-to-r from-sky-600 to-sky-500 bg-clip-text text-transparent"
        >
            Alphon
        </p>
    </div>
);

export default LogoAlphon;