'use client'

import { Price } from "@/utils/types/Price"
import { createPrice, deletePrice, fetchPrices } from "@/utils/api/price-api";
import { ChangeEvent, useActionState, useEffect, useRef, useState } from "react"
import PriceBox from "./PriceBox";
import useTagManager from "@/utils/tagManager";
import { Category } from "@/utils/types/Category";
import CategoryBox from "./CategoryBox";
import { createCategory, deleteCategory, fetchCategories } from "@/utils/api/category-api";
import { Record } from "@/utils/types/Record";
import { IoIosArrowBack } from "react-icons/io";
import { createRecord } from "@/utils/api/record-api";


const NOTE_MAXLENGTH = 50;

export default function TransactionForm() { 
  
  const [prices, setPrices] = useState<Array<Price>>([])
  const [categories, setCategories] = useState<Array<Category>>([])
  const [note, setNote] = useState<string>()
  const [record, setRecord] = useState<Record>();
  const [page, setPage] = useState(0)
  const [submitting, setSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  
  const noteTextarea = useRef<HTMLTextAreaElement>(null);

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

  const priceSelectHandler = (i: number) => () => {
    setRecord({ ...record, amount: prices[i].amount } as Record);
    setPage(page+1);
  }
  const categorySelectHandler = (i: number) => () => {
    setRecord({ ...record, category: categories[i].title } as Record);
    setPage(page+1);
  }

  const onNoteChange = (e:ChangeEvent<HTMLTextAreaElement>)=>{
    const s = e.target.value;
    if(s.length > NOTE_MAXLENGTH){
      return;
    }
    setNote(s);
    if(noteTextarea.current){
      noteTextarea.current.style.height = "auto";
      noteTextarea.current.style.height = noteTextarea.current.scrollHeight + "px";
    }
  }
  const submitHandler = async ()=>{
    setSubmitting(true);
    const ok = await createRecord({ ...record, note: note } as Record);
    setSubmitting(false);
    if(!ok){
      setSubmitMessage("Failed to submit record")
      return;
    }
    setRecord({} as Record);
    setPage(0);
    setSubmitMessage("");
  }
  
  useEffect(()=>{
    priceManager.doFetch();
    categoryManager.doFetch();
  },[])

  return (
    <>
      <div className="bg-teal-100 w-full h-[calc(100dvh-4rem)] relative overflow-hidden">
        {page != 0 &&
          <div
            className="fixed bg-gray-600 rounded-full aspect-square text-white flex items-center justify-center w-fit h-fit text-xl p-2 cursor-pointer"
            onClick={()=>setPage(page-1)}
          >
            <IoIosArrowBack/>
          </div>
        }
        {page == 0 && (
          <div className="flex justify-center">
            {prices.map((v,i)=>(
              <PriceBox
                key={i}
                amount={v.amount}
                bg_color={v.bg_color}
                deleteHandler={priceManager.deleteHandler(i)}
                insertLeftHandler={priceManager.insertLeftHandler(i)}
                insertRightHandler={priceManager.insertRightHandler(i)}
                selectHandler={priceSelectHandler(i)}
              />
            ))}
            <button
              className="flex items-center justify-center bg-amber-200 w-32 h-32 m-2 cursor-pointer"
              onClick={priceManager.insertLastHandler}
            >add price</button>
          </div>
        )}
        {page == 1 && (
          <div className="flex justify-center">
            {categories.map((v,i)=>(
              <CategoryBox
                key={i}
                title={v.title}
                bg_color={v.bg_color}
                deleteHandler={categoryManager.deleteHandler(i)}
                insertLeftHandler={categoryManager.insertLeftHandler(i)}
                insertRightHandler={categoryManager.insertRightHandler(i)}
                selectHandler={categorySelectHandler(i)}
              />
            ))}
            <button
              className="flex items-center justify-center bg-amber-200 w-32 h-32 m-2 cursor-pointer"
              onClick={categoryManager.insertLastHandler}
            >add category</button>
          </div>
        )}
        {page == 2 && (
          <div className="flex flex-col items-center pt-20 h-full">
            <div className="grid grid-cols-2">
              <div className="p-2">
                <b>amount:</b>
              </div>
              <div className="p-2">{record?.amount}</div>
              <div className="p-2">
                <b>category:</b>
              </div>
              <div className="p-2">{record?.category}</div>
            </div>
            <div className="m-2"><b>Note:</b></div>
            <textarea
              className="m-2 bg-white min-w-0 w-52 h-fit resize-none"
              name="note"
              value={note}
              onChange={onNoteChange}
              ref={noteTextarea}
            />
            <button
              className="bg-green-600 text-white m-2 p-4 cursor-pointer disabled:cursor-default disabled:opacity-50"
              onClick={submitHandler}
              disabled={submitting}
            >Submit</button>
            {submitMessage}
          </div>
        )}
      </div>
    </>
  )
}
