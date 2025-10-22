'use client'

import { fetchApi } from "@/lib/api/api";
import { Price } from "@/types/api";

const BACKEND_URL = (process.env.NEXT_PUBLIC_BACKEND_URL || '').replace(/\/+$/,'')

export async function fetchPrices() {
  try{
    const res = await fetchApi(`${BACKEND_URL}/api/v2/prices`);
    if(!res.ok){
      console.error(await res.json());
      return null;
    }
    const data = await res.json();
    return data;
  } catch(error) {
    console.error(error);
    return null;
  }
}

export async function createPrice(prev_id: string|undefined, next_id: string|undefined) {
  try{
    const res = await fetchApi(`${BACKEND_URL}/api/v2/prices`, {
      method: 'POST',
      body: JSON.stringify({
        prev_id,
        next_id,
        amount: 100,
        bg_color: "#ffffff"
      }),
    });
    if(!res.ok){
      console.error(await res.json());
      return null;
    }
    const data = await res.json();
    return data;
  } catch(error) {
    console.error(error);
    return null;
  }
}

export async function deletePrice(id: string) {
  try{
    const res = await fetchApi(`${BACKEND_URL}/api/v2/prices/${id}`, {
      method: 'DELETE',
    });
    if(!res.ok){
      console.error(await res.json());
      return false;
    }
    return true;
  } catch(error) {
    console.error(error);
    return false;
  }
}

export async function patchPrice(id: string, price: Price) {
  try{
    const res = await fetchApi(`${BACKEND_URL}/api/v2/prices/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(price),
    });
    if(!res.ok){
      console.error(await res.json());
      return null;
    }
    const data = await res.json();
    return data;
  } catch(error) {
    console.error(error);
    return null;
  }
}