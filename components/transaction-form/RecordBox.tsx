import { Record } from "@/types/api";
import { getContrastYIQ } from "@/lib/utils";
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
    <div className="border-2 rounded-xl border-dashed my-4 p-8 relative overflow-hidden">
      {editMode &&
        <div
          className="bg-bad absolute text-4xl text-white top-0 right-0 cursor-pointer"
          onClick={deleteHandler}
        >
          <IoIosClose/>
        </div>
      }
      <div className="flex mb-2 text-foreground3 font-semibold text-xl">
        <div className="mr-2">{date.getDate()}</div>
        <div className="mx-2">{monthNames[date.getMonth()]}</div>
        <div className="mx-2">{date.getFullYear()}</div>
        <div className="ml-2">{formatTime()}</div>
      </div>
      <div className="grid grid-cols-[max-content_1fr] text-2xl">
        <div className="my-4 text-right">
          Amount :
        </div>
        <div className="
          self-center
          text-shadow-sm text-shadow-foreground/20 font-medium
          text-4xl ml-8
        ">
          {record.amount.toFixed(2)}
        </div>
        <div className="my-4 text-right">
          Category :
        </div>
        <div
          className="
            self-center w-fit
            border-1 border-foreground rounded-full
            px-8 ml-8
          "
          style={{ backgroundColor: record.category_bg_color, color: getContrastYIQ(record.category_bg_color, "#171717", "#ffffff") }}
        >
          {record.category}
        </div>
        <div className="my-4 text-right">
          Note :
        </div>
        <div className="self-center ml-8">
          {record.note || '-'}
        </div>
      </div>
    </div>
  )
}