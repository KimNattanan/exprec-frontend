'use client'

import { MdDone } from "react-icons/md"
import { useHistoryContext } from "./HistoryContext"
import { CiEdit } from "react-icons/ci"

export default function HistoryEditModeBtn() {
  const { editMode, setEditMode } = useHistoryContext()
  return (
    <div
      className="
        fixed z-40
        bg-foreground text-background transition-all duration-1000 rounded-full cursor-pointer shadow-md shadow-foreground/50
        sm:right-16 sm:bottom-16
        xs:text-4xl xs:p-2 xs:right-8 xs:bottom-8
        text-2xl right-4 bottom-4 p-1
      "
      onClick={()=>setEditMode(!editMode)}
    >
      <div className="
        flex items-center justify-center w-fit h-fit
        rounded-full
        xs:p-4 xs:border-3
        p-3 border-2
      ">
        {editMode ? <MdDone/> : <CiEdit/>}
      </div>
    </div>
  )
}