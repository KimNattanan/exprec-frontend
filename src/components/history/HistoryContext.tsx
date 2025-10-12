'use client'

import { Pagination } from "@/types/api";
import { useSearchParams } from "next/navigation";
import { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction } from "react";

type HistoryContextType = {
  page: number,
  pagination: Pagination,
  setPagination: Dispatch<SetStateAction<Pagination>>,

  editMode: boolean,
  setEditMode: (b: boolean) => void,

  deletable: boolean,
  setDeletable: Dispatch<SetStateAction<boolean>>
}

const HistoryContext = createContext<HistoryContextType | undefined>(undefined);

export function HistoryContextProvider({ children }:{ children: ReactNode }) {
  const searchParams = useSearchParams()
  const pageStr = searchParams.get('page') || '1'
  const page = parseInt(pageStr, 10) || 1
  const [pagination, setPagination] = useState<Pagination>({totalPages: 1} as Pagination)

  const [editMode, setEditMode] = useState(false)
  const [deletable, setDeletable] = useState(true)

  return (
    <HistoryContext.Provider value={{
      page, pagination, setPagination,
      editMode, setEditMode,
      deletable, setDeletable,
    }}>
      { children }
    </HistoryContext.Provider>
  )
}

export function useHistoryContext() {
  const context = useContext(HistoryContext)
  if(!context){
    throw new Error("useHistoryContext must be used inside HistoryContextProvider")
  }
  return context
}