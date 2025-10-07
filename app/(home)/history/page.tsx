'use server'

import Footer from "@/components/Footer";
import { HistoryContextProvider } from "@/components/history/HistoryContext";
import HistoryEditModeBtn from "@/components/history/HistoryEditModeBtn";
import HistoryPaginator from "@/components/history/HistoryPaginator";
import RecordContainer from "@/components/history/RecordContainer";
import { Suspense } from "react";

export default async function History(){
  return (
    <>
      <div className="text-foreground w-full min-h-dvh xs:px-10 px-4 mb-4">
        <div className="
          w-fit mx-auto 
          font-medium text-bad
          lg:text-8xl
          md:text-7xl
          sm:text-6xl sm:mb-10
          xs:text-5xl xs:mb-6
          text-4xl mt-10 mb-4
        ">History</div>
        <Suspense>
          <HistoryContextProvider>
            <HistoryEditModeBtn/>
              <HistoryPaginator/>
              <RecordContainer/>
              <HistoryPaginator/>
          </HistoryContextProvider>
        </Suspense>
        </div>
      <Footer/>
    </>
  )
}