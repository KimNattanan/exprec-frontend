'use client';

import axios from "axios";

const BACKEND_URL = (process.env.NEXT_PUBLIC_BACKEND_URL || '').replace(/\/+$/,'')

export default function GoogleLoginBtn() {

  const onClick = async () => {
    try {
      axios.get(BACKEND_URL+'/auth/google/login',{
        withCredentials: true
      })
    } catch(error) {
      console.log(error);
    }
  }

  return (
    <a href={BACKEND_URL+'/auth/google/login'}>
      <div
        className="bg-white text-black px-4 py-2 rounded shadow hover:bg-gray-100 w-full text-center"
      >
        Sign in / Sign up with Google
      </div>
    </a>
  )
}