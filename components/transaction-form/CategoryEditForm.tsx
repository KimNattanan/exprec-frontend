'use client'

import { patchCategory } from "@/utils/api/category-api";
import { Category } from "@/utils/types/Category";
import { Dispatch, SetStateAction, useState } from "react";
import { IoIosClose } from "react-icons/io";

type Props = {
  id: number;
  category: Category;
  setCategories: Dispatch<SetStateAction<Category[]>>;
  closeForm: ()=>void;
}

export default function CategoryEditForm({
  id,
  category,
  setCategories,
  closeForm,
}: Props) {
  const [newCategory, setNewCategory] = useState({ prev_id: category.prev_id, next_id: category.next_id, title: category.title, bg_color: category.bg_color })
  const [submitting, setSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState("wowza")
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
    <div
      className="absolute z-10 w-dvw h-[calc(100dvh-4rem)] bg-[rgba(0,0,0,0.5)] flex justify-center items-center"
    >
      <div className="relative bg-white w-96 h-fit p-12 flex flex-col items-center">
        <div className="grid grid-cols-2 mb-2">
          <div
            className="bg-red-600 absolute text-4xl text-white top-0 right-0 cursor-pointer"
            onClick={closeForm}
            >
            <IoIosClose/>
          </div>
          <div className="my-2 text-center">
            Title :
          </div>
          <div className="flex items-center h-full">
            <input
              className="min-w-0 w-full h-fit border-1 text-center"
              title="title"
              type="text"
              value={newCategory.title}
              onChange={(e)=>setNewCategory({ ...newCategory, title: e.target.value })}
            />
          </div>
          <div className="my-2 text-center">
            Color : 
          </div>
          <div className="flex items-center h-full">
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
          className="bg-green-600 text-white disabled:opacity-50 px-8 py-2 my-2"
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