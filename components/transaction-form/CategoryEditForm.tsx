'use client'

import { patchCategory } from "@/lib/api/category-api";
import { Category } from "@/types/api";
import { Dispatch, SetStateAction, useState } from "react";
import { IoIosClose } from "react-icons/io";

type Props = {
  id: number;
  category: Category;
  setCategories: Dispatch<SetStateAction<Category[]>>;
  closeForm: ()=>void;
}

const MAX_LENGTH = 50;

export default function CategoryEditForm({
  id,
  category,
  setCategories,
  closeForm,
}: Props) {
  const [newCategory, setNewCategory] = useState({ prev_id: category.prev_id, next_id: category.next_id, title: category.title, bg_color: category.bg_color })
  const [submitting, setSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState("")
  const submit = async()=>{
    setSubmitting(true);
    const res = await patchCategory(category.id, newCategory as Category);
    if(!res){
      setSubmitting(false);
      setSubmitMessage("Failed to save");
      return;
    }
    setCategories((prev) => [
      ...prev.slice(0, id),
      { ...category, ...newCategory } as Category,
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
              Title :
            </div>
            <div className="flex items-center h-full ml-4">
              <input
                className="
                  min-w-0 w-full h-fit text-center
                  border-1
                  xs:text-xl
                "
                title="title"
                type="text"
                value={newCategory.title}
                onChange={(e)=>{
                  if(e.target.value.length > MAX_LENGTH) return;
                  setNewCategory({ ...newCategory, title: e.target.value })
                }}
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
                value={newCategory.bg_color}
                onChange={(e)=>setNewCategory({ ...newCategory, bg_color: e.target.value })}
              />
            </div>
          </div>
          <button
            className="
              bg-foreground text-background disabled:opacity-50 cursor-pointer font-medium rounded-full
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