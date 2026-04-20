import { NextRequest, NextResponse } from "next/server";

const REDIS_URL = process.env.UPSTASH_REDIS_REST_URL || "";
const REDIS_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN || "";

async function redisPipeline(cmds: any[][]) {
  const res = await fetch(`${REDIS_URL}/pipeline`, {
    method: "POST",
    headers: { Authorization: `Bearer ${REDIS_TOKEN}`, "Content-Type": "application/json" },
    body: JSON.stringify(cmds),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(`Redis ${res.status}: ${JSON.stringify(data)}`);
  return data;
}

export async function GET() {
  try {
    if (!REDIS_URL || !REDIS_TOKEN)
      return NextResponse.json({ error: "Redis not configured" }, { status: 500 });
    const data = await redisPipeline([["GET", "cafe_stock_data"]]);
    const raw = data[0]?.result;
    if (!raw) return NextResponse.json({ error: "no data" }, { status: 404 });
    const parsed = typeof raw === "string" ? JSON.parse(raw) : raw;
    return NextResponse.json(parsed);
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    if (!REDIS_URL || !REDIS_TOKEN)
      return NextResponse.json({ error: "Redis not configured" }, { status: 500 });
    const body = await req.json();
    await redisPipeline([["SET", "cafe_stock_data", JSON.stringify(body)]]);
    return NextResponse.json({ success: true });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
