'use client'

import { getUserFromBackend } from "@/lib/api/user-api"
import { writeLoginToken } from "@/lib/api/user-api-server"
import { useEffect } from "react"

export default function Page(){
  useEffect(()=>{
    const doFetch = async()=>{
      const email = await getUserFromBackend()
      writeLoginToken(email)
    }
    doFetch()
  },[])
  return (
    <></>
  )
}