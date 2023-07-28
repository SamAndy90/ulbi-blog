export interface ContainerProps {
    children: React.ReactNode;
}

export function Container({ children }: ContainerProps) {
    return <div className="mx-auto px-4 max-w-5xl container">{children}</div>;
}
