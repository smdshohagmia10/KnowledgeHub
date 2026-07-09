import { serverMutetion } from "../core/server"


export const confirmDelivery=async(id ,data)=>{
    return serverMutetion(`/api/confrim/delevary/${id}`,data,"PATCH")
}