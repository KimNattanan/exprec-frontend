'use server'

import { HistoryContextProvider } from "@/components/history/HistoryContext";
import HistoryEditModeBtn from "@/components/history/HistoryEditModeBtn";
import RecordContainer from "@/components/history/RecordContainer";
import Link from "next/link";
import { Suspense } from "react";

export default async function History(){
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
      ">History</div>
      <Suspense>
        <HistoryContextProvider>
          <HistoryEditModeBtn/>
          <div className="sm:ml-8 ml-4 my-4">
            <Link href={"/history/dashboard"} className="
              rounded-full bg-foreground3 text-white w-fit font-medium
              sm:text-base
              text-xs px-8 py-1
            ">
              See dashboard
            </Link>
          </div>
          <RecordContainer/>
        </HistoryContextProvider>
      </Suspense>
    </>
  )
}