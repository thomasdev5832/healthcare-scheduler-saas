"use client"

import React from "react";

import { PageContainer } from "@/components/ui/page-container";
import { PageContent } from "@/components/ui/page-container";

import CtaSection from "./_components/cta";
import FaqSection from "./_components/faq";
import FeaturesSection from "./_components/features";
import Footer from "./_components/footer";
import Hero from "./_components/hero";
import Navbar from "./_components/navbar";


export default function LandingPage() {


    return (
        <>
            <Navbar />
            <main className="md:w-7xl mx-auto px-4 md:px-0">
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
