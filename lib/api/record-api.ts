'use client'

import { Record } from "@/types/api";

const BACKEND_URL = (process.env.NEXT_PUBLIC_BACKEND_URL || '').replace(/\/+$/,'')

export async function fetchRecords(page: number) {
  try{
    const res = await fetch(`${BACKEND_URL}/api/v2/records?page=${page}`,{
      method: "GET",
      credentials: "include",
    });
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
    const res = await fetch(`${BACKEND_URL}/api/v2/records`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(record),
      credentials: 'include',
    });
    const data = await res.json();
    if(!res.ok){
      return { data: null, error: data.error};
    }
    return { data, error: '' };
  } catch(error) {
    console.error(error);
    return { data: null, error: 'Network error' };
  }
}

export async function deleteRecord(id: string) {
  try{
    const res = await fetch(`${BACKEND_URL}/api/v2/records/${id}`, {
      method: 'DELETE',
      credentials: "include",
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