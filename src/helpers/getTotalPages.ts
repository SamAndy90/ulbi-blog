import { getPostsCount } from "@/services/services"

export const getTotalPages = async (limit: number) => {
    const totalCount = await getPostsCount()
    return Math.ceil(totalCount / limit)
}