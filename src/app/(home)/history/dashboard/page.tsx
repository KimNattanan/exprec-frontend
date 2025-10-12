'use server'

import { DashboardContextProvider } from "@/components/history/dashboard/DashboardContext"
import DashboardPage from "@/components/history/dashboard/DashboardPage"

export default async function Dashboard() {
  return (
    <>
      <div className="
        w-fit mx-auto 
        font-medium text-bad
        lg:text-8xl
        md:text-7xl
        sm:text-6xl sm:mb-10
        xs:text-5xl xs:mb-6
        text-4xl mb-4
      ">Dashboard</div>
      <DashboardContextProvider>
        <DashboardPage/>
      </DashboardContextProvider>
    </>
  )
}