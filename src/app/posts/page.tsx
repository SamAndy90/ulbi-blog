"use client";
import { useEffect, useState } from "react";
import { Button, Select, Container } from "@/common";
import { PostForm } from "@/components/PostForm/PostForm";
import { PostsList } from "@/components/PostsList";
import { PostFilter } from "@/components/PostFilter";
import { Pagination } from "@/components/Pagination";
import { Modal } from "@/components/Modal";
import { Loader } from "@/components/Loader";
import { getAllPosts, delPost } from "@/services/services";
import { usePosts } from "@/hooks/usePosts";
import { usePagination } from "@/hooks/usePagination";
import { getTotalPages } from "@/helpers/getTotalPages";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Metadata } from "next";

// export const metadata: Metadata = {
//     title: "Posts",
// };

export type SortType = "title" | "body" | "";
export type Filter = {
    sort: SortType;
    query: string;
};

export default function Posts() {
    const client = useQueryClient();
    const [modal, setModal] = useState(false);
    const [filter, setFilter] = useState<Filter>({ sort: "", query: "" });
    const [limit, setLimit] = useState(10);
    const [totalPages, setTotalPages] = useState(1);
    const [page, setPage] = useState(1);

    useEffect(() => {
        getTotalPages(limit).then((pagesCount) => setTotalPages(pagesCount));
    }, [limit, totalPages, page]);

    const { data, isSuccess, isLoading, isError, error } = useQuery({
        queryKey: ["posts", limit, page],
        queryFn: () => getAllPosts(limit, page),
    });

    const sortedAndSearchedPosts = usePosts({
        sort: filter.sort,
        query: filter.query,
        posts: data || [],
    });

    const removePost = useMutation({
        mutationFn: delPost,
        onSuccess: () => {
            client.invalidateQueries({ queryKey: ["posts"] });
            getTotalPages(limit).then((pagesCount) => setTotalPages(pagesCount));
        },
    });

    const deletePost = (id: number) => removePost.mutate(id);

    const arrOfPages = usePagination(totalPages).length - 1;

    useEffect(() => {
        data?.length === 0 && setPage(arrOfPages);
    }, [data]);

    const changePage = (p: number) => {
        setPage(p);
    };
    return (
        <section>
            <Container>
                <div className="py-6 flex flex-col gap-4 max-w-xl mx-auto">
                    <Button onClick={() => setModal(true)}>Create New Post</Button>
                    <Modal visible={modal} setVisible={setModal}>
                        <PostForm closeModal={setModal} />
                    </Modal>
                    <PostFilter filter={filter} setFilter={setFilter} />
                    <Select
                        value={limit}
                        onChange={(e) => setLimit(+e.target.value)}
                        defaultValue={"Posts limit"}
                        options={[
                            { value: 5, name: "5" },
                            { value: 10, name: "10" },
                            { value: 20, name: "20" },
                            { value: -1, name: "All Posts" },
                        ]}
                    />
                    {isError && (
                        <h1 className="text-red-600 text-center text-4xl">
                            {error instanceof Error && error.message}
                        </h1>
                    )}
                    {isLoading && <Loader />}
                    {isSuccess && (
                        <>
                            <PostsList
                                posts={sortedAndSearchedPosts || []}
                                deletePost={deletePost}
                            />
                            <Pagination
                                totalPages={totalPages}
                                page={page}
                                changePage={changePage}
                            />
                        </>
                    )}
                </div>
            </Container>
        </section>
    );
}

// const lastElement = useRef();
// const observer = useRef();
// const {data, isError, isLoading} = useQuery({
//     queryKey: ["myposts"],
//     queryFn: () => { axios.get<PostData[]>("https://jsonplaceholder.typicode.com/posts", {
//         params: {
//             _limit: limit,
//             _page: page,
//         }
//     })}
// })

// useEffect(() => {
//     if(isLoading) return
//     if(observer.current) observer.current.disconnect()
//     observer.current = new IntersectionObserver((entries) => {
//         if(entries[0].isIntersecting && page < 10) {
//             setPage(page + 1);
//         }
//     });
//     observer.current.observe(lastElement.current);
// }, [isLoading]);
