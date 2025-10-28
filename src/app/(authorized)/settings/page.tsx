'use client'

import Footer from "@/components/Footer";
import { deleteUser, logoutUser } from "@/lib/api/user-api";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Settings() {

  const router = useRouter()

  const [showDeleteUserConfirm, setShowDeleteUserConfirm] = useState(false)
  const [deletingUser, setDeletingUser] = useState(false)
  const [loggingOut, setLoggingOut] = useState(false)

  const userDeleteHandler = async()=>{
    setDeletingUser(true);
    await deleteUser(router);
    setDeletingUser(false);
  }
  const logoutHandler = async()=>{
    setLoggingOut(true);
    await logoutUser(router);
    setLoggingOut(false);
  }

  return (
    <>
      { showDeleteUserConfirm &&
        <div className="fixed w-dvw h-dvh bg-foreground/50">
          <div className="
            fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
            bg-background shadow-md
            w-80 p-4
          ">
            <div className="mb-4">Are you sure you want to delete your account? This action cannot be undone.</div>
            <div className="flex">
              <button
                className="
                  mr-auto h-fit
                  bg-good text-white rounded-full cursor-pointer font-medium
                  px-8 py-1
                "
                onClick={()=>setShowDeleteUserConfirm(false)}
              >Cancel</button>
              <button
                className="
                  ml-auto h-fit
                  bg-bad text-white rounded-full cursor-pointer disabled:opacity-50 disabled:cursor-default font-medium
                  px-8 py-1
                "
                onClick={userDeleteHandler}
                disabled={deletingUser}
              >Confirm</button>
            </div>
          </div>
        </div>
      }
      <div className="p-10 min-h-screen">
        <div className="my-4">
          <button
            className="
              w-fit
              bg-foreground3 text-background rounded-full cursor-pointer font-medium disabled:opacity-50 disabled:cursor-default
              px-12 py-1
            "
            onClick={logoutHandler}
            disabled={loggingOut}
          >Logout</button>
        </div>
        <div className="my-4">
          <button
            className="
              w-fit
              bg-bad text-background rounded-full cursor-pointer font-medium
              px-12 py-1
            "
            onClick={()=>setShowDeleteUserConfirm(!showDeleteUserConfirm)}
          >Delete Account</button>
        </div>
      </div>
      <Footer/>
    </>
  )
}