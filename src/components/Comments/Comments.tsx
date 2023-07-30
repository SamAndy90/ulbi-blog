"use client";

import { Button } from "@/common";
import { CommentForm } from "../CommentForm";
import { CommentData } from "@/services/services";
import { delComment } from "@/services/services";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export type CommentsProps = {
    slug: string;
    comments?: CommentData[];
};

export function Comments({ slug, comments = [] }: CommentsProps) {
    const [showForm, setShowForm] = useState(false);
    const client = useQueryClient();

    const removeComment = useMutation({
        mutationFn: delComment,
        onSuccess: () => {
            client.invalidateQueries({ queryKey: ["post", slug] });
        },
    });

    return (
        <div
            className={
                "flex flex-col gap-2 w-full mx-auto max-w-3xl border border-green-600 rounded-lg p-4"
            }
        >
            <div className="flex justify-between items-center flex-wrap gap-3">
                <h2 className={"font-bold text-xl"}>Comments:</h2>
            </div>
            {comments.map((comment) => {
                const { id, email, text } = comment;
                return (
                    <div
                        className="border border-green-600 rounded-sm p-2 flex justify-between gap-3 items-end"
                        key={id}
                    >
                        <div>
                            <div className="font-semibold text-base">{email}</div>
                            <p>{text}</p>
                        </div>
                        <Button
                            onClick={() => id && removeComment.mutate(id)}
                            loading={removeComment.isLoading}
                            additionalClasses="bg-red-700 text-white"
                        >
                            Delete
                        </Button>
                    </div>
                );
            })}
            {showForm ? (
                <CommentForm slug={Number(slug)} showForm={setShowForm} />
            ) : (
                <div className="text-right">
                    <Button onClick={() => setShowForm(true)}>Add Comment</Button>
                </div>
            )}
        </div>
    );
}
