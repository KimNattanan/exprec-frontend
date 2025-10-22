'use client'

import { fetchApi } from "@/lib/api/api";
import { Category } from "@/types/api";

const BACKEND_URL = (process.env.NEXT_PUBLIC_BACKEND_URL || '').replace(/\/+$/,'')

export async function fetchCategories() {
  try{
    const res = await fetchApi(`${BACKEND_URL}/api/v2/categories`);
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

export async function createCategory(prev_id: string|undefined, next_id: string|undefined) {
  try{
    const res = await fetchApi(`${BACKEND_URL}/api/v2/categories`, {
      method: 'POST',
      body: JSON.stringify({
        prev_id,
        next_id,
        title: "Untitled",
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

export async function deleteCategory(id: string) {
  try{
    const res = await fetchApi(`${BACKEND_URL}/api/v2/categories/${id}`, {
      method: 'DELETE',
    })
    if(!res.ok){
      console.error(await res.json());
      return false;
    }
    return true;
  } catch(error) {
    console.error(error)
    return false;
  }
}

export async function patchCategory(id: string, category: Category) {
  try{
    const res = await fetchApi(`${BACKEND_URL}/api/v2/categories/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(category),
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