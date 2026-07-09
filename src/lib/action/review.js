import { serverDeletetion, serverMutetion } from "../core/server"

export const postReview=async(data)=>{
    return serverMutetion("/api/reviews",data)
}

export const editeReview=async(id,data)=>{
    return serverMutetion(`/reviews/${id}`,data,"PATCH")
}

export const deleteReview = async (id) => {
  return serverDeletetion(`/api/delete/review/${id}`);
};