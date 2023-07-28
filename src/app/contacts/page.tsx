import { Container } from "@/common";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Contacts",
};

export default function Contacts() {
    return (
        <section>
            <Container>
                <h1 className="text-4xl font-bold text-center py-8">CONTACTS PAGE</h1>
            </Container>
        </section>
    );
}
