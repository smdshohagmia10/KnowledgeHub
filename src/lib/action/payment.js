import { serverMutetion } from "../core/server"

export const postPaymentDeteils=async(data)=>{
    return serverMutetion("/api/payments",data)
}