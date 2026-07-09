"use server"

import { getToken } from "./session"


export const authHeader=async()=>{
    const token = await getToken()
    const header = token ? {
        authorization : `Bearer ${token}`
    } : {}
    return header
}

const baseurl = process.env.NEXT_PUBLIC_BASE_URL

// export const serverFetch =async(path)=>{
//     const res = await fetch(`${baseurl}${path}`)
//     return res.json()
// }

export const serverFetch = async (path) => {
    const res = await fetch(`${baseurl}${path}`);

    if (!res.ok) {
        const text = await res.text();
        console.log("Response:", text);
        throw new Error(`Request failed: ${res.status}`);
    }

    return res.json();
};


// ---------------old Code------------

export const protectedFetch =async(path)=>{
    const res = await fetch(`${baseurl}${path}`,{
         headers : await authHeader()
    })
    return res.json()
}

// -----------new code--------------



export const serverMutetion=async(path,data,method="POST")=>{
    const res = await fetch(`${baseurl}${path}`,{
        method : method,
        headers : {
            "Content-Type": "application/json",
            ...await authHeader()
        },
        body : JSON.stringify(data)
    })

    return res.json()
}

export const serverDeletetion=async(path)=>{
    const res = await fetch(`${baseurl}${path}`,{
        method : "DELETE",
        headers : {
            "Content-Type": "application/json",
            ...await authHeader()
        },
        body : JSON.stringify()
    })

    return res.json()
}