import { Button } from "@/common/Button";
import { Input } from "@/common/Input";
import { addPost } from "@/services/services";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { defaultInstance } from "@/helpers/zod";

const postSchema = z.object({
    title: z.string().min(2, { message: "Title must be at least 2 characters" }).default(""),
    body: z.string().min(2, { message: "Body must be at least 2 characters" }).default(""),
});

export type PostFormData = z.infer<typeof postSchema>;

export type PostFormProps = {
    closeModal: (v: boolean) => void;
};

export function PostForm({ closeModal }: PostFormProps) {
    const client = useQueryClient();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<PostFormData>({
        defaultValues: defaultInstance<typeof postSchema>(postSchema),
        resolver: zodResolver(postSchema),
    });

    const { mutate, isLoading } = useMutation({
        mutationFn: addPost,
        onSuccess: () => {
            client.invalidateQueries({ queryKey: ["posts"] });
            reset(defaultInstance<typeof postSchema>(postSchema));
            closeModal(false);
        },
    });

    const onFormSubmit = (data: PostFormData) => {
        mutate(data);
    };

    return (
        <form
            onSubmit={handleSubmit(onFormSubmit)}
            name="createPostForm"
            className="flex flex-col gap-1"
        >
            <Input register={{ ...register("title") }} placeholder="Enter Title" />
            {errors.title?.message && (
                <div className="text-red-500">
                    {errors.title?.message || "Something went wrong!"}
                </div>
            )}
            <Input register={{ ...register("body") }} placeholder="Enter Description" />
            {errors.body?.message && (
                <div className="text-red-500">
                    {errors.body?.message || "Something went wrong!"}
                </div>
            )}
            <Button loading={isLoading} type={"submit"}>
                Set Post
            </Button>
        </form>
    );
}
