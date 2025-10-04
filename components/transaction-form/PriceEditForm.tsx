'use client'

import { patchPrice } from "@/utils/api/price-api";
import { Price } from "@/utils/types/Price";
import { Dispatch, SetStateAction, useState } from "react";
import { IoIosClose } from "react-icons/io";

type Props = {
  id: number;
  price: Price;
  setPrices: Dispatch<SetStateAction<Price[]>>;
  closeForm: ()=>void;
}

export default function PriceEditForm({
  id,
  price,
  setPrices,
  closeForm,
}: Props) {
  const [newPrice, setNewPrice] = useState({ prev_id: price.prev_id, next_id: price.next_id, amount: price.amount, bg_color: price.bg_color })
  const [submitting, setSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState("")
  const submit = async()=>{
    setSubmitting(true);
    const res = await patchPrice(price.id, newPrice as Price);
    if(!res){
      setSubmitting(false);
      setSubmitMessage("Failed to save");
      return;
    }
    setPrices((prev) => [
      ...prev.slice(0, id),
      { ...price, ...newPrice } as Price,
      ...prev.slice(id + 1)
    ]);
    closeForm();
  }
  return (
    <div className="
      absolute z-10 flex justify-center items-center
      bg-foreground/50
      w-dvw h-[calc(100dvh-4rem)]
    ">
      <div className="
        relative flex flex-col items-center
        bg-background
        w-96 h-fit p-12
      ">
        <div
          className="
            absolute  
            bg-bad text-white cursor-pointer
            text-4xl top-0 right-0
          "
          onClick={closeForm}
        >
          <IoIosClose/>
        </div>
        <div className="grid grid-cols-2 mb-2">
          <div className="
            text-center content-center
            font-medium
            my-2 text-xl
          ">
            Amount :
          </div>
          <div className="flex items-center h-full">
            <input
              className="
                min-w-0 w-full h-fit text-center
                border-1
                text-xl
              "
              title="amount"
              type="number"
              value={newPrice.amount}
              onChange={(e)=>setNewPrice({ ...newPrice, amount: Number(e.target.value) })}
            />
          </div>
          <div className="
            text-center content-center
            font-medium
            my-2 text-xl
          ">
            Color :
          </div>
          <div className="flex items-center h-full">
            <input
              className="min-w-0 w-full h-full"
              title="background color"
              type="color"
              value={newPrice.bg_color}
              onChange={(e)=>setNewPrice({ ...newPrice, bg_color: e.target.value })}
            />
          </div>
        </div>
        <button
          className="
            bg-foreground text-background disabled:opacity-50 cursor-pointer font-medium rounded-full
            px-12 py-2 my-2 text-xl
          "
          onClick={submit}
          disabled={submitting}
        >
          Save
        </button>
        {!submitting && 
          <div className="text-red-500 text-sm">{submitMessage}</div>
        }
      </div>
    </div>
  )
}