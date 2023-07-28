import clsx from "clsx";
import { useState } from "react";

export interface InputProps {
    type?: string;
    value?: string;
    placeholder?: string;
    additionalClasses?: string;
    onChange?: (value: string) => void;
    register?: any;
}

export function Input({
    type = "text",
    placeholder,
    value,
    additionalClasses,
    register,
    onChange,
}: InputProps) {

    return (
        <input
            value={value}
            type={type}
            placeholder={placeholder}
            onChange={onChange ? (e) => onChange(e.target.value) : undefined}
            className={clsx(
                "px-2 border rounded h-9 outline-1 outline-slate-700",
                additionalClasses
            )}
            {...register}
        />
    );
}
