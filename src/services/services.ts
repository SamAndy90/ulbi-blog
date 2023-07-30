import axios from "axios";

axios.defaults.baseURL = "http://localhost:4444";

export type PostData = {
    id?: number;
    title: string;
    body: string;
    comments?: CommentData[] | [];
};

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
    return await axios.get<PostData>(`/posts/${id}?_embed=comments`).then((data) => data.data);
}

export async function addPost(post: PostData) {
    return await axios.post(`/posts`, post);
}

export async function delPost(id: number) {
    return await axios.delete<PostData>(`/posts/${id}`);
}

export type CommentData = {
    id?: number;
    email: string;
    text: string;
    postId: number;
};

export async function addComment(comment: CommentData) {
    return await axios.post<CommentData>(`/comments`, comment);
}

export async function delComment(id: number) {
    return await axios.delete<CommentData>(`/comments/${id}`);
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
