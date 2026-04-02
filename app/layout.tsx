import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ระบบต้นทุนร้านเครื่องดื่ม & เบเกอรี่",
  description: "คำนวณต้นทุน วัตถุดิบ เมนู และกำไร",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="th">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
        <style>{`
          *,*::before,*::after{box-sizing:border-box;}
          .table-scroll{overflow-x:auto;-webkit-overflow-scrolling:touch;}
          @media(max-width:640px){
            .app-header{padding:10px 14px 0 !important;}
            .header-subtitle{display:none !important;}
            .gs-sync-msg{display:none !important;}
            .gs-btn-text{display:none !important;}
            .main-content{padding:16px 14px 60px !important;}
            .stats-grid{display:grid !important;grid-template-columns:1fr 1fr !important;gap:8px !important;}
            .dash-grid{grid-template-columns:1fr !important;}
            .hist-grid{grid-template-columns:1fr !important;}
            .form-grid-5{grid-template-columns:1fr 1fr !important;}
            .form-grid-4{grid-template-columns:1fr 1fr !important;}
            .form-grid-3{grid-template-columns:1fr !important;}
            .tab-label{display:none !important;}
            .filter-row{flex-wrap:wrap !important;}
            .filter-row button,.view-toggle button{font-size:11px !important;padding:6px 10px !important;}
            .view-toggle{flex-wrap:wrap !important;gap:4px !important;}
            .ing-add-row{flex-wrap:wrap !important;}
            .ing-add-row>.ing-type{flex:0 0 100% !important;}
            .ing-add-row>.ing-select{flex:0 0 100% !important;}
          }
        `}</style>
      </head>
      <body style={{ margin: 0, fontFamily: "sans-serif" }}>{children}</body>
    </html>
  );
}
