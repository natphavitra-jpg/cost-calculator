import { NextRequest, NextResponse } from "next/server";

const REDIS_URL = process.env.UPSTASH_REDIS_REST_URL || "";
const REDIS_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN || "";

async function redisSave(key: string, value: string) {
  const res = await fetch(`${REDIS_URL}/set/${key}`, {
    method: "POST",
    headers: { Authorization: `Bearer ${REDIS_TOKEN}`, "Content-Type": "application/json" },
    body: JSON.stringify(value),
  });
  const data = await res.json();
  if (!res.ok || data.error) throw new Error(`Redis ${res.status}: ${data.error || JSON.stringify(data)}`);
}

export async function POST(req: NextRequest) {
  try {
    if (!REDIS_URL || !REDIS_TOKEN)
      return NextResponse.json({ error: "Redis not configured" }, { status: 500 });
    const body = await req.json();
    await redisSave("cafe_stock_data", JSON.stringify(body));
    return NextResponse.json({ success: true });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
