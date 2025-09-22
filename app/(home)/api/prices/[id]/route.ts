import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

const BACKEND_URL = (process.env.NEXT_PUBLIC_BACKEND_URL || '').replace(/\/+$/,'')

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  console.log(BACKEND_URL + "/api/v2/prices/"+id,"!!")
  try{
    await axios.delete(BACKEND_URL + "/api/v2/prices/"+id)
    return NextResponse.json({ success: true })
  } catch(error) {
    console.log(error)
    return NextResponse.json({ error: "Failed to delete price" }, { status: 500 })
  }
}