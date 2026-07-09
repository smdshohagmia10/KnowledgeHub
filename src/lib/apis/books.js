import { protectedFetch, serverDeletetion, serverFetch } from "../core/server"

export const getAllBooks =async(query)=>{
    return serverFetch(`/api/all/books?${query}`)
}

export const getBookDeteils =async(id)=>{
    return serverFetch(`/api/book/${id}`)
}

//---------admins-------
export const getPendingBooks =async()=>{
    return protectedFetch(`/api/pendingBooks`)
}


export const allBooksManupuletion =async()=>{
    return protectedFetch(`/api/allBooks`)
}


export const bookDelete =async(id)=>{
    return serverDeletetion(`/api/deleteBook/${id}`)
}
