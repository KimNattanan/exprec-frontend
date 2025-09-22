import { deletePrice } from "@/utils/service";

export default function PriceBox(
  {id, amount, bg_color} :
  {id: string, amount: number, bg_color: string})
{
  return (
    <div className={`flex items-center justify-center ${'bg-['+bg_color+']'} w-20 h-20 m-2 cursor-pointer`}>
      <div>{amount}</div>
      <button onClick={()=>deletePrice(id)}>delete</button>
    </div>
  )
}