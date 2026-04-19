import { NextRequest, NextResponse } from "next/server";

const TG_TOKEN = process.env.TG_BOT_TOKEN || "";
const REDIS_URL = process.env.UPSTASH_REDIS_REST_URL || "";
const REDIS_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN || "";

async function redisGet(key: string) {
  const res = await fetch(`${REDIS_URL}/get/${key}`, {
    headers: { Authorization: `Bearer ${REDIS_TOKEN}` },
  });
  const data = await res.json();
  return data.result ? JSON.parse(data.result) : null;
}

async function redisSet(key: string, value: string) {
  await fetch(`${REDIS_URL}/set/${key}`, {
    method: "POST",
    headers: { Authorization: `Bearer ${REDIS_TOKEN}`, "Content-Type": "application/json" },
    body: JSON.stringify(value),
  });
}

async function tgSend(chatId: string, text: string) {
  await fetch(`https://api.telegram.org/bot${TG_TOKEN}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text, parse_mode: "HTML" }),
  });
}

async function tgGetUpdates(offset: number) {
  const res = await fetch(
    `https://api.telegram.org/bot${TG_TOKEN}/getUpdates?offset=${offset}&timeout=0&limit=10`
  );
  return res.json();
}

export async function GET(req: NextRequest) {
  if (!TG_TOKEN || !REDIS_URL) return NextResponse.json({ error: "not configured" });

  try {
    const offsetRaw = await redisGet("tg_offset");
    let offset = offsetRaw ? Number(offsetRaw) : 0;

    const updates = await tgGetUpdates(offset);
    if (!updates.ok || !updates.result?.length)
      return NextResponse.json({ ok: true, processed: 0 });

    for (const upd of updates.result) {
      offset = upd.update_id + 1;
      const msg = upd.message;
      if (!msg) continue;

      const chatId = msg.chat?.id?.toString();
      const text = (msg.text || "").trim().toLowerCase();

      if (text === "สต๊อก" || text === "stock" || text === "คงเหลือ") {
        const data = await redisGet("cafe_stock_data");
        if (!data) {
          await tgSend(chatId, "⚠️ ยังไม่มีข้อมูลสต๊อก\nกรุณาเปิดแอปและกด Sync สต๊อก → Bot");
        } else {
          const { stock, stockMin, rms, updatedAt } = data;
          const lines: string[] = [`📦 <b>สต๊อกปัจจุบัน</b>\nอัพเดต: ${updatedAt}\n`];
          let count = 0;
          rms.forEach((r: any) => {
            const cur = Number(stock[r.id] || 0);
            const min = Number(stockMin[r.id] || 0);
            if (cur > 0 || min > 0) {
              const icon = min > 0 ? (cur <= 0 ? "🚨" : cur < min ? "⚠️" : "✅") : "•";
              lines.push(`${icon} ${r.name}: ${cur.toFixed(1)}${r.unit}${min > 0 ? ` (ขั้นต่ำ ${min})` : ""}`);
              count++;
            }
          });
          if (!count) lines.push("ยังไม่มีข้อมูลสต๊อก");
          // ส่งเป็นชุดถ้าข้อความยาว
          const chunks: string[] = [];
          let chunk = "";
          for (const l of lines) {
            if ((chunk + "\n" + l).length > 3500) { chunks.push(chunk); chunk = l; }
            else chunk = chunk ? chunk + "\n" + l : l;
          }
          if (chunk) chunks.push(chunk);
          for (const c of chunks) await tgSend(chatId, c);
        }
      } else if (text === "สต๊อกต่ำ" || text === "ต่ำ" || text === "low") {
        const data = await redisGet("cafe_stock_data");
        if (!data) { await tgSend(chatId, "⚠️ ยังไม่มีข้อมูลสต๊อก"); continue; }
        const { stock, stockMin, rms } = data;
        const low = rms.filter((r: any) => stockMin[r.id] && (stock[r.id] || 0) < stockMin[r.id]);
        if (!low.length) {
          await tgSend(chatId, "✅ สต๊อกทุกรายการอยู่ในระดับปกติ");
        } else {
          const lines = [`⚠️ <b>สต๊อกต่ำ (${low.length} รายการ)</b>\n`];
          low.forEach((r: any) => {
            const cur = Number(stock[r.id] || 0);
            lines.push(`${cur <= 0 ? "🚨" : "⚠️"} ${r.name}: ${cur.toFixed(1)}${r.unit} / ขั้นต่ำ ${stockMin[r.id]}${r.unit}`);
          });
          await tgSend(chatId, lines.join("\n"));
        }
      } else if (text === "help" || text === "ช่วยเหลือ" || text === "/start") {
        await tgSend(chatId,
          "☕ <b>Simple Cafe Alert Bot</b>\n\nคำสั่งที่ใช้ได้:\n" +
          "📦 <b>สต๊อก</b> — ดูสต๊อกทั้งหมด\n" +
          "⚠️ <b>สต๊อกต่ำ</b> — ดูเฉพาะที่ต่ำหรือหมด\n" +
          "❓ <b>help</b> — แสดงคำสั่ง\n\n" +
          "ระบบแจ้งเตือนอัตโนมัติเมื่อตัดสต๊อก 🔔"
        );
      }
    }

    await redisSet("tg_offset", String(offset));
    return NextResponse.json({ ok: true, processed: updates.result.length });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
