"use client";
import { Input } from "@/common";

import { useForm, SubmitHandler } from "react-hook-form";

export interface FormValues {
    firstName: string;
    userEmail: string;
    userPass: string;
}

export default function Form() {
    const {
        formState: { errors },
        register,
        handleSubmit,
    } = useForm<FormValues>({
        mode: "onBlur",
    });


    const handler: SubmitHandler<FormValues> = (data) => console.log(data);

    return (
        <form
            onSubmit={handleSubmit(handler)}
            className="mx-auto max-w-2xl p-4 flex flex-col gap-2"
        >
            <input {...register("firstName")} type="text" className="border rounded-md" />
            {errors.firstName && <span>This field is required</span>}
            <input {...register("userEmail")} type="email" className="border rounded-md" />
            {/* <Input type="password" fieldName="userPass" register={register} required={true} /> */}

            <button type="submit" className="border rounded-md bg-white">
                Button
            </button>
        </form>
    );
}
