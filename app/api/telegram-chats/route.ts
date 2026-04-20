import { NextResponse } from "next/server";

const TG_TOKEN = process.env.TG_BOT_TOKEN || "";

export async function GET() {
  if (!TG_TOKEN) return NextResponse.json({ error: "TG_BOT_TOKEN not set" });
  const res = await fetch(`https://api.telegram.org/bot${TG_TOKEN}/getUpdates?limit=20`);
  const data = await res.json();
  if (!data.ok) return NextResponse.json({ error: data.description });

  const chats: any[] = [];
  const seen = new Set();
  for (const upd of data.result || []) {
    const msg = upd.message || upd.channel_post;
    if (!msg) continue;
    const id = msg.chat?.id;
    if (seen.has(id)) continue;
    seen.add(id);
    chats.push({ chat_id: id, type: msg.chat?.type, title: msg.chat?.title || msg.chat?.first_name || "" });
  }
  return NextResponse.json({ chats });
}
