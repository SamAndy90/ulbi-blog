import { useMemo } from "react";

export const usePagination = (total: number): number[] => {
    return useMemo(() => {
        let arr = [];
        for (let i = 1; i <= total; i++) {
            arr.push(i)
        }
        return arr
    }, [total])
}