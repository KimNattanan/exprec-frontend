'use client'

import { Price } from "@/utils/types/Price"
import { createPrice, deletePrice, fetchPrices } from "@/utils/api/price-api";
import { ChangeEvent, useCallback, useEffect, useState } from "react"
import PriceBox from "./PriceBox";
import useTagManager from "@/utils/tagManager";
import { Category } from "@/utils/types/Category";
import CategoryBox from "./CategoryBox";
import { createCategory, deleteCategory, fetchCategories } from "@/utils/api/category-api";
import { Record } from "@/utils/types/Record";


const NOTE_MAXLENGTH = 50;

export default function TransactionForm() { 
  
  const [prices, setPrices] = useState<Array<Price>>([])
  const [categories, setCategories] = useState<Array<Category>>([])
  const [note, setNote] = useState<string>()
  const [record, setRecord] = useState<Record>();

  const priceManager = useTagManager<Price>({
    getTags: ()=>prices,
    setTags: setPrices,
    fetchFunc: fetchPrices,
    createFunc: createPrice,
    deleteFunc: deletePrice,
  })
  const categoryManager = useTagManager<Category>({
    getTags: ()=>categories,
    setTags: setCategories,
    fetchFunc: fetchCategories,
    createFunc: createCategory,
    deleteFunc: deleteCategory,
  })

  const priceSelectHandler = (i: number) => () => setRecord({ ...record, amount: prices[i].amount } as Record)
  const categorySelectHandler = (i: number) => () => setRecord({ ...record, category_id: categories[i].id } as Record)

  const onNoteChange = (e:ChangeEvent<HTMLTextAreaElement>)=>{
    const s = e.target.value;
    if(s.length > NOTE_MAXLENGTH){
      return;
    }
    setNote(s);
  }
  const submitHandler = ()=>{

  }
  
  useEffect(()=>{
    priceManager.doFetch();
  },[])

  return (
    <>
      <div className="bg-teal-100 w-full h-[calc(100dvh-4rem)] flex justify-center">
        {prices.map((v,i)=>(
          <PriceBox
            key={i}
            amount={v.amount}
            bg_color={v.bg_color}
            deleteHandler={priceManager.deleteHandler(i)}
            insertLeftHandler={priceManager.insertLeftHandler(i)}
            insertRightHandler={priceManager.insertRightHandler(i)}
          />
        ))}
        <button
          className="flex items-center justify-center bg-amber-200 w-32 h-32 m-2 cursor-pointer"
          onClick={priceManager.insertLastHandler}
        >add price</button>
      </div>
      <div className="bg-teal-200 w-full h-[calc(100dvh-4rem)] flex justify-center">
        {categories.map((v,i)=>(
          <CategoryBox
            key={i}
            title={v.title}
            bg_color={v.bg_color}
            deleteHandler={categoryManager.deleteHandler(i)}
            insertLeftHandler={categoryManager.insertLeftHandler(i)}
            insertRightHandler={categoryManager.insertRightHandler(i)}
          />
        ))}
        <button
          className="flex items-center justify-center bg-amber-200 w-32 h-32 m-2 cursor-pointer"
          onClick={categoryManager.insertLastHandler}
        >add category</button>
      </div>
      <div className="bg-teal-100 w-full h-[calc(100dvh-4rem)] flex flex-col items-center">
        <div>Note:</div>
        {note}
        <textarea
          className="bg-white min-w-0 w-52 h-52"
          name="note"
          value={note}
          onChange={onNoteChange}
        />
        <button
          className="bg-green-400 p-4 cursor-pointer"
          onClick={submitHandler}
        >Submit</button>
      </div>
    </>
  )
}
