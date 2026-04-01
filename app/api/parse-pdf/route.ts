import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const menuNames = formData.get("menuNames") as string;

    if (!file) return NextResponse.json({ error: "ไม่พบไฟล์" }, { status: 400 });

    const arrayBuffer = await file.arrayBuffer();
    const base64 = Buffer.from(arrayBuffer).toString("base64");

    const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

    const message = await client.messages.create({
      model: "claude-opus-4-6",
      max_tokens: 1024,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "document",
              source: { type: "base64", media_type: "application/pdf", data: base64 },
            } as any,
            {
              type: "text",
              text: `จาก PDF นี้ ดึงข้อมูลยอดขายของแต่ละรายการออกมา
รายชื่อเมนูในระบบ: ${menuNames}
ให้จับคู่ชื่อในไฟล์กับชื่อเมนูในระบบให้ใกล้เคียงที่สุด
ตอบเป็น JSON เท่านั้น ห้ามมีข้อความอื่น รูปแบบ: {"ชื่อเมนู": จำนวน}
ถ้าไม่พบเมนูไหนให้ใส่ 0`,
            },
          ],
        },
      ],
    });

    const text = message.content[0].type === "text" ? message.content[0].text : "";
    const match = text.match(/\{[\s\S]*\}/);
    if (!match) return NextResponse.json({ error: "อ่านข้อมูลไม่ได้" }, { status: 400 });

    return NextResponse.json(JSON.parse(match[0]));
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
