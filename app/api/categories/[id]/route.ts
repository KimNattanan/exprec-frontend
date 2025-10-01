import { NextRequest, NextResponse } from 'next/server';

const BACKEND_URL = (process.env.NEXT_PUBLIC_BACKEND_URL || '').replace(/\/+$/,'')

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = await params;
  try{
    const res = await fetch(BACKEND_URL+"/api/v2/categories/"+id, {
      method: 'DELETE'
    });
    if(!res.ok){
      throw new Error("Failed to delete category");
    }
    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch(error) {
    console.error(error)
    return NextResponse.json({ error: "Failed to delete category" }, { status: 500 })
  }
}