'use client'

import { fetchApi } from "@/lib/api/api";
import { DashboardData, Record } from "@/types/api";

const BACKEND_URL = (process.env.NEXT_PUBLIC_BACKEND_URL || '').replace(/\/+$/,'')

export async function fetchRecords(page: number) {
  try{
    const res = await fetchApi(`${BACKEND_URL}/api/v2/records?page=${page}`);
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
    const res = await fetchApi(`${BACKEND_URL}/api/v2/records`, {
      method: 'POST',
      body: JSON.stringify(record),
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
    const res = await fetchApi(`${BACKEND_URL}/api/v2/records/${id}`, {
      method: 'DELETE',
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

export async function fetchDashboardData(timeStart: string, timeEnd: string) {
  try{
    const res = await fetchApi(`${BACKEND_URL}/api/v2/records/dashboard-data?timeStart=${timeStart}&timeEnd=${timeEnd}`);
    if(!res.ok){
      console.error(await res.json());
      return null;
    }
    const data = await res.json();
    const dashboardData: DashboardData = {
      total_amount: data.total_amount,
      amount_by_category: new Map<string,number>(Object.entries(data.amount_by_category)),
      category_color: new Map<string,string>(Object.entries(data.category_color)),
      records: data.records as Record[],
    }
    return dashboardData;
  } catch(error) {
    console.error(error);
    return null;
  }
}