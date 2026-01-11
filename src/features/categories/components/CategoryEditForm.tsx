'use client'

import { useState } from "react";
import { IoIosClose } from "react-icons/io";
import { UpdateCategoryInput, useUpdateCategory } from "../api/update-category";
import { Category } from "@/types/api";

type Props = {
  category: Category;
  closeForm: ()=>void;
}

export default function CategoryEditForm({
  category,
  closeForm,
}: Props) {
  const updateCategory = useUpdateCategory({
    mutationConfig: {
      onSuccess: closeForm,
    },
  });
  const [newCategory, setNewCategory] = useState({
    position: category.position,
    title: category.title,
    bg_color: category.bg_color,
  } as UpdateCategoryInput);
  const submit = ()=>{
    updateCategory.mutate({ categoryId: category.id, data: newCategory })
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
                  text-xl
                "
                title="title"
                type="number"
                value={newCategory.title}
                onChange={(e)=>setNewCategory({ ...newCategory, title: e.target.value })}
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
                value={newCategory.bg_color}
                onChange={(e)=>setNewCategory({ ...newCategory, bg_color: e.target.value })}
              />
            </div>
          </div>
          <button
            className="
              bg-foreground text-background disabled:opacity-50 disabled:cursor-default cursor-pointer font-medium rounded-full
              px-12 py-1 my-2 text-xl
            "
            onClick={submit}
            disabled={updateCategory.isPending}
          >
            Save
          </button>
          {updateCategory.isError && 
            <div className="text-bad text-sm">{updateCategory.error.message}</div>
          }
        </div>
      </div>
    </div>
  )
}