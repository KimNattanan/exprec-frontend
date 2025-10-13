'use client'

import { deleteRecord, fetchRecords } from "@/lib/api/record-api"
import { Record } from "@/types/api"
import { MouseEventHandler, useCallback, useEffect, useState } from "react"
import { useHistoryContext } from "./HistoryContext"
import { IoIosClose } from "react-icons/io"
import { getContrastYIQ, monthNames } from "@/lib/utils"
import HistoryPaginator from "./HistoryPaginator"

function RecordBox({ record, deleteHandler }: { record: Record, deleteHandler: MouseEventHandler }) {
  const { editMode, deletable } = useHistoryContext()

  const date = new Date(record.created_at)
  const formatTime = ()=>{
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  }
  return (
    <div className="
      relative overflow-hidden  
      border-2 rounded-xl border-dashed
      xs:p-8
      my-4 p-4
    ">
      {editMode &&
        <button
          className="
            bg-bad absolute text-white top-0 right-0 cursor-pointer disabled:cursor-default disabled:opacity-50 rounded-bl-xl
            xs:text-4xl
            text-3xl
          "
          onClick={deleteHandler}
          disabled={!deletable}
        >
          <IoIosClose/>
        </button>
      }
      <div className="
        flex text-foreground3 font-semibold
        md:text-xl
        sm:text-sm
        text-xs mb-6
      ">
        <div className="mr-2">{date.getDate()}</div>
        <div className="mx-2">{monthNames[date.getMonth()]}</div>
        <div className="mx-2">{date.getFullYear()}</div>
        <div className="ml-2">{formatTime()}</div>
      </div>
      <div className="
        grid grid-cols-[max-content_1fr]
        lg:text-2xl
        md:text-xl
        xs:text-lg
        text-sm
      ">
        <div className="mb-8 text-right">
          Amount :
        </div>
        <div className="
          text-shadow-sm text-shadow-foreground/20 font-medium
          lg:text-4xl
          md:text-3xl
          sm:ml-8
          xs:text-2xl
          ml-4 text-xl mb-8
        ">
          {record.amount.toFixed(2)}
        </div>
        <div className="mb-8 text-right">
          Category :
        </div>
        <div
          className="
            self-center h-fit w-fit break-all text-center
            border-1 border-foreground rounded-full
            lg:text-base lg:px-8
            sm:ml-8 sm:text-sm
            text-xs px-4 ml-4 mb-8
          "
          style={{ backgroundColor: record.category_bg_color, color: getContrastYIQ(record.category_bg_color, "#524439", "#ffffff") }}
        >
          {record.category}
        </div>
        <div className="mb-4 text-right">
          Note :
        </div>
        <div className="
          break-all self-center
          lg:text-2xl
          md:text-xl
          sm:ml-8
          ml-4 text-xs mb-4
        ">
          {record.note || '-'}
        </div>
      </div>
    </div>
  )
}

export default function RecordContainer() {
  const { page, pagination, setPagination, setDeletable } = useHistoryContext()
  
  const doFetchRecords = useCallback(async()=>{
    const res = await fetchRecords(page)
    if(!res) return
    res.pagination.totalPages = Math.max(1, res.pagination.totalPages)
    setRecords(res.data)
    setPagination(res.pagination)
  },[page])
  
  const [records, setRecords] = useState<Record[]>([])
  const recordDeleteHandler = (id: number) => async () => {
    setDeletable(false)
    try{
      if(!(await deleteRecord(records[id].id))) return
      await doFetchRecords()
    } finally {
      setDeletable(true)
    }
  }

  useEffect(()=>{
    setRecords([])
    doFetchRecords()
  },[doFetchRecords])

  return (
    <>
      <div className="sm:ml-8 ml-4 sm:text-base text-xs">
        Total records: {pagination.totalRecords}
      </div>
      <HistoryPaginator/>
      {records.map((v,i)=>(
        <RecordBox key={i} record={v} deleteHandler={recordDeleteHandler(i)}/>
      ))}
      <HistoryPaginator/>
    </>
  )
}