import { NextResponse } from "next/server";

const SHEET_ID = "1M2ncQrFy7FCCAzT1QKZaPsrnba_rP8tBucxWItsSVR4";
const GID = "2023526805";

function parseCSV(text: string): string[][] {
  const rows: string[][] = [];
  for (const line of text.split("\n")) {
    if (!line.trim()) continue;
    const cells: string[] = [];
    let cur = "", inQ = false;
    for (const ch of line) {
      if (ch === '"') { inQ = !inQ; }
      else if (ch === "," && !inQ) { cells.push(cur.trim()); cur = ""; }
      else cur += ch;
    }
    cells.push(cur.trim());
    rows.push(cells);
  }
  return rows;
}

export async function GET() {
  try {
    const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv&gid=${GID}`;
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) throw new Error(`เข้าถึง Sheet ไม่ได้ (${res.status}) — ตรวจสอบว่าแชร์เป็น Anyone with link แล้ว`);

    const rows = parseCSV(await res.text());
    if (rows.length < 2) return NextResponse.json({ items: [] });

    const headers = rows[0];
    const nameIdx = headers.findIndex(h => h.includes("ชื่อสินค้า"));
    const unitIdx = headers.findIndex(h => h.includes("หน่วยนับ"));
    const qtyIdx  = headers.findIndex(h => h.includes("จำนวนสินค้าคงเหลือ"));

    if (nameIdx < 0 || qtyIdx < 0) throw new Error("ไม่พบคอลัมน์ ชื่อสินค้า หรือ จำนวนสินค้าคงเหลือ");

    const items = rows.slice(1)
      .filter(r => r[nameIdx]?.trim())
      .map(r => ({
        name: r[nameIdx]?.trim() || "",
        unit: unitIdx >= 0 ? r[unitIdx]?.trim() || "" : "",
        qty:  parseFloat((r[qtyIdx] || "0").replace(/,/g, "")) || 0,
      }))
      .filter(item => item.name);

    return NextResponse.json({ items, total: items.length });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
