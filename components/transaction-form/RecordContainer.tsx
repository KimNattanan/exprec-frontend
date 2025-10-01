'use client'

import { fetchRecords } from "@/utils/api/record-api"
import { Record } from "@/utils/types/Record"
import { useEffect, useState } from "react"
import RecordBox from "./RecordBox"

export default function RecordContainer() {
  
  const [records, setRecords] = useState<Record[]>([])

  useEffect(()=>{
    const doFetch = async()=>{
      const res = await fetchRecords();
      setRecords(res)
    }
    doFetch();
  },[])

  return (
    <div className="bg-gray-300 w-full h-[calc(100dvh-4rem)]">
      <div className="w-fit">Record Container</div>
      {records.map((v,i)=>(
        <RecordBox key={i} record={v}/>
      ))}
    </div>
  )
}