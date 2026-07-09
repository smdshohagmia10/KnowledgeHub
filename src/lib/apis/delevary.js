import { protectedFetch } from "../core/server"

export const approveDelevari =async()=>{
    return protectedFetch(`/api/delivery/librarian`)
}