import { Loader } from "@/components/Loader";
import clsx from "clsx";

export interface ButtonProps {
    children: React.ReactNode;
    type?: "button" | "submit";
    additionalClasses?: string;
    isBig?: boolean;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    loading?: boolean;
    disabled?: boolean;
}

export function Button(props: ButtonProps) {
    const { children, additionalClasses, type = "button", isBig = false, onClick, loading, disabled } = props;

    return (
        <button
            type={type}
            disabled={loading || disabled}
            className={clsx("px-4 py-1 rounded bg-green-400", additionalClasses, {
                "px-16 py-4": isBig,
            })}
            onClick={onClick}
        >
            {loading ? <Loader/> : children}
        </button>
    );
}
