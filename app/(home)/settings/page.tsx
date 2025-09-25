'use client'

import { deleteUserHandler } from "@/utils/apiService";
import { useState } from "react";

export default function Settings() {

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);

  return (
    <>
      { showDeleteConfirm &&
        <div className="fixed w-dvw h-dvh bg-[rgba(0,0,0,0.5)]">
          <div className="bg-white w-80 p-4 rounded shadow-md fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="mb-4">Are you sure you want to delete your account? This action cannot be undone.</div>
            <div className="flex">
              <button
                className="bg-teal-200 px-4 py-2 rounded hover:bg-teal-300 mr-auto cursor-pointer"
                onClick={()=>setShowDeleteConfirm(false)}
              >Cancel</button>
              <button
                className="bg-red-200 px-4 py-2 rounded hover:bg-red-300 ml-auto cursor-pointer"
                onClick={deleteUserHandler}
              >Confirm</button>
            </div>
          </div>
        </div>
      }
      <div className="p-10">
        <div className="my-4">
          <button
            className="w-fit bg-gray-200 px-4 py-2 rounded-lg border-b-2 cursor-pointer"
            onClick={()=>setShowChangePassword(!showChangePassword)}
          >
            Change Password
          </button>
          { showChangePassword &&
            <div className="mt-4">
              <form action="/api/me/change-password" method="POST" className="flex flex-col max-w-sm">
                <div className="mb-4">
                  <label className="block mb-1">New Password:</label>
                  <input
                    className="w-full border border-gray-300 rounded px-2 py-1"
                    type="password"
                    name="newPassword"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-1">Confirm New Password:</label>
                  <input
                    className="w-full border border-gray-300 rounded px-2 py-1"
                    type="password"
                    name="confirmNewPassword"
                    required
                  />
                </div>
                <button
                  className="w-fit bg-teal-200 px-4 py-2 rounded hover:bg-teal-300 cursor-pointer"
                  type="submit"
                >Update Password</button>
              </form>
            </div>
          }
        </div>
        <div className="my-4">
          <button
            className="w-fit bg-red-200 hover:bg-red-300 px-4 py-2 rounded-lg border-b-2 cursor-pointer"
            onClick={()=>setShowDeleteConfirm(!showDeleteConfirm)}
          >Delete Account</button>
        </div>
      </div>
    </>
  )
}