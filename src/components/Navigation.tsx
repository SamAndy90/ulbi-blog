"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import clsx from "clsx";

export default function Navigation() {
    const session = useSession();
    const pathname = usePathname();

    return (
        <div className="flex items-center justify-between gap-4 ">
            <nav className="flex items-center justify-start gap-4 py-2 flex-wrap">
                {navLinks.map((link) => {
                    const isActive = pathname === link.path;
                    return (
                        <Link
                            key={link.path}
                            href={link.path}
                            className={clsx("border rounded-md px-4 py-1 font-semibold", {
                                "bg-white": isActive,
                            })}
                        >
                            {link.label}
                        </Link>
                    );
                })}
            </nav>
            <div className="flex gap-2 items-center justify-end flex-wrap sm:flex-nowrap ">
                {session?.data && (
                    <Link className="border rounded-md px-4 py-1 font-semibold " href="/profile">
                        PROFILE
                    </Link>
                )}
                {session?.data ? (
                    <Link
                        className="border rounded-md px-4 py-1 font-semibold whitespace-nowrap"
                        onClick={() => signOut({ callbackUrl: "/login" })}
                        href=""
                    >
                        Sign Out
                    </Link>
                ) : (
                    <Link
                        className="border rounded-md px-4 py-1 font-semibold"
                        href="/login"
                    >
                        Sign In
                    </Link>
                )}
            </div>
        </div>
    );
}

export const navLinks = [
    {
        label: "HOME",
        path: "/",
    },
    {
        label: "POSTS",
        path: "/posts",
    },
    {
        label: "ABOUT",
        path: "/about",
    },
    {
        label: "CONTACTS",
        path: "/contacts",
    },
];
