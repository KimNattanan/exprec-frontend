'use server'

import axios from "axios";
import { redirect } from "next/navigation";

const BACKEND_URL = (process.env.NEXT_PUBLIC_BACKEND_URL || '').replace(/\/+$/,'')

export interface LoginFormState {
  error: string
}
export interface RegisterFormState {
  error: string
}

async function loginUser(email: string, password: string){
  const res = await axios.post(BACKEND_URL+'/auth/signin',{
    email,
    password
  },{ withCredentials: true })
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

export async function logoutUser(){

}

export async function deleteUserHandler() {

}

export async function getUser() {
  try{
    const res = await axios.get('/api/me');
    return res.data;
  } catch(error) {
    console.log(error)
    return null
  }
}