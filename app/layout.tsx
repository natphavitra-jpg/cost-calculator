import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ระบบต้นทุนร้านเครื่องดื่ม & เบเกอรี่",
  description: "คำนวณต้นทุน วัตถุดิบ เมนู และกำไร",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="th">
      <head>
        <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
      </head>
      <body style={{ margin: 0, fontFamily: "sans-serif" }}>{children}</body>
    </html>
  );
}
