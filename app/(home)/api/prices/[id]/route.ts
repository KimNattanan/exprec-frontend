import { NextRequest, NextResponse } from 'next/server';

const BACKEND_URL = (process.env.NEXT_PUBLIC_BACKEND_URL || '').replace(/\/+$/,'')

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = await params;
  try{
    const res = await fetch(BACKEND_URL+"/api/v2/prices/"+id, {
      method: 'DELETE'
    });
    if(!res.ok){
      throw new Error(await res.text());
    }
    return NextResponse.json({ success: true })
  } catch(error) {
    console.log(error)
    return NextResponse.json({ error: "Failed to delete price" }, { status: 500 })
  }
}