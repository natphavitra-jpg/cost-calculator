import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const token = (body.token || "").trim();
    const chatId = (body.chatId || "").toString().trim();
    const message = (body.message || "").trim();

    if (!token || !chatId || !message)
      return NextResponse.json({ error: `missing: token=${!!token} chatId=${!!chatId} msg=${!!message}` }, { status: 400 });

    const url = `https://api.telegram.org/bot${token}/sendMessage`;
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text: message, parse_mode: "HTML" }),
    });

    const data = await res.json();
    if (!data.ok)
      return NextResponse.json({ error: `Telegram error ${res.status}: ${data.description} (token_len=${token.length} chatId=${chatId})` }, { status: 400 });

    return NextResponse.json({ success: true });
  } catch (e: any) {
    return NextResponse.json({ error: `route error: ${e.message}` }, { status: 500 });
  }
}
