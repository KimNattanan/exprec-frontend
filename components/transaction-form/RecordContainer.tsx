'use client'

import { deleteRecord, fetchRecords } from "@/utils/api/record-api"
import { Record } from "@/utils/types/Record"
import { useEffect, useState } from "react"
import RecordBox from "./RecordBox"
import { MdDone } from "react-icons/md"
import { CiEdit } from "react-icons/ci"
import { useSearchParams } from "next/navigation"
import { Pagination } from "@/utils/types/Pagination"

export default function RecordContainer() {
  const searchParams = useSearchParams()
  const pageStr = searchParams.get('page') || '1'
  const page = parseInt(pageStr, 10) || 1
  const setPage = (x: number)=>{
    window.history.replaceState({}, '', '/history' + ((Number.isNaN(x) || x==1) ? '' : '?page='+x))
  }
  const pageChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPage(parseInt(e.target.value, 10))
  }
  
  
  const [pagination, setPagination] = useState<Pagination>({totalPages: 1} as Pagination)
  const [editMode, setEditMode] = useState(false)
  
  const doFetchRecords = async()=>{
    const res = await fetchRecords(page)
    if(!res) return
    res.pagination.totalPages = Math.max(1,res.pagination.totalPages)
    setRecords(res.data)
    setPagination(res.pagination)
  }
  
  const [records, setRecords] = useState<Record[]>([])
  const recordDeleteHandler = (id: number) => async () => {
    if(!(await deleteRecord(records[id].id))) return
    doFetchRecords()
  }

  useEffect(()=>{
    doFetchRecords()
  },[page])

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
        <div className="flex justify-center">
          {page > 1 &&
            <button
              className="p-2 cursor-pointer text-center self-center"
              onClick={()=>setPage(page-1)}
            >{'＜'}</button>
          }
          <input
            className="min-w-0 m-2 text-center"
            type="number"
            onChange={pageChangeHandler}
            value={pageStr}
            style={{ width: `${String(page).length}ch` }}
          />
          <div className="self-center m-2">{'・'}</div>
          <div className="self-center m-2">
            {pagination.totalPages}
          </div>
          {page < pagination.totalPages &&
            <button
              className="p-2 cursor-pointer text-center self-center aspect-square"
              onClick={()=>setPage(page+1)}
            >{'＞'}</button>
          }
        </div>
      </div>
    </>
  )
}