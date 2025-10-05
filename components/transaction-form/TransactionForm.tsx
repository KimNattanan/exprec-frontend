'use client'

import { Price, Category, Record } from "@/types/api"
import { createPrice, deletePrice, fetchPrices } from "@/lib/api/price-api";
import { ChangeEvent, useEffect, useRef, useState } from "react"
import useTagManager from "@/lib/tagManager";
import { createCategory, deleteCategory, fetchCategories } from "@/lib/api/category-api";
import { IoIosArrowBack } from "react-icons/io";
import { createRecord } from "@/lib/api/record-api";
import { CiEdit } from "react-icons/ci";
import { MdDone } from "react-icons/md";
import PriceEditForm from "./PriceEditForm";
import CategoryEditForm from "./CategoryEditForm";
import { getContrastYIQ } from "@/lib/utils";
import TagBox from "./TagBox";


const NOTE_MAXLENGTH = 50;

export default function TransactionForm() { 
  
  // price, category
  const [prices, setPrices] = useState<Array<Price>>([])
  const [categories, setCategories] = useState<Array<Category>>([])
  const [priceFetched, setPriceFetched] = useState(false);
  const [categoryFetched, setCategoryFetched] = useState(false);
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
    setRecord({ ...record, category: categories[i].title, category_bg_color: categories[i].bg_color } as Record);
    setPage(page+1);
  }
  
  // note
  const [note, setNote] = useState<string>()
  const noteTextarea = useRef<HTMLTextAreaElement>(null)
  
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
  
  // submission
  const [record, setRecord] = useState<Record>({} as Record)
  const [submitting, setSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState("")

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
    setNote("");
  }

  // ...
  const [page, setPage] = useState(0)
  const [editMode, setEditMode] = useState(false);
  const [edittingPrice, setEdittingPrice] = useState(-1);
  const [edittingCategory, setEdittingCategory] = useState(-1);
  
  // useEffect
  useEffect(()=>{
    priceManager.doFetch().then(()=>setPriceFetched(true));
    categoryManager.doFetch().then(()=>setCategoryFetched(true));
  },[])
  
  return (
    <>
      {edittingPrice != -1 &&
        <PriceEditForm
          id={edittingPrice}
          price={prices[edittingPrice]}
          setPrices={setPrices}
          closeForm={()=>setEdittingPrice(-1)}
        />
      }
      {edittingCategory != -1 &&
        <CategoryEditForm
          id={edittingCategory}
          category={categories[edittingCategory]}
          setCategories={setCategories}
          closeForm={()=>setEdittingCategory(-1)}
        />
      }
      <div className="w-full h-[calc(100dvh-4rem)] relative">
        {page != 0 && // back button
          <div
            className="
              fixed z-50
              bg-foreground text-background transition-all duration-1000 rounded-full cursor-pointer shadow-md shadow-foreground/50
              text-4xl p-2 left-16 bottom-16
            "
            onClick={()=>setPage(page-1)}
          >
            <div className="
              flex items-center justify-center w-fit h-fit
              rounded-full border-3 p-4
            ">
              <IoIosArrowBack/>
            </div>
          </div>
        }
        {(page == 0 && priceFetched || page == 1 && categoryFetched) && // edit button
          <div
            className="
              fixed z-50
              bg-foreground text-background transition-all duration-1000 rounded-full cursor-pointer shadow-md shadow-foreground/50
              text-4xl p-2
            "
            style={{
              right: !editMode && (page==0 && prices.length==0 || page==1 && categories.length==0) ? '50%' : '4rem',
              bottom: !editMode && (page==0 && prices.length==0 || page==1 && categories.length==0) ? '50%' : '4rem',
              transform: !editMode && (page==0 && prices.length==0 || page==1 && categories.length==0) ? 'translate(50%, 50%)' : undefined
            }}
            onClick={()=>setEditMode(!editMode)}
          >
            <div className="
              flex items-center justify-center w-fit h-fit
              rounded-full border-3 p-4
            ">
              {editMode ? <MdDone/> : <CiEdit/>}
            </div>
          </div>
        }
        {page == 0 && (
          <div className="flex justify-center items-center h-full flex-wrap">
            {prices.map((v,i)=>(
              <TagBox
                key={i}
                edit_mode={editMode}
                value={v.amount.toFixed(2)}
                bg_color={v.bg_color}
                selectHandler={priceSelectHandler(i)}
                deleteHandler={priceManager.deleteHandler(i)}
                insertLeftHandler={priceManager.insertLeftHandler(i)}
                insertRightHandler={priceManager.insertRightHandler(i)}
                editHandler={()=>setEdittingPrice(i)}
              />
            ))}
            {editMode && prices.length == 0 &&
              <button
                className="
                  flex items-center justify-center
                  bg-good text-background font-medium cursor-pointer rounded-full
                  px-12 text-4xl
                "
                onClick={priceManager.insertLastHandler}
              >add price</button>
            }
          </div>
        )}
        {page == 1 && (
          <div className="flex justify-center items-center h-full flex-wrap">
            {categories.map((v,i)=>(
              <TagBox
                key={i}
                edit_mode={editMode}
                value={v.title}
                bg_color={v.bg_color}
                selectHandler={categorySelectHandler(i)}
                deleteHandler={categoryManager.deleteHandler(i)}
                insertLeftHandler={categoryManager.insertLeftHandler(i)}
                insertRightHandler={categoryManager.insertRightHandler(i)}
                editHandler={()=>setEdittingCategory(i)}
              />
            ))}
            {editMode && categories.length == 0 &&
              <button
                className="
                  flex items-center justify-center
                  bg-good text-background font-medium cursor-pointer rounded-full
                  px-12 text-4xl
                "
                onClick={categoryManager.insertLastHandler}
              >add category</button>
            }
          </div>
        )}
        {page == 2 && (
          <div className="flex flex-col items-center justify-center h-full">
            <div className="flex my-4 border-y-2 border-dashed px-12 py-4">
              <div className="
                mx-4 self-center
                select-none font-medium
                text-lg
              ">Amount:</div>
              <div className="
                mx-4 self-center
                text-shadow-sm text-shadow-foreground/20 font-medium
                text-2xl
              ">{record.amount}</div>
            </div>
            <div
              className="self-center my-4 border-1 border-foreground w-fit rounded-full px-4"
              style={{ backgroundColor: record.category_bg_color, color: getContrastYIQ(record.category_bg_color, "#171717", "#ffffff") }}
            >
              {record.category}
            </div>
            <div className="mt-4 font-semibold select-none">Note:</div>
            <textarea
              className="
                mt-2 mb-4 p-2 min-w-0 resize-none
                bg-background2/50 border-1
                w-52 h-fit text-lg
              "
              style={{ scrollbarWidth: "none" }}
              name="note"
              value={note}
              onChange={onNoteChange}
              ref={noteTextarea}
            />
            <button
              className="
                my-4
                bg-foreground text-background font-medium border-1 rounded-full cursor-pointer disabled:cursor-default disabled:opacity-50 overflow-hidden select-none
                px-10 py-1
              "
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
