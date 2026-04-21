import { NextRequest, NextResponse } from "next/server";

const REDIS_URL = process.env.UPSTASH_REDIS_REST_URL || "";
const REDIS_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN || "";

async function redisGet(key: string): Promise<any> {
  const res = await fetch(`${REDIS_URL}/pipeline`, {
    method: "POST",
    headers: { Authorization: `Bearer ${REDIS_TOKEN}`, "Content-Type": "application/json" },
    body: JSON.stringify([["GET", key]]),
  });
  if (!res.ok) return null;
  const data = await res.json();
  const result = data[0]?.result;
  if (!result) return null;
  if (typeof result === "object") return result;
  try { return JSON.parse(result); } catch { return null; }
}

async function sendTg(token: string, chatId: string, text: string) {
  await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text, parse_mode: "HTML" }),
  });
}

// Split into ≤3900-char chunks and send sequentially
async function sendTgChunked(token: string, chatId: string, lines: string[]) {
  const LIMIT = 3900;
  let chunk = "";
  for (const line of lines) {
    const next = chunk ? chunk + "\n" + line : line;
    if (next.length > LIMIT) {
      if (chunk) await sendTg(token, chatId, chunk);
      chunk = line;
    } else {
      chunk = next;
    }
  }
  if (chunk) await sendTg(token, chatId, chunk);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const msg = body?.message;
    if (!msg) return NextResponse.json({ ok: true });

    const chatId = msg.chat?.id?.toString();
    const text = (msg.text || "").trim().toLowerCase();
    const token = process.env.TG_BOT_TOKEN || "";

    if (!token || !chatId) return NextResponse.json({ ok: true });

    const data = await redisGet("cafe_stock_data");

    if (text === "สต๊อก" || text === "stock" || text === "คงเหลือ") {
      if (!data) {
        await sendTg(token, chatId, "⚠️ ยังไม่มีข้อมูลสต๊อก\nกรุณาเปิดแอปและกดตัดสต๊อกก่อน");
        return NextResponse.json({ ok: true });
      }
      const { stock, stockMin, rms, updatedAt } = data;
      // Only show items that have a minimum level configured (avoids 489-item flood)
      const tracked = (rms as any[]).filter((r: any) => (stockMin[r.id] || 0) > 0);
      if (!tracked.length) {
        await sendTg(token, chatId, "ℹ️ ยังไม่มีรายการที่ตั้งขั้นต่ำไว้\nกรุณาตั้งค่าขั้นต่ำในแอปก่อน");
        return NextResponse.json({ ok: true });
      }
      const lines: string[] = [`📦 <b>สต๊อกที่ตั้งขั้นต่ำ (${tracked.length} รายการ)</b>\nอัพเดต: ${updatedAt}\n`];
      tracked.forEach((r: any) => {
        const cur = stock[r.id] || 0;
        const min = stockMin[r.id] || 0;
        const status = cur <= 0 ? "🚨" : cur < min ? "⚠️" : "✅";
        lines.push(`${status} ${r.name}: ${cur.toFixed(1)}${r.unit} (ขั้นต่ำ ${min}${r.unit})`);
      });
      await sendTgChunked(token, chatId, lines);

    } else if (text === "สต๊อกทั้งหมด" || text === "ทั้งหมด" || text === "all") {
      if (!data) {
        await sendTg(token, chatId, "⚠️ ยังไม่มีข้อมูลสต๊อก");
        return NextResponse.json({ ok: true });
      }
      const { stock, stockMin, rms, updatedAt } = data;
      const lines: string[] = [`📦 <b>สต๊อกทั้งหมด</b>\nอัพเดต: ${updatedAt}\n`];
      (rms as any[]).forEach((r: any) => {
        const cur = stock[r.id] || 0;
        const min = stockMin[r.id] || 0;
        if (cur > 0 || min > 0) {
          const status = min > 0 ? (cur <= 0 ? "🚨" : cur < min ? "⚠️" : "✅") : "📦";
          lines.push(`${status} ${r.name}: ${cur.toFixed(1)}${r.unit}${min > 0 ? ` (ขั้นต่ำ ${min})` : ""}`);
        }
      });
      await sendTgChunked(token, chatId, lines);

    } else if (text === "สต๊อกต่ำ" || text === "ต่ำ" || text === "low") {
      if (!data) {
        await sendTg(token, chatId, "⚠️ ยังไม่มีข้อมูลสต๊อก");
        return NextResponse.json({ ok: true });
      }
      const { stock, stockMin, rms } = data;
      const low = (rms as any[]).filter((r: any) => stockMin[r.id] && (stock[r.id] || 0) < stockMin[r.id]);
      if (!low.length) {
        await sendTg(token, chatId, "✅ สต๊อกทุกรายการอยู่ในระดับปกติ");
      } else {
        const lines = [`⚠️ <b>สต๊อกต่ำกว่าขั้นต่ำ (${low.length} รายการ)</b>\n`];
        low.forEach((r: any) => {
          const cur = stock[r.id] || 0;
          const icon = cur <= 0 ? "🚨" : "⚠️";
          lines.push(`${icon} ${r.name}: ${cur.toFixed(1)}${r.unit} / ขั้นต่ำ ${stockMin[r.id]}${r.unit}`);
        });
        await sendTgChunked(token, chatId, lines);
      }

    } else if (text === "/getchatid") {
      await sendTg(token, chatId, `🆔 Chat ID ของกลุ่มนี้:\n<code>${chatId}</code>`);

    } else if (text === "help" || text === "ช่วยเหลือ" || text === "/start") {
      await sendTg(token, chatId,
        "☕ <b>Simple Cafe Alert Bot</b>\n\nคำสั่งที่ใช้ได้:\n" +
        "📦 <b>สต๊อก</b> — ดูรายการที่ตั้งขั้นต่ำไว้\n" +
        "📋 <b>สต๊อกทั้งหมด</b> — ดูสต๊อกทุกรายการ\n" +
        "⚠️ <b>สต๊อกต่ำ</b> — ดูเฉพาะที่ต่ำหรือหมด\n" +
        "❓ <b>help</b> — แสดงคำสั่ง\n\n" +
        "ระบบจะแจ้งเตือนอัตโนมัติเมื่อตัดสต๊อก"
      );
    }

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
