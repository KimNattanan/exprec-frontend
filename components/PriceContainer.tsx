'use client'

import { Price } from "@/utils/types/Price"
import { createPrice, getPrices } from "@/utils/service";
import { useEffect, useState } from "react"
import PriceBox from "./PriceBox";

export default function PriceContainer() { 
  
  const [prices, setPrices] = useState<Array<Price>>([]);
  
  useEffect(()=>{
    const fetchData = async()=>{
      const res = await getPrices() as Array<Price>
      console.log(res)
      const arr = []
      let x = res.find(price => !price.prev_id)
      while(x){
        x.user_id = ''
        arr.push(x)
        if(!x.next_id) break
        x = res.find(price => price.id == (x ? x.next_id : ''));
      }
      setPrices(arr)
    }
    fetchData();
  },[])

  const insertPrice = async(prev_id: string|undefined, next_id: string|undefined)=>{
    if(!prev_id && !next_id){
      if(prices.length){
        const price = await createPrice(prices[prices.length-1].id, undefined) as Price|null
        if(!price) return
        const prev = prices[prices.length-1]
        setPrices([...prices.slice(0, -1),{
          user_id: '',
          id: prev.id,
          prev_id: prev.prev_id,
          next_id: price.id,
          amount: prev.amount,
          bg_color: prev.bg_color
        }, {
          user_id: '',
          id: price.id,
          prev_id: price.prev_id,
          next_id: price.next_id,
          amount: price.amount,
          bg_color: price.bg_color
        }])
      } else {
        const price = await createPrice(undefined, undefined) as Price|null
        if(!price) return
        setPrices([{
          user_id: '',
          id: price.id,
          prev_id: price.prev_id,
          next_id: price.next_id,
          amount: price.amount,
          bg_color: price.bg_color
        }])
      }
    }else if(prev_id){
      const previ = prices.findIndex(price => price.id===prev_id)
      if(previ == -1) return
      const prevPrice = prices[previ]
      
      const price = await createPrice(prev_id, prices[previ].next_id) as Price|null
      if(!price) return

      const nexti = prices.findIndex(price => price.id===prices[previ].next_id)
      const nextPrice = nexti==-1 ? null : prices[nexti]
      
      prevPrice.next_id = price.id
      if(nextPrice){
        nextPrice.prev_id = price.id
        setPrices([
          ...prices.slice(0,previ),
          prevPrice,
          {
            user_id: '',
            id: price.id,
            prev_id: price.prev_id,
            next_id: price.next_id,
            amount: price.amount,
            bg_color: price.bg_color
          },
          nextPrice,
          ...prices.slice(nexti+1,prices.length)
        ])
      }else{
        setPrices([
          ...prices.slice(0,previ),
          prevPrice,
          {
            user_id: '',
            id: price.id,
            prev_id: price.prev_id,
            next_id: price.next_id,
            amount: price.amount,
            bg_color: price.bg_color
          }
        ])
      }
    }
  }
  const deletePrice = async(id: string)=>{
    
  }

  return (
    <div className="bg-teal-100 w-full h-[calc(100dvh-4rem)] flex justify-center flex-wrap content-start">
      {prices.map((v,i)=>(
        <PriceBox id={v.id} amount={v.amount} bg_color={v.bg_color} key={i}/>
      ))}
      <button
        className="flex items-center justify-center ${'bg-['+bg_color+']'} w-20 h-20 m-2 cursor-pointer"
        onClick={()=>insertPrice(undefined, undefined)}
      >add price</button>
    </div>
  )
}