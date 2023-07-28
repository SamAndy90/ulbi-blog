import { PostItem } from "./PostItem";
import { PostData } from "@/services/services";

export interface PostListProps {
    posts: PostData[] | [];
    deletePost: (id: number) => void;
}

export function PostsList({ posts = [], deletePost }: PostListProps) {
    return (
        <>
            {posts.length ? (
                <div className="border w-full border-green-700 rounded p-4 flex flex-col gap-3">
                    {posts.map((post) => {
                        return <PostItem key={post.id} remove={deletePost} post={post} />;
                    })}
                </div>
            ) : (
                <h1 className="text-red-600 text-center font-bold text-4xl">POSTS NOT FOUND!</h1>
            )}
        </>
    );
}
