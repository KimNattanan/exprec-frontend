import { Record } from "@/utils/types/Record";
import { MouseEventHandler } from "react";
import { IoIosClose } from "react-icons/io";

const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export default function RecordBox({ record, editMode, deleteHandler }: { record: Record, editMode: boolean, deleteHandler: MouseEventHandler }) {
  const date = new Date(record.created_at)
  return (
    <div className="border-2 my-2 p-4 relative">
      <div>
        {date.getDate()} {monthNames[date.getMonth()]} {date.getFullYear()}
      </div>
      {editMode &&
        <div
          className="bg-red-600 absolute text-4xl text-white top-0 right-0 cursor-pointer"
          onClick={deleteHandler}
        >
          <IoIosClose/>
        </div>
      }
      <div className="grid grid-cols-[max-content_1fr]">
        <div className="pr-4">
          Amount :
        </div>
        <div>
          {record.amount}
        </div>
        <div className="pr-4">
          Category :
        </div>
        <div>
          {record.category}
        </div>
        <div className="pr-4">
          Note :
        </div>
        <div>
          {record.note || '-'}
        </div>
      </div>
    </div>
  )
}