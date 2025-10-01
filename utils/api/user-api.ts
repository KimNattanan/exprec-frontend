'use client'

import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { Preference } from "../types/Preference";

const FRONTEND_URL = (process.env.NEXT_PUBLIC_FRONTEND_URL || '').replace(/\/+$/,'')

export async function logoutUser(router: AppRouterInstance){
  try{
    const res = await fetch(FRONTEND_URL+'/api/me/logout', {
      method: 'POST'
    });
    if(!res.ok){
      console.error(await res.json());
      return;
    }
    router.refresh();
  } catch(error) {
    console.error(error);
  }
}

export async function deleteUser(router: AppRouterInstance) {
  try{
    const res = await fetch(FRONTEND_URL+'/api/me', {
      method: 'DELETE'
    });
    if(!res.ok){
      console.error(await res.json());
      return false;
    }
    logoutUser(router);
    return true;
  } catch(error) {
    console.error(error);
    return false;
  }
}

export async function getUser() {
  try{
    const res = await fetch(FRONTEND_URL+'/api/me');
    if(!res.ok){
      console.error(await res.json());
      return null;
    }
    return JSON.parse(await res.json());
  } catch(error) {
    console.error(error);
    return null;
  }
}

export async function getUserPreference() {
  try{
    const res = await fetch(FRONTEND_URL+'/api/me/preference');
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
export async function setUserPreference(preference: Preference) {
  try{
    const res = await fetch(FRONTEND_URL+'/api/me/preference',{
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(preference)
    });
    if(!res.ok){
      console.error(await res.json());
      return null;
    }
    const data = res.json();
    return data;
  } catch(error) {
    console.error(error);
    return null;
  }
}