"use client";

import { Button } from "@/common";
import { GoogleIcon } from "./icon";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";

export function GoogleAuth() {
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callbackUrl") || "/profile";

    return (
        <Button
            onClick={() => signIn("google", { callbackUrl })}
            additionalClasses="flex items-center gap-2 bg-white justify-center border"
        >
            <GoogleIcon className="h-6 w-6" />
            <span className="text-center">SignIn with Google</span>
        </Button>
    );
}
