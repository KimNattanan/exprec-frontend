'use client'

import { useEffect, useState } from "react";
import { useHistoryContext } from "./HistoryContext";

export default function HistoryPaginator() {
  const { page, pagination } = useHistoryContext()

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
    <div className="flex justify-center text-xs sm:text-base">
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