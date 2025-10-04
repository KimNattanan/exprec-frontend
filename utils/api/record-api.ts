'use client'

import { Record } from "../types/Record";

const FRONTEND_URL = (process.env.NEXT_PUBLIC_FRONTEND_URL || '').replace(/\/+$/,'')
const BACKEND_URL = (process.env.NEXT_PUBLIC_BACKEND_URL || '').replace(/\/+$/,'')

export async function fetchRecords(page: number) {
  try{
    const res = await fetch(FRONTEND_URL+'/api/me/records?page='+page);
    if(!res.ok){
      console.error(await res.json());
      return null;
    }
    const { data, pagination } = await res.json();
    return { data, pagination };
  } catch(error) {
    console.error(error);
    return null;
  }
}

export async function createRecord(record: Record) {
  try{
    const res = await fetch(FRONTEND_URL+'/api/me/records', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(record)
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

export async function deleteRecord(id: string) {
  try{
    console.log(BACKEND_URL+'/api/v2/records/'+id);
    const res = await fetch(BACKEND_URL+'/api/v2/records/'+id, {
      method: 'DELETE'
    })
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