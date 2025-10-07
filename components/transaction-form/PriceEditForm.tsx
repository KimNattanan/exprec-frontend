'use client'

import { patchPrice } from "@/lib/api/price-api";
import { Price } from "@/types/api";
import { Dispatch, SetStateAction, useState } from "react";
import { IoIosClose } from "react-icons/io";

type Props = {
  id: number;
  price: Price;
  setPrices: Dispatch<SetStateAction<Price[]>>;
  closeForm: ()=>void;
}

const MAX_PRICE = 9999999.99;

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
    newPrice.amount = Math.min(MAX_PRICE, Number(newPrice.amount.toFixed(2)));
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
      fixed z-50 flex justify-center items-center
      bg-foreground/50
      w-dvw h-[calc(100dvh-4rem)]
    ">
      <div className="bg-background shadow-md p-4">
        <div className="
          relative flex flex-col items-center h-fit
          xs:w-96 xs:px-12
          w-72 pt-12 pb-6 px-2
        ">
          <div
            className="
              absolute  
              bg-foreground3 hover:bg-foreground transition-all duration-400 text-background rounded-full cursor-pointer overflow-hidden
              text-4xl top-0 right-0
            "
            onClick={closeForm}
          >
            <IoIosClose/>
          </div>
          <div className="grid grid-cols-[max-content_1fr] mb-2">
            <div className="
              text-end content-center
              font-medium
              my-2 text-xl
            ">
              Amount :
            </div>
            <div className="flex items-center h-full ml-4">
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
                onWheel={(e: React.WheelEvent<HTMLInputElement>)=>{(e.target as HTMLInputElement).blur()}}
              />
            </div>
            <div className="
              text-end content-center
              font-medium
              my-2 text-xl
            ">
              Color :
            </div>
            <div className="flex items-center h-full ml-4">
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
              bg-foreground text-background disabled:opacity-50 disabled:cursor-default cursor-pointer font-medium rounded-full
              px-12 py-1 my-2 text-xl
            "
            onClick={submit}
            disabled={submitting}
          >
            Save
          </button>
          {!submitting && 
            <div className="text-bad text-sm">{submitMessage}</div>
          }
        </div>
      </div>
    </div>
  )
}