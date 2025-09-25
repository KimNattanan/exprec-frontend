'use client'

const FRONTEND_URL = (process.env.NEXT_PUBLIC_FRONTEND_URL || '').replace(/\/+$/,'')

export async function logoutUser(){
  try{
    const res = await fetch(FRONTEND_URL+'/api/me/logout', {
      method: 'POST'
    });
    if(!res.ok){
      console.error(await res.json());
      return false;
    }
  } catch(error) {
    console.error(error)
  }
}

export async function deleteUserHandler() {

}

export async function getUser() {
  try{
    const res = await fetch(FRONTEND_URL+'/api/me')
    if(!res.ok){
      console.error(await res.json());
      return false;
    }
    return JSON.parse(await res.json());
  } catch(error) {
    console.error(error)
    return null
  }
}