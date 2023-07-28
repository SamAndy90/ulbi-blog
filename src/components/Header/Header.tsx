import { Container } from "@/common";
import Navigation from "@/components/Navigation";

export function Header() {
    return (
        <header className="bg-slate-400 p-4">
            <Container>
                <Navigation/>
            </Container>
        </header>
    );
}
