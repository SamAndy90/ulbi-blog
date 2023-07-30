"use client";

import { getPost } from "@/services/services";
import { Loader } from "@/components/Loader";
import { useQuery } from "@tanstack/react-query";
import { getAxiosDRFErrorMessage } from "@/helpers/axios";
import { Comments } from "../Comments";

export type PostDetailsProps = {
    slug: string;
};

export function PostDetails({ slug }: PostDetailsProps) {
    const {
        data: post,
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ["post", slug],
        queryFn: () => getPost(slug),
    });    

    if (isLoading) return <Loader />;
    if (isError)
        return (
            <h1 className="text-red-600 text-center text-4xl">{getAxiosDRFErrorMessage(error)}</h1>
        );

    return (
        <>
            <div className={"mx-auto w-full max-w-3xl border border-green-600 rounded-lg p-4"}>
                <h1 className={"font-bold text-xl"}>
                    <span>{post.id}</span>. {post.title}
                </h1>
                <hr className={"border-green-600 my-2"} />
                <p>{post.body}</p>
            </div>
            <Comments slug={slug} comments={post.comments} />
        </>
    );
}
