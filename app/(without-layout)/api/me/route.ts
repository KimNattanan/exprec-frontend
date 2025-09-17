import axios from "axios";

const BACKEND_URL = (process.env.NEXT_PUBLIC_BACKEND_URL || '').replace(/\/+$/,'')

export async function GET(req: Request) {
  const userId = req.headers.get("x-user-id");
  if (!userId) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
  }
  try{
    const res = await axios.get(BACKEND_URL + '/api/v1/users/'+userId);
    return new Response(JSON.stringify(res.data), { status: 200 });
  } catch(error) {
    console.log(error);
    return new Response(JSON.stringify({ error: "Failed to fetch user" }), { status: 500 });
  }
}