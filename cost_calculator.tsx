import { useState, useMemo, useEffect, useRef } from "react";

const C={purple:"#7F77DD",purpleL:"#EEEDFE",purpleD:"#534AB7",teal:"#1D9E75",tealL:"#E1F5EE",tealD:"#0F6E56",coral:"#D85A30",coralL:"#FAECE7",amber:"#BA7517",amberL:"#FAEEDA",blue:"#378ADD",blueL:"#E6F1FB",green:"#1D9E75",red:"#E24B4A"};
const SC=[{bg:"#F0EFFE",accent:"#7F77DD",border:"#CECBF6"},{bg:"#FEF0EC",accent:"#D85A30",border:"#F5C4B3"},{bg:"#E8F8F2",accent:"#1D9E75",border:"#9FE1CB"},{bg:"#E8F3FE",accent:"#378ADD",border:"#B5D4F4"},{bg:"#FEF5E7",accent:"#BA7517",border:"#FAC775"},{bg:"#FDF0F5",accent:"#D4537E",border:"#F4C0D1"}];

const initRaw=[
  {id:1,name:"น้ำตาลทราย",unit:"g",pricePerPack:23,packSize:1000,cat:"แห้ง"},
  {id:2,name:"น้ำเปล่า",unit:"ml",pricePerPack:5,packSize:1000,cat:"ของเหลว"},
  {id:3,name:"สตรอว์เบอร์รี่สด",unit:"g",pricePerPack:120,packSize:1000,cat:"ผลไม้"},
  {id:4,name:"นมสด",unit:"ml",pricePerPack:55,packSize:1000,cat:"นม"},
  {id:5,name:"นมข้นหวาน",unit:"g",pricePerPack:25,packSize:380,cat:"นม"},
  {id:6,name:"ชาไทย",unit:"g",pricePerPack:175,packSize:500,cat:"ชา/กาแฟ"},
  {id:7,name:"กาแฟ Espresso",unit:"g",pricePerPack:800,packSize:1000,cat:"ชา/กาแฟ"},
  {id:8,name:"ผงมัทฉะ",unit:"g",pricePerPack:120,packSize:100,cat:"ชา/กาแฟ"},
  {id:9,name:"ผงโกโก้",unit:"g",pricePerPack:225,packSize:500,cat:"ชา/กาแฟ"},
  {id:10,name:"วิปครีม",unit:"ml",pricePerPack:250,packSize:1000,cat:"ท็อปปิ้ง"},
  {id:11,name:"แก้ว+หลอด",unit:"ชิ้น",pricePerPack:30,packSize:10,cat:"บรรจุภัณฑ์"},
  {id:12,name:"แป้งสาลี",unit:"g",pricePerPack:30,packSize:1000,cat:"เบเกอรี่"},
  {id:13,name:"เนย",unit:"g",pricePerPack:125,packSize:500,cat:"เบเกอรี่"},
  {id:14,name:"ไข่ไก่",unit:"ฟอง",pricePerPack:48,packSize:12,cat:"เบเกอรี่"},
  {id:15,name:"ผงฟู",unit:"g",pricePerPack:10,packSize:100,cat:"เบเกอรี่"},
];
const initComps=[
  {id:101,name:"น้ำเชื่อม (โฮมเมด)",unit:"ml",yield:1500,cat:"โฮมเมด",ings:[{rmId:1,amt:1000},{rmId:2,amt:1000}]},
  {id:102,name:"แยมสตรอว์เบอร์รี่ (โฮมเมด)",unit:"g",yield:1200,cat:"โฮมเมด",ings:[{rmId:3,amt:1000},{rmId:1,amt:500}]},
];
const initMenus=[
  {id:1,name:"ชาไทยเย็น",cat:"เครื่องดื่ม",price:55,ings:[{type:"raw",id:6,amt:15},{type:"raw",id:4,amt:100},{type:"raw",id:5,amt:30},{type:"comp",id:101,amt:30},{type:"raw",id:11,amt:1}]},
  {id:2,name:"มัทฉะลาเต้",cat:"เครื่องดื่ม",price:75,ings:[{type:"raw",id:8,amt:8},{type:"raw",id:4,amt:150},{type:"comp",id:101,amt:25},{type:"raw",id:10,amt:30},{type:"raw",id:11,amt:1}]},
  {id:3,name:"สตรอว์เบอร์รี่สมูทตี้",cat:"เครื่องดื่ม",price:70,ings:[{type:"comp",id:102,amt:50},{type:"raw",id:4,amt:100},{type:"comp",id:101,amt:20},{type:"raw",id:10,amt:20},{type:"raw",id:11,amt:1}]},
  {id:4,name:"ลาเต้เย็น",cat:"เครื่องดื่ม",price:65,ings:[{type:"raw",id:7,amt:18},{type:"raw",id:4,amt:150},{type:"comp",id:101,amt:20},{type:"raw",id:11,amt:1}]},
  {id:5,name:"โกโก้เย็น",cat:"เครื่องดื่ม",price:60,ings:[{type:"raw",id:9,amt:20},{type:"raw",id:4,amt:150},{type:"raw",id:5,amt:20},{type:"comp",id:101,amt:20},{type:"raw",id:11,amt:1}]},
  {id:6,name:"คุกกี้เนย",cat:"เบเกอรี่",price:35,ings:[{type:"raw",id:12,amt:50},{type:"raw",id:13,amt:30},{type:"raw",id:14,amt:0.5},{type:"raw",id:1,amt:25},{type:"raw",id:15,amt:1}]},
  {id:7,name:"บราวนี่",cat:"เบเกอรี่",price:55,ings:[{type:"raw",id:12,amt:60},{type:"raw",id:13,amt:50},{type:"raw",id:14,amt:1},{type:"raw",id:9,amt:30},{type:"raw",id:1,amt:40}]},
];
const initFixed=[
  {id:1,name:"ค่าเช่าร้าน",amt:8000,period:"เดือน",icon:"🏠"},
  {id:2,name:"ค่าไฟฟ้า",amt:2500,period:"เดือน",icon:"⚡"},
  {id:3,name:"ค่าน้ำ",amt:500,period:"เดือน",icon:"💧"},
  {id:4,name:"เงินเดือนพนักงาน",amt:9000,period:"เดือน",icon:"👤"},
  {id:5,name:"ค่าอินเทอร์เน็ต",amt:500,period:"เดือน",icon:"📶"},
  {id:6,name:"ค่าเสื่อมอุปกรณ์",amt:1000,period:"เดือน",icon:"🔧"},
];

const initBranches=[
  {id:1,name:"สาขา 1",color:"#7F77DD",menus:initMenus.map(m=>({...m})),fixed:initFixed.map(f=>({...f})),sales:null},
  {id:2,name:"สาขา 2",color:"#1D9E75",menus:initMenus.map(m=>({...m})),fixed:initFixed.map(f=>({...f})),sales:null},
  {id:3,name:"สาขา 3",color:"#D85A30",menus:initMenus.map(m=>({...m})),fixed:initFixed.map(f=>({...f})),sales:null},
];

const today=new Date();
const toKey=d=>`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;
const toMonthKey=d=>`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}`;
const todayKey=toKey(today);

const genSampleSales=()=>{
  const data={};
  for(let i=89;i>=0;i--){
    const d=new Date(today);d.setDate(d.getDate()-i);
    const key=toKey(d);
    data[key]={};
    initMenus.forEach(m=>{
      data[key][m.id]=Math.floor(Math.random()*20)+5;
    });
  }
  return data;
};

const TABS=[
  {id:0,label:"Dashboard",emoji:"📊",color:"#534AB7"},
  {id:1,label:"วัตถุดิบ",emoji:"🛒",color:"#D85A30"},
  {id:2,label:"ของผสม",emoji:"⚗️",color:"#1D9E75"},
  {id:3,label:"สูตรเมนู",emoji:"📋",color:"#378ADD"},
  {id:4,label:"ต้นทุน & Margin",emoji:"💰",color:"#7F77DD"},
  {id:5,label:"Fixed Cost",emoji:"📌",color:"#BA7517"},
];

const fmt=(n,d=0)=>Number(n).toLocaleString("th-TH",{minimumFractionDigits:d,maximumFractionDigits:d});
const pct=n=>(n*100).toFixed(1)+"%";
const mColor=m=>m>0.55?C.teal:m>0.35?C.amber:C.coral;
const mLabel=m=>m>0.55?"ดีมาก":m>0.35?"พอใช้":"ต่ำ";
const cpuOf=rm=>rm.pricePerPack/rm.packSize;
const compCpuOf=(comp,rms)=>{
  const tot=comp.ings.reduce((s,i)=>{const r=rms.find(x=>x.id===i.rmId);return s+(r?cpuOf(r)*i.amt:0);},0);
  return comp.yield>0?tot/comp.yield:0;
};
const ingCost=(ing,rms,comps)=>{
  if(ing.type==="raw"){const r=rms.find(x=>x.id===ing.id);return r?cpuOf(r)*ing.amt:0;}
  const c=comps.find(x=>x.id===ing.id);return c?compCpuOf(c,rms)*ing.amt:0;
};
const menuCost=(menu,rms,comps)=>menu.ings.reduce((s,i)=>s+ingCost(i,rms,comps),0);

const thTHMonth=["มกราคม","กุมภาพันธ์","มีนาคม","เมษายน","พฤษภาคม","มิถุนายน","กรกฎาคม","สิงหาคม","กันยายน","ตุลาคม","พฤศจิกายน","ธันวาคม"];
const thTHDay=["อา","จ","อ","พ","พฤ","ศ","ส"];

function Ring({p,size=52,color}){
  const r=20,circ=2*Math.PI*r,dash=(Math.min(p,100)/100)*circ;
  return(<svg width={size} height={size} viewBox="0 0 52 52">
    <circle cx="26" cy="26" r={r} fill="none" stroke="#e5e7eb" strokeWidth="5"/>
    <circle cx="26" cy="26" r={r} fill="none" stroke={color} strokeWidth="5" strokeDasharray={`${dash} ${circ}`} strokeLinecap="round" transform="rotate(-90 26 26)"/>
    <text x="26" y="30" textAnchor="middle" fontSize="10" fontWeight="500" fill={color}>{Math.round(p)}%</text>
  </svg>);
}
function MBar({v,max=1,color,h=6}){
  return(<div style={{height:h,borderRadius:h,background:"rgba(0,0,0,.07)",overflow:"hidden"}}>
    <div style={{height:"100%",width:`${Math.min((v/max)*100,100)}%`,background:color,borderRadius:h,transition:"width .4s"}}/>
  </div>);
}

export default function App(){
  const [tab,setTab]=useState(0);
  const [rms,setRms]=useState(initRaw);
  const [comps,setComps]=useState(initComps);
  const [branches,setBranches]=useState(()=>initBranches.map(b=>({...b,sales:genSampleSales()})));
  const [activeBranchId,setActiveBranchId]=useState(1);
  const [editBranchId,setEditBranchId]=useState(null);
  const [editBranchName,setEditBranchName]=useState("");

  const currentBranch=branches.find(b=>b.id===activeBranchId)||branches[0];
  const menus=currentBranch.menus;
  const fixed=currentBranch.fixed;
  const salesData=currentBranch.sales;

  const _upBranch=(field,val)=>setBranches(prev=>prev.map(b=>b.id===activeBranchId?{...b,[field]:typeof val==="function"?val(b[field]):val}:b));
  const setMenus=(v)=>_upBranch("menus",v);
  const setFixed=(v)=>_upBranch("fixed",v);
  const setSalesData=(v)=>_upBranch("sales",v);
  const [selectedDate,setSelectedDate]=useState(todayKey);
  const [viewMonth,setViewMonth]=useState(toMonthKey(today));
  const [historyView,setHistoryView]=useState("month");
  const [showAddRm,setShowAddRm]=useState(false);
  const [showAddComp,setShowAddComp]=useState(false);
  const [showAddMenu,setShowAddMenu]=useState(false);
  const [showAddFixed,setShowAddFixed]=useState(false);
  const [catF,setCatF]=useState("ทั้งหมด");
  const [editId,setEditId]=useState(null);
  const [nr,setNr]=useState({name:"",unit:"",pricePerPack:0,packSize:1,cat:""});
  const [nc,setNc]=useState({name:"",unit:"",yield:0,cat:"โฮมเมด",ings:[]});
  const [ncIng,setNcIng]=useState({rmId:"",amt:0});
  const [nm,setNm]=useState({name:"",cat:"เครื่องดื่ม",price:0,ings:[]});
  const [nmIng,setNmIng]=useState({type:"raw",id:"",amt:0});
  const [editMenuId,setEditMenuId]=useState(null);
  const [editIngIdx,setEditIngIdx]=useState(null);
  const [editIngVal,setEditIngVal]=useState({type:"raw",id:"",amt:0});
  const [nf,setNf]=useState({name:"",amt:0,period:"เดือน",icon:"📦"});
  const chartRef=useRef(null);
  const chartInst=useRef(null);
  const [pdfLoading,setPdfLoading]=useState(false);
  const [pdfMsg,setPdfMsg]=useState("");

  const fixedPD=fixed.reduce((s,f)=>s+(f.period==="วัน"?f.amt:f.period==="เดือน"?f.amt/30:f.amt/365),0);

  const getDaySales=key=>salesData[key]||{};
  const setDaySales=(key,mid,qty)=>_upBranch("sales",prev=>({...prev,[key]:{...(prev[key]||{}),[mid]:qty}}));

  const calcDayStats=(key)=>{
    const ds=getDaySales(key);
    let rev=0,vc=0;
    menus.forEach(m=>{const qty=ds[m.id]||0,cost=menuCost(m,rms,comps);rev+=m.price*qty;vc+=cost*qty;});
    const fc=fixedPD,profit=rev-vc-fc;
    return{rev,vc,fc,profit,margin:rev>0?(rev-vc-fc)/rev:0};
  };

  const calcMonthStats=(monthKey)=>{
    const [y,mo]=monthKey.split("-").map(Number);
    const days=new Date(y,mo,0).getDate();
    let rev=0,vc=0;
    const menuQtys={};
    menus.forEach(m=>menuQtys[m.id]=0);
    for(let d=1;d<=days;d++){
      const key=`${monthKey}-${String(d).padStart(2,"0")}`;
      const ds=salesData[key]||{};
      menus.forEach(m=>{
        const qty=ds[m.id]||0;
        const cost=menuCost(m,rms,comps);
        rev+=m.price*qty;vc+=cost*qty;
        menuQtys[m.id]=(menuQtys[m.id]||0)+qty;
      });
    }
    const fc=fixedPD*days,profit=rev-vc-fc;
    return{rev,vc,fc,profit,margin:rev>0?(rev-vc-fc)/rev:0,menuQtys,days};
  };

  const get3Months=()=>{
    const months=[];
    for(let i=2;i>=0;i--){
      const d=new Date(today.getFullYear(),today.getMonth()-i,1);
      months.push(toMonthKey(d));
    }
    return months;
  };
  const months3=get3Months();

  const todayStats=calcDayStats(selectedDate);
  const monthStats=calcMonthStats(viewMonth);

  const allMonthStats=useMemo(()=>months3.map(mk=>({key:mk,stats:calcMonthStats(mk)})),[salesData,menus,rms,comps,fixed]);

  const dash=useMemo(()=>{
    const ds=getDaySales(todayKey);
    let rev=0,vc=0;
    const md=menus.map(m=>{
      const cost=menuCost(m,rms,comps),qty=ds[m.id]||0;
      rev+=m.price*qty;vc+=cost*qty;
      return{...m,cost,qty,rev:m.price*qty,vc:cost*qty};
    });
    const fc=fixedPD,total=vc+fc,profit=rev-total;
    return{md,rev,vc,fc,total,profit,margin:rev>0?profit/rev:0};
  },[menus,salesData,fixed,rms,comps]);

  useEffect(()=>{
    if(tab!==0||!chartRef.current||typeof Chart==="undefined")return;
    if(chartInst.current)chartInst.current.destroy();
    chartInst.current=new Chart(chartRef.current,{
      type:"bar",data:{labels:dash.md.map(m=>m.name),datasets:[
        {label:"รายได้",data:dash.md.map(m=>Math.round(m.rev)),backgroundColor:"#CECBF6",borderColor:"#7F77DD",borderWidth:1.5,borderRadius:5},
        {label:"ต้นทุน",data:dash.md.map(m=>Math.round(m.vc)),backgroundColor:"#F5C4B3",borderColor:"#D85A30",borderWidth:1.5,borderRadius:5},
      ]},
      options:{responsive:true,maintainAspectRatio:false,
        plugins:{legend:{display:false},tooltip:{callbacks:{label:c=>`${c.dataset.label}: ฿${c.raw.toLocaleString()}`}}},
        scales:{x:{grid:{display:false},ticks:{font:{size:11},maxRotation:30,color:"#888780"}},
          y:{grid:{color:"rgba(0,0,0,.06)"},ticks:{font:{size:11},color:"#888780",callback:v=>"฿"+v.toLocaleString()}}}}
    });
  },[tab,dash]);

  const tc=TABS[tab];
  const inp={padding:"8px 11px",borderRadius:8,border:"1.5px solid #e2e8f0",background:"#fff",color:"#1a202c",fontSize:13,width:"100%",boxSizing:"border-box"};
  const btnP={padding:"9px 20px",borderRadius:9,border:"none",background:tc.color,color:"#fff",cursor:"pointer",fontSize:13,fontWeight:500};
  const btnSm={padding:"5px 12px",borderRadius:7,border:"1.5px solid #e2e8f0",background:"#fff",cursor:"pointer",fontSize:12,color:"#374151"};
  const btnDanger={padding:"5px 12px",borderRadius:7,border:"1.5px solid #fca5a5",background:"#fff0f0",cursor:"pointer",fontSize:12,color:"#dc2626"};
  const lbl={fontSize:12,color:"#64748b",marginBottom:4,display:"block",fontWeight:500};
  const th_s={padding:"10px 14px",fontSize:11,fontWeight:500,color:"#64748b",borderBottom:"1.5px solid #f1f5f9",textAlign:"left",letterSpacing:.3,textTransform:"uppercase"};
  const td_s={padding:"11px 14px",borderBottom:"1px solid #f8fafc",fontSize:13,verticalAlign:"middle"};
  const rmCats=[...new Set(rms.map(r=>r.cat))];

  const formatDateTH=(key)=>{
    const [y,m,d]=key.split("-").map(Number);
    const dt=new Date(y,m-1,d);
    return `${thTHDay[dt.getDay()]} ${d} ${thTHMonth[m-1]} ${y+543}`;
  };
  const formatMonthTH=(key)=>{
    const [y,m]=key.split("-").map(Number);
    return `${thTHMonth[m-1]} ${y+543}`;
  };

  return(
    <div style={{fontFamily:"var(--font-sans)",background:"#f8f7ff",minHeight:"100vh",padding:"0 0 3rem"}}>
      <div style={{background:tc.color,padding:"18px 24px 0",transition:"background .3s"}}>
        <div style={{maxWidth:1160,margin:"0 auto"}}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:16}}>
            <div style={{display:"flex",alignItems:"center",gap:10}}>
              <div style={{width:36,height:36,borderRadius:10,background:"rgba(255,255,255,.2)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:18}}>☕</div>
              <div>
                <div style={{fontSize:17,fontWeight:500,color:"#fff"}}>ระบบต้นทุนร้านเครื่องดื่ม & เบเกอรี่</div>
                <div style={{fontSize:12,color:"rgba(255,255,255,.7)"}}>วัตถุดิบ → ของผสม → เมนู → ต้นทุน</div>
              </div>
            </div>
            <div style={{display:"flex",alignItems:"center",gap:6,flexWrap:"wrap"}}>
              {branches.map(b=>(
                <div key={b.id} style={{display:"flex",alignItems:"center",gap:4}}>
                  {editBranchId===b.id?(
                    <div style={{display:"flex",gap:4,alignItems:"center"}}>
                      <input style={{padding:"4px 8px",borderRadius:7,border:"none",fontSize:12,width:90}} value={editBranchName} onChange={e=>setEditBranchName(e.target.value)}/>
                      <button style={{padding:"4px 8px",borderRadius:7,background:"#fff",border:"none",fontSize:11,cursor:"pointer",color:"#1D9E75",fontWeight:500}} onClick={()=>{setBranches(prev=>prev.map(x=>x.id===b.id?{...x,name:editBranchName}:x));setEditBranchId(null);}}>✓</button>
                      <button style={{padding:"4px 8px",borderRadius:7,background:"rgba(255,255,255,.2)",border:"none",fontSize:11,cursor:"pointer",color:"#fff"}} onClick={()=>setEditBranchId(null)}>✕</button>
                    </div>
                  ):(
                    <button onClick={()=>setActiveBranchId(b.id)} style={{display:"flex",alignItems:"center",gap:5,padding:"5px 12px",borderRadius:20,border:`2px solid ${activeBranchId===b.id?"#fff":"rgba(255,255,255,.3)"}`,background:activeBranchId===b.id?"#fff":"rgba(255,255,255,.15)",color:activeBranchId===b.id?tc.color:"#fff",cursor:"pointer",fontSize:12,fontWeight:activeBranchId===b.id?600:400,transition:"all .15s"}}>
                      🏪 {b.name}
                      {activeBranchId===b.id&&<span style={{fontSize:10,opacity:.7,cursor:"pointer"}} onClick={e=>{e.stopPropagation();setEditBranchId(b.id);setEditBranchName(b.name);}}>✏️</span>}
                    </button>
                  )}
                </div>
              ))}
              <button onClick={()=>{const id=Date.now();setBranches(prev=>[...prev,{id,name:`สาขา ${prev.length+1}`,color:"#7F77DD",menus:initMenus.map(m=>({...m})),fixed:initFixed.map(f=>({...f})),sales:genSampleSales()}]);setActiveBranchId(id);}} style={{padding:"5px 10px",borderRadius:20,border:"2px dashed rgba(255,255,255,.4)",background:"transparent",color:"rgba(255,255,255,.8)",cursor:"pointer",fontSize:12}}>+ สาขา</button>
            </div>
          </div>
          <div style={{display:"flex",gap:2,overflowX:"auto"}}>
            {TABS.map(t=>(
              <button key={t.id} onClick={()=>setTab(t.id)} style={{display:"flex",alignItems:"center",gap:6,padding:"10px 18px",border:"none",background:tab===t.id?"#fff":"transparent",color:tab===t.id?tc.color:"rgba(255,255,255,.8)",cursor:"pointer",fontSize:13,fontWeight:tab===t.id?500:400,borderRadius:"8px 8px 0 0",transition:"all .15s",whiteSpace:"nowrap"}}>
                <span style={{fontSize:14}}>{t.emoji}</span>{t.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div style={{maxWidth:1160,margin:"0 auto",padding:"24px 0 0"}}>

      {tab===0&&(
        <div>
          <div style={{display:"flex",gap:12,flexWrap:"wrap",marginBottom:20}}>
            {[
              {l:"รายได้วันนี้",v:"฿"+fmt(dash.rev),sub:formatDateTH(todayKey),bg:"#534AB7",e:"💜"},
              {l:"ต้นทุนรวม",v:"฿"+fmt(dash.total),sub:"วัตถุดิบ+fixed",bg:"#D85A30",e:"🧾"},
              {l:"กำไรสุทธิ",v:"฿"+fmt(dash.profit),sub:"หลังหักทุกอย่าง",bg:dash.profit>=0?"#1D9E75":"#E24B4A",e:"💵"},
              {l:"Net Margin",v:dash.rev>0?pct(dash.margin):"–",sub:dash.margin>0.2?"ดีมาก":"ควรปรับ",bg:dash.margin>0.2?"#1D9E75":"#BA7517",e:"📈"},
              {l:"ยอดขายวันนี้",v:fmt(menus.reduce((a,m)=>a+(getDaySales(todayKey)[m.id]||0),0))+" ชิ้น",sub:"รวมทุกเมนู",bg:"#378ADD",e:"🛒"},
            ].map(m=>(
              <div key={m.l} style={{flex:1,minWidth:130,background:m.bg,borderRadius:14,padding:"16px 18px"}}>
                <div style={{fontSize:20,marginBottom:6}}>{m.e}</div>
                <div style={{fontSize:22,fontWeight:500,color:"#fff",lineHeight:1.1}}>{m.v}</div>
                <div style={{fontSize:12,color:"rgba(255,255,255,.75)",marginTop:4}}>{m.l}</div>
                <div style={{fontSize:11,color:"rgba(255,255,255,.6)",marginTop:2}}>{m.sub}</div>
              </div>
            ))}
          </div>
          <div style={{display:"grid",gridTemplateColumns:"minmax(0,1.6fr) minmax(0,1fr)",gap:14,marginBottom:14}}>
            <div style={{background:"#fff",borderRadius:14,padding:"20px 22px",border:"1.5px solid #ede9fe"}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
                <span style={{fontWeight:500,fontSize:14,color:"#1e1b4b"}}>รายได้ vs ต้นทุน รายเมนู (วันนี้)</span>
                <div style={{display:"flex",gap:10,fontSize:11,color:"#64748b"}}>
                  <span style={{display:"flex",alignItems:"center",gap:4}}><span style={{width:10,height:10,borderRadius:2,background:"#CECBF6",border:"1.5px solid #7F77DD",display:"inline-block"}}></span>รายได้</span>
                  <span style={{display:"flex",alignItems:"center",gap:4}}><span style={{width:10,height:10,borderRadius:2,background:"#F5C4B3",border:"1.5px solid #D85A30",display:"inline-block"}}></span>ต้นทุน</span>
                </div>
              </div>
              <div style={{position:"relative",height:220}}><canvas ref={chartRef}></canvas></div>
            </div>
            <div style={{background:"#fff",borderRadius:14,padding:"20px 22px",border:"1.5px solid #d1fae5"}}>
              <div style={{fontWeight:500,fontSize:14,color:"#064e3b",marginBottom:14}}>Gross Margin รายเมนู</div>
              {dash.md.map(m=>{const gm=(m.price-m.cost)/m.price;return(
                <div key={m.id} style={{display:"flex",alignItems:"center",gap:10,marginBottom:10}}>
                  <Ring p={gm*100} color={mColor(gm)}/>
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{fontSize:13,fontWeight:500,color:"#111827",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{m.name}</div>
                    <div style={{fontSize:11,color:"#64748b"}}>฿{m.cost.toFixed(1)} ต้นทุน · <span style={{color:mColor(gm),fontWeight:500}}>{mLabel(gm)}</span></div>
                  </div>
                </div>
              );})}
            </div>
          </div>
        </div>
      )}

      {tab===1&&(
        <div>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
            <div>
              <div style={{fontWeight:500,fontSize:15,color:"#7c2d12"}}>ราคาวัตถุดิบทั้งหมด</div>
              <div style={{fontSize:12,color:"#64748b",marginTop:2}}>กรอกราคาซื้อและปริมาณ → ระบบคำนวณราคา/หน่วยให้อัตโนมัติ</div>
            </div>
            <button style={btnP} onClick={()=>setShowAddRm(showAddRm==="__new__"?false:"__new__")}>+ เพิ่มหมวดใหม่</button>
          </div>
          {showAddRm==="__new__"&&(
            <div style={{background:"#fff",borderRadius:14,padding:"20px 22px",border:"1.5px solid #fed7aa",marginBottom:16}}>
              <div style={{fontWeight:500,fontSize:14,color:"#7c2d12",marginBottom:12}}>เพิ่มวัตถุดิบใหม่ (หมวดใหม่)</div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr 1fr",gap:10,marginBottom:10}}>
                {[["ชื่อวัตถุดิบ","name","text"],["ราคาต่อแพ็ค (฿)","pricePerPack","number"],["ปริมาณ","packSize","number"],["หมวดหมู่","cat","text"]].map(([l,k,t])=>(
                  <div key={k}><label style={lbl}>{l}</label><input style={inp} type={t} value={t==="number"&&nr[k]===0?"":nr[k]} onChange={e=>setNr({...nr,[k]:t==="number"?+e.target.value:e.target.value})}/></div>
                ))}
                <div><label style={lbl}>หน่วย</label>
                  <select style={inp} value={nr.unit} onChange={e=>setNr({...nr,unit:e.target.value})}>
                    <option value="">-- เลือก --</option>
                    {["g","kg","ml","l","ชิ้น","ฟอง","ถุง","แพ็ค","ช้อนชา","ช้อนโต๊ะ"].map(u=><option key={u} value={u}>{u}</option>)}
                  </select>
                </div>
              </div>
              {nr.packSize>0&&nr.pricePerPack>0&&<div style={{fontSize:12,color:"#D85A30",marginBottom:10,fontWeight:500}}>ราคาต่อ{nr.unit||"หน่วย"}: ฿{(nr.pricePerPack/nr.packSize).toFixed(4)}</div>}
              <div style={{display:"flex",gap:8}}>
                <button style={btnP} onClick={()=>{if(!nr.name)return;setRms([...rms,{...nr,id:Date.now()}]);setNr({name:"",unit:"",pricePerPack:0,packSize:1,cat:""});setShowAddRm(false);}}>บันทึก</button>
                <button style={btnSm} onClick={()=>setShowAddRm(false)}>ยกเลิก</button>
              </div>
            </div>
          )}
          {rmCats.map((cat,ci)=>{
            const sc=SC[ci%SC.length],items=rms.filter(r=>r.cat===cat),isAdd=showAddRm===cat;
            return(
              <div key={cat} style={{background:"#fff",borderRadius:14,overflow:"hidden",border:`1.5px solid ${sc.border}`,marginBottom:14}}>
                <div style={{background:sc.bg,padding:"12px 20px",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                  <div style={{display:"flex",alignItems:"center",gap:8}}>
                    <span style={{fontWeight:500,fontSize:13,color:sc.accent}}>{cat}</span>
                    <span style={{fontSize:11,background:"#fff",color:sc.accent,padding:"1px 8px",borderRadius:10,border:`1px solid ${sc.border}`}}>{items.length} รายการ</span>
                  </div>
                  <button onClick={()=>setShowAddRm(isAdd?false:cat)} style={{padding:"5px 14px",borderRadius:8,border:`1.5px solid ${sc.border}`,background:isAdd?"#fff":sc.accent,color:isAdd?sc.accent:"#fff",cursor:"pointer",fontSize:12,fontWeight:500,transition:"all .15s"}}>
                    {isAdd?"✕ ยกเลิก":"+ เพิ่มในหมวดนี้"}
                  </button>
                </div>
                {isAdd&&(
                  <div style={{padding:"14px 20px",borderBottom:`1.5px solid ${sc.border}`,background:sc.bg+"55"}}>
                    <div style={{display:"grid",gridTemplateColumns:"2fr 1fr 1fr 1fr",gap:10,marginBottom:10}}>
                      {[["ชื่อวัตถุดิบ","name","text"],["ราคาต่อแพ็ค (฿)","pricePerPack","number"],["ปริมาณ","packSize","number"]].map(([l,k,t])=>(
                        <div key={k}><label style={lbl}>{l}</label><input style={inp} type={t} value={t==="number"&&nr[k]===0?"":nr[k]} onChange={e=>setNr({...nr,[k]:t==="number"?+e.target.value:e.target.value})}/></div>
                      ))}
                      <div><label style={lbl}>หน่วย</label>
                        <select style={inp} value={nr.unit} onChange={e=>setNr({...nr,unit:e.target.value})}>
                          <option value="">-- เลือก --</option>
                          {["g","kg","ml","l","ชิ้น","ฟอง","ถุง","แพ็ค","ช้อนชา","ช้อนโต๊ะ"].map(u=><option key={u} value={u}>{u}</option>)}
                        </select>
                      </div>
                    </div>
                    {nr.packSize>0&&nr.pricePerPack>0&&<div style={{fontSize:12,color:sc.accent,marginBottom:10,fontWeight:500}}>ราคาต่อ{nr.unit||"หน่วย"}: ฿{(nr.pricePerPack/nr.packSize).toFixed(4)}</div>}
                    <button style={{...btnP,background:sc.accent}} onClick={()=>{if(!nr.name)return;setRms([...rms,{...nr,id:Date.now(),cat}]);setNr({name:"",unit:"",pricePerPack:0,packSize:1,cat:""});setShowAddRm(false);}}>บันทึก</button>
                  </div>
                )}
                <table style={{width:"100%",borderCollapse:"collapse"}}>
                  <thead><tr style={{background:"#fafafa"}}>
                    {["วัตถุดิบ","ราคาต่อแพ็ค","ปริมาณ","หน่วย","ราคาต่อหน่วย",""].map(h=><th key={h} style={th_s}>{h}</th>)}
                  </tr></thead>
                  <tbody>
                    {items.map(r=>{
                      const cpu=cpuOf(r),isE=editId===r.id;
                      return(
                        <tr key={r.id}>
                          <td style={td_s}><span style={{fontWeight:500,color:"#1e293b"}}>{r.name}</span></td>
                          <td style={td_s}>{isE?<input style={{...inp,width:90}} type="number" value={r.pricePerPack} onChange={e=>setRms(rms.map(x=>x.id===r.id?{...x,pricePerPack:+e.target.value}:x))}/>:<span style={{color:sc.accent,fontWeight:500}}>฿{fmt(r.pricePerPack,2)}</span>}</td>
                          <td style={td_s}>{isE?<input style={{...inp,width:80}} type="number" value={r.packSize} onChange={e=>setRms(rms.map(x=>x.id===r.id?{...x,packSize:+e.target.value}:x))}/>:<span style={{color:"#475569"}}>{fmt(r.packSize,0)}</span>}</td>
                          <td style={{...td_s,color:"#64748b"}}>{r.unit}</td>
                          <td style={td_s}><span style={{background:sc.bg,color:sc.accent,padding:"3px 10px",borderRadius:8,fontWeight:500,fontSize:13}}>฿{cpu.toFixed(4)}/{r.unit}</span></td>
                          <td style={{...td_s,textAlign:"right"}}>
                            <div style={{display:"flex",gap:6,justifyContent:"flex-end"}}>
                              {isE?<button style={{...btnSm,borderColor:sc.border,color:sc.accent}} onClick={()=>setEditId(null)}>บันทึก ✓</button>:<button style={btnSm} onClick={()=>setEditId(r.id)}>แก้ไข</button>}
                              <button style={btnDanger} onClick={()=>setRms(rms.filter(x=>x.id!==r.id))}>ลบ</button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            );
          })}
        </div>
      )}

      {tab===2&&(
        <div>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
            <div>
              <div style={{fontWeight:500,fontSize:15,color:"#064e3b"}}>ของผสมที่ทำเอง (โฮมเมด)</div>
              <div style={{fontSize:12,color:"#64748b",marginTop:2}}>น้ำเชื่อม แยม ซอส ที่ทำจากวัตถุดิบหลายชิ้น</div>
            </div>
            <button style={btnP} onClick={()=>setShowAddComp(!showAddComp)}>+ เพิ่มของผสม</button>
          </div>
          {showAddComp&&(
            <div style={{background:"#fff",borderRadius:14,padding:"20px 22px",border:"1.5px solid #9FE1CB",marginBottom:16}}>
              <div style={{fontWeight:500,fontSize:14,color:"#064e3b",marginBottom:12}}>เพิ่มของผสมใหม่</div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",gap:10,marginBottom:12}}>
                {[["ชื่อของผสม","name","text"],["หน่วย","unit","text"],["ผลผลิต (หน่วย)","yield","number"],["หมวดหมู่","cat","text"]].map(([l,k,t])=>(
                  <div key={k}><label style={lbl}>{l}</label><input style={inp} type={t} value={nc[k]} onChange={e=>setNc({...nc,[k]:t==="number"?+e.target.value:e.target.value})}/></div>
                ))}
              </div>
              <div style={{background:"#f0fdf4",borderRadius:10,padding:"12px 14px",marginBottom:10}}>
                {nc.ings.length===0&&<div style={{fontSize:12,color:"#64748b"}}>ยังไม่มีวัตถุดิบ</div>}
                {nc.ings.map((ing,i)=>{const r=rms.find(x=>x.id===ing.rmId);const c=r?cpuOf(r)*ing.amt:0;return(
                  <div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"5px 0",borderBottom:"1px solid #dcfce7",fontSize:13}}>
                    <span style={{color:"#166534"}}>{r?.name||"?"} × {ing.amt} {r?.unit}</span>
                    <span style={{color:"#1D9E75",fontWeight:500}}>฿{c.toFixed(2)}</span>
                    <button style={{...btnDanger,padding:"2px 8px"}} onClick={()=>setNc({...nc,ings:nc.ings.filter((_,j)=>j!==i)})}>ลบ</button>
                  </div>
                );})}
              </div>
              <div style={{display:"flex",gap:8,alignItems:"flex-end",marginBottom:14}}>
                <div style={{flex:2}}><label style={lbl}>เลือกวัตถุดิบ</label>
                  <select style={inp} value={ncIng.rmId} onChange={e=>setNcIng({...ncIng,rmId:+e.target.value})}>
                    <option value="">-- เลือก --</option>
                    {rms.map(r=><option key={r.id} value={r.id}>{r.name} (฿{cpuOf(r).toFixed(3)}/{r.unit})</option>)}
                  </select>
                </div>
                <div style={{flex:1}}><label style={lbl}>จำนวน</label><input style={inp} type="number" value={ncIng.amt} onChange={e=>setNcIng({...ncIng,amt:+e.target.value})}/></div>
                <button style={{...btnP,background:"#1D9E75",whiteSpace:"nowrap"}} onClick={()=>{if(!ncIng.rmId||!ncIng.amt)return;setNc({...nc,ings:[...nc.ings,{rmId:ncIng.rmId,amt:ncIng.amt}]});setNcIng({rmId:"",amt:0});}}>+ เพิ่ม</button>
              </div>
              {nc.ings.length>0&&nc.yield>0&&<div style={{fontSize:13,color:"#1D9E75",fontWeight:500,marginBottom:12}}>ราคาต่อ{nc.unit||"หน่วย"}: ฿{compCpuOf(nc,rms).toFixed(4)}</div>}
              <div style={{display:"flex",gap:8}}>
                <button style={btnP} onClick={()=>{if(!nc.name||nc.yield<=0)return;setComps([...comps,{...nc,id:Date.now()}]);setNc({name:"",unit:"",yield:0,cat:"โฮมเมด",ings:[]});setShowAddComp(false);}}>บันทึก</button>
                <button style={btnSm} onClick={()=>setShowAddComp(false)}>ยกเลิก</button>
              </div>
            </div>
          )}
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))",gap:14}}>
            {comps.map((comp,ci)=>{
              const cpu=compCpuOf(comp,rms),totalCost=comp.ings.reduce((s,i)=>{const r=rms.find(x=>x.id===i.rmId);return s+(r?cpuOf(r)*i.amt:0);},0);
              const sc=SC[ci%SC.length];
              return(
                <div key={comp.id} style={{background:"#fff",borderRadius:14,overflow:"hidden",border:`1.5px solid ${sc.border}`}}>
                  <div style={{background:sc.bg,padding:"14px 18px",display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
                    <div>
                      <div style={{fontWeight:500,fontSize:15,color:sc.accent}}>{comp.name}</div>
                      <div style={{fontSize:12,color:sc.accent,opacity:.75,marginTop:2}}>{comp.cat} · ผลผลิต {fmt(comp.yield,0)} {comp.unit}</div>
                    </div>
                    <div style={{textAlign:"right"}}>
                      <div style={{fontSize:11,color:sc.accent,opacity:.7}}>ราคาต่อ{comp.unit}</div>
                      <div style={{fontSize:20,fontWeight:500,color:sc.accent}}>฿{cpu.toFixed(4)}</div>
                    </div>
                  </div>
                  <div style={{padding:"12px 18px"}}>
                    {comp.ings.map((ing,i)=>{const r=rms.find(x=>x.id===ing.rmId);const c=r?cpuOf(r)*ing.amt:0;return(
                      <div key={i} style={{display:"flex",justifyContent:"space-between",padding:"5px 0",borderBottom:"1px solid #f1f5f9",fontSize:12}}>
                        <span style={{color:"#64748b"}}>{r?.name||"?"} × {ing.amt} {r?.unit}</span>
                        <span style={{fontWeight:500}}>฿{c.toFixed(2)}</span>
                      </div>
                    );})}
                  </div>
                  <div style={{padding:"10px 18px",background:"#fafafa",display:"flex",justifyContent:"space-between",fontSize:12,color:"#475569"}}>
                    <span>ต้นทุนรวม: <b style={{color:sc.accent}}>฿{totalCost.toFixed(2)}</b></span>
                    <span>ผลผลิต: <b style={{color:sc.accent}}>{fmt(comp.yield,0)} {comp.unit}</b></span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {tab===3&&(
        <div>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
            <div>
              <div style={{fontWeight:500,fontSize:15,color:"#1e3a5f"}}>สูตรเมนูทั้งหมด</div>
              <div style={{fontSize:12,color:"#64748b",marginTop:2}}>ส่วนผสมดึงราคาจากหน้าวัตถุดิบและของผสมอัตโนมัติ</div>
            </div>
            <div style={{display:"flex",gap:6}}>
              {["ทั้งหมด","เครื่องดื่ม","เบเกอรี่"].map(c=>(
                <button key={c} style={{padding:"7px 16px",borderRadius:9,border:"1.5px solid "+(catF===c?tc.color:"#e2e8f0"),background:catF===c?tc.color:"#fff",color:catF===c?"#fff":"#374151",cursor:"pointer",fontSize:13,fontWeight:catF===c?500:400,transition:"all .15s"}} onClick={()=>setCatF(c)}>{c}</button>
              ))}
              <button style={btnP} onClick={()=>setShowAddMenu(!showAddMenu)}>+ เพิ่มเมนู</button>
            </div>
          </div>
          {showAddMenu&&(
            <div style={{background:"#fff",borderRadius:14,padding:"20px 22px",border:"1.5px solid #bfdbfe",marginBottom:16}}>
              <div style={{fontWeight:500,fontSize:14,color:"#1e3a5f",marginBottom:12}}>{editMenuId?"✏️ แก้ไขเมนู":"เพิ่มเมนูใหม่"}</div>
              <div style={{display:"grid",gridTemplateColumns:"2fr 1fr 1fr",gap:10,marginBottom:14}}>
                <div><label style={lbl}>ชื่อเมนู</label><input style={inp} value={nm.name} onChange={e=>setNm({...nm,name:e.target.value})}/></div>
                <div><label style={lbl}>ประเภท</label>
                  <select style={inp} value={nm.cat} onChange={e=>setNm({...nm,cat:e.target.value})}><option>เครื่องดื่ม</option><option>เบเกอรี่</option></select>
                </div>
                <div><label style={lbl}>ราคาขาย (฿)</label><input style={inp} type="number" value={nm.price} onChange={e=>setNm({...nm,price:+e.target.value})}/></div>
              </div>
              <div style={{fontWeight:500,fontSize:13,color:"#1e3a5f",marginBottom:8}}>ส่วนผสม</div>
              <div style={{background:"#EFF6FF",borderRadius:10,padding:"12px 14px",marginBottom:10,minHeight:40}}>
                {nm.ings.length===0&&<div style={{fontSize:12,color:"#64748b"}}>ยังไม่มีส่วนผสม</div>}
                {nm.ings.map((ing,i)=>{
                  let name="?",unit="",cpu=0;
                  if(ing.type==="raw"){const r=rms.find(x=>x.id===ing.id);name=r?.name||"?";unit=r?.unit||"";cpu=r?cpuOf(r)*ing.amt:0;}
                  else{const c=comps.find(x=>x.id===ing.id);name=c?.name||"?";unit=c?.unit||"";cpu=c?compCpuOf(c,rms)*ing.amt:0;}
                  return(
                    <div key={i} style={{borderBottom:"1px solid #bfdbfe",padding:"5px 0"}}>
                      {editIngIdx===i?(
                        <div style={{display:"flex",gap:6,alignItems:"center",flexWrap:"wrap"}}>
                          <select style={{...inp,flex:"0 0 100px",fontSize:12}} value={editIngVal.type} onChange={e=>setEditIngVal({...editIngVal,type:e.target.value,id:""})}>
                            <option value="raw">วัตถุดิบ</option><option value="comp">ของผสม</option>
                          </select>
                          <select style={{...inp,flex:1,fontSize:12}} value={editIngVal.id} onChange={e=>setEditIngVal({...editIngVal,id:+e.target.value})}>
                            <option value="">-- เลือก --</option>
                            {editIngVal.type==="raw"?rms.map(r=><option key={r.id} value={r.id}>{r.name} (฿{cpuOf(r).toFixed(3)}/{r.unit})</option>):comps.map(c=><option key={c.id} value={c.id}>{c.name}</option>)}
                          </select>
                          <input style={{...inp,flex:"0 0 80px",fontSize:12}} type="number" value={editIngVal.amt||""} onChange={e=>setEditIngVal({...editIngVal,amt:+e.target.value})}/>
                          <button style={{...btnSm,fontSize:12,color:"#1D9E75",borderColor:"#9FE1CB"}} onClick={()=>{if(!editIngVal.id||!editIngVal.amt)return;const updated=[...nm.ings];updated[i]={type:editIngVal.type,id:+editIngVal.id,amt:editIngVal.amt};setNm({...nm,ings:updated});setEditIngIdx(null);}}>บันทึก ✓</button>
                          <button style={{...btnSm,fontSize:12}} onClick={()=>setEditIngIdx(null)}>ยกเลิก</button>
                        </div>
                      ):(
                        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",fontSize:13}}>
                          <span style={{color:"#1e40af"}}>{ing.type==="comp"&&<span style={{background:"#D1FAE5",color:"#065f46",padding:"1px 5px",borderRadius:4,fontSize:10,marginRight:4}}>ผสม</span>}{name} × {ing.amt} {unit}</span>
                          <span style={{color:"#378ADD",fontWeight:500}}>฿{cpu.toFixed(2)}</span>
                          <div style={{display:"flex",gap:5}}>
                            <button style={{...btnSm,padding:"2px 8px"}} onClick={()=>{setEditIngIdx(i);setEditIngVal({type:ing.type,id:ing.id,amt:ing.amt});}}>แก้ไข</button>
                            <button style={{...btnDanger,padding:"2px 8px"}} onClick={()=>setNm({...nm,ings:nm.ings.filter((_,j)=>j!==i)})}>ลบ</button>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
              <div style={{display:"flex",gap:8,alignItems:"flex-end",marginBottom:12}}>
                <div style={{flex:1}}><label style={lbl}>ประเภทส่วนผสม</label>
                  <select style={inp} value={nmIng.type} onChange={e=>setNmIng({...nmIng,type:e.target.value,id:""})}><option value="raw">วัตถุดิบ</option><option value="comp">ของผสม</option></select>
                </div>
                <div style={{flex:2}}><label style={lbl}>เลือกรายการ</label>
                  <select style={inp} value={nmIng.id} onChange={e=>setNmIng({...nmIng,id:+e.target.value})}>
                    <option value="">-- เลือก --</option>
                    {nmIng.type==="raw"?rms.map(r=><option key={r.id} value={r.id}>{r.name} (฿{cpuOf(r).toFixed(3)}/{r.unit})</option>):comps.map(c=><option key={c.id} value={c.id}>{c.name} (฿{compCpuOf(c,rms).toFixed(3)}/{c.unit})</option>)}
                  </select>
                </div>
                <div style={{flex:1}}><label style={lbl}>ปริมาณ</label>
                  <div style={{display:"flex",alignItems:"center",gap:6}}>
                    <input style={{...inp,flex:1}} type="number" value={nmIng.amt} onChange={e=>setNmIng({...nmIng,amt:+e.target.value})}/>
                    {nmIng.id&&(()=>{const u=nmIng.type==="raw"?rms.find(x=>x.id===nmIng.id)?.unit||"":comps.find(x=>x.id===nmIng.id)?.unit||"";return u?<span style={{fontSize:12,color:"#64748b",whiteSpace:"nowrap",background:"#f1f5f9",padding:"6px 10px",borderRadius:8,border:"1.5px solid #e2e8f0",fontWeight:500}}>{u}</span>:null;})()}
                  </div>
                </div>
                <button style={{...btnP,whiteSpace:"nowrap",alignSelf:"flex-end",marginBottom:0}} onClick={()=>{
                  if(!nmIng.id||!nmIng.amt)return;
                  setNm(prev=>({...prev,ings:[...prev.ings,{type:nmIng.type,id:+nmIng.id,amt:nmIng.amt}]}));
                  setNmIng(prev=>({...prev,id:"",amt:0}));
                }}>+ เพิ่ม</button>
              </div>
              {nm.ings.length>0&&<div style={{fontSize:13,color:"#378ADD",fontWeight:500,marginBottom:12}}>
                ต้นทุนรวม: ฿{nm.ings.reduce((s,i)=>{if(i.type==="raw"){const r=rms.find(x=>x.id===i.id);return s+(r?cpuOf(r)*i.amt:0);}const c=comps.find(x=>x.id===i.id);return s+(c?compCpuOf(c,rms)*i.amt:0);},0).toFixed(2)}
                {nm.price>0&&` · Margin: ${pct(Math.max(0,(nm.price-nm.ings.reduce((s,i)=>{if(i.type==="raw"){const r=rms.find(x=>x.id===i.id);return s+(r?cpuOf(r)*i.amt:0);}const c=comps.find(x=>x.id===i.id);return s+(c?compCpuOf(c,rms)*i.amt:0);},0))/nm.price))}`}
              </div>}
              <div style={{display:"flex",gap:8}}>
                <button style={btnP} onClick={()=>{
                  if(!nm.name||nm.price<=0)return;
                  if(editMenuId){setMenus(menus.map(m=>m.id===editMenuId?{...nm,id:editMenuId}:m));setEditMenuId(null);}
                  else{setMenus([...menus,{...nm,id:Date.now()}]);}
                  setNm({name:"",cat:"เครื่องดื่ม",price:0,ings:[]});setNmIng({type:"raw",id:"",amt:0});setShowAddMenu(false);
                }}>{editMenuId?"อัปเดตเมนู":"บันทึกเมนู"}</button>
                <button style={btnSm} onClick={()=>{setShowAddMenu(false);setEditMenuId(null);setNm({name:"",cat:"เครื่องดื่ม",price:0,ings:[]});}}>ยกเลิก</button>
              </div>
            </div>
          )}
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(290px,1fr))",gap:14}}>
            {menus.filter(m=>catF==="ทั้งหมด"||m.cat===catF).map((menu,mi)=>{
              const cost=menuCost(menu,rms,comps),gm=(menu.price-cost)/menu.price;
              const sc=SC[mi%SC.length];
              return(
                <div key={menu.id} style={{background:"#fff",borderRadius:14,overflow:"hidden",border:`1.5px solid ${sc.border}`}}>
                  <div style={{background:sc.bg,padding:"16px 18px",display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
                    <div>
                      <div style={{fontWeight:500,fontSize:15,color:sc.accent,marginBottom:6}}>{menu.name}</div>
                      <span style={{background:"#fff",color:sc.accent,border:`1px solid ${sc.border}`,padding:"2px 10px",borderRadius:20,fontSize:11,fontWeight:500}}>{menu.cat}</span>
                    </div>
                    <div style={{textAlign:"right"}}>
                      <div style={{fontSize:24,fontWeight:500,color:sc.accent}}>฿{menu.price}</div>
                      <div style={{fontSize:11,color:sc.accent,opacity:.7}}>ราคาขาย</div>
                    </div>
                  </div>
                  <div style={{padding:"12px 18px"}}>
                    {menu.ings.map((ing,i)=>{
                      const c=ingCost(ing,rms,comps);
                      let name="?",unit="";
                      if(ing.type==="raw"){const r=rms.find(x=>x.id===ing.id);name=r?.name||"?";unit=r?.unit||"";}
                      else{const cp=comps.find(x=>x.id===ing.id);name=cp?.name||"?";unit=cp?.unit||"";}
                      return(
                        <div key={i} style={{display:"flex",justifyContent:"space-between",padding:"5px 0",borderBottom:"1px solid #f1f5f9",fontSize:12}}>
                          <span style={{color:"#64748b"}}>{ing.type==="comp"&&<span style={{background:"#D1FAE5",color:"#065f46",padding:"1px 5px",borderRadius:4,fontSize:10,marginRight:4}}>ผสม</span>}{name} × {ing.amt}{unit}</span>
                          <span style={{fontWeight:500}}>฿{c.toFixed(2)}</span>
                        </div>
                      );
                    })}
                  </div>
                  <div style={{padding:"12px 18px",background:"#fafafa",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                    <div><div style={{fontSize:11,color:"#64748b"}}>ต้นทุนวัตถุดิบ</div><div style={{fontWeight:500,fontSize:17,color:"#1e293b"}}>฿{cost.toFixed(2)}</div></div>
                    <div style={{textAlign:"center"}}><Ring p={gm*100} color={mColor(gm)}/><div style={{fontSize:10,color:mColor(gm),fontWeight:500,marginTop:2}}>{mLabel(gm)}</div></div>
                    <div style={{textAlign:"right"}}><div style={{fontSize:11,color:"#64748b"}}>Gross Margin</div><div style={{fontWeight:500,fontSize:20,color:mColor(gm)}}>{pct(gm)}</div></div>
                  </div>
                  <div style={{padding:"10px 18px",borderTop:"1px solid #f1f5f9",display:"flex",gap:8,justifyContent:"flex-end"}}>
                    <button style={btnSm} onClick={()=>{setEditMenuId(menu.id);setNm({name:menu.name,cat:menu.cat,price:menu.price,ings:menu.ings.map(i=>({...i}))});setNmIng({type:"raw",id:"",amt:0});setShowAddMenu(true);window.scrollTo({top:0,behavior:"smooth"});}}>✏️ แก้ไข</button>
                    <button style={btnDanger} onClick={()=>setMenus(menus.filter(x=>x.id!==menu.id))}>ลบ</button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {tab===4&&(
        <div>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
            <div>
              <div style={{fontWeight:500,fontSize:15,color:"#312e81"}}>ต้นทุน & Margin</div>
              <div style={{fontSize:12,color:"#64748b",marginTop:2}}>บันทึกยอดขายรายวัน · ดูสรุปรายเดือน · ย้อนหลัง 3 เดือน</div>
            </div>
            <div style={{display:"flex",gap:6}}>
              {[{v:"daily",l:"รายวัน"},{v:"month",l:"รายเดือน"},{v:"history",l:"ย้อนหลัง 3 เดือน"}].map(o=>(
                <button key={o.v} style={{padding:"8px 16px",borderRadius:9,border:"1.5px solid "+(historyView===o.v?"#7F77DD":"#e2e8f0"),background:historyView===o.v?"#7F77DD":"#fff",color:historyView===o.v?"#fff":"#374151",cursor:"pointer",fontSize:13,fontWeight:historyView===o.v?500:400,transition:"all .15s"}} onClick={()=>setHistoryView(o.v)}>{o.l}</button>
              ))}
            </div>
          </div>

          {historyView==="daily"&&(
            <div>
              <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:16}}>
                <div style={{flex:1}}>
                  <label style={lbl}>เลือกวันที่</label>
                  <input type="date" style={{...inp,maxWidth:200}} value={selectedDate} onChange={e=>setSelectedDate(e.target.value)}/>
                </div>
                <div style={{paddingTop:20}}>
                  <div style={{fontSize:13,color:"#64748b"}}>{formatDateTH(selectedDate)}</div>
                </div>
              </div>
              <div style={{display:"flex",gap:10,flexWrap:"wrap",marginBottom:16}}>
                {[
                  {l:"รายได้",v:"฿"+fmt(todayStats.rev),bg:"#534AB7"},
                  {l:"ต้นทุนวัตถุดิบ",v:"฿"+fmt(todayStats.vc),bg:"#D85A30"},
                  {l:"Fixed Cost",v:"฿"+fmt(todayStats.fc,0),bg:"#BA7517"},
                  {l:"กำไรสุทธิ",v:"฿"+fmt(todayStats.profit),bg:todayStats.profit>=0?"#1D9E75":"#E24B4A"},
                  {l:"Net Margin",v:todayStats.rev>0?pct(todayStats.margin):"–",bg:todayStats.margin>0.2?"#1D9E75":"#BA7517"},
                ].map(s=>(
                  <div key={s.l} style={{flex:1,minWidth:110,background:s.bg,borderRadius:12,padding:"12px 14px"}}>
                    <div style={{fontSize:18,fontWeight:500,color:"#fff"}}>{s.v}</div>
                    <div style={{fontSize:11,color:"rgba(255,255,255,.75)",marginTop:3}}>{s.l}</div>
                  </div>
                ))}
              </div>
              <div style={{background:"#fff",borderRadius:14,overflow:"hidden",border:"1.5px solid #c7d2fe"}}>
                <div style={{background:"#EEF2FF",padding:"12px 16px",display:"flex",alignItems:"center",justifyContent:"space-between",gap:8}}>
                  <div style={{display:"flex",alignItems:"center",gap:8}}>
                    <span style={{fontWeight:500,fontSize:13,color:"#3730a3"}}>บันทึกยอดขาย</span>
                    <span style={{fontSize:11,color:"#6366f1"}}>{formatDateTH(selectedDate)}</span>
                  </div>
                  <div style={{display:"flex",alignItems:"center",gap:8}}>
                    {pdfMsg&&<span style={{fontSize:11,color:pdfMsg.startsWith("✅")?"#1D9E75":"#E24B4A"}}>{pdfMsg}</span>}
                    <label style={{padding:"6px 14px",borderRadius:8,background:"#7F77DD",color:"#fff",fontSize:12,fontWeight:500,cursor:pdfLoading?"not-allowed":"pointer",opacity:pdfLoading?0.6:1,display:"flex",alignItems:"center",gap:5}}>
                      {pdfLoading?"⏳ กำลังอ่าน PDF...":"📄 อัปโหลด PDF ยอดขาย"}
                      <input type="file" accept=".pdf" style={{display:"none"}} disabled={pdfLoading} onChange={async e=>{
                        const file=e.target.files?.[0];
                        if(!file)return;
                        setPdfLoading(true);setPdfMsg("");
                        try{
                          const fd=new FormData();
                          fd.append("file",file);
                          fd.append("menuNames",menus.map(m=>m.name).join(", "));
                          const res=await fetch("/api/parse-pdf",{method:"POST",body:fd});
                          const data=await res.json();
                          if(data.error){setPdfMsg("❌ "+data.error);return;}
                          let count=0;
                          menus.forEach(m=>{
                            if(data[m.name]!==undefined&&data[m.name]>0){
                              setDaySales(selectedDate,m.id,data[m.name]);count++;
                            }
                          });
                          setPdfMsg(`✅ กรอกแล้ว ${count} เมนู`);
                        }catch(err){setPdfMsg("❌ เกิดข้อผิดพลาด");}
                        finally{setPdfLoading(false);e.target.value="";}
                      }}/>
                    </label>
                  </div>
                </div>
                <table style={{width:"100%",borderCollapse:"collapse"}}>
                  <thead><tr style={{background:"#f8f9ff"}}>
                    {["เมนู","ประเภท","ราคาขาย","ต้นทุน/ชิ้น","Gross Margin","จำนวนที่ขาย","รายได้","กำไร gross"].map(h=>(
                      <th key={h} style={{...th_s,color:"#3730a3"}}>{h}</th>
                    ))}
                  </tr></thead>
                  <tbody>
                    {menus.map(m=>{
                      const cost=menuCost(m,rms,comps),gm=(m.price-cost)/m.price;
                      const qty=getDaySales(selectedDate)[m.id]||0;
                      const rev=m.price*qty,gp=(m.price-cost)*qty;
                      return(
                        <tr key={m.id} style={{borderBottom:"1px solid #f1f5f9"}}>
                          <td style={td_s}><span style={{fontWeight:500,color:"#1e293b"}}>{m.name}</span></td>
                          <td style={td_s}><span style={{background:m.cat==="เครื่องดื่ม"?"#EDE9FE":"#D1FAE5",color:m.cat==="เครื่องดื่ม"?"#4C1D95":"#065f46",padding:"1px 8px",borderRadius:20,fontSize:11,fontWeight:500}}>{m.cat}</span></td>
                          <td style={td_s}>฿{m.price}</td>
                          <td style={td_s}>฿{cost.toFixed(2)}</td>
                          <td style={td_s}><span style={{fontWeight:500,color:mColor(gm)}}>{pct(gm)}</span></td>
                          <td style={td_s}>
                            <input type="number" min="0" style={{...inp,width:70,textAlign:"center"}} value={qty}
                              onChange={e=>setDaySales(selectedDate,m.id,+e.target.value)}/>
                          </td>
                          <td style={{...td_s,fontWeight:500,color:"#7F77DD"}}>฿{fmt(rev)}</td>
                          <td style={{...td_s,fontWeight:500,color:gp>=0?"#1D9E75":"#E24B4A"}}>฿{fmt(gp)}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {historyView==="month"&&(
            <div>
              <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:16}}>
                <label style={{...lbl,margin:0}}>เดือน</label>
                <select style={{...inp,maxWidth:200}} value={viewMonth} onChange={e=>setViewMonth(e.target.value)}>
                  {months3.map(mk=><option key={mk} value={mk}>{formatMonthTH(mk)}</option>)}
                </select>
              </div>
              <div style={{display:"flex",gap:10,flexWrap:"wrap",marginBottom:16}}>
                {[
                  {l:"รายได้รวม",v:"฿"+fmt(monthStats.rev),bg:"#534AB7"},
                  {l:"ต้นทุนวัตถุดิบ",v:"฿"+fmt(monthStats.vc),bg:"#D85A30"},
                  {l:"Fixed Cost",v:"฿"+fmt(monthStats.fc,0),bg:"#BA7517"},
                  {l:"กำไรสุทธิ",v:"฿"+fmt(monthStats.profit),bg:monthStats.profit>=0?"#1D9E75":"#E24B4A"},
                  {l:"Net Margin",v:monthStats.rev>0?pct(monthStats.margin):"–",bg:monthStats.margin>0.2?"#1D9E75":"#BA7517"},
                ].map(s=>(
                  <div key={s.l} style={{flex:1,minWidth:120,background:s.bg,borderRadius:12,padding:"12px 14px"}}>
                    <div style={{fontSize:18,fontWeight:500,color:"#fff"}}>{s.v}</div>
                    <div style={{fontSize:11,color:"rgba(255,255,255,.75)",marginTop:3}}>{s.l}</div>
                    <div style={{fontSize:10,color:"rgba(255,255,255,.55)",marginTop:2}}>ต่อเดือน ({monthStats.days} วัน)</div>
                  </div>
                ))}
              </div>
              <div style={{background:"#fff",borderRadius:14,overflow:"hidden",border:"1.5px solid #c7d2fe",marginBottom:14}}>
                <div style={{background:"#EEF2FF",padding:"12px 16px"}}>
                  <span style={{fontWeight:500,fontSize:13,color:"#3730a3"}}>ยอดขายรายเมนู — {formatMonthTH(viewMonth)}</span>
                </div>
                <table style={{width:"100%",borderCollapse:"collapse"}}>
                  <thead><tr style={{background:"#f8f9ff"}}>
                    {["เมนู","ยอดขาย (ชิ้น)","รายได้","ต้นทุน","กำไร gross","Margin"].map(h=><th key={h} style={{...th_s,color:"#3730a3"}}>{h}</th>)}
                  </tr></thead>
                  <tbody>
                    {menus.map(m=>{
                      const cost=menuCost(m,rms,comps),gm=(m.price-cost)/m.price;
                      const qty=monthStats.menuQtys[m.id]||0;
                      const rev=m.price*qty,vc=cost*qty,gp=(m.price-cost)*qty;
                      return(
                        <tr key={m.id} style={{borderBottom:"1px solid #f1f5f9"}}>
                          <td style={td_s}><span style={{fontWeight:500,color:"#1e293b"}}>{m.name}</span></td>
                          <td style={td_s}><span style={{fontWeight:500,color:"#7F77DD"}}>{fmt(qty)}</span></td>
                          <td style={td_s}>฿{fmt(rev)}</td>
                          <td style={td_s}>฿{fmt(vc)}</td>
                          <td style={{...td_s,fontWeight:500,color:gp>=0?"#1D9E75":"#E24B4A"}}>฿{fmt(gp)}</td>
                          <td style={td_s}><span style={{fontWeight:500,color:mColor(gm)}}>{pct(gm)}</span></td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {historyView==="history"&&(
            <div>
              <div style={{fontWeight:500,fontSize:14,color:"#312e81",marginBottom:14}}>เปรียบเทียบ 3 เดือน</div>
              <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:14,marginBottom:20}}>
                {allMonthStats.map(({key,stats},mi)=>{
                  const sc=SC[mi%SC.length];
                  const isCurrentMonth=key===toMonthKey(today);
                  return(
                    <div key={key} style={{background:"#fff",borderRadius:14,overflow:"hidden",border:`2px solid ${isCurrentMonth?sc.accent:sc.border}`}}>
                      <div style={{background:sc.bg,padding:"12px 16px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                        <span style={{fontWeight:500,fontSize:14,color:sc.accent}}>{formatMonthTH(key)}</span>
                        {isCurrentMonth&&<span style={{fontSize:11,background:sc.accent,color:"#fff",padding:"2px 8px",borderRadius:10}}>เดือนนี้</span>}
                      </div>
                      <div style={{padding:"14px 16px"}}>
                        {[
                          {l:"รายได้",v:"฿"+fmt(stats.rev),c:sc.accent},
                          {l:"ต้นทุนรวม",v:"฿"+fmt(stats.total||stats.vc+stats.fc),c:"#D85A30"},
                          {l:"กำไรสุทธิ",v:"฿"+fmt(stats.profit),c:stats.profit>=0?"#1D9E75":"#E24B4A"},
                          {l:"Net Margin",v:stats.rev>0?pct(stats.margin):"–",c:stats.margin>0.2?"#1D9E75":"#BA7517"},
                        ].map(r=>(
                          <div key={r.l} style={{display:"flex",justifyContent:"space-between",padding:"7px 0",borderBottom:"1px solid #f1f5f9",fontSize:13}}>
                            <span style={{color:"#64748b"}}>{r.l}</span>
                            <span style={{fontWeight:500,color:r.c}}>{r.v}</span>
                          </div>
                        ))}
                      </div>
                      <button style={{width:"100%",padding:"10px",border:"none",borderTop:"1px solid #f1f5f9",background:"transparent",cursor:"pointer",color:sc.accent,fontSize:13,fontWeight:500}} onClick={()=>{setViewMonth(key);setHistoryView("month");}}>
                        ดูรายละเอียด →
                      </button>
                    </div>
                  );
                })}
              </div>
              <div style={{background:"#fff",borderRadius:14,padding:"20px 22px",border:"1.5px solid #e2e8f0"}}>
                <div style={{fontWeight:500,fontSize:14,color:"#1e293b",marginBottom:14}}>เมนูขายดีสุด 3 เดือน</div>
                {menus.map(m=>{
                  const totalQty=months3.reduce((s,mk)=>{
                    const ms=calcMonthStats(mk);return s+(ms.menuQtys[m.id]||0);
                  },0);
                  const maxQty=Math.max(...menus.map(mx=>months3.reduce((s,mk)=>{const ms=calcMonthStats(mk);return s+(ms.menuQtys[mx.id]||0);},0)));
                  return(
                    <div key={m.id} style={{marginBottom:10}}>
                      <div style={{display:"flex",justifyContent:"space-between",fontSize:13,marginBottom:4}}>
                        <span style={{fontWeight:500,color:"#1e293b"}}>{m.name}</span>
                        <span style={{color:"#7F77DD",fontWeight:500}}>{fmt(totalQty)} ชิ้น · ฿{fmt(totalQty*m.price)}</span>
                      </div>
                      <MBar v={totalQty} max={maxQty} color={C.purple} h={8}/>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}

      {tab===5&&(
        <div>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
            <div>
              <div style={{fontWeight:500,fontSize:15,color:"#78350f"}}>ต้นทุนคงที่ (Fixed Cost)</div>
              <div style={{fontSize:12,color:"#64748b",marginTop:2}}>รวม ฿{fmt(fixedPD*30)}/เดือน · ฿{fmt(fixedPD,1)}/วัน</div>
            </div>
            <button style={btnP} onClick={()=>setShowAddFixed(!showAddFixed)}>+ เพิ่มรายการ</button>
          </div>
          {showAddFixed&&(
            <div style={{background:"#fff",borderRadius:14,padding:"20px 22px",border:"1.5px solid #FDE68A",marginBottom:16}}>
              <div style={{fontWeight:500,fontSize:14,color:"#78350f",marginBottom:12}}>เพิ่มต้นทุนคงที่</div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10,marginBottom:14}}>
                <div><label style={lbl}>รายการ</label><input style={inp} value={nf.name} onChange={e=>setNf({...nf,name:e.target.value})}/></div>
                <div><label style={lbl}>จำนวน (฿)</label><input style={inp} type="number" value={nf.amt} onChange={e=>setNf({...nf,amt:+e.target.value})}/></div>
                <div><label style={lbl}>ช่วงเวลา</label>
                  <select style={inp} value={nf.period} onChange={e=>setNf({...nf,period:e.target.value})}>
                    {["วัน","เดือน","ปี"].map(p=><option key={p}>{p}</option>)}
                  </select>
                </div>
              </div>
              <div style={{display:"flex",gap:8}}>
                <button style={btnP} onClick={()=>{if(!nf.name)return;setFixed([...fixed,{...nf,id:Date.now()}]);setNf({name:"",amt:0,period:"เดือน",icon:"📦"});setShowAddFixed(false);}}>บันทึก</button>
                <button style={btnSm} onClick={()=>setShowAddFixed(false)}>ยกเลิก</button>
              </div>
            </div>
          )}
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(240px,1fr))",gap:12,marginBottom:16}}>
            {fixed.map((f,fi)=>{
              const pd=f.period==="วัน"?f.amt:f.period==="เดือน"?f.amt/30:f.amt/365;
              const ratio=fixedPD>0?pd/fixedPD:0;
              const sc=SC[fi%SC.length];
              return(
                <div key={f.id} style={{background:"#fff",borderRadius:14,padding:"16px 18px",border:`1.5px solid ${sc.border}`}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
                    <div style={{width:40,height:40,borderRadius:10,background:sc.bg,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20}}>{f.icon}</div>
                    <div style={{background:sc.bg,color:sc.accent,padding:"3px 10px",borderRadius:20,fontSize:12,fontWeight:500}}>{pct(ratio)}</div>
                  </div>
                  <div style={{fontWeight:500,fontSize:14,color:"#1e293b",marginTop:10}}>{f.name}</div>
                  <div style={{fontSize:13,color:sc.accent,marginTop:2}}>฿{fmt(f.amt)}/{f.period}</div>
                  <MBar v={ratio} color={sc.accent} h={5}/>
                  <div style={{display:"flex",gap:6,marginTop:12}}>
                    <button style={{...btnSm,borderColor:sc.border,color:sc.accent}} onClick={()=>setEditId(editId===f.id?null:f.id)}>แก้ไข</button>
                    <button style={btnDanger} onClick={()=>setFixed(fixed.filter(x=>x.id!==f.id))}>ลบ</button>
                  </div>
                  {editId===f.id&&(
                    <div style={{marginTop:10,paddingTop:10,borderTop:`1px solid ${sc.border}`}}>
                      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
                        <div><label style={lbl}>ชื่อ</label><input style={inp} value={f.name} onChange={e=>setFixed(fixed.map(x=>x.id===f.id?{...x,name:e.target.value}:x))}/></div>
                        <div><label style={lbl}>฿</label><input style={inp} type="number" value={f.amt} onChange={e=>setFixed(fixed.map(x=>x.id===f.id?{...x,amt:+e.target.value}:x))}/></div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          <div style={{background:"#fff",borderRadius:14,padding:"20px 22px",border:"1.5px solid #FDE68A"}}>
            <div style={{fontWeight:500,fontSize:14,color:"#78350f",marginBottom:14}}>Break-even Analysis</div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))",gap:10}}>
              {[
                {l:"Fixed Cost/วัน",v:"฿"+fmt(fixedPD,1),bg:"#FEF3C7",c:"#92400e"},
                {l:"Fixed Cost/เดือน",v:"฿"+fmt(fixedPD*30),bg:"#FEF3C7",c:"#92400e"},
                {l:"Fixed Cost/ปี",v:"฿"+fmt(fixedPD*365),bg:"#FEF3C7",c:"#92400e"},
                {l:"Break-even/วัน",v:(()=>{
                  const totalQty=menus.reduce((a,m)=>a+(getDaySales(todayKey)[m.id]||0),0);
                  const ag=dash.rev>0?(dash.rev-dash.vc)/Math.max(totalQty,1):0;
                  return ag>0?fmt(fixedPD/ag,0)+" ชิ้น":"–";
                })(),bg:"#D1FAE5",c:"#064e3b"},
              ].map(r=>(
                <div key={r.l} style={{background:r.bg,borderRadius:12,padding:"14px 16px"}}>
                  <div style={{fontSize:12,color:r.c,fontWeight:500}}>{r.l}</div>
                  <div style={{fontSize:20,fontWeight:500,color:r.c,marginTop:4}}>{r.v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      </div>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.umd.js" key="cjs"></script>
    </div>
  );
}
