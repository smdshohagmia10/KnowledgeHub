import { protectedFetch } from "../core/server"


export const allTranjections=()=>{
    return protectedFetch('/api/all/tranjections')
}