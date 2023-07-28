import { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import { Header } from "@/components/Header";
import { Providers } from "@/components/Providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: {
        default: "Home | Ulbi Blog",
        template: "%s | Ulbi Blog",
    },
    description: "Ulbi Blog practicing", 
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" className={inter.className}>
            <body>
                <Providers>
                    <Header />
                    <main>{children}</main>
                    <ReactQueryDevtools initialIsOpen={false} position="bottom-right"/>
                </Providers>
            </body>
        </html>
    );
}
