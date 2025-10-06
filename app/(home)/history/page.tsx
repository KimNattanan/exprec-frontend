import RecordContainer from "@/components/transaction-form/RecordContainer";

export default function History({ searchParams }:{ searchParams: { page?: string } }){
  const page = parseInt(searchParams.page || '1', 10) || 1
  return (
    <RecordContainer page={page}/>
  )
}