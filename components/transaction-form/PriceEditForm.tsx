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
  const [newPrice, setNewPrice] = useState({ amount: price.amount, bg_color: price.bg_color })
  const [submitting, setSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState("test to test")
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
    <div
      className="absolute z-10 w-dvw h-[calc(100dvh-4rem)] bg-[rgba(0,0,0,0.5)] flex justify-center items-center"
    >
      <div className="relative bg-white w-96 h-40">
        <div
          className="bg-red-600 absolute text-4xl text-white top-0 right-0 cursor-pointer"
          onClick={closeForm}
        >
          <IoIosClose/>
        </div>
        <div>
          Amount :
          <input
            type="number"
            value={newPrice.amount}
            onChange={(e)=>setNewPrice({ ...newPrice, amount: Number(e.target.value) })}
          />
        </div>
        <div>
          Color : 
          <input
            type="color"
            value={newPrice.bg_color}
            onChange={(e)=>setNewPrice({ ...newPrice, bg_color: e.target.value })}
          />
        </div>
        <button
          className="bg-green-600 text-white disabled:opacity-50 px-4 py-2"
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