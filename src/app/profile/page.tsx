import { Container } from "@/common";
import { getServerSession } from "next-auth/next";
import { authConfig } from "@/configs/auth";
import Image from "next/image";

export default async function Profile() {
    const session = await getServerSession(authConfig);

    return (
        <section>
            <Container>
                <div className="text-ceter">
                    <h1>{session?.user?.name || session?.user?.email}</h1>
                    {session?.user?.image && (
                        <Image
                            src={session.user.image}
                            alt="logo"
                            width={100}
                            height={100}
                            className="rounded-full"
                        />
                    )}
                </div>
            </Container>
        </section>
    );
}
