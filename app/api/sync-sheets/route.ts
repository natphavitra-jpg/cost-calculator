import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { gsUrl, payload } = await req.json();
    if (!gsUrl) return NextResponse.json({ error: "no url" }, { status: 400 });

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 15000);
    try {
      const res = await fetch(gsUrl, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: { "Content-Type": "text/plain" },
        signal: controller.signal,
      });
      clearTimeout(timer);
      const text = await res.text();
      try { return NextResponse.json(JSON.parse(text)); }
      catch { return NextResponse.json({ success: true }); }
    } catch (e: any) {
      clearTimeout(timer);
      return NextResponse.json({ error: e.name === "AbortError" ? "Google Sheets timeout" : e.message }, { status: 500 });
    }
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
