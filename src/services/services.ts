import axios from "axios";

export type PostData = {
    id?: number;
    title: string;
    body: string;
};

axios.defaults.baseURL = "http://localhost:4444";
export async function getPostsCount() {
    return await axios.get<PostData[]>("/posts").then((data) => data.data.length);
}

export async function getAllPosts(limit: number, page: number) {
    return await axios
        .get<PostData[]>("/posts", {
            params: {
                _limit: limit,
                _page: page,
            },
        })
        .then((data) => data.data);
}

export async function getPost(id: string | "") {
    return await axios.get<PostData>(`/posts/${id}`).then((data) => data.data);
}

export async function addPost(post: PostData) {
    return await axios.post(`/posts`, post);
}

export async function delPost(id: number) {
    return await axios.delete(`/posts/${id}`);
}

export type CommentsData = {
    id: number;
    name: string;
    email: string;
    body: string;
    postId: number;
};

export async function getPostComments(id: string | "") {
    return await axios.get<CommentsData[]>(`/comments?postId=${id}`).then((data) => data.data);
}

export type User = {
    name: string;
    email: string;
    password: string;
    image?: string;
};

export async function getUsers(): Promise<User[]> {
    return await axios.get("/users").then((data) => data.data);
}
