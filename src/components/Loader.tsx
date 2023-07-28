import { CgSpinnerTwo } from "react-icons/cg";

export function Loader() {
    return (
        <div className={"flex items-center justify-center"}>
            <CgSpinnerTwo className={"h-6 w-6 animate-spin text-slate-400"} />
        </div>
    );
}
