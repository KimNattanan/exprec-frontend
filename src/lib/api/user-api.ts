'use client'

import { fetchApi } from "@/lib/api/api";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { Preference, User } from "@/types/api";

const FRONTEND_URL = (process.env.NEXT_PUBLIC_FRONTEND_URL || '').replace(/\/+$/,'')
const BACKEND_URL = (process.env.NEXT_PUBLIC_BACKEND_URL || '').replace(/\/+$/,'')

export async function getUserFromBackend(){
  try{
    const res = await fetchApi(`${BACKEND_URL}/api/v2/me`);
    if(!res.ok){
      return ''
    }
    const { email }: User = await res.json()
    return email
  }catch(error){
    console.error(error)
    return ''
  }
}

export async function getUser() {
  try{
    const res = await fetch(`${FRONTEND_URL}/api/me`);
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

export async function logoutUser(router: AppRouterInstance){
  try{
    const res = await fetchApi(`${BACKEND_URL}/api/v2/auth/logout`, {
      method: 'POST',
      credentials: 'include'
    });
    if(!res.ok){
      console.error(await res.json());
      return;
    }
    sessionStorage.removeItem('access_token');
    router.refresh();
  } catch(error) {
    console.error(error);
  }
}

export async function deleteUser(router: AppRouterInstance) {
  try{
    const res = await fetchApi(`${BACKEND_URL}/api/v2/users`, {
      method: 'DELETE',
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

export async function getUserPreference() {
  try{
    const res = await fetchApi(`${BACKEND_URL}/api/v2/preferences`);
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
    const res = await fetchApi(`${BACKEND_URL}/api/v2/preferences`,{
      method: 'PATCH',
      body: JSON.stringify(preference),
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