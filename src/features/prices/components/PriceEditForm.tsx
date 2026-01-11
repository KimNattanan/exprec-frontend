'use client'

import { useState } from "react";
import { IoIosClose } from "react-icons/io";
import { UpdatePriceInput, useUpdatePrice } from "../api/update-price";
import { Price } from "@/types/api";

type Props = {
  price: Price;
  closeForm: ()=>void;
}

const MAX_PRICE = 9999999.99;

export default function PriceEditForm({
  price,
  closeForm,
}: Props) {
  const updatePrice = useUpdatePrice({
    mutationConfig: {
      onSuccess: closeForm,
    },
  });
  const [newPrice, setNewPrice] = useState({
    position: price.position,
    amount: price.amount,
    bg_color: price.bg_color,
  } as UpdatePriceInput);
  const submit = ()=>{
    newPrice.amount = Math.min(MAX_PRICE, Number(newPrice.amount?.toFixed(2)||0));
    newPrice.amount = Math.max(-MAX_PRICE, newPrice.amount);
    updatePrice.mutate({ priceId: price.id, data: newPrice });
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
            disabled={updatePrice.isPending}
          >
            Save
          </button>
          {updatePrice.isError && 
            <div className="text-bad text-sm">{updatePrice.error.message}</div>
          }
        </div>
      </div>
    </div>
  )
}