import { MouseEventHandler } from "react";
import { IoIosClose } from "react-icons/io";

type Props = {
  edit_mode: boolean;
  title: string;
  bg_color: string;
  selectHandler: MouseEventHandler;
  deleteHandler: MouseEventHandler;
  insertLeftHandler: MouseEventHandler;
  insertRightHandler: MouseEventHandler;
  editHandler: MouseEventHandler;
}

export default function CategoryBox({
  edit_mode,
  title,
  bg_color,
  selectHandler,
  deleteHandler,
  insertLeftHandler,
  insertRightHandler,
  editHandler,
}: Props) {

  function getContrastYIQ(hexcolor: string) {
    hexcolor = hexcolor.replace("#", "");

    const r = parseInt(hexcolor.slice(0, 2), 16);
    const g = parseInt(hexcolor.slice(2, 4), 16);
    const b = parseInt(hexcolor.slice(4, 6), 16);

    const yiq = (r * 299 + g * 587 + b * 114) / 1000;
    return yiq >= 128 ? "black" : "white";
  }

  if(edit_mode){ // edit mode
    return (
      <div className="m-2 flex relative">
        <div
          className="bg-red-600 absolute text-4xl text-white top-0 right-6 cursor-pointer"
          onClick={deleteHandler}
        >
          <IoIosClose/>
        </div>
        <div
          className="bg-gray-500 h-40 w-6 cursor-pointer text-white text-center content-center"
          onClick={insertLeftHandler}
        >{"<<"}</div>
        <div
          className="flex flex-col items-center justify-center h-40 w-40 aspect-square"
          style={{ backgroundColor: bg_color, color: getContrastYIQ(bg_color) }}
          onClick={editHandler}
        >
          <div>{title}</div>
          <div>{'《 click to edit 》'}</div>
        </div>
        <div
          className="bg-gray-500 h-40 w-6 cursor-pointer text-white text-center content-center"
          onClick={insertRightHandler}
        >{">>"}</div>
      </div>
    )
  }
  return ( // default
    <div
      className="flex flex-col items-center justify-center h-40 w-40 m-2 cursor-pointer"
      style={{ backgroundColor: bg_color, color: getContrastYIQ(bg_color) }}
      onClick={selectHandler}
    >
      <div>{title}</div>
    </div>
  )
}