'use client'

import GoogleLoginBtn from "@/components/GoogleLoginBtn";

export default function Login() {
  return (
    <div className="flex justify-center items-center h-dvh">
      <div className="bg-gray-300 max-w-96 w-dvw">
        <div className="m-4 w-fit mx-auto">
          <GoogleLoginBtn/>
        </div>
      </div>
    </div>
  )
}