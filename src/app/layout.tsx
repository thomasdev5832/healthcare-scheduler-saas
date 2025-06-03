import "./globals.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { NuqsAdapter } from 'nuqs/adapters/next/app'

import { Toaster } from "@/components/ui/sonner";
import { ReactQueryProvider } from "@/providers/react-query-provider";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});


export const metadata: Metadata = {
  title: "Alphon Health",
  description: "Gerencie sua clínica de forma simples e eficiente",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`font-sans ${inter.className} antialiased`}
      >
        <ReactQueryProvider>
          <NuqsAdapter>
            {children}
          </NuqsAdapter>
          <Toaster position="bottom-center" richColors theme="light" />
        </ReactQueryProvider>
      </body>
    </html>
  );
}
