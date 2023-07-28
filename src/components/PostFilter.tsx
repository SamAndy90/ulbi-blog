import { Input } from "@/common";
import { Select } from "@/common";
import { Filter } from "@/app/posts/page";
import { SortType } from "@/app/posts/page";


export type PostFilterProps = {
    filter: Filter;
    setFilter: ({}: Filter) => void;
};

export function PostFilter({ filter, setFilter }: PostFilterProps) {
    const {sort, query} = filter;
    return (
        <>
            <Input
                onChange={(value) => setFilter({ ...filter, query: value })}
                value={query}
                placeholder={"Search..."}
            />
            <hr />
            <Select
                value={sort}
                options={[
                    { value: "title", name: "By Name" },
                    { value: "body", name: "By Description" },
                ]}
                defaultValue={"Sort"}
                onChange={(e) => setFilter({ ...filter, sort: e.target.value as SortType })}
            />
        </>
    );
}
