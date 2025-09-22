'use client';

const BACKEND_URL = (process.env.NEXT_PUBLIC_BACKEND_URL || '').replace(/\/+$/,'')

export default function GoogleLoginBtn() {
  return (
    <a href={BACKEND_URL+'/api/v2/auth/google/login'}>
      <div
        className="bg-white text-black px-4 py-2 rounded shadow hover:bg-gray-100 w-full text-center"
      >
        Sign in / Sign up with Google
      </div>
    </a>
  )
}