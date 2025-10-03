'use client'

import { Category } from "../types/Category";

const FRONTEND_URL = (process.env.NEXT_PUBLIC_FRONTEND_URL || '').replace(/\/+$/,'')
const BACKEND_URL = (process.env.NEXT_PUBLIC_BACKEND_URL || '').replace(/\/+$/,'')

export async function fetchCategories() {
  try{
    const res = await fetch(FRONTEND_URL+'/api/me/categories');
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
    const res = await fetch(FRONTEND_URL+'/api/me/categories', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        prev_id,
        next_id
      })
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
    const res = await fetch(BACKEND_URL+'/api/v2/categories/'+id, {
      method: 'DELETE'
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
    const res = await fetch(BACKEND_URL+'/api/v2/categories/'+id, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(category)
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