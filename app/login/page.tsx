'use client'

import Link from "next/link";
import { useActionState } from "react";
import { loginHandler } from "@/utils/userService";

interface LoginState {
  error: string
}

export default function Login() {

  const [loginState, loginAction, loginPending] = useActionState<LoginState, FormData>(loginHandler,{error:''});

  return (
    <div className="flex justify-center items-center h-dvh">
      <div className="bg-gray-300 max-w-96 w-dvw">
        <form action={loginAction}>
          <div className="m-4 flex">
            <span>Email:</span>
            <input
              className="ml-4 min-w-0 bg-white grow"
              type="email"
              name="email"
            />
          </div>
          <div className="m-4 flex">
            <span>Password:</span>
            <input
              className="ml-4 min-w-0 bg-white grow"
              type="password"
              name="password"
            />
          </div>
          {
            !loginPending && loginState.error != '' && (
            <div className="text-red-700 m-4 text-sm">
              {loginState.error}
            </div>
            )
          }
          <div className="m-4">
            <button
              className="bg-teal-100 w-full cursor-pointer disabled:cursor-default disabled:opacity-50"
              value='submit'
              disabled={loginPending}
            >Login</button>
          </div>
          <div className="m-4 w-fit mx-auto">
            <Link href={'/register'}>Create new account</Link>
          </div>
        </form>
      </div>
    </div>
  )
}