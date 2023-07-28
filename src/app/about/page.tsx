import { Container } from "@/common";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "About",
};

export default function About() {

    return (
        <section>
            <Container>
                <h1 className="text-4xl font-bold text-center py-8">ABOUT PAGE</h1>
            </Container>
        </section>
    );
}
