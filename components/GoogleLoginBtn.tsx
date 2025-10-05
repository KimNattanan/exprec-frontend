'use client';

const BACKEND_URL = (process.env.NEXT_PUBLIC_BACKEND_URL || '').replace(/\/+$/,'')

export default function GoogleLoginBtn() {
  return (
    <a href={`${BACKEND_URL}/api/v2/auth/google/login`}>
      <div
        className="bg-foreground text-background rounded-full p-2 font-medium hover:animate-[pulse_1s_cubic-bezier(0.4,0,0.6,1)_infinite]"
      >
        <div className="border-3 px-12 py-1 rounded-full text-lg">
          Log in / Register with Google
        </div>
      </div>
    </a>
  )
}