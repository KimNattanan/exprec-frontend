'use client';

const BACKEND_URL = (process.env.NEXT_PUBLIC_BACKEND_URL || '').replace(/\/+$/,'')

export default function GoogleLoginBtn() {
  return (
    <a href={`${BACKEND_URL}/api/v2/auth/google/login`}>
      <div className="
        bg-foreground text-background rounded-full font-medium
        hover:animate-[pulse_1s_cubic-bezier(0.4,0,0.6,1)_infinite] w-fit
        lg:p-2
        p-1
      ">
        <div className="
          rounded-full py-1
          lg:px-12 lg:text-lg lg:border-3
          md:text-sm
          sm:px-9 sm:text-sm sm:border-2
          xs:text-base
          border-2 px-12 text-sm
        ">
          Log in / Register with Google
        </div>
      </div>
    </a>
  )
}