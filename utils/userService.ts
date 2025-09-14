import axios from "axios";
import { redirect } from "next/navigation";

const BACKEND_URL = (process.env.NEXT_PUBLIC_BACKEND_URL || '').replace(/\/+$/,'')

interface LoginState {
  error: string
}

export async function loginHandler(prevState: LoginState, formData: FormData) {
  try {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const res = await axios.post(BACKEND_URL+'/auth/signin',{
      email,
      password
    },{ withCredentials: true })
  } catch(error) {
    return {
      error: 'Email or password is incorrect.'
    }
  }
  redirect('/')
}