import { protectedFetch } from "../core/server"

export const userReadedBooks =async()=>{
    return protectedFetch("/api/delevary/user")
}

export const nonDelevaredBook =async()=>{
    return protectedFetch("/api/notDelevary/user")
}

