import { NextRequest, NextResponse } from "next/server";

const REDIS_URL = process.env.UPSTASH_REDIS_REST_URL || "";
const REDIS_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN || "";
const TG_TOKEN = process.env.TG_BOT_TOKEN || "";
const TG_CHAT = process.env.TG_CHAT_ID || "";

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
    const { name, item, qty, unit, remainAfter, note, time, stock, stockMin, rms, updatedAt } = await req.json();

    // Save updated stock to Redis
    if (stock && rms) {
      await redisPipeline([["SET", "cafe_stock_data", JSON.stringify({ stock, stockMin, rms, updatedAt })]]);
    }

    // Send Telegram notification from server
    let msg = `📥 <b>รับของเข้าสต๊อก</b>\n👤 ผู้รับ: ${name}\n🕐 เวลา: ${time}\n📦 ${item} +${Number(qty).toFixed(1)}${unit}\n📊 คงเหลือ: ${Number(remainAfter).toFixed(1)}${unit}`;
    if (note) msg += `\n📝 หมายเหตุ: ${note}`;
    await sendTg(msg);

    return NextResponse.json({ success: true });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
