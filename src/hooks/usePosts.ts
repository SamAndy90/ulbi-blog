import { useMemo } from "react";
import { PostData } from "@/services/services";
import { SortType } from "@/app/posts/page";

export type UseSortedPostsProps = {
    sort: SortType;
    posts: PostData[] | [];
};

export type UsePostsProps = {
    sort: SortType;
    query: string;
    posts: PostData[] | [];
};

export const useSortedPosts = ({ sort, posts = [] }: UseSortedPostsProps): PostData[] => {
    if (sort) {
        return [...posts].sort((a, b) => a[sort].localeCompare(b[sort]));
    }
    return posts;
};

export const usePosts = ({ sort, query, posts = [] }: UsePostsProps) => {
    const sortedPosts = useSortedPosts({ sort, posts });
    return sortedPosts.filter((post) => {
        return (
            (post.title.toLowerCase().includes(query.toLowerCase()) &&
                post.body.toLowerCase().includes(query.toLowerCase())) ||
            post.title.toLowerCase().includes(query.toLowerCase()) ||
            post.body.toLowerCase().includes(query.toLowerCase())
        );
    });
};
