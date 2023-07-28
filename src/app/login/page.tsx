import { Container } from "@/common";
import { GoogleAuth } from "@/components/SocialAuth";
import { FacebookAuth } from "@/components/SocialAuth/FacebookAuth";
import { AuthForm } from "@/components/LoginForm";

export const metadata = {
    title: "Login",
};

export default function Login() {
    return (
        <section>
            <Container>
                <div className="flex flex-col gap-2 max-w-xl mx-auto p-4">
                    <h1 className="text-4xl font-bold text-center">LOGIN</h1>
                    <AuthForm />
                    <p className="text-center">or</p>
                    <GoogleAuth />
                    <FacebookAuth />
                </div>
            </Container>
        </section>
    );
}
