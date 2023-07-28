"use client";

import { getPost, getPostComments } from "@/services/services";
import { Loader } from "@/components/Loader";
import { Container } from "@/common";
import { Metadata } from "next";
import { useQuery } from "@tanstack/react-query";

export type PostProps = {
    params: { postSlug: string };
};

const metadata: Metadata = {
    title: "Post",
};

export default function Post({ params: { postSlug } }: PostProps) {
    const {
        data: post,
        isLoading: isPostsLoading,
        isError: isPostError,
        error: postError,
        isSuccess: postIsSuccess,
    } = useQuery({
        queryKey: ["post"],
        queryFn: () => getPost(postSlug),
    });

    const {
        data: comments,
        isLoading: isCommentsLoading,
        isError: isCommentsError,
        error: commentsError,
        isSuccess: commentsIsSuccess,
    } = useQuery({
        queryKey: ["comments"],
        queryFn: () => getPostComments(postSlug),
    });

    if (isPostError) {
        return <h1 className={"text-3xl text-red-700 text-center"}>Post Downloading Failed</h1>;
    }

    return (
        <section>
            <Container>
                <div className={"p-4 flex flex-col gap-2"}>
                    {isPostsLoading && <Loader />}
                    {postIsSuccess && (
                        <div
                            className={
                                "mx-auto w-full max-w-3xl border border-green-600 rounded-lg p-4"
                            }
                        >
                            <h1 className={"font-bold text-xl"}>
                                <span>{post.id}</span>. {post.title}
                            </h1>
                            <hr className={"border-green-600 my-2"} />
                            <p>{post.body}</p>
                        </div>
                    )}

                    <div
                        className={
                            "flex flex-col gap-2 w-full mx-auto max-w-3xl border border-green-600 rounded-lg p-4"
                        }
                    >
                        {isCommentsError ? (
                            <h1 className={"text-3xl text-red-700"}>Post Downloading Failed</h1>
                        ) : (
                            <>
                                <h2 className={"font-bold text-xl"}>Comments:</h2>
                                {isCommentsLoading && <Loader />}
                                {commentsIsSuccess &&
                                    comments.map((comment) => {
                                        return (
                                            <div
                                                className="border border-green-600 rounded-sm p-2"
                                                key={comment.name}
                                            >
                                                <div className="font-semibold text-base">
                                                    {comment.postId}. {comment.email}
                                                </div>
                                                <p>{comment.body}</p>
                                            </div>
                                        );
                                    })}
                            </>
                        )}
                    </div>
                </div>
            </Container>
        </section>
    );
}

// export default function Post() {
//     const [post, setPost] = useState<PostData | null>(null);
//     const param = useParams();
//     const [fetchPost, isLoading, error] = useFetching(async () => {
//         const response = await getPostWithId(param.id);
//         setPost(response.data);
//     });

//     useEffect(() => {
//         fetchPost();
//     }, []);

//     return (
//         <div>
//             <span>{post?.id}</span>
//             <h1>{post?.title}</h1>
//             <p>{post?.body}</p>
//         </div>
//     );
// }
