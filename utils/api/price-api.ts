'use client'

const FRONTEND_URL = (process.env.NEXT_PUBLIC_FRONTEND_URL || '').replace(/\/+$/,'')

export async function fetchPrices() {
  try{
    const res = await fetch(FRONTEND_URL+'/api/me/prices');
    if(!res.ok){
      console.error(await res.json());
      return false;
    }
    return await res.json()
  } catch(error) {
    console.error(error)
    return null
  }
}

export async function createPrice(prev_id: string|undefined, next_id: string|undefined) {
  try{
    const res = await fetch(FRONTEND_URL+'/api/me/prices', {
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
      return false;
    }
    return await res.json()
  } catch(error) {
    console.error(error)
    return null
  }
}

export async function deletePrice(id: string) {
  try{
    const res = await fetch(FRONTEND_URL+'/api/prices/'+id, {
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