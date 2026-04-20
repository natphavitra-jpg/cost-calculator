import { NextResponse } from "next/server";

const REDIS_URL = process.env.UPSTASH_REDIS_REST_URL || "";
const REDIS_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN || "";

export async function GET() {
  if (!REDIS_URL || !REDIS_TOKEN)
    return NextResponse.json({ error: "env vars missing", REDIS_URL: !!REDIS_URL, REDIS_TOKEN: !!REDIS_TOKEN });

  try {
    const res = await fetch(`${REDIS_URL}/get/cafe_stock_data`, {
      headers: { Authorization: `Bearer ${REDIS_TOKEN}` },
    });
    const raw = await res.text();
    let parsed: any = null;
    try { parsed = JSON.parse(raw); } catch {}

    return NextResponse.json({
      status: res.status,
      raw_response: raw.slice(0, 500),
      result_type: parsed ? typeof parsed.result : "n/a",
      result_length: parsed?.result ? String(parsed.result).length : 0,
      has_data: !!parsed?.result,
    });
  } catch (e: any) {
    return NextResponse.json({ error: e.message });
  }
}
