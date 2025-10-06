import RecordContainer from "@/components/transaction-form/RecordContainer";
import { Suspense } from "react";

export default function History(){
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RecordContainer/>
    </Suspense>
  )
}