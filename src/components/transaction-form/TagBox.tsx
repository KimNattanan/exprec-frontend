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
          m-2 text-base
        "
      >
        <button
          className="
            absolute
            bg-bad text-white cursor-pointer disabled:cursor-default disabled:opacity-50
            sm:text-3xl
            xs:right-6
            right-5 top-0 text-2xl
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
            lg:h-76
            md:h-60
            sm:h-76
            xs:h-56 xs:w-6 xs:text-lg
            h-36 text-xs w-5
          "
          onClick={insertLeftHandler}
          disabled={!insertable}
        >{"<<"}</button>
        <div
          className="
            flex flex-col items-center justify-center text-center break-all overflow-hidden
            lg:h-76 lg:w-63 lg:text-4xl
            md:h-60 md:w-47 md:text-2xl
            sm:h-76 sm:w-63 sm:text-4xl
            xs:h-56 xs:w-43 xs:text-2xl
            h-36 w-25 text-base
          "
          style={{ backgroundColor: bg_color, color: getContrastYIQ(bg_color, "#524439", "#ffffff") }}
          onClick={editHandler}
        >
          <div>{value}</div>
          <div className="text-xs">{'《 click to edit 》'}</div>
        </div>
        <button
          className="
            text-center content-center overflow-hidden
            bg-foreground2 text-background cursor-pointer disabled:cursor-default disabled:opacity-50
            lg:h-76
            md:h-60
            sm:h-76
            xs:h-56 xs:w-6 xs:text-lg
            h-36 text-xs w-5
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
        lg:h-76 lg:w-76 lg:text-4xl
        md:h-60 md:w-60 md:text-3xl
        sm:h-76 sm:w-76 sm:text-4xl
        xs:h-56 xs:w-56 xs:text-3xl
        h-36 w-36 m-2 text-xl
      "
      style={{ backgroundColor: bg_color, color: getContrastYIQ(bg_color, "#524439", "#ffffff") }}
      onClick={selectHandler}
    >
      {value}
    </div>
  )
}