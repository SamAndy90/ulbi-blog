"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import { AuthContextProvider } from "@/context/AuthContext";

export const Providers = ({ children }: { children: React.ReactNode }) => {
    const queryClient = new QueryClient();
    return (
        <SessionProvider>
            <AuthContextProvider>
                <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
            </AuthContextProvider>
        </SessionProvider>
    );
};
