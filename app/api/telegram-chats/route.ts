import { NextRequest, NextResponse } from "next/server";

const TG_TOKEN = process.env.TG_BOT_TOKEN || "";

export async function GET(req: NextRequest) {
  if (!TG_TOKEN) return NextResponse.json({ error: "TG_BOT_TOKEN not set" });

  const base = `https://api.telegram.org/bot${TG_TOKEN}`;
  const host = req.headers.get("host") || "";
  const webhookUrl = `https://${host}/api/telegram-webhook`;

  // 1. Delete webhook temporarily
  await fetch(`${base}/deleteWebhook`);

  // 2. Get updates
  const res = await fetch(`${base}/getUpdates?limit=20`);
  const data = await res.json();

  // 3. Re-register webhook
  await fetch(`${base}/setWebhook`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url: webhookUrl }),
  });

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
  return NextResponse.json({ chats, webhook_restored: webhookUrl });
}
