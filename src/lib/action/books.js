import { serverMutetion } from "../core/server"


export const postBookData=async(bookData)=>{
    return serverMutetion("/api/books",bookData)
}


export const unpublishBook=async(data , id)=>{
    return serverMutetion(`/api/book/unpublish/${id}`,data,"PATCH")
}

export const publishBook=async(data , id)=>{
    return serverMutetion(`/api/book/publish/${id}`,data,"PATCH")
}

export const approveBook=async(data , id)=>{
    return serverMutetion(`/api/approveBooks/${id}`,data,"PATCH")
}