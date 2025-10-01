import { Record } from "@/utils/types/Record";

export default function RecordBox({record}:{record:Record}) {
  return (
    <div>
      <div>
        {record.created_at.toString()}
      </div>
      <div>
        {record.amount}
      </div>
      <div>
        {record.category}
      </div>
      <div>
        {record.note}
      </div>
    </div>
  )
}