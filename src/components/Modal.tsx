import clsx from "clsx";

export interface ModalProps {
    children: React.ReactNode;
    visible: boolean;
    setVisible: (value: boolean) => void;
}

export function Modal({ children, visible, setVisible }: ModalProps) {
    return (
        <div
            onClick={() => setVisible(false)}
            className={clsx("fixed top-0 left-0 right-0 bottom-0 bg-slate-900/50", {
                "flex items-center justify-center": visible,
                "hidden": !visible,
            })}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className="min-w-[400px] bg-white p-4 rounded-lg"
            >
                {children}
            </div>
        </div>
    );
}
