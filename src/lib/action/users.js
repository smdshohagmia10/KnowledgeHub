import { serverDeletetion, serverMutetion } from "../core/server"


export const updateuserAsUser =async(data,id)=>{
    return serverMutetion(`/api/update/role/${id}`,data,"PATCH")
}
export const updateuserAsLibrarian =async(data,id)=>{
    return serverMutetion(`/api/update/role/${id}`,data,"PATCH")
}
export const updateuserAsAdmin =async(data,id)=>{
    return serverMutetion(`/api/update/role/${id}`,data,"PATCH")
}

export const deleteUserPermanent =async(id)=>{
    return serverDeletetion(`/api/delete/user/${id}`)
}