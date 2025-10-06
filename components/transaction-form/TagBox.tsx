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
}: Props) {
  if(edit_mode){ // edit mode
    return (
      <div
        className="
          flex relative
          rounded-2xl overflow-hidden select-none border-2 border-dashed font-medium
          m-2 text-xl
        "
      >
        <div
          className="
            absolute
            bg-bad text-white cursor-pointer
            text-4xl top-0 right-6
          "
          onClick={deleteHandler}
        >
          <IoIosClose/>
        </div>
        <button
          className="
            text-center content-center
            bg-foreground2 text-background cursor-pointer disabled:opacity-50
            h-40 w-6
          "
          onClick={insertLeftHandler}
          disabled={!insertable}
        >{"<<"}</button>
        <div
          className="
            flex flex-col items-center justify-center
            h-40 w-28
          "
          style={{ backgroundColor: bg_color, color: getContrastYIQ(bg_color, "#524439", "#ffffff") }}
          onClick={editHandler}
        >
          <div>{value}</div>
          <div className="text-xs">{'《 click to edit 》'}</div>
        </div>
        <button
          className="
            text-center content-center
            bg-foreground2 text-background cursor-pointer disabled:opacity-50
            h-40 w-6
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
        flex flex-col items-center justify-center
        cursor-pointer rounded-2xl select-none border-2 border-dashed font-medium
        h-40 w-40 m-2 text-2xl
      "
      style={{ backgroundColor: bg_color, color: getContrastYIQ(bg_color, "#524439", "#ffffff") }}
      onClick={selectHandler}
    >
      {value}
    </div>
  )
}