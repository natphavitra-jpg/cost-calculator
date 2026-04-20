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
          body{-webkit-text-size-adjust:100%;}
          .table-scroll{overflow-x:auto;-webkit-overflow-scrolling:touch;}

          /* Bottom navigation — hidden by default, shown on mobile */
          .bottom-nav{
            display:none;position:fixed;bottom:0;left:0;right:0;
            background:#fff;border-top:1.5px solid #e2e8f0;
            padding:4px 0 env(safe-area-inset-bottom,0px);
            z-index:999;overflow-x:auto;-webkit-overflow-scrolling:touch;
            box-shadow:0 -2px 12px rgba(0,0,0,.07);
          }
          .bottom-nav-inner{display:flex;min-width:max-content;padding:0 4px;}
          .bottom-nav-btn{
            display:flex;flex-direction:column;align-items:center;justify-content:center;
            gap:2px;padding:6px 14px;border:none;background:transparent;cursor:pointer;
            font-size:10px;min-width:56px;min-height:52px;border-radius:10px;
            transition:all .15s;color:#94a3b8;
          }
          .bottom-nav-btn.active{color:var(--tab-color,#7F77DD);background:rgba(127,119,221,.08);}
          .bottom-nav-btn .bnav-emoji{font-size:20px;line-height:1;}
          .bottom-nav-btn .bnav-label{font-size:10px;font-weight:500;white-space:nowrap;}

          /* Tablet (641–1024px) */
          @media(min-width:641px) and (max-width:1024px){
            .main-content{padding:20px 20px 0 !important;}
            .stats-grid{display:grid !important;grid-template-columns:repeat(3,1fr) !important;gap:10px !important;}
            .dash-grid{grid-template-columns:1fr 1fr !important;}
          }

          /* Mobile (≤640px) */
          @media(max-width:640px){
            input,select,textarea{font-size:16px !important;}
            .app-header{padding:10px 12px 0 !important;}
            .header-subtitle{display:none !important;}
            .gs-sync-msg{display:none !important;}
            .gs-btn-text{display:none !important;}
            .main-content{padding:12px 10px 80px !important;}
            .stats-grid{display:grid !important;grid-template-columns:1fr 1fr !important;gap:8px !important;}
            .dash-grid{grid-template-columns:1fr !important;}
            .hist-grid{grid-template-columns:1fr !important;}
            .form-grid-5{grid-template-columns:1fr 1fr !important;}
            .form-grid-4{grid-template-columns:1fr 1fr !important;}
            .form-grid-3{grid-template-columns:1fr !important;}
            .top-tabs-bar{display:none !important;}
            .bottom-nav{display:block !important;}
            .filter-row{flex-wrap:wrap !important;}
            .filter-row button,.view-toggle button{font-size:11px !important;padding:6px 10px !important;}
            .view-toggle{flex-wrap:wrap !important;gap:4px !important;}
            .ing-add-row{flex-wrap:wrap !important;}
            .ing-add-row>.ing-type{flex:0 0 100% !important;}
            .ing-add-row>.ing-select{flex:0 0 100% !important;}
            .rc-form-row{flex-direction:column !important;}
            .rc-form-row>div,.rc-form-row>button{width:100% !important;min-width:unset !important;}
            .wd-form-actions{flex-direction:column !important;}
            .stock-header-row{flex-direction:column !important;align-items:flex-start !important;}
            .stock-header-row>div:last-child{width:100% !important;}
            .header-top-row{gap:6px !important;}
            .header-top-row button{padding:6px 10px !important;font-size:11px !important;}
          }
        `}</style>
      </head>
      <body style={{ margin: 0, fontFamily: "sans-serif" }}>{children}</body>
    </html>
  );
}
