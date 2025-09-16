'use client'

import GoogleLoginBtn from "@/components/GoogleLoginBtn";

export default function Register() {

  return (
    <div className="flex justify-center items-center h-dvh">
      <div className="bg-gray-300 max-w-96 w-dvw">
        <GoogleLoginBtn/>
      </div>
    </div>
  )
}