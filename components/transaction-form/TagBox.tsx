import { getContrastYIQ } from "@/utils/utils";
import { MouseEventHandler } from "react";
import { IoIosClose } from "react-icons/io";

type Props<Value extends string|number> = {
  edit_mode: boolean;
  value: Value;
  bg_color: string;
  selectHandler: MouseEventHandler;
  deleteHandler: MouseEventHandler;
  insertLeftHandler: MouseEventHandler;
  insertRightHandler: MouseEventHandler;
  editHandler: MouseEventHandler;
}

export default function TagBox<Value extends string|number>({
  edit_mode,
  value,
  bg_color,
  selectHandler,
  deleteHandler,
  insertLeftHandler,
  insertRightHandler,
  editHandler,
}: Props<Value>) {
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
        <div
          className="
            text-center content-center
            bg-foreground2 text-background cursor-pointer
            h-40 w-6
          "
          onClick={insertLeftHandler}
        >{"<<"}</div>
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
        <div
          className="
            text-center content-center
            bg-foreground2 text-background cursor-pointer
            h-40 w-6
          "
          onClick={insertRightHandler}
        >{">>"}</div>
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