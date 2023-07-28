"use client";

import { Button, Input } from "@/common";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { defaultInstance } from "@/helpers/zod";
import { useState } from "react";

const loginSchema = z.object({
    email: z.string().email("Email format isn`t valid").default(""),
    password: z.string().min(8, { message: "Password must be at least 8 characters" }).default(""),
});

export type FormValues = z.infer<typeof loginSchema>;

export function AuthForm() {
    const router = useRouter();
    const [authError, setAuthError] = useState("");

    const {
        register,
        reset,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<FormValues>({
        defaultValues: defaultInstance<typeof loginSchema>(loginSchema),
        resolver: zodResolver(loginSchema),
    });

    const onFormSubmit = async (data: FormValues) => {
        const res = await signIn("credentials", {
            email: data.email,
            password: data.password,
            redirect: false,
        });
        if (!!res?.error) setAuthError(res.error);

        if (res?.ok && !res.error) {
            reset(defaultInstance<typeof loginSchema>(loginSchema));
            router.push("/profile");
            setAuthError("");
        }
    };

    return (
        <form
            onSubmit={handleSubmit(onFormSubmit)}
            className={"flex flex-col gap-2 max-w-xl mx-auto w-full"}
        >
            <Input
                register={{ ...register("email") }}
                type="email"
                placeholder={"Enter your email"}
            />
            {errors.email?.message && (
                <div className="text-red-500">
                    {errors.email?.message || "Something went wrong!"}
                </div>
            )}
            <Input
                register={{ ...register("password") }}
                type="password"
                placeholder={"Enter your password"}
            />
            {errors.password?.message && (
                <div className="text-red-500">
                    {errors.password?.message || "Something went wrong!"}
                </div>
            )}
            {authError && <div className="text-red-500">{authError}</div>}
            <Button loading={isSubmitting} type="submit">
                Login
            </Button>
        </form>
    );
}
