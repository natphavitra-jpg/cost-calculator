import { NextResponse } from "next/server";

const REDIS_URL = process.env.UPSTASH_REDIS_REST_URL || "";
const REDIS_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN || "";
const TG_TOKEN = process.env.TG_BOT_TOKEN || "";

function todayKey() {
  const d = new Date();
  const bkk = new Date(d.getTime() + 7 * 60 * 60 * 1000);
  return bkk.toISOString().slice(0, 10);
}

function thaiDate() {
  const d = new Date(new Date().getTime() + 7 * 60 * 60 * 1000);
  const day = d.getUTCDate();
  const month = d.getUTCMonth() + 1;
  const year = d.getUTCFullYear() + 543;
  return `${day}/${month}/${year}`;
}

async function redisPipeline(cmds: any[][]) {
  const res = await fetch(`${REDIS_URL}/pipeline`, {
    method: "POST",
    headers: { Authorization: `Bearer ${REDIS_TOKEN}`, "Content-Type": "application/json" },
    body: JSON.stringify(cmds),
  });
  return res.json();
}

async function tgSend(chatId: string, text: string) {
  await fetch(`https://api.telegram.org/bot${TG_TOKEN}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text, parse_mode: "HTML" }),
  });
}

export async function GET() {
  if (!REDIS_URL || !TG_TOKEN)
    return NextResponse.json({ error: "not configured" });

  try {
    const key = `cafe_wd_log_${todayKey()}`;
    const results = await redisPipeline([["GET", "cafe_stock_data"], ["GET", key]]);

    // Parse stock data
    const stockRaw = results[0]?.result;
    let stockData: any = null;
    if (stockRaw) {
      try { stockData = typeof stockRaw === "string" ? JSON.parse(stockRaw) : stockRaw; } catch {}
    }

    // Parse withdrawal log
    const logRaw = results[1]?.result;
    let wdLog: any[] = [];
    if (logRaw) {
      try { wdLog = typeof logRaw === "string" ? JSON.parse(logRaw) : logRaw; } catch {}
    }

    // Get chat ID from stock data or env
    const chatId = process.env.TG_CHAT_ID || "";
    if (!chatId) return NextResponse.json({ error: "TG_CHAT_ID not set" });

    const lines: string[] = [`☕ <b>สรุปประจำวัน ${thaiDate()}</b>\n`];

    // Section 1: Withdrawal log
    lines.push(`📋 <b>รายการเบิกของวันนี้ (${wdLog.length} รายการ)</b>`);
    if (!wdLog.length) {
      lines.push("• ไม่มีการเบิกของวันนี้");
    } else {
      wdLog.forEach((w: any) => {
        lines.push(`• ${w.name}: ${w.item} -${Number(w.qty).toFixed(1)}${w.unit}${w.note ? ` (${w.note})` : ""}`);
      });
    }

    // Section 2: Low/out stock
    if (stockData) {
      const { stock, stockMin, rms } = stockData;
      const low = rms.filter((r: any) => stockMin[r.id] && (stock[r.id] || 0) < stockMin[r.id] && (stock[r.id] || 0) > 0);
      const out = rms.filter((r: any) => (stock[r.id] || 0) <= 0 && stockMin[r.id]);

      lines.push(`\n📦 <b>สต๊อกคงเหลือ</b>`);
      if (!low.length && !out.length) {
        lines.push("✅ ทุกรายการอยู่ในระดับปกติ");
      } else {
        if (out.length) {
          lines.push(`🚨 <b>หมดสต๊อก (${out.length} รายการ):</b>`);
          out.forEach((r: any) => lines.push(`  • ${r.name}`));
        }
        if (low.length) {
          lines.push(`⚠️ <b>ใกล้หมด (${low.length} รายการ):</b>`);
          low.forEach((r: any) => lines.push(`  • ${r.name}: ${Number(stock[r.id] || 0).toFixed(1)}${r.unit} / ขั้นต่ำ ${stockMin[r.id]}${r.unit}`));
        }
      }
    } else {
      lines.push("\n⚠️ ไม่มีข้อมูลสต๊อก");
    }

    lines.push(`\n🔔 ระบบส่งอัตโนมัติ 19:00 น.`);

    // Chunk if long
    const msg = lines.join("\n");
    const chunks: string[] = [];
    let chunk = "";
    for (const l of msg.split("\n")) {
      if ((chunk + "\n" + l).length > 3500) { chunks.push(chunk); chunk = l; }
      else chunk = chunk ? chunk + "\n" + l : l;
    }
    if (chunk) chunks.push(chunk);
    for (const c of chunks) await tgSend(chatId, c);

    return NextResponse.json({ ok: true, withdrawals: wdLog.length });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
