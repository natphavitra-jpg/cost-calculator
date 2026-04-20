import { NextRequest, NextResponse } from "next/server";

const REDIS_URL = process.env.UPSTASH_REDIS_REST_URL || "";
const REDIS_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN || "";

function todayKey() {
  const d = new Date();
  // Bangkok time = UTC+7
  const bkk = new Date(d.getTime() + 7 * 60 * 60 * 1000);
  return bkk.toISOString().slice(0, 10);
}

async function redisPipeline(cmds: any[][]) {
  const res = await fetch(`${REDIS_URL}/pipeline`, {
    method: "POST",
    headers: { Authorization: `Bearer ${REDIS_TOKEN}`, "Content-Type": "application/json" },
    body: JSON.stringify(cmds),
  });
  return res.json();
}

export async function POST(req: NextRequest) {
  try {
    const entry = await req.json();
    const key = `cafe_wd_log_${todayKey()}`;

    // Get current list, append, save back
    const getRes = await redisPipeline([["GET", key]]);
    const raw = getRes[0]?.result;
    let list: any[] = [];
    if (raw) {
      try { list = typeof raw === "string" ? JSON.parse(raw) : raw; } catch {}
    }
    list.push(entry);
    await redisPipeline([["SET", key, JSON.stringify(list)], ["EXPIRE", key, 60 * 60 * 48]]); // keep 48h
    return NextResponse.json({ success: true });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    const key = `cafe_wd_log_${todayKey()}`;
    const res = await redisPipeline([["GET", key]]);
    const raw = res[0]?.result;
    if (!raw) return NextResponse.json({ log: [] });
    const log = typeof raw === "string" ? JSON.parse(raw) : raw;
    return NextResponse.json({ log });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
