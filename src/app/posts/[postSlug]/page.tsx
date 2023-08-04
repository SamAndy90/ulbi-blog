import { Container } from "@/common";
import { Metadata } from "next";
import { PostDetails } from "@/components/PostDetails";

export const metadata: Metadata = {
    title: "Post",
};

export type PostProps = {
    params: { postSlug: string };
};

export default function Post({ params: { postSlug } }: PostProps) {
    return (
        <section>
            <Container>
                <div className={"p-4 flex flex-col gap-2"}>
                    <PostDetails slug={postSlug} />
                </div>
            </Container>
        </section>
    );
}