import { Record } from "@/utils/types/Record";
import { getContrastYIQ } from "@/utils/utils";
import { MouseEventHandler } from "react";
import { IoIosClose } from "react-icons/io";

const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export default function RecordBox({ record, editMode, deleteHandler }: { record: Record, editMode: boolean, deleteHandler: MouseEventHandler }) {
  const date = new Date(record.created_at)
  const formatTime = ()=>{
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  }
  return (
    <div className="border-2 my-2 p-4 relative">
      {editMode &&
        <div
          className="bg-red-600 absolute text-4xl text-white top-0 right-0 cursor-pointer"
          onClick={deleteHandler}
        >
          <IoIosClose/>
        </div>
      }
      <div className="flex mb-2 text-sm">
        <div className="mx-2">{date.getDate()}</div>
        <div className="mx-2">{monthNames[date.getMonth()]}</div>
        <div className="mx-2">{date.getFullYear()}</div>
        <div className="mx-2">{formatTime()}</div>
      </div>
      <div className="grid grid-cols-[max-content_1fr]">
        <div className="pr-4 my-4">
          Amount :
        </div>
        <div className="self-center font-bold text-xl">
          {record.amount}
        </div>
        <div className="pr-4 my-4">
          Category :
        </div>
        <div
          className="self-center border-1 border-foreground w-fit rounded-full px-4"
          style={{ backgroundColor: record.category_bg_color, color: getContrastYIQ(record.category_bg_color, "#171717", "#ffffff") }}
        >
          {record.category}
        </div>
        <div className="pr-4 my-4">
          Note :
        </div>
        <div className="self-center">
          {record.note || '-'}
        </div>
      </div>
    </div>
  )
}