'use client'

const FRONTEND_URL = (process.env.NEXT_PUBLIC_FRONTEND_URL || '').replace(/\/+$/,'')

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
    const res = await fetch(FRONTEND_URL+'/api/categories/'+id, {
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