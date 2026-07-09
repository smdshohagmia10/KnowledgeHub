import { protectedFetch } from "../core/server"


export const allUser =async()=>{
    return protectedFetch("/api/all/users")
}