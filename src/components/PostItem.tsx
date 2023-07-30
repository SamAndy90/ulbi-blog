import { Button } from "@/common/Button";
import { PostData } from "@/services/services";
import Link from "next/link";

export type PostItemProps = {
    post: PostData;
    remove: (id: number) => void;
};

export function PostItem({ post, remove }: PostItemProps) {
    const { id, title, body } = post;

    return (
        <div className="border rounded p-4 flex items-center gap-3 justify-between border-green-400">
            <div>
                <strong>
                    {id}. {title}
                </strong>
                <p>{body}</p>
            </div>
            <div className="flex gap-2 items-center justify-end flex-wrap">
                <Link href={`posts/${id}`} className={"px-4 py-1 rounded bg-green-400 w-20"}>Open</Link>
                <Button onClick={() => id && remove(id)} additionalClasses="bg-red-700 text-white">Delete</Button>
            </div>
        </div>
    );
}
