import { usePagination } from "@/hooks/usePagination";
import { PageBtns } from "./PageBtns";

export type PaginationProps = {
    totalPages: number;
    page: number;
    changePage: (p: number) => void;
};

export function Pagination({ totalPages, page, changePage }: PaginationProps) {
    const pages = usePagination(totalPages);
    if (pages?.length <= 1) return;

    return (
        <div className={"flex gap-1 justify-center items-center"}>
            {pages?.map((p) => {
                return (
                    <PageBtns page={page} onClick={() => changePage(p)} key={p}>
                        {p}
                    </PageBtns>
                );
            })}
        </div>
    );
}
