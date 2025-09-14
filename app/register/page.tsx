import Link from "next/link";

export default function Register() {
  return (
    <div className="flex justify-center items-center h-dvh">
      <div className="bg-gray-300 max-w-96 w-dvw">
        <form>
          <div className="m-4 flex">
            <span>Email:</span>
            <input
              className="ml-4 min-w-0 bg-white grow"
              type="email"
              name="email"
            />
          </div>
          <div className="m-4 flex">
            <span>Name:</span>
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
              name="email"
            />
          </div>
          <div className="m-4">
            <button
              className="bg-teal-100 w-full cursor-pointer"
              value='submit'
            >Create account</button>
          </div>
          <div className="m-4 w-fit mx-auto">
            <Link href={'/login'}>Login</Link>
          </div>
        </form>
      </div>
    </div>
  )
}