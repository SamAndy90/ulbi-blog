import clsx from "clsx";

export type PageBtnsProps = {
    children: React.ReactNode;
    page: number;
    onClick: (e: React.MouseEvent<HTMLSpanElement>) => void;
};

export function PageBtns({ children, onClick, page }: PageBtnsProps) {
    return (
        <span
            onClick={onClick}
            className={clsx("w-10 border rounded-md text-center", {
                "border-green-600": page !== children,
                "border-yellow-500 font-bold": page === children,
            })}
        >
            {children}
        </span>
    );
}
