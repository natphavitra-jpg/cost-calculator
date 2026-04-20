import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const token = process.env.TG_BOT_TOKEN || "";
  if (!token) return NextResponse.json({ error: "TG_BOT_TOKEN not set" });

  const host = req.headers.get("host") || "";
  const webhookUrl = `https://${host}/api/telegram-webhook`;

  const res = await fetch(
    `https://api.telegram.org/bot${token}/setWebhook`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: webhookUrl }),
    }
  );
  const data = await res.json();
  return NextResponse.json({ webhookUrl, telegram: data });
}
