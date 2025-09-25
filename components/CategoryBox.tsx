import { MouseEventHandler } from "react";

export default function CategoryBox(
  {title, bg_color, deleteHandler, insertLeftHandler, insertRightHandler} :
  {title: string, bg_color: string, deleteHandler: MouseEventHandler, insertLeftHandler: MouseEventHandler, insertRightHandler: MouseEventHandler})
{
  return (
    <div
      className="flex flex-col items-center justify-center h-max w-max aspect-square m-2"
      style={{ backgroundColor: bg_color }}
    >
      <div>{title}</div>
      <button className="cursor-pointer bg-gray-300 m-1" onClick={deleteHandler}>delete</button>
      <button className="cursor-pointer bg-gray-300 m-1" onClick={insertLeftHandler}>{"<-"}</button>
      <button className="cursor-pointer bg-gray-300 m-1" onClick={insertRightHandler}>{"->"}</button>
    </div>
  )
}