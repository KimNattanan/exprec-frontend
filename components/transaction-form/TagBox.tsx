import { getContrastYIQ } from "@/lib/utils";
import { MouseEventHandler } from "react";
import { IoIosClose } from "react-icons/io";

type Props = {
  edit_mode: boolean;
  value: string;
  bg_color: string;
  selectHandler: MouseEventHandler;
  deleteHandler: MouseEventHandler;
  insertLeftHandler: MouseEventHandler;
  insertRightHandler: MouseEventHandler;
  editHandler: MouseEventHandler;
  insertable: boolean;
  deletable: boolean;
}

export default function TagBox({
  edit_mode,
  value,
  bg_color,
  selectHandler,
  deleteHandler,
  insertLeftHandler,
  insertRightHandler,
  editHandler,
  insertable,
  deletable,
}: Props) {
  if(edit_mode){ // edit mode
    return (
      <div
        className="
          flex relative
          rounded-2xl overflow-hidden border-2 border-dashed font-medium
          sm:text-2xl sm:m-2
          xs:text-xl
          m-1 text-base
        "
      >
        <button
          className="
            absolute
            bg-bad text-white cursor-pointer disabled:cursor-default disabled:opacity-50
            sm:right-6 sm:text-3xl
            xs:text-2xl
            right-4 top-0 text-xl
          "
          onClick={deleteHandler}
          disabled={!deletable}
        >
          <IoIosClose/>
        </button>
        <button
          className="
            text-center content-center
            bg-foreground2 text-background cursor-pointer disabled:cursor-default disabled:opacity-50
            sm:h-40 sm:w-6 sm:text-lg
            xs:h-36
            h-22 text-xs w-4
          "
          onClick={insertLeftHandler}
          disabled={!insertable}
        >{"<<"}</button>
        <div
          className="
            flex flex-col items-center justify-center text-center break-all overflow-hidden
            sm:h-40 sm:w-28
            xs:h-36 xs:w-28
            h-22 w-18
          "
          style={{ backgroundColor: bg_color, color: getContrastYIQ(bg_color, "#524439", "#ffffff") }}
          onClick={editHandler}
        >
          <div>{value}</div>
          <div className="xs:hidden text-xs">{'《 edit 》'}</div>
          <div className="hidden xs:block text-xs">{'《 click to edit 》'}</div>
        </div>
        <button
          className="
            text-center content-center overflow-hidden
            bg-foreground2 text-background cursor-pointer disabled:cursor-default disabled:opacity-50
            sm:h-40 sm:w-6 sm:text-lg
            xs:h-36
            h-22 text-xs w-4
          "
          onClick={insertRightHandler}
          disabled={!insertable}
        >{">>"}</button>
      </div>
    )
  }
  return ( // default
    <div
      className="
        flex flex-col items-center justify-center text-center break-all overflow-hidden
        rounded-2xl border-2 border-dashed font-medium cursor-pointer
        sm:h-40 sm:w-40 sm:text-2xl
        xs:h-36 xs:w-36 xs:text-xl
        h-22 w-22 m-2 text-base
      "
      style={{ backgroundColor: bg_color, color: getContrastYIQ(bg_color, "#524439", "#ffffff") }}
      onClick={selectHandler}
    >
      {value}
    </div>
  )
}