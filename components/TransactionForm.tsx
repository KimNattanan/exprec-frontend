'use client'

import { Price } from "@/utils/types/Price"
import { createPrice, deletePrice, fetchPrices } from "@/utils/api/price-api";
import { useEffect, useState } from "react"
import PriceBox from "./PriceBox";
import useTagManager from "@/utils/tagManager";
import { Category } from "@/utils/types/Category";
import CategoryBox from "./CategoryBox";
import { createCategory, deleteCategory, fetchCategories } from "@/utils/api/category-api";

export default function TransactionForm() { 
  
  const [prices, setPrices] = useState<Array<Price>>([])
  const [categories, setCategories] = useState<Array<Category>>([])

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
  
  useEffect(()=>{
    priceManager.doFetch();
  },[priceManager])

  return (
    <>
      <div className="bg-teal-100 w-full h-[calc(100dvh-4rem)] flex justify-center content-start">
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
          className="flex items-center justify-center ${'bg-['+bg_color+']'} w-20 h-20 m-2 cursor-pointer"
          onClick={priceManager.insertLastHandler}
        >add price</button>
      </div>
      <div className="bg-teal-200 w-full h-[calc(100dvh-4rem)] flex justify-center content-start">
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
          className="flex items-center justify-center ${'bg-['+bg_color+']'} w-20 h-20 m-2 cursor-pointer"
          onClick={categoryManager.insertLastHandler}
        >add category</button>
      </div>
    </>
  )
}
