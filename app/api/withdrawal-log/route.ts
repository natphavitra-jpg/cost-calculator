import { NextRequest, NextResponse } from "next/server";

const REDIS_URL = process.env.UPSTASH_REDIS_REST_URL || "";
const REDIS_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN || "";
const TG_TOKEN = process.env.TG_BOT_TOKEN || "";
const TG_CHAT = process.env.TG_CHAT_ID || "";

function todayKey() {
  const bkk = new Date(new Date().getTime() + 7 * 60 * 60 * 1000);
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

async function sendTg(text: string) {
  if (!TG_TOKEN || !TG_CHAT) return;
  await fetch(`https://api.telegram.org/bot${TG_TOKEN}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: TG_CHAT, text, parse_mode: "HTML" }),
  }).catch(() => {});
}

export async function POST(req: NextRequest) {
  try {
    const entry = await req.json();
    const key = `cafe_wd_log_${todayKey()}`;

    // Append to daily log
    const getRes = await redisPipeline([["GET", key]]);
    const raw = getRes[0]?.result;
    let list: any[] = [];
    if (raw) { try { list = typeof raw === "string" ? JSON.parse(raw) : raw; } catch {} }
    list.push(entry);
    await redisPipeline([["SET", key, JSON.stringify(list)], ["EXPIRE", key, 60 * 60 * 48]]);

    // Send Telegram notification from server (works on all devices)
    const remain = entry.remainAfter ?? null;
    const isOut = remain !== null && remain <= 0;
    const isLow = entry.isLow ?? false;
    let msg = `📋 <b>เบิกของ</b>\n👤 พนักงาน: ${entry.name}\n🕐 เวลา: ${entry.time}\n📦 รายการ: ${entry.item} -${Number(entry.qty).toFixed(1)}${entry.unit}`;
    if (remain !== null) {
      msg += `\n📊 คงเหลือ: ${Number(remain).toFixed(1)}${entry.unit}`;
      if (isOut) msg += ` 🚨 หมดแล้ว!`;
      else if (isLow) msg += ` ⚠️ ต่ำกว่าขั้นต่ำ`;
    }
    if (entry.note) msg += `\n📝 หมายเหตุ: ${entry.note}`;
    await sendTg(msg);

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
