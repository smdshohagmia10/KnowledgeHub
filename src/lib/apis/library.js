import { protectedFetch } from "../core/server"


export const getBookInventory =async(librarianId)=>{
    return protectedFetch(`/api/books?librarianId=${String(librarianId)}`)
}