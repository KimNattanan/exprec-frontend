'use client'

import axios from "axios";

const FRONTEND_URL = (process.env.NEXT_PUBLIC_FRONTEND_URL || '').replace(/\/+$/,'')
const BACKEND_URL = (process.env.NEXT_PUBLIC_BACKEND_URL || '').replace(/\/+$/,'')

export async function logoutUser(){
  try{
    await axios.post(FRONTEND_URL+'/api/me/logout');
  } catch(error) {
    console.log(error)
  }
}

export async function deleteUserHandler() {

}

export async function getUser() {
  try{
    const res = await axios.get(FRONTEND_URL+'/api/me');
    return JSON.parse(res.data);
  } catch(error) {
    console.log(error)
    return null
  }
}
export async function fetchPrices() {
  try{
    const res = await axios.get(FRONTEND_URL+'/api/me/prices');
    return JSON.parse(res.data)
  } catch(error) {
    console.log(error)
    return null
  }
}
export async function createPrice(prev_id: string|undefined, next_id: string|undefined) {
  try{
    const res = await axios.post(FRONTEND_URL+'/api/me/prices', {
      prev_id,
      next_id
    });
    return JSON.parse(res.data)
  } catch(error) {
    console.log(error)
    return null
  }
}
export async function deletePrice(id: string) {
  try{
    await axios.delete(FRONTEND_URL+'/api/prices/'+id)
    return false;
  } catch(error) {
    console.log(error)
    return true;
  }
}