"use client";

import { Button } from "@/common/Button";
import { Input } from "@/common/Input";
import { addComment } from "@/services/services";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { defaultInstance } from "@/helpers/zod";
import { useSession } from "next-auth/react";

const commentSchema = z.object({
    text: z
        .string()
        .min(10, { message: "Text must be at least 10 characters" })
        .max(100, { message: "Text must be not more than 30 characters" })
        .default(""),
});

export type CommentFormData = z.infer<typeof commentSchema>;

export type CommentFormProps = {
    slug: number;
    showForm: (v: boolean) => void;
};

export function CommentForm({ slug, showForm }: CommentFormProps) {
    const client = useQueryClient();
    const session = useSession();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<CommentFormData>({
        defaultValues: defaultInstance<typeof commentSchema>(commentSchema),
        resolver: zodResolver(commentSchema),
    });

    const { mutate, isLoading } = useMutation({
        mutationFn: addComment,
        onSuccess: () => {
            client.invalidateQueries({ queryKey: ["post", slug] });
            reset(defaultInstance<typeof commentSchema>(commentSchema));
            showForm(false);
        },
    });

    const onFormSubmit = (data: CommentFormData) => {
        const comment = {
            postId: slug,
            email: session.data?.user?.email || "",
            text: data.text,
        };
        mutate(comment);
    };

    return (
        <form
            onSubmit={handleSubmit(onFormSubmit)}
            name="createPostForm"
            className="flex flex-col gap-1"
        >
            <Input register={{ ...register("text") }} placeholder="Enter your comment..." />
            {errors.text?.message && (
                <div className="text-red-500">
                    {errors.text?.message || "Something went wrong!"}
                </div>
            )}
            <Button loading={isLoading} type={"submit"}>
                Send
            </Button>
        </form>
    );
}
