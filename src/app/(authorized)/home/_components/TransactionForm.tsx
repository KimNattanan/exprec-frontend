'use client'

import { Record } from "@/types/api"
import { ChangeEvent, useRef, useState } from "react"
import { IoIosArrowBack } from "react-icons/io";
import { CiEdit } from "react-icons/ci";
import { MdDone } from "react-icons/md";
import PriceEditForm from "@/features/prices/components/PriceEditForm";
import { formatDateTime, getContrastYIQ } from "@/utils/utils";
import "react-datepicker/dist/react-datepicker.css";
import { usePrices } from "@/features/prices/api/get-prices";
import PriceBox from "@/features/prices/components/PriceBox";
import { useCreatePrice } from "@/features/prices/api/create-prices";
import { useCategories } from "@/features/categories/api/get-categories";
import { useCreateCategory } from "@/features/categories/api/create-category";
import CategoryEditForm from "@/features/categories/components/CategoryEditForm";
import CategoryBox from "@/features/categories/components/CategoryBox";
import { useCreateRecord } from "@/features/records/api/create-record";

const MAX_TAGS = 30;
const NOTE_MAXLENGTH = 50;

export default function TransactionForm() { 
  
  // price, category
  const [createdAt, setCreatedAt] = useState<Date>(new Date());
  const prices = usePrices();
  const createPrice = useCreatePrice({
    mutationConfig: {
      onMutate: ()=>setDeletable(false),
      onSettled: ()=>setDeletable(true),
    }
  });
  const categories = useCategories();
  const createCategory = useCreateCategory({
    mutationConfig: {
      onMutate: ()=>setDeletable(false),
      onSettled: ()=>setDeletable(true),
    }
  });

  const [deletable, setDeletable] = useState(true);
  
  const priceSelectHandler = (i: number) => () => {
    setRecord({ ...record, amount: prices.data?.[i].amount||0 } as Record);
    setPage(page+1);
  }
  const categorySelectHandler = (i: number) => () => {
    setRecord({
      ...record,
      category: categories.data?.[i].title,
      category_bg_color: categories.data?.[i].bg_color,
    } as Record);
    setCreatedAt(new Date());
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
  const createRecord = useCreateRecord({
    mutationConfig: {
      onSuccess: ()=>{
        setRecord({} as Record);
        setPage(0);
        setNote("");
      }
    }
  });
  const [record, setRecord] = useState<Record>({} as Record)

  const submitHandler = ()=>{
    createRecord.mutate({data: { ...record, note: note, created_at: createdAt.toISOString() } as Record})
  }

  // ...
  const [page, setPage] = useState(0)
  const [editMode, setEditMode] = useState(false);
  const [edittingPrice, setEdittingPrice] = useState(-1);
  const [edittingCategory, setEdittingCategory] = useState(-1);
  
  return (
    <>
      {prices.data && edittingPrice != -1 &&
        <PriceEditForm
          price={prices.data[edittingPrice]}
          closeForm={()=>setEdittingPrice(-1)}
        />
      }
      {categories.data && edittingCategory != -1 &&
        <CategoryEditForm
          category={categories.data[edittingCategory]}
          closeForm={()=>setEdittingCategory(-1)}
        />
      }
      <div className="w-full h-[calc(100dvh-4rem)] relative">
        {page != 0 && // back button
          <div
            className="
              fixed z-40
              bg-foreground text-background transition-all duration-1000 rounded-full cursor-pointer shadow-md shadow-foreground/50
              sm:left-16 sm:bottom-16
              xs:text-4xl xs:p-2 xs:left-8 xs:bottom-8
              text-2xl left-4 bottom-4 p-1
            "
            onClick={()=>setPage(page-1)}
          >
            <div className="
              flex items-center justify-center w-fit h-fit
              rounded-full
              xs:p-4 xs:border-3
              p-3 border-2
            ">
              <IoIosArrowBack/>
            </div>
          </div>
        }
        {(page == 0 && !prices.isPending || page == 1 && !categories.isPending) && // edit button
          <div
            className="
              fixed z-40
              bg-foreground text-background transition-all duration-1000 rounded-full cursor-pointer shadow-md shadow-foreground/50
              sm:right-16 sm:bottom-16
              xs:text-4xl xs:p-2 xs:right-8 xs:bottom-8
              text-2xl right-4 bottom-4 p-1
            "
            style={!editMode && (page==0 && prices.data?.length==0 || page==1 && categories.data?.length==0) ? {
              right: '50%',
              bottom: '50%',
              transform: 'translate(50%, 50%)'
            }:{}}
            onClick={()=>setEditMode(!editMode)}
          >
            <div className="
              flex items-center justify-center w-fit h-fit
              rounded-full
              xs:p-4 xs:border-3
              p-3 border-2
            ">
              {editMode ? <MdDone/> : <CiEdit/>}
            </div>
          </div>
        }
        {page == 0 && (
          <div className="flex justify-center items-center h-full flex-wrap">
            {prices.data?.map((v,i)=>(
              <PriceBox
                key={i}
                price={v}
                edit_mode={editMode}
                insertable={prices.data.length < MAX_TAGS && deletable}
                deletable={deletable}
                setDeletable={setDeletable}
                onSelect={priceSelectHandler(i)}
                onEdit={()=>setEdittingPrice(i)}
              />
            ))}
            {editMode && (!prices.data || prices.data.length==0) &&
              <button
                className="
                  flex items-center justify-center
                  bg-good text-white font-medium cursor-pointer rounded-full disabled:opacity-50 disabled:cursor-default
                  xs:text-4xl
                  px-12 text:2xl
                "
                onClick={()=>createPrice.mutate({data: { position: 0 }})}
                disabled={!deletable}
              >add price</button>
            }
          </div>
        )}
        {page == 1 && (
          <div className="flex justify-center items-center h-full flex-wrap">
            {categories.data?.map((v,i)=>(
              <CategoryBox
                key={i}
                category={v}
                edit_mode={editMode}
                insertable={categories.data.length < MAX_TAGS && deletable}
                deletable={deletable}
                setDeletable={setDeletable}
                onSelect={categorySelectHandler(i)}
                onEdit={()=>setEdittingCategory(i)}
              />
            ))}
            {editMode && (!categories.data || categories.data.length==0) &&
              <button
                className="
                  flex items-center justify-center
                  bg-good text-white font-medium cursor-pointer rounded-full disabled:opacity-50 disabled:cursor-default
                  xs:text-4xl
                  px-12 text-2xl
                "
                onClick={()=>createCategory.mutate({data: { position: 0 }})}
                disabled={!deletable}
              >add category</button>
            }
          </div>
        )}
        {page == 2 && (
          <div className="flex flex-col items-center justify-center h-full">
            <div className="
              flex text-foreground3 font-semibold
              xs:text-xl
              text-base mb-2
            ">
              <div className="mr-2">{formatDateTime(createdAt)[0]}</div>
              <div className="mx-2">{formatDateTime(createdAt)[1]}</div>
              <div className="mx-2">{formatDateTime(createdAt)[2]}</div>
              <div className="ml-2">{formatDateTime(createdAt)[3]}</div>
            </div>
            <div className="
              flex my-4 py-4
              border-y-2 border-dashed
              xs:px-12
              px-6
            ">
              <div className="
                mx-4 self-center
                font-medium
                text-lg
              ">Amount:</div>
              <div className="
                mx-4 self-center
                text-shadow-sm text-shadow-foreground/20 font-medium
                text-2xl
              ">{record.amount.toFixed(2)}</div>
            </div>
            <div
              className="
                self-center my-4 w-fit break-all text-center 
                border-1 border-foreground rounded-full
                sm:text-base
                text-xs px-4
              "
              style={{ backgroundColor: record.category_bg_color, color: getContrastYIQ(record.category_bg_color, "#524439", "#ffffff") }}
            >
              {record.category}
            </div>
            <div className="mt-4 font-semibold">Note:</div>
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
                bg-foreground text-background font-medium border-1 rounded-full cursor-pointer disabled:cursor-default disabled:opacity-50 overflow-hidden
                px-10 py-1
              "
              onClick={submitHandler}
              disabled={createRecord.isPending}
            >Submit</button>
            { createRecord.isError && createRecord.error.message }
          </div>
        )}
      </div>
    </>
  )
}
