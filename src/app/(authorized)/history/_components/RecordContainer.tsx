'use client'

import { Record } from "@/types/api"
import { useHistoryContext } from "./HistoryContext"
import { IoIosClose } from "react-icons/io"
import { formatDateTime, getContrastYIQ } from "@/utils/utils"
import HistoryPaginator from "./HistoryPaginator"
import { useDeleteRecord } from "@/features/records/api/delete-record"
import { useRecords } from "@/features/records/api/get-records"

function RecordBox({ record, isLast }: { record: Record, isLast: boolean }) {
  const { page, editMode, deletable, setDeletable } = useHistoryContext();
  const setPage = (x: number)=>{
    window.history.replaceState({}, '', '/history' + ((Number.isNaN(x) || x==1) ? '' : '?page='+x))
  }
  const deleteRecord = useDeleteRecord({
    mutationConfig: {
      onMutate: ()=>setDeletable(false),
      onSettled: ()=>setDeletable(true),
      onSuccess: ()=>{
        if(isLast && page >1){
          setPage(page-1);
        }
      },
    },
  });

  const created_at = formatDateTime(new Date(record.created_at))
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
          onClick={()=>deleteRecord.mutate({recordId: record.id})}
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
        <div className="mr-2">{created_at[0]}</div>
        <div className="mx-2">{created_at[1]}</div>
        <div className="mx-2">{created_at[2]}</div>
        <div className="ml-2">{created_at[3]}</div>
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
  const { page } = useHistoryContext()
  const records = useRecords({ page, queryConfig: {
    gcTime: 0,
  }});

  if(records.isPending){
    return (
      <div>
        Loading...
      </div>
    );
  }
  if(records.isError){
    return (
      <div>
        Failed to load records.
      </div>
    );
  }

  return (
    <>
      <div className="sm:ml-8 ml-4 sm:text-base text-xs">
        Total records: {records.data.pagination.totalRecords}
      </div>
      <HistoryPaginator pagination={records.data.pagination}/>
      {records.data.data.map((v,i)=>(
        <RecordBox key={i} record={v} isLast={records.data.data.length==1}/>
      ))}
      <HistoryPaginator pagination={records.data.pagination}/>
    </>
  );
}