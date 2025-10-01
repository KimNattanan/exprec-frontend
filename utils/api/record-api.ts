'use client'

import { Record } from "../types/Record";

const FRONTEND_URL = (process.env.NEXT_PUBLIC_FRONTEND_URL || '').replace(/\/+$/,'')

export async function fetchRecords() {
  try{
    const res = await fetch(FRONTEND_URL+'/api/me/records');
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
    const res = await fetch(FRONTEND_URL+'/api/records/'+id, {
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