import { protectedFetch, serverFetch } from "../core/server"

export const userReviews=async(id)=>{
    return serverFetch(`/api/my/reviews/${id}`)
}

export const bookReviews=async(bookId)=>{
    return serverFetch(`/api/reviews/${bookId}`)
}
export const allReviews=async()=>{
    return protectedFetch(`/api/all/reviews`)
}