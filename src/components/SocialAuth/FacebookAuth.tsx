"use client";

import { Button } from "@/common";
import { FacebookIcon } from "./icon";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";

export function FacebookAuth() {
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callbackUrl") || "/profile";

    return (
        <Button
            onClick={() => signIn("facebook", { callbackUrl })}
            additionalClasses="flex items-center gap-2 bg-white justify-center border"
        >
            <FacebookIcon className="h-6 w-6" />
            <span className="text-center">SignIn with Facebook</span>
        </Button>
    );
}
