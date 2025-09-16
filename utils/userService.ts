'use client'

import axios from "axios";
import { redirect } from "next/navigation";
import { createContext } from "vm";

const BACKEND_URL = (process.env.NEXT_PUBLIC_BACKEND_URL || '').replace(/\/+$/,'')

export interface LoginFormState {
  error: string
}
export interface RegisterFormState {
  error: string
}

export const UserContext = createContext();

async function loginUser(email: string, password: string){
  const res = await axios.post(BACKEND_URL+'/auth/signin',{
    email,
    password
  },{ withCredentials: true })
  const user_id = res.data.user_id;
  sessionStorage.setItem('user_id', user_id);
}

export async function loginHandler(prevState: LoginFormState, formData: FormData) {
  try {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    await loginUser(email, password)
  } catch(error) {
    let errorMessage = 'Internal Server Error!!';
    if (axios.isAxiosError(error) && error.response?.data?.error) {
      errorMessage = error.response.data.error as string;
    }
    else console.log(error);
    return {
      error: errorMessage
    }
  }
  redirect('/')
}

export async function registerHandler(prevState: RegisterFormState, formData: FormData) {
  try {
    const email = formData.get('email') as string;
    const name = formData.get('name') as string;
    const password = formData.get('password') as string;
    const res = await axios.post(BACKEND_URL+'/auth/signup',{
      email,
      password,
      name
    })
    await loginUser(email, password);
  } catch(error) {
    let errorMessage = 'Internal Server Error!!';
    if (axios.isAxiosError(error) && error.response?.data?.error) {
      errorMessage = error.response.data.error as string;
    }
    else console.log(error);
    return {
      error: errorMessage
    }
  }
  redirect('/')
}