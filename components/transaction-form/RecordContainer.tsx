'use client'

import { deleteRecord, fetchRecords } from "@/lib/api/record-api"
import { Record, Pagination } from "@/types/api"
import { useCallback, useEffect, useState } from "react"
import RecordBox from "./RecordBox"
import { MdDone } from "react-icons/md"
import { CiEdit } from "react-icons/ci"
import { useSearchParams } from "next/navigation"

function Paginator({
  page, pagination
}:{
  page: number, pagination: Pagination
}) {
  const setPage = (x: number)=>{
    window.history.replaceState({}, '', '/history' + ((Number.isNaN(x) || x==1) ? '' : '?page='+x))
  }
  const [pageTmp, setPageTmp] = useState<string>(page.toString());
  const pageChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(!e.target.value){
      setPageTmp('')
      return
    }
    const newPage = parseInt(e.target.value, 10)
    setPageTmp(newPage.toString())
    if(newPage && newPage >= 1 && newPage <= pagination.totalPages) setPage(newPage)
  }
  useEffect(()=>{
    setPageTmp(page.toString());
  },[page])
  return (
    <div className="flex justify-center">
      {page > 2 &&
        <button
          className="p-2 cursor-pointer text-center self-center"
          onClick={()=>setPage(1)}
        >{'<<'}</button>
      }
      {page > 1 &&
        <button
          className="p-2 cursor-pointer text-center self-center"
          onClick={()=>setPage(page-1)}
        >{'<'}</button>
      }
      <input
        className="min-w-0 m-2 text-center"
        name="page"
        type="number"
        onChange={pageChangeHandler}
        value={pageTmp}
        style={{ width: `${pageTmp.length}ch` }}
      />
      <div className="self-center m-2">{'・'}</div>
      <div className="self-center m-2">
        {pagination.totalPages}
      </div>
      {page < pagination.totalPages &&
        <button
          className="p-2 cursor-pointer text-center self-center aspect-square"
          onClick={()=>setPage(page+1)}
        >{'>'}</button>
      }
      {page+1 < pagination.totalPages &&
        <button
          className="p-2 cursor-pointer text-center self-center aspect-square"
          onClick={()=>setPage(pagination.totalPages)}
        >{'>>'}</button>
      }
    </div>
  )
}

export default function RecordContainer() {
  const searchParams = useSearchParams()
  const pageStr = searchParams.get('page') || '1'
  const page = parseInt(pageStr, 10) || 1
  
  const [pagination, setPagination] = useState<Pagination>({totalPages: 1} as Pagination)
  const [editMode, setEditMode] = useState(false)
  
  const doFetchRecords = useCallback(async()=>{
    const res = await fetchRecords(page)
    if(!res) return
    res.pagination.totalPages = Math.max(1, res.pagination.totalPages)
    setRecords(res.data)
    setPagination(res.pagination)
  },[page])
  
  const [records, setRecords] = useState<Record[]>([])
  const recordDeleteHandler = (id: number) => async () => {
    if(!(await deleteRecord(records[id].id))) return
    doFetchRecords()
  }

  useEffect(()=>{
    setRecords([])
    doFetchRecords()
  },[doFetchRecords])

  return (
    <>
      <div
        className="
          fixed z-50
          bg-foreground text-background transition-all duration-1000 rounded-full cursor-pointer shadow-md shadow-foreground/50
          text-4xl p-2 bottom-16 right-16
        "
        onClick={()=>setEditMode(!editMode)}
      >
        <div className="
          flex items-center justify-center w-fit h-fit
          rounded-full border-3 p-4
        ">
          {editMode ? <MdDone/> : <CiEdit/>}
        </div>
      </div>
      <div className="text-foreground w-full h-[calc(100dvh-4rem)] px-10">
        <div className="w-fit text-8xl font-medium mx-auto my-10 text-bad">History</div>
        <Paginator page={page} pagination={pagination}/>
        <div className="ml-8">
          Total records: {pagination.totalRecords}
        </div>
        {records.map((v,i)=>(
          <RecordBox key={i} record={v} editMode={editMode} deleteHandler={recordDeleteHandler(i)}/>
        ))}
        <Paginator page={page} pagination={pagination}/>
      </div>
    </>
  )
}