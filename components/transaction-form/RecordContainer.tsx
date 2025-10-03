'use client'

import { deleteRecord, fetchRecords } from "@/utils/api/record-api"
import { Record } from "@/utils/types/Record"
import { useEffect, useState } from "react"
import RecordBox from "./RecordBox"
import { MdDone } from "react-icons/md"
import { CiEdit } from "react-icons/ci"

export default function RecordContainer() {
  
  const [records, setRecords] = useState<Record[]>([])
  const [editMode, setEditMode] = useState(false);

  const recordDeleteHandler = (id: number) => async () => {
    if(!(await deleteRecord(records[id].id))) return;
    setRecords(records.filter((_, i) => i !== id));
  }

  useEffect(()=>{
    const doFetch = async()=>{
      const res = await fetchRecords();
      console.log(res);
      setRecords(res)
    }
    doFetch();
  },[])

  return (
    <>
      <div
        className="fixed right-0 bottom-0 bg-gray-600 rounded-full aspect-square text-white flex items-center justify-center w-fit h-fit text-4xl p-2 cursor-pointer"
        onClick={()=>setEditMode(!editMode)}
      >
        {editMode ? <MdDone/> : <CiEdit/>}
      </div>
      <div className="bg-background text-foreground w-full h-[calc(100dvh-4rem)] px-10">
        <div className="w-fit text-5xl mx-auto my-10">History</div>
        {records.map((v,i)=>(
          <RecordBox key={i} record={v} editMode={editMode} deleteHandler={recordDeleteHandler(i)}/>
        ))}
      </div>
    </>
  )
}