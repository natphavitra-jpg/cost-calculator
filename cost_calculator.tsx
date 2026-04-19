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
  {id:1001,name:"กรีนแอปเปิ้ล monin",unit:"ml",pricePerPack:365,packSize:700,cat:"ไซรัป"},
  {id:1002,name:"กระดาษ POS ปริ้นเตอร์",unit:"ชิ้น",pricePerPack:135,packSize:2,cat:"บรรจุภัณฑ์"},
  {id:1003,name:"กระดาษปิดปากแก้ว",unit:"ใบ",pricePerPack:90,packSize:100,cat:"บรรจุภัณฑ์"},
  {id:1004,name:"กระดาษรอง Simple",unit:"g",pricePerPack:750,packSize:500,cat:"บรรจุภัณฑ์"},
  {id:1005,name:"กระปุกน้ำจิ้ม 2 ออน",unit:"ชิ้น",pricePerPack:28,packSize:50,cat:"บรรจุภัณฑ์"},
  {id:1006,name:"กีวี่ monin",unit:"ml",pricePerPack:365,packSize:701,cat:"ไซรัป"},
  {id:1007,name:"คาราเมล Monin",unit:"ml",pricePerPack:365,packSize:700,cat:"ไซรัป"},
  {id:1008,name:"คุกกี้โลตัส บิสคอฟซอส",unit:"g",pricePerPack:215,packSize:400,cat:"เบเกอรี่"},
  {id:1009,name:"ครีมมี่ครีมชีส",unit:"g",pricePerPack:128,packSize:400,cat:"นม"},
  {id:1010,name:"ชเวป (กระป๋อง)",unit:"ml",pricePerPack:17,packSize:30,cat:"ของเหลว"},
  {id:1011,name:"ชาคาโมมาย",unit:"ซอง",pricePerPack:315,packSize:25,cat:"ชา/กาแฟ"},
  {id:1012,name:"ช็อคโกแลตคุกกี้ monin",unit:"ml",pricePerPack:365,packSize:700,cat:"ไซรัป"},
  {id:1013,name:"ช้อนเค้ก (กลับบ้าน)",unit:"ชิ้น",pricePerPack:20,packSize:100,cat:"บรรจุภัณฑ์"},
  {id:1014,name:"ซองครัวซองค์ (น้ำตาล)",unit:"ใบ",pricePerPack:65,packSize:50,cat:"บรรจุภัณฑ์"},
  {id:1015,name:"ซอสคาราเมล aro",unit:"g",pricePerPack:130,packSize:1200,cat:"ซอส"},
  {id:1016,name:"ซอสช็อคโกแลต aro",unit:"g",pricePerPack:130,packSize:1201,cat:"ซอส"},
  {id:1017,name:"ซันควิก ส้ม mix",unit:"ml",pricePerPack:229,packSize:750,cat:"ของเหลว"},
  {id:1018,name:"ซันควิก ส้มเข้มข้น",unit:"ml",pricePerPack:229,packSize:1000,cat:"ของเหลว"},
  {id:1019,name:"ถั่วตุ๊ปตับ",unit:"g",pricePerPack:35,packSize:120,cat:"ท็อปปิ้ง"},
  {id:1020,name:"ถุงกระดาษ simple",unit:"ใบ",pricePerPack:5,packSize:1,cat:"บรรจุภัณฑ์"},
  {id:1021,name:"ถุงซาวโด",unit:"ใบ",pricePerPack:120,packSize:50,cat:"บรรจุภัณฑ์"},
  {id:1022,name:"ถุงซิปใส่น้ำเดลิเวอรี่",unit:"ใบ",pricePerPack:45,packSize:100,cat:"บรรจุภัณฑ์"},
  {id:1023,name:"ถุงหิ้ว 12*20",unit:"ใบ",pricePerPack:45,packSize:100,cat:"บรรจุภัณฑ์"},
  {id:1024,name:"ถุงหิ้ว 15x22",unit:"ใบ",pricePerPack:40,packSize:100,cat:"บรรจุภัณฑ์"},
  {id:1025,name:"ถุงหิ้ว 6*14",unit:"ใบ",pricePerPack:45,packSize:100,cat:"บรรจุภัณฑ์"},
  {id:1026,name:"ถุงหิ้ว 8*16",unit:"ใบ",pricePerPack:45,packSize:100,cat:"บรรจุภัณฑ์"},
  {id:1027,name:"ถุงหิ้ว 9*18",unit:"ใบ",pricePerPack:45,packSize:101,cat:"บรรจุภัณฑ์"},
  {id:1028,name:"ถุงหิ้วแก้วคู่ (ห่อ)",unit:"ใบ",pricePerPack:45,packSize:100,cat:"บรรจุภัณฑ์"},
  {id:1029,name:"ถุงหิ้วเดี่ยว (ห่อ)",unit:"ใบ",pricePerPack:45,packSize:100,cat:"บรรจุภัณฑ์"},
  {id:1030,name:"ทิชชู่เช็ดปาก (แพ็ค)",unit:"แผ่น",pricePerPack:95,packSize:250,cat:"บรรจุภัณฑ์"},
  {id:1031,name:"ทีรามิสุ monin",unit:"ml",pricePerPack:365,packSize:700,cat:"ไซรัป"},
  {id:1032,name:"น้ำตาลทรายขาวซองเล็ก",unit:"ซอง",pricePerPack:99,packSize:300,cat:"แห้ง"},
  {id:1033,name:"น้ำตาลทรายมิตรผล",unit:"g",pricePerPack:28,packSize:1000,cat:"แห้ง"},
  {id:1034,name:"น้ำตาลแดงซองเล็ก",unit:"ซอง",pricePerPack:65,packSize:100,cat:"แห้ง"},
  {id:1035,name:"น้ำตาลโตนด",unit:"g",pricePerPack:350,packSize:1500,cat:"แห้ง"},
  {id:1036,name:"น้ำทับทิม Maree",unit:"ml",pricePerPack:79,packSize:1000,cat:"ของเหลว"},
  {id:1037,name:"น้ำบ๋วย ดอยคำ",unit:"ml",pricePerPack:85,packSize:500,cat:"ของเหลว"},
  {id:1038,name:"น้ำผึ้ง",unit:"g",pricePerPack:180,packSize:1000,cat:"แห้ง"},
  {id:1039,name:"น้ำแร่ธรรมชาติ",unit:"ขวด",pricePerPack:69,packSize:12,cat:"ของเหลว"},
  {id:1040,name:"น้ำดื่ม Simple",unit:"ขวด",pricePerPack:30,packSize:12,cat:"ของเหลว"},
  {id:1041,name:"น้ำเสาวรส ดอยคำ",unit:"ml",pricePerPack:85,packSize:500,cat:"ของเหลว"},
  {id:1042,name:"นม MAC MILK 2กก",unit:"ml",pricePerPack:97,packSize:2000,cat:"นม"},
  {id:1043,name:"นมข้นจืด (กระป๋อง)",unit:"g",pricePerPack:25,packSize:385,cat:"นม"},
  {id:1044,name:"นมข้นหวาน (ถุง 2กก)",unit:"g",pricePerPack:110,packSize:2000,cat:"นม"},
  {id:1045,name:"บบั เบิ้ลกัม monin",unit:"ml",pricePerPack:365,packSize:702,cat:"ไซรัป"},
  {id:1046,name:"บิสครอฟแผ่น 50ชิ้น",unit:"ชิ้น",pricePerPack:169,packSize:50,cat:"เบเกอรี่"},
  {id:1047,name:"บลูคูลลาคาว monin",unit:"ml",pricePerPack:365,packSize:700,cat:"ไซรัป"},
  {id:1048,name:"บ๋วยดอง",unit:"g",pricePerPack:45,packSize:320,cat:"อื่นๆ"},
  {id:1049,name:"ป๊อปคอน",unit:"g",pricePerPack:5,packSize:80,cat:"ท็อปปิ้ง"},
  {id:1050,name:"ป๊อปคอร์น monin",unit:"ml",pricePerPack:365,packSize:701,cat:"ไซรัป"},
  {id:1051,name:"ป๊อปปิ้ง สตอเบอร์รี่",unit:"g",pricePerPack:195,packSize:1000,cat:"ท็อปปิ้ง"},
  {id:1052,name:"ป๊อปปิ้งลิ้นจี่",unit:"g",pricePerPack:195,packSize:1000,cat:"ท็อปปิ้ง"},
  {id:1053,name:"พีช monin",unit:"ml",pricePerPack:365,packSize:700,cat:"ไซรัป"},
  {id:1054,name:"พีชเชื่อม",unit:"g",pricePerPack:130,packSize:850,cat:"ผลไม้"},
  {id:1055,name:"ผงมะนาว (คนอร์)",unit:"g",pricePerPack:129,packSize:1000,cat:"แห้ง"},
  {id:1056,name:"ผงมัทฉะ hojicha",unit:"g",pricePerPack:4495,packSize:1000,cat:"ชา/กาแฟ"},
  {id:1057,name:"ผงมัทฉะ mio",unit:"g",pricePerPack:3200,packSize:1000,cat:"ชา/กาแฟ"},
  {id:1058,name:"ผงมัทฉะ nana(House)",unit:"g",pricePerPack:5885,packSize:1000,cat:"ชา/กาแฟ"},
  {id:1059,name:"ผงมัทฉะ sumi(Sei)",unit:"g",pricePerPack:5990,packSize:1000,cat:"ชา/กาแฟ"},
  {id:1060,name:"ผงมัทฉะ tane(shizu)",unit:"g",pricePerPack:11555,packSize:1000,cat:"ชา/กาแฟ"},
  {id:1061,name:"ผงโกโก้ belolade",unit:"g",pricePerPack:640,packSize:1000,cat:"ชา/กาแฟ"},
  {id:1062,name:"ฝาโดม (แพ็ค)",unit:"ชิ้น",pricePerPack:55,packSize:50,cat:"บรรจุภัณฑ์"},
  {id:1063,name:"ฟาวเวอร์บอสซัม monin",unit:"ml",pricePerPack:365,packSize:700,cat:"ไซรัป"},
  {id:1064,name:"มะพร้าวไซรัป Senorita",unit:"ml",pricePerPack:180,packSize:750,cat:"ไซรัป"},
  {id:1065,name:"มิกซ์เบอร์รี่ 1883",unit:"ml",pricePerPack:595,packSize:1000,cat:"ไซรัป"},
  {id:1066,name:"มิ้นไซรัป Senorita",unit:"ml",pricePerPack:180,packSize:750,cat:"ไซรัป"},
  {id:1067,name:"เมล็ดกาแฟ คั่วกลาง",unit:"g",pricePerPack:450,packSize:1000,cat:"ชา/กาแฟ"},
  {id:1068,name:"เมล็ดกาแฟ คั่วเข้ม",unit:"g",pricePerPack:510,packSize:1000,cat:"ชา/กาแฟ"},
  {id:1069,name:"เมล่อนไซรัป Senorita",unit:"ml",pricePerPack:180,packSize:750,cat:"ไซรัป"},
  {id:1070,name:"โมจิโต้มิ้นท์ monin",unit:"ml",pricePerPack:365,packSize:700,cat:"ไซรัป"},
  {id:1071,name:"ยูซุ ไซรัป Senorita",unit:"ml",pricePerPack:180,packSize:750,cat:"ไซรัป"},
  {id:1072,name:"ราสเบอร์รี่แช่แข็ง",unit:"g",pricePerPack:268,packSize:1000,cat:"ผลไม้"},
  {id:1073,name:"ราสเบอรี่ monin",unit:"ml",pricePerPack:365,packSize:700,cat:"ไซรัป"},
  {id:1074,name:"ลิ้นจี่ไซรัป Senorita",unit:"ml",pricePerPack:180,packSize:750,cat:"ไซรัป"},
  {id:1075,name:"ลิ้นจี่เชื่อมกระป๋อง",unit:"g",pricePerPack:75,packSize:565,cat:"ผลไม้"},
  {id:1076,name:"ลิปตัน (กระป๋อง)",unit:"ml",pricePerPack:17,packSize:245,cat:"ชา/กาแฟ"},
  {id:1077,name:"เลมอน",unit:"ลูก",pricePerPack:15,packSize:1,cat:"ผลไม้"},
  {id:1078,name:"วาเลนเซีย",unit:"g",pricePerPack:89,packSize:1000,cat:"ผลไม้"},
  {id:1079,name:"สตอเบอร์รี่แช่แข็ง",unit:"g",pricePerPack:99,packSize:1000,cat:"ผลไม้"},
  {id:1080,name:"สโมคโอ๊ค monin",unit:"ml",pricePerPack:365,packSize:702,cat:"ไซรัป"},
  {id:1081,name:"ส้มเชื่อม",unit:"g",pricePerPack:39,packSize:425,cat:"ผลไม้"},
  {id:1082,name:"ส้อมเค้ก (กลับบ้าน)",unit:"ชิ้น",pricePerPack:20,packSize:100,cat:"บรรจุภัณฑ์"},
  {id:1083,name:"หลอดกาแฟร้อน",unit:"ชิ้น",pricePerPack:102,packSize:400,cat:"บรรจุภัณฑ์"},
  {id:1084,name:"หลอดเขียวใหญ่",unit:"ชิ้น",pricePerPack:25,packSize:100,cat:"บรรจุภัณฑ์"},
  {id:1085,name:"หลอดเล็กน้ำตาล",unit:"ชิ้น",pricePerPack:16,packSize:100,cat:"บรรจุภัณฑ์"},
  {id:1086,name:"อัญชัน monin",unit:"ml",pricePerPack:365,packSize:700,cat:"ไซรัป"},
  {id:1087,name:"อิงลิช",unit:"ซอง",pricePerPack:315,packSize:25,cat:"ชา/กาแฟ"},
  {id:1088,name:"เบอร์รี่รวมแช่แข็ง",unit:"g",pricePerPack:179,packSize:1000,cat:"ผลไม้"},
  {id:1089,name:"เพียวเร่ บลูเบอรี่ monin",unit:"ml",pricePerPack:551,packSize:1000,cat:"ไซรัป"},
  {id:1090,name:"เพียวเร่ ราสเบอรี่ monin",unit:"ml",pricePerPack:650,packSize:1000,cat:"ไซรัป"},
  {id:1091,name:"เพียวเร่ เรดเบอรี่ monin",unit:"ml",pricePerPack:650,packSize:1000,cat:"ไซรัป"},
  {id:1092,name:"เฟอเร่โร่ (ลูก)",unit:"ลูก",pricePerPack:20,packSize:1,cat:"ท็อปปิ้ง"},
  {id:1093,name:"แก้ว 16 oz",unit:"ใบ",pricePerPack:2.3,packSize:1,cat:"บรรจุภัณฑ์"},
  {id:1094,name:"แก้วร้อน 8 oz",unit:"ใบ",pricePerPack:3.4,packSize:1,cat:"บรรจุภัณฑ์"},
  {id:1095,name:"โค้กซิโร่",unit:"ml",pricePerPack:15,packSize:325,cat:"ของเหลว"},
  {id:1096,name:"โค้กออริ",unit:"ml",pricePerPack:15,packSize:325,cat:"ของเหลว"},
  {id:1097,name:"โซดา (ขวด)",unit:"ml",pricePerPack:7,packSize:325,cat:"ของเหลว"},
  {id:1098,name:"ไซรัป Molle caramal",unit:"ml",pricePerPack:159,packSize:750,cat:"ไซรัป"},
  {id:1099,name:"ไทพีท monin",unit:"ml",pricePerPack:365,packSize:700,cat:"ไซรัป"},
  {id:1100,name:"ไม้เสียบผลไม้",unit:"ชิ้น",pricePerPack:45,packSize:100,cat:"บรรจุภัณฑ์"},
  {id:1101,name:"ไวท์พีท monin",unit:"ml",pricePerPack:365,packSize:700,cat:"ไซรัป"},
];
const shiftRaw=[
  {id:2001,name:"เมล็ดกาแฟคั่วกลาง SHIFT",unit:"g",pricePerPack:650,packSize:1000,cat:"ชา/กาแฟ"},
  {id:2002,name:"เมล็ดกาแฟคั่วเข้ม SHIFT",unit:"g",pricePerPack:650,packSize:1000,cat:"ชา/กาแฟ"},
  {id:2003,name:"นม Mac Milk บาริสต้า 1L",unit:"ml",pricePerPack:55,packSize:1000,cat:"นม"},
  {id:2004,name:"นมเมจิกจืด 2L",unit:"ml",pricePerPack:64,packSize:2000,cat:"นม"},
  {id:2005,name:"นมโอ๊ต 1L",unit:"ml",pricePerPack:75,packSize:1000,cat:"นม"},
  {id:2006,name:"นมข้นจืด คาเนชัน",unit:"g",pricePerPack:49,packSize:385,cat:"นม"},
  {id:2007,name:"นมข้นหวาน ถุง 2kg",unit:"g",pricePerPack:89,packSize:2000,cat:"นม"},
  {id:2008,name:"ผงโกโก้ทิวลิป 440g",unit:"g",pricePerPack:450,packSize:1000,cat:"ชา/กาแฟ"},
  {id:2009,name:"Dutch Cocoa CP-1 2.5kg",unit:"g",pricePerPack:580,packSize:2500,cat:"ชา/กาแฟ"},
  {id:2010,name:"ผงมัทฉะ MIO 500g",unit:"g",pricePerPack:3200,packSize:1000,cat:"ชา/กาแฟ"},
  {id:2011,name:"ผงมัทฉะ HOJICHA 500g",unit:"g",pricePerPack:2140,packSize:500,cat:"ชา/กาแฟ"},
  {id:2012,name:"ผงมัทฉะ GO HOUSE 500g",unit:"g",pricePerPack:3155,packSize:500,cat:"ชา/กาแฟ"},
  {id:2013,name:"Monin Smoked Oak Syrup",unit:"ml",pricePerPack:321,packSize:700,cat:"ไซรัป"},
  {id:2014,name:"Monin Tiramisu Syrup",unit:"ml",pricePerPack:321,packSize:700,cat:"ไซรัป"},
  {id:2015,name:"Monin Peach Syrup",unit:"ml",pricePerPack:321,packSize:700,cat:"ไซรัป"},
  {id:2016,name:"Monin Blue Curacao Syrup",unit:"ml",pricePerPack:321,packSize:700,cat:"ไซรัป"},
  {id:2017,name:"Monin Caramel Syrup",unit:"ml",pricePerPack:321,packSize:700,cat:"ไซรัป"},
  {id:2018,name:"Monin Raspberry Syrup",unit:"ml",pricePerPack:321,packSize:700,cat:"ไซรัป"},
  {id:2019,name:"Monin Cookie Choc Syrup",unit:"ml",pricePerPack:365,packSize:700,cat:"ไซรัป"},
  {id:2020,name:"Senorita Yuzu Syrup",unit:"ml",pricePerPack:210,packSize:700,cat:"ไซรัป"},
  {id:2021,name:"Senorita Lychee Syrup",unit:"ml",pricePerPack:190,packSize:700,cat:"ไซรัป"},
  {id:2022,name:"Senorita Coconut Syrup",unit:"ml",pricePerPack:210,packSize:700,cat:"ไซรัป"},
  {id:2023,name:"Senorita Mint Fresh Syrup",unit:"ml",pricePerPack:210,packSize:700,cat:"ไซรัป"},
  {id:2024,name:"1883 Mixed Berry Syrup",unit:"ml",pricePerPack:650,packSize:700,cat:"ไซรัป"},
  {id:2025,name:"1883 Raspberry Syrup",unit:"ml",pricePerPack:650,packSize:700,cat:"ไซรัป"},
  {id:2026,name:"Molle Caramel Syrup",unit:"ml",pricePerPack:159,packSize:750,cat:"ไซรัป"},
  {id:2027,name:"Passion Fruit Syrup",unit:"ml",pricePerPack:85,packSize:700,cat:"ไซรัป"},
  {id:2028,name:"น้ำตาลโตนด ไซรัป",unit:"ml",pricePerPack:120,packSize:700,cat:"ไซรัป"},
  {id:2029,name:"Monin Yuzu Puree 1L",unit:"ml",pricePerPack:430,packSize:1000,cat:"ซอส"},
  {id:2030,name:"Monin Mix Berry Puree 1L",unit:"ml",pricePerPack:585,packSize:1000,cat:"ซอส"},
  {id:2031,name:"Fruit Mix Raspberry Puree",unit:"ml",pricePerPack:585,packSize:1000,cat:"ซอส"},
  {id:2032,name:"ซอสคาราเมล",unit:"g",pricePerPack:130,packSize:1200,cat:"ซอส"},
  {id:2033,name:"ซอสช็อกโกแลต",unit:"g",pricePerPack:130,packSize:1200,cat:"ซอส"},
  {id:2034,name:"สตรอว์เบอร์รี่สด กล่อง",unit:"g",pricePerPack:189,packSize:500,cat:"ผลไม้"},
  {id:2035,name:"แยมสตรอว์เบอร์รี่ 1.8kg",unit:"g",pricePerPack:275,packSize:1800,cat:"ผลไม้"},
  {id:2036,name:"Ligo Peach กระป๋อง",unit:"g",pricePerPack:55,packSize:425,cat:"ผลไม้"},
  {id:2037,name:"มิกซ์เบอร์รี่แช่แข็ง เอโร่ 1kg",unit:"g",pricePerPack:220,packSize:1000,cat:"ผลไม้"},
  {id:2038,name:"เนื้อมะพร้าวแช่แข็ง ออลโคโค",unit:"g",pricePerPack:180,packSize:1000,cat:"ผลไม้"},
  {id:2039,name:"บ๊วยดอยคำ",unit:"ml",pricePerPack:85,packSize:500,cat:"ผลไม้"},
  {id:2040,name:"บ๊วยดอง",unit:"g",pricePerPack:60,packSize:320,cat:"ผลไม้"},
  {id:2041,name:"เชอร์รี่ดอง Maraschino",unit:"g",pricePerPack:62,packSize:350,cat:"ผลไม้"},
  {id:2042,name:"ลิ้นจี่กระป๋อง เอโร่ 3 กระป๋อง",unit:"g",pricePerPack:225,packSize:1695,cat:"ผลไม้"},
  {id:2043,name:"ส้มอบแห้ง ตกแต่ง",unit:"ชิ้น",pricePerPack:2,packSize:1,cat:"ท็อปปิ้ง"},
  {id:2044,name:"ถั่วตุ๊บตับ",unit:"g",pricePerPack:40,packSize:120,cat:"ท็อปปิ้ง"},
  {id:2045,name:"Biscoff Lotus",unit:"แผ่น",pricePerPack:5,packSize:1,cat:"เบเกอรี่"},
  {id:2046,name:"ชาไทย Simple",unit:"g",pricePerPack:300,packSize:3000,cat:"ชา/กาแฟ"},
  {id:2047,name:"น้ำแข็ง ถุง/วัน",unit:"วัน",pricePerPack:150,packSize:1,cat:"ของเหลว"},
  {id:2048,name:"ชเวปมะนาว กระป๋อง 325ml",unit:"ml",pricePerPack:13,packSize:325,cat:"ของเหลว"},
  {id:2049,name:"ชาลิปตัน กระป๋อง",unit:"ml",pricePerPack:12,packSize:245,cat:"ชา/กาแฟ"},
  {id:2050,name:"โซดา LEO ขวด 325ml",unit:"ml",pricePerPack:7,packSize:325,cat:"ของเหลว"},
  {id:2051,name:"น้ำส้ม ซันควิก Orange 500ml",unit:"ml",pricePerPack:250,packSize:500,cat:"ของเหลว"},
  {id:2052,name:"น้ำส้ม ซันควิก Mandarin 500ml",unit:"ml",pricePerPack:250,packSize:500,cat:"ของเหลว"},
  {id:2053,name:"น้ำผึ้ง แพ็คคู่",unit:"ml",pricePerPack:210,packSize:1000,cat:"ของเหลว"},
  {id:2054,name:"น้ำตาลทราย 1kg",unit:"g",pricePerPack:28,packSize:1000,cat:"แห้ง"},
  {id:2055,name:"ผงมะนาว 1kg",unit:"g",pricePerPack:189,packSize:1000,cat:"แห้ง"},
  {id:2056,name:"น้ำดื่ม/น้ำกรอง ถัง 20L",unit:"ml",pricePerPack:42,packSize:20000,cat:"ของเหลว"},
];
// สูตรเมนู SHIFT — สำหรับสาขา 3
// pump น้ำตาล 1 ปึ้ม = 10g, pump นมมิกซ์ 1 ปึ้ม = 20g, 1 shot กาแฟ = 18g, 1 oz = 30ml
const shiftMenus=[
  // --- HOT COFFEE ---
  {id:3001,name:"อเมริกาโน่ร้อน",cat:"Hot Coffee",price:70,ings:[{type:"raw",id:2001,amt:36},{type:"raw",id:2054,amt:20},{type:"raw",id:2056,amt:110}]},
  {id:3002,name:"เอสเพรซโซ่ร้อน",cat:"Hot Coffee",price:65,ings:[{type:"raw",id:2001,amt:18},{type:"raw",id:2007,amt:60},{type:"raw",id:2006,amt:60},{type:"raw",id:2003,amt:60}]},
  {id:3003,name:"คาปูชิโน่ร้อน",cat:"Hot Coffee",price:85,ings:[{type:"raw",id:2001,amt:36},{type:"raw",id:2007,amt:60},{type:"raw",id:2003,amt:100}]},
  {id:3004,name:"มอคค่าร้อน",cat:"Hot Coffee",price:90,ings:[{type:"raw",id:2001,amt:36},{type:"raw",id:2007,amt:60},{type:"raw",id:2003,amt:100},{type:"raw",id:2008,amt:8}]},
  {id:3005,name:"ลาเต้ร้อน",cat:"Hot Coffee",price:85,ings:[{type:"raw",id:2001,amt:36},{type:"raw",id:2007,amt:60},{type:"raw",id:2003,amt:150}]},
  {id:3006,name:"คาราเมลมัคคิอาโต้ร้อน",cat:"Hot Coffee",price:90,ings:[{type:"raw",id:2001,amt:36},{type:"raw",id:2017,amt:20},{type:"raw",id:2007,amt:40},{type:"raw",id:2003,amt:150}]},
  // --- HOT NON-COFFEE ---
  {id:3007,name:"ฮอทช็อกโกแลต",cat:"Hot Non-Coffee",price:70,ings:[{type:"raw",id:2003,amt:120},{type:"raw",id:2008,amt:8},{type:"raw",id:2007,amt:80},{type:"raw",id:2006,amt:80}]},
  {id:3008,name:"ฮอทที",cat:"Hot Non-Coffee",price:35,ings:[{type:"raw",id:2049,amt:30},{type:"raw",id:2056,amt:170}]},
  {id:3009,name:"ฮอทมัทฉะลาเต้ MIO",cat:"Hot Non-Coffee",price:85,ings:[{type:"raw",id:2010,amt:5},{type:"raw",id:2003,amt:150},{type:"raw",id:2007,amt:80},{type:"raw",id:2056,amt:30}]},
  {id:3010,name:"ฮอทมัทฉะลาเต้ Hojicha",cat:"Hot Non-Coffee",price:85,ings:[{type:"raw",id:2011,amt:5},{type:"raw",id:2003,amt:150},{type:"raw",id:2007,amt:80},{type:"raw",id:2056,amt:30}]},
  {id:3011,name:"ฮอทมัทฉะลาเต้ Go House",cat:"Hot Non-Coffee",price:85,ings:[{type:"raw",id:2012,amt:5},{type:"raw",id:2003,amt:150},{type:"raw",id:2007,amt:80},{type:"raw",id:2056,amt:30}]},
  {id:3012,name:"เพียวมัทฉะร้อน MIO",cat:"Hot Non-Coffee",price:60,ings:[{type:"raw",id:2010,amt:2.5},{type:"raw",id:2056,amt:150}]},
  {id:3013,name:"เพียวมัทฉะร้อน Hojicha",cat:"Hot Non-Coffee",price:60,ings:[{type:"raw",id:2011,amt:2.5},{type:"raw",id:2056,amt:150}]},
  {id:3014,name:"เพียวมัทฉะร้อน Go House",cat:"Hot Non-Coffee",price:60,ings:[{type:"raw",id:2012,amt:2.5},{type:"raw",id:2056,amt:150}]},
  {id:3015,name:"ฮอทมิลค์",cat:"Hot Non-Coffee",price:50,ings:[{type:"raw",id:2003,amt:150},{type:"raw",id:2007,amt:60}]},
  // --- ICED COFFEE ---
  {id:3016,name:"อเมริกาโน่เย็น",cat:"Iced Coffee",price:70,ings:[{type:"raw",id:2001,amt:36},{type:"raw",id:2054,amt:20},{type:"raw",id:2056,amt:110}]},
  {id:3017,name:"คาปูชิโน่เย็น",cat:"Iced Coffee",price:85,ings:[{type:"raw",id:2001,amt:36},{type:"raw",id:2007,amt:60},{type:"raw",id:2003,amt:100}]},
  {id:3018,name:"ลาเต้เย็น",cat:"Iced Coffee",price:70,ings:[{type:"raw",id:2001,amt:36},{type:"raw",id:2007,amt:60},{type:"raw",id:2003,amt:150}]},
  {id:3019,name:"มอคค่าเย็น",cat:"Iced Coffee",price:80,ings:[{type:"raw",id:2001,amt:36},{type:"raw",id:2007,amt:60},{type:"raw",id:2003,amt:100},{type:"raw",id:2008,amt:8}]},
  {id:3020,name:"คาราเมลมัคคิอาโต้เย็น",cat:"Iced Coffee",price:90,ings:[{type:"raw",id:2001,amt:36},{type:"raw",id:2017,amt:20},{type:"raw",id:2007,amt:40},{type:"raw",id:2003,amt:150}]},
  {id:3021,name:"อเมริกาโน่น้ำส้ม",cat:"Iced Coffee",price:65,ings:[{type:"raw",id:2001,amt:36},{type:"raw",id:2051,amt:50},{type:"raw",id:2050,amt:45},{type:"raw",id:2056,amt:45}]},
  {id:3022,name:"ยูซุคอฟฟี่",cat:"Iced Coffee",price:80,ings:[{type:"raw",id:2001,amt:36},{type:"raw",id:2020,amt:30},{type:"raw",id:2050,amt:100}]},
  {id:3023,name:"โคโค่นัทคอฟฟี่",cat:"Iced Coffee",price:80,ings:[{type:"raw",id:2001,amt:36},{type:"raw",id:2022,amt:40},{type:"raw",id:2038,amt:30},{type:"raw",id:2056,amt:100}]},
  {id:3024,name:"ปาล์มชูการ์ลาเต้",cat:"Iced Coffee",price:65,ings:[{type:"raw",id:2001,amt:36},{type:"raw",id:2028,amt:45},{type:"raw",id:2003,amt:150}]},
  {id:3025,name:"ทีรามิสุลาเต้",cat:"Iced Coffee",price:80,ings:[{type:"raw",id:2001,amt:36},{type:"raw",id:2014,amt:30},{type:"raw",id:2008,amt:8},{type:"raw",id:2007,amt:60},{type:"raw",id:2003,amt:100},{type:"raw",id:2006,amt:60}]},
  {id:3026,name:"สโมคโอ๊คลาเต้",cat:"Iced Coffee",price:105,ings:[{type:"raw",id:2001,amt:36},{type:"raw",id:2013,amt:30},{type:"raw",id:2019,amt:10},{type:"raw",id:2008,amt:8},{type:"raw",id:2007,amt:40},{type:"raw",id:2003,amt:100},{type:"raw",id:2006,amt:60}]},
  {id:3027,name:"ราสเบอร์รี่มอคค่า",cat:"Iced Coffee",price:80,ings:[{type:"raw",id:2018,amt:20},{type:"raw",id:2031,amt:20},{type:"raw",id:2037,amt:30},{type:"raw",id:2007,amt:40},{type:"raw",id:2003,amt:100},{type:"raw",id:2006,amt:60}]},
  // --- NON-COFFEE ---
  {id:3028,name:"นมสดเย็น",cat:"Non-Coffee",price:50,ings:[{type:"raw",id:2003,amt:150},{type:"raw",id:2054,amt:20},{type:"raw",id:2007,amt:40},{type:"raw",id:2006,amt:60}]},
  {id:3029,name:"นมสดคาราเมล",cat:"Non-Coffee",price:70,ings:[{type:"raw",id:2003,amt:150},{type:"raw",id:2017,amt:20},{type:"raw",id:2007,amt:40},{type:"raw",id:2006,amt:60}]},
  {id:3030,name:"สตรอว์เบอร์รี่นม",cat:"Non-Coffee",price:75,ings:[{type:"raw",id:2035,amt:60},{type:"raw",id:2003,amt:120},{type:"raw",id:2006,amt:60},{type:"raw",id:2007,amt:40}]},
  {id:3031,name:"มัทฉะลาเต้ MIO",cat:"Non-Coffee",price:85,ings:[{type:"raw",id:2010,amt:5},{type:"raw",id:2003,amt:150},{type:"raw",id:2007,amt:80},{type:"raw",id:2056,amt:30}]},
  {id:3032,name:"มัทฉะลาเต้ Hojicha",cat:"Non-Coffee",price:85,ings:[{type:"raw",id:2011,amt:5},{type:"raw",id:2003,amt:150},{type:"raw",id:2007,amt:80},{type:"raw",id:2056,amt:30}]},
  {id:3033,name:"มัทฉะลาเต้ Go House",cat:"Non-Coffee",price:85,ings:[{type:"raw",id:2012,amt:5},{type:"raw",id:2003,amt:150},{type:"raw",id:2007,amt:80},{type:"raw",id:2056,amt:30}]},
  {id:3034,name:"เพียวมัทฉะ MIO",cat:"Non-Coffee",price:65,ings:[{type:"raw",id:2010,amt:2.5},{type:"raw",id:2056,amt:150}]},
  {id:3035,name:"เพียวมัทฉะ Hojicha",cat:"Non-Coffee",price:65,ings:[{type:"raw",id:2011,amt:2.5},{type:"raw",id:2056,amt:150}]},
  {id:3036,name:"เพียวมัทฉะ Go House",cat:"Non-Coffee",price:65,ings:[{type:"raw",id:2012,amt:2.5},{type:"raw",id:2056,amt:150}]},
  {id:3037,name:"มัทฉะยูซุ MIO",cat:"Non-Coffee",price:95,ings:[{type:"raw",id:2010,amt:5},{type:"raw",id:2020,amt:30},{type:"raw",id:2050,amt:50},{type:"raw",id:2056,amt:30}]},
  {id:3038,name:"มัทฉะยูซุ Hojicha",cat:"Non-Coffee",price:95,ings:[{type:"raw",id:2011,amt:5},{type:"raw",id:2020,amt:30},{type:"raw",id:2050,amt:50},{type:"raw",id:2056,amt:30}]},
  {id:3039,name:"มัทฉะยูซุ Go House",cat:"Non-Coffee",price:95,ings:[{type:"raw",id:2012,amt:5},{type:"raw",id:2020,amt:30},{type:"raw",id:2050,amt:50},{type:"raw",id:2056,amt:30}]},
  {id:3040,name:"มัทฉะสตรอว์เบอร์รี่ MIO",cat:"Non-Coffee",price:95,ings:[{type:"raw",id:2010,amt:5},{type:"raw",id:2035,amt:30},{type:"raw",id:2003,amt:100},{type:"raw",id:2007,amt:60},{type:"raw",id:2006,amt:60},{type:"raw",id:2056,amt:30}]},
  {id:3041,name:"มัทฉะสตรอว์เบอร์รี่ Hojicha",cat:"Non-Coffee",price:95,ings:[{type:"raw",id:2011,amt:5},{type:"raw",id:2035,amt:30},{type:"raw",id:2003,amt:100},{type:"raw",id:2007,amt:60},{type:"raw",id:2006,amt:60},{type:"raw",id:2056,amt:30}]},
  {id:3042,name:"มัทฉะสตรอว์เบอร์รี่ Go House",cat:"Non-Coffee",price:95,ings:[{type:"raw",id:2012,amt:5},{type:"raw",id:2035,amt:30},{type:"raw",id:2003,amt:100},{type:"raw",id:2007,amt:60},{type:"raw",id:2006,amt:60},{type:"raw",id:2056,amt:30}]},
  {id:3043,name:"โกโก้เย็น",cat:"Non-Coffee",price:75,ings:[{type:"raw",id:2003,amt:120},{type:"raw",id:2008,amt:8},{type:"raw",id:2007,amt:80},{type:"raw",id:2006,amt:80}]},
  {id:3044,name:"มินต์โกโก้",cat:"Non-Coffee",price:80,ings:[{type:"raw",id:2023,amt:20},{type:"raw",id:2003,amt:100},{type:"raw",id:2006,amt:60},{type:"raw",id:2008,amt:16},{type:"raw",id:2056,amt:30}]},
  {id:3045,name:"ชาไทย SHIFT",cat:"Non-Coffee",price:65,ings:[{type:"raw",id:2046,amt:5},{type:"raw",id:2007,amt:80},{type:"raw",id:2006,amt:60}]},
  // --- SODA & FRUIT ---
  {id:3046,name:"ยูซุบ๊วยโซดา",cat:"Soda & Fruit",price:60,ings:[{type:"raw",id:2020,amt:40},{type:"raw",id:2039,amt:30},{type:"raw",id:2040,amt:10},{type:"raw",id:2050,amt:130}]},
  {id:3047,name:"ยูซุเลม่อนโซดา",cat:"Soda & Fruit",price:60,ings:[{type:"raw",id:2020,amt:40},{type:"raw",id:2050,amt:100}]},
  {id:3048,name:"โอเชียนบลู",cat:"Soda & Fruit",price:75,ings:[{type:"raw",id:2021,amt:40},{type:"raw",id:2023,amt:10},{type:"raw",id:2050,amt:280},{type:"raw",id:2042,amt:20}]},
  {id:3049,name:"ลิ้นจี่โซดา",cat:"Soda & Fruit",price:65,ings:[{type:"raw",id:2021,amt:60},{type:"raw",id:2050,amt:150},{type:"raw",id:2042,amt:40}]},
  {id:3050,name:"มิกซ์เบอร์รี่โซดา",cat:"Soda & Fruit",price:70,ings:[{type:"raw",id:2024,amt:20},{type:"raw",id:2031,amt:30},{type:"raw",id:2050,amt:150}]},
  {id:3051,name:"ชาพีช",cat:"Soda & Fruit",price:80,ings:[{type:"raw",id:2015,amt:30},{type:"raw",id:2027,amt:20},{type:"raw",id:2049,amt:60},{type:"raw",id:2056,amt:100}]},
];
// Fixed Cost SHIFT — สำหรับสาขา 3
const shiftFixed=[
  {id:4001,name:"ค่าเช่าพื้นที่ (สวนแบ่งกลางวัน)",amt:30000,period:"เดือน",icon:"🏠"},
  {id:4002,name:"ค่าน้ำ (สวนแบ่งกลางวัน)",amt:500,period:"เดือน",icon:"💧"},
  {id:4003,name:"ค่าไฟ (สวนแบ่งกลางวัน)",amt:10000,period:"เดือน",icon:"⚡"},
  {id:4004,name:"เงินเดือนหัวหน้าบาริสตา",amt:15000,period:"เดือน",icon:"👤"},
  {id:4005,name:"เงินเดือนผู้ช่วยบาริสตา 1",amt:12000,period:"เดือน",icon:"👤"},
  {id:4006,name:"เงินเดือนผู้ช่วยบาริสตา 2",amt:12000,period:"เดือน",icon:"👤"},
  {id:4007,name:"เงินเดือนผู้ช่วยบาริสตา 3",amt:12000,period:"เดือน",icon:"👤"},
  {id:4008,name:"เงินเดือนผู้ช่วยบาริสตา 4",amt:12000,period:"เดือน",icon:"👤"},
  {id:4009,name:"เงินเดือนผู้ช่วยบาริสตา 5",amt:12000,period:"เดือน",icon:"👤"},
  {id:4010,name:"เงินเดือนผู้ช่วยบาริสตา 6",amt:12000,period:"เดือน",icon:"👤"},
  {id:4011,name:"ประกันสังคม (นายจ้าง 5%)",amt:4350,period:"เดือน",icon:"🛡️"},
  {id:4012,name:"ค่าอินเทอร์เน็ต (สวนแบ่ง)",amt:0,period:"เดือน",icon:"📶"},
  {id:4013,name:"ค่าเสื่อมอุปกรณ์ (เครื่องชง/บด)",amt:0,period:"เดือน",icon:"🔧"},
  {id:4014,name:"ค่าบัญชี/เบ็ดเตล็ด",amt:0,period:"เดือน",icon:"📋"},
];
// สูตรเมนู สาขา 1 — จากไฟล์ต้นทุนน้ำ
// นมมิก 1 pump = 20g, น้ำเชื่อม comp 101, น้ำร้อน/น้ำเปล่า id 2
const branch1Menus=[
  {id:5001,name:"อเมริกาโน่เย็น",cat:"Coffee",price:70,ings:[{type:"raw",id:7,amt:20},{type:"raw",id:2,amt:100},{type:"comp",id:101,amt:20},{type:"raw",id:1093,amt:1}]},
  {id:5002,name:"อเมริกาโน่มะพร้าว",cat:"Coffee",price:115,ings:[{type:"raw",id:7,amt:20},{type:"raw",id:1064,amt:20},{type:"raw",id:2,amt:100},{type:"raw",id:1093,amt:1}]},
  {id:5003,name:"อเมริกาโน่น้ำผึ้ง",cat:"Coffee",price:80,ings:[{type:"raw",id:7,amt:20},{type:"raw",id:1038,amt:45},{type:"raw",id:2,amt:100},{type:"raw",id:1093,amt:1}]},
  {id:5004,name:"นมสดเย็น",cat:"Non-Coffee",price:70,ings:[{type:"raw",id:1042,amt:150},{type:"raw",id:1043,amt:45},{type:"raw",id:1044,amt:20},{type:"comp",id:101,amt:20},{type:"raw",id:1093,amt:1}]},
  {id:5005,name:"นมสดคาราเมล",cat:"Non-Coffee",price:75,ings:[{type:"raw",id:1042,amt:150},{type:"raw",id:1043,amt:45},{type:"raw",id:1044,amt:20},{type:"raw",id:1098,amt:20},{type:"raw",id:1093,amt:1}]},
  {id:5006,name:"ลาเต้เย็น",cat:"Coffee",price:85,ings:[{type:"raw",id:7,amt:20},{type:"raw",id:1042,amt:150},{type:"raw",id:1044,amt:30},{type:"raw",id:1093,amt:1}]},
  {id:5007,name:"คาปูชิโน่เย็น",cat:"Coffee",price:85,ings:[{type:"raw",id:7,amt:20},{type:"raw",id:1042,amt:125},{type:"raw",id:1044,amt:30},{type:"raw",id:1093,amt:1}]},
  {id:5008,name:"โกโก้เย็น",cat:"Non-Coffee",price:85,ings:[{type:"raw",id:1042,amt:125},{type:"raw",id:1061,amt:15},{type:"raw",id:1044,amt:30},{type:"raw",id:1043,amt:60},{type:"raw",id:1093,amt:1}]},
  {id:5009,name:"มอคค่าเย็น",cat:"Coffee",price:85,ings:[{type:"raw",id:7,amt:20},{type:"raw",id:1042,amt:125},{type:"raw",id:1061,amt:5},{type:"raw",id:1044,amt:30},{type:"raw",id:1093,amt:1}]},
  {id:5010,name:"น้ำผึ้งมะนาว",cat:"Non-Coffee",price:95,ings:[{type:"raw",id:1038,amt:45},{type:"raw",id:2,amt:150},{type:"raw",id:1055,amt:3},{type:"raw",id:1077,amt:0.2},{type:"raw",id:1093,amt:1}]},
  {id:5011,name:"น้ำผึ้งมะนาวโซดา",cat:"Non-Coffee",price:95,ings:[{type:"raw",id:1038,amt:45},{type:"raw",id:1055,amt:3},{type:"raw",id:1097,amt:180},{type:"raw",id:1077,amt:0.2},{type:"raw",id:1093,amt:1}]},
  {id:5012,name:"โกโก้มิ้นท์",cat:"Non-Coffee",price:95,ings:[{type:"raw",id:1042,amt:100},{type:"raw",id:1043,amt:45},{type:"raw",id:1066,amt:20},{type:"raw",id:2,amt:40},{type:"raw",id:1061,amt:8},{type:"raw",id:1093,amt:1}]},
  {id:5013,name:"กาแฟส้ม",cat:"Coffee",price:115,ings:[{type:"raw",id:7,amt:20},{type:"raw",id:1017,amt:30},{type:"raw",id:1018,amt:30},{type:"raw",id:1097,amt:45},{type:"raw",id:2,amt:60},{type:"raw",id:1081,amt:4},{type:"raw",id:1093,amt:1}]},
  {id:5014,name:"Peach of Tea",cat:"Non-Coffee",price:115,ings:[{type:"raw",id:1053,amt:20},{type:"raw",id:1041,amt:20},{type:"raw",id:1076,amt:60},{type:"raw",id:1054,amt:5},{type:"raw",id:2,amt:125},{type:"raw",id:1093,amt:1}]},
  {id:5015,name:"ทีรามิสุเย็น",cat:"Coffee",price:115,ings:[{type:"raw",id:7,amt:20},{type:"raw",id:1042,amt:100},{type:"raw",id:1044,amt:30},{type:"raw",id:1061,amt:5},{type:"raw",id:1031,amt:20},{type:"raw",id:1043,amt:45},{type:"raw",id:1093,amt:1}]},
  {id:5016,name:"นมสดสตรอว์เบอร์รี่เกาหลี",cat:"Non-Coffee",price:115,ings:[{type:"raw",id:1042,amt:125},{type:"raw",id:1044,amt:20},{type:"raw",id:1043,amt:45},{type:"comp",id:102,amt:30},{type:"raw",id:3,amt:10},{type:"raw",id:1093,amt:1}]},
  {id:5017,name:"Blue Sky",cat:"Soda",price:85,ings:[{type:"raw",id:1047,amt:20},{type:"raw",id:1055,amt:1},{type:"raw",id:1097,amt:150},{type:"raw",id:1093,amt:1}]},
  {id:5018,name:"มัทฉะยูซุ",cat:"Matcha",price:120,ings:[{type:"raw",id:8,amt:5},{type:"raw",id:2,amt:20},{type:"raw",id:1071,amt:30},{type:"raw",id:1010,amt:100},{type:"raw",id:1093,amt:1}]},
  {id:5019,name:"ราสเบอร์รี่มอคค่า",cat:"Coffee",price:125,ings:[{type:"raw",id:7,amt:20},{type:"raw",id:1073,amt:20},{type:"raw",id:1090,amt:30},{type:"raw",id:1042,amt:100},{type:"raw",id:1043,amt:45},{type:"raw",id:1044,amt:30},{type:"raw",id:1088,amt:40},{type:"raw",id:1093,amt:1}]},
  {id:5020,name:"เอสเพรซโซ่เย็น",cat:"Coffee",price:80,ings:[{type:"raw",id:7,amt:20},{type:"raw",id:1043,amt:45},{type:"raw",id:1042,amt:60},{type:"raw",id:1044,amt:30},{type:"raw",id:1093,amt:1}]},
  {id:5021,name:"ลิ้นจี่โซดา",cat:"Soda",price:85,ings:[{type:"raw",id:1074,amt:60},{type:"raw",id:1097,amt:150},{type:"raw",id:1075,amt:40},{type:"raw",id:1093,amt:1}]},
  {id:5022,name:"Mix Berry",cat:"Soda",price:95,ings:[{type:"raw",id:1065,amt:20},{type:"raw",id:1088,amt:15},{type:"raw",id:1097,amt:150},{type:"raw",id:1091,amt:30},{type:"raw",id:1093,amt:1}]},
  {id:5023,name:"Yuzu Soda",cat:"Soda",price:115,ings:[{type:"raw",id:1071,amt:30},{type:"raw",id:1010,amt:150},{type:"raw",id:1093,amt:1}]},
  {id:5024,name:"มัทฉะสตรอว์เบอร์รี่",cat:"Matcha",price:125,ings:[{type:"raw",id:8,amt:4},{type:"raw",id:1042,amt:100},{type:"raw",id:1043,amt:45},{type:"raw",id:1044,amt:30},{type:"raw",id:2,amt:50},{type:"comp",id:102,amt:40},{type:"raw",id:3,amt:5},{type:"raw",id:1093,amt:1}]},
  {id:5025,name:"กาแฟน้ำตาลโตนด",cat:"Coffee",price:115,ings:[{type:"raw",id:7,amt:20},{type:"raw",id:1035,amt:45},{type:"raw",id:1042,amt:160},{type:"raw",id:1019,amt:5},{type:"raw",id:1093,amt:1}]},
  {id:5026,name:"Caramel Macchiato",cat:"Coffee",price:115,ings:[{type:"raw",id:7,amt:20},{type:"raw",id:1042,amt:150},{type:"raw",id:1007,amt:20},{type:"raw",id:1044,amt:20},{type:"raw",id:1015,amt:40},{type:"raw",id:1093,amt:1}]},
  {id:5027,name:"Smoked Oak Latte",cat:"Coffee",price:115,ings:[{type:"raw",id:7,amt:20},{type:"raw",id:1042,amt:100},{type:"raw",id:1043,amt:45},{type:"raw",id:1044,amt:30},{type:"raw",id:1061,amt:3},{type:"raw",id:1080,amt:20},{type:"raw",id:1012,amt:10},{type:"raw",id:1093,amt:1}]},
  {id:5028,name:"มัทฉะลาเต้ Mio",cat:"Matcha",price:115,ings:[{type:"raw",id:1057,amt:5},{type:"raw",id:1042,amt:150},{type:"raw",id:1044,amt:40},{type:"raw",id:2,amt:50},{type:"raw",id:1093,amt:1}]},
  {id:5029,name:"มัทฉะลาเต้ Hojicha",cat:"Matcha",price:95,ings:[{type:"raw",id:1056,amt:3},{type:"raw",id:1042,amt:150},{type:"raw",id:1044,amt:40},{type:"raw",id:2,amt:50},{type:"raw",id:1093,amt:1}]},
  {id:5030,name:"มัทฉะลาเต้ House",cat:"Matcha",price:130,ings:[{type:"raw",id:1058,amt:5},{type:"raw",id:1042,amt:150},{type:"raw",id:1044,amt:40},{type:"raw",id:2,amt:50},{type:"raw",id:1093,amt:1}]},
  {id:5031,name:"มัทฉะลาเต้ Sei",cat:"Matcha",price:140,ings:[{type:"raw",id:1059,amt:5},{type:"raw",id:1042,amt:150},{type:"raw",id:1044,amt:40},{type:"raw",id:2,amt:50},{type:"raw",id:1093,amt:1}]},
  {id:5032,name:"มัทฉะลาเต้ Tane",cat:"Matcha",price:190,ings:[{type:"raw",id:1060,amt:5},{type:"raw",id:1042,amt:150},{type:"raw",id:1044,amt:40},{type:"raw",id:2,amt:50},{type:"raw",id:1093,amt:1}]},
  {id:5033,name:"Yuzu Coffee",cat:"Coffee",price:115,ings:[{type:"raw",id:7,amt:20},{type:"raw",id:1071,amt:30},{type:"raw",id:1010,amt:100},{type:"raw",id:1093,amt:1}]},
  {id:5034,name:"Molly Miga",cat:"Non-Coffee",price:115,ings:[{type:"raw",id:1036,amt:50},{type:"raw",id:1091,amt:20},{type:"raw",id:1009,amt:10},{type:"raw",id:1093,amt:1}]},
  {id:5035,name:"Ocean Blue",cat:"Soda",price:115,ings:[{type:"raw",id:1074,amt:50},{type:"raw",id:1066,amt:15},{type:"raw",id:1097,amt:45},{type:"raw",id:1093,amt:1}]},
  {id:5036,name:"Yuzu Popcorn",cat:"Soda",price:115,ings:[{type:"raw",id:1071,amt:30},{type:"raw",id:1050,amt:15},{type:"raw",id:1055,amt:1},{type:"raw",id:1049,amt:10},{type:"raw",id:1093,amt:1}]},
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

const deepCloneMenus=()=>initMenus.map(m=>({...m,ings:m.ings.map(i=>({...i}))}));
const deepCloneRms=()=>initRaw.map(r=>({...r}));
const deepCloneComps=()=>initComps.map(c=>({...c,ings:c.ings.map(i=>({...i}))}));
const deepCloneFixed=()=>initFixed.map(f=>({...f}));

const initBranches=[
  {id:1,name:"สาขา 1",color:"#7F77DD",pin:null,rms:deepCloneRms(),comps:deepCloneComps(),menus:deepCloneMenus(),fixed:deepCloneFixed(),sales:null},
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
  {id:6,label:"สต๊อก",emoji:"📦",color:"#0F6E56"},
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

const APP_PASSWORD="Admin1112";

export default function App(){
  const [authed,setAuthed]=useState(()=>{try{return sessionStorage.getItem("cafe_authed")==="1";}catch(e){return false;}});
  const [pwInput,setPwInput]=useState("");
  const [pwError,setPwError]=useState(false);
  const [showPw,setShowPw]=useState(false);
  const [tab,setTab]=useState(0);
  const [branches,setBranches]=useState(()=>{
    try{
      const saved=localStorage.getItem("cafe_branches");
      if(saved){
        const parsed=JSON.parse(saved);
        if(parsed&&parsed.length>0){
          // migrate: add PDF items per branch
          const migrated=parsed.slice(0,1).map((b:any,idx:number)=>{
            let rmsToAdd:any[]=[];
            let menusToAdd:any[]=[];
            let fixedToAdd:any[]=[];
            if(idx===0){
              const existingRmIds=new Set((b.rms||[]).map((r:any)=>r.id));
              rmsToAdd=initRaw.filter(r=>r.id>=1001&&!existingRmIds.has(r.id));
              const existingMenuIds=new Set((b.menus||[]).map((m:any)=>m.id));
              menusToAdd=branch1Menus.filter(m=>!existingMenuIds.has(m.id));
            }
            let next={...b};
            if(rmsToAdd.length>0){
              const merged=[...(b.rms||[]),...rmsToAdd].sort((a:any,b:any)=>a.name.localeCompare(b.name,"th"));
              next={...next,rms:merged};
            }
            if(menusToAdd.length>0){
              const merged=[...(b.menus||[]),...menusToAdd].sort((a:any,b:any)=>a.name.localeCompare(b.name,"th"));
              next={...next,menus:merged};
            }
            if(fixedToAdd.length>0){
              const merged=[...(b.fixed||[]),...fixedToAdd].sort((a:any,b:any)=>a.name.localeCompare(b.name,"th"));
              next={...next,fixed:merged};
            }
            return next;
          });
          return migrated;
        }
      }
    }catch(e){}
    return initBranches.map(b=>({...b,sales:genSampleSales()}));
  });
  const activeBranchId=1;

  const currentBranch=branches.find(b=>b.id===activeBranchId)||branches[0];
  const rms=currentBranch.rms;
  const comps=currentBranch.comps;
  const menus=currentBranch.menus;
  const fixed=currentBranch.fixed;
  const salesData=currentBranch.sales;

  const _upBranch=(field,val)=>setBranches(prev=>prev.map(b=>b.id===activeBranchId?{...b,[field]:typeof val==="function"?val(b[field]):val}:b));
  const setRms=(v)=>_upBranch("rms",v);
  const setComps=(v)=>_upBranch("comps",v);
  const setMenus=(v)=>_upBranch("menus",v);
  const setFixed=(v)=>_upBranch("fixed",v);
  const setSalesData=(v)=>_upBranch("sales",v);
  const setStock=(v)=>_upBranch("stock",v);
  const setStockMin=(v)=>_upBranch("stockMin",v);
  const setStockDeducted=(v)=>_upBranch("stockDeducted",v);
  const stock=currentBranch.stock||{};
  const stockMin=currentBranch.stockMin||{};
  const stockDeducted=currentBranch.stockDeducted||{};

  // คำนวณวัตถุดิบที่ใช้ต่อวัน (รวม compound → raw)
  const calcDailyUsage=(dateKey)=>{
    const daySales=salesData[dateKey]||{};
    const usage:{[id:number]:number}={};
    menus.forEach(m=>{
      const qty=daySales[m.id]||0;
      if(!qty)return;
      m.ings.forEach(i=>{
        if(i.type==="raw"){
          usage[i.id]=(usage[i.id]||0)+i.amt*qty;
        } else {
          const c=comps.find(x=>x.id===i.id);
          if(!c||!c.yield)return;
          c.ings.forEach(ci=>{
            usage[ci.rmId]=(usage[ci.rmId]||0)+(ci.amt/c.yield)*i.amt*qty;
          });
        }
      });
    });
    return usage;
  };

  const sendTelegram=async(message:string)=>{
    const tok=localStorage.getItem("cafe_tg_token")||"";
    const cid=localStorage.getItem("cafe_tg_chatid")||"";
    if(!tok||!cid)return;
    try{await fetch(`https://api.telegram.org/bot${tok}/sendMessage`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({chat_id:cid,text:message,parse_mode:"HTML"})});}catch(e){}
  };

  const deductStockForDate=(dateKey)=>{
    if(stockDeducted[dateKey])return;
    const usage=calcDailyUsage(dateKey);

    // คำนวณ stock ใหม่ก่อน
    const nextStock={...stock};
    Object.entries(usage).forEach(([id,amt])=>{nextStock[+id]=(nextStock[+id]||0)-(amt as number);});
    setStock(nextStock);
    setStockDeducted((prev:any)=>({...prev,[dateKey]:true}));

    // สร้างและส่งข้อความ Telegram หลัง state update
    const d=dateKey.split("-");
    const dateStr=`${d[2]}/${d[1]}/${(+d[0]+543).toString().slice(-2)}`;
    const lines:string[]=[];
    lines.push(`✂️ <b>ตัดสต๊อกแล้ว</b> — ${dateStr}\n`);

    const deducted=Object.entries(usage).filter(([,a])=>(a as number)>0);
    if(deducted.length){
      lines.push("📦 <b>รายการที่ตัด:</b>");
      deducted.forEach(([id,amt])=>{
        const r=rms.find((x:any)=>x.id===+id);
        if(r){const remain=Math.max(0,(nextStock[+id]||0));lines.push(`  • ${r.name}: -${Number(amt).toFixed(1)}${r.unit} (คงเหลือ ${remain.toFixed(1)}${r.unit})`);}
      });
    }
    const low=rms.filter((r:any)=>stockMin[r.id]&&(nextStock[r.id]||0)<stockMin[r.id]&&(nextStock[r.id]||0)>0);
    if(low.length){
      lines.push(`\n⚠️ <b>สต๊อกต่ำกว่าขั้นต่ำ (${low.length} รายการ):</b>`);
      low.forEach((r:any)=>{lines.push(`  • ${r.name}: ${(nextStock[r.id]||0).toFixed(1)}${r.unit} / ขั้นต่ำ ${stockMin[r.id]}${r.unit}`);});
    }
    const out=rms.filter((r:any)=>stockMin[r.id]&&(nextStock[r.id]||0)<=0);
    if(out.length){
      lines.push(`\n🚨 <b>หมดสต๊อก (${out.length} รายการ):</b>`);
      out.forEach((r:any)=>{lines.push(`  • ${r.name}`);});
    }
    sendTelegram(lines.join("\n"));
  };

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
  const [editCompId,setEditCompId]=useState(null);
  const [nm,setNm]=useState({name:"",cat:"เครื่องดื่ม",price:0,ings:[]});
  const [nmIng,setNmIng]=useState({type:"raw",id:"",amt:0});
  const [editMenuId,setEditMenuId]=useState(null);
  const [editIngIdx,setEditIngIdx]=useState(null);
  const [editIngVal,setEditIngVal]=useState({type:"raw",id:"",amt:0});
  const [nf,setNf]=useState({name:"",amt:0,period:"เดือน",icon:"📦"});
  const [stockDate,setStockDate]=useState(todayKey);
  const [stockCatF,setStockCatF]=useState("ทั้งหมด");
  const [editStockId,setEditStockId]=useState(null);
  const [addAmt,setAddAmt]=useState(0);
  const [rmSearch,setRmSearch]=useState("");
  const [compRmSearch,setCompRmSearch]=useState("");
  const [pdfLoading,setPdfLoading]=useState(false);
  const [pdfMsg,setPdfMsg]=useState("");
  const [gsUrl,setGsUrl]=useState(()=>{try{return localStorage.getItem("cafe_gs_url")||"";}catch(e){return "";}});
  const [gsSyncMsg,setGsSyncMsg]=useState("");
  const [showGsSettings,setShowGsSettings]=useState(false);
  const [tgToken,setTgToken]=useState(()=>{try{return localStorage.getItem("cafe_tg_token")||"";}catch(e){return "";}});
  const [tgChatId,setTgChatId]=useState(()=>{try{return localStorage.getItem("cafe_tg_chatid")||"";}catch(e){return "";}});
  const [showTgSettings,setShowTgSettings]=useState(false);
  const [tgMsg,setTgMsg]=useState("");
  const chartRef=useRef(null);
  const chartInst=useRef(null);
  const syncTimerRef=useRef(null);


  useEffect(()=>{
    try{localStorage.setItem("cafe_branches",JSON.stringify(branches));}catch(e){}
  },[branches]);

  const buildPayload=()=>({branches:branches.map(b=>({
    name:b.name,rms:b.rms,fixed:b.fixed,
    menus:b.menus.map(m=>{
      const cost=m.ings.reduce((s,i)=>{
        if(i.type==="raw"){const r=b.rms.find(x=>x.id===i.id);return s+(r?(r.pricePerPack/r.packSize)*i.amt:0);}
        const c=b.comps.find(x=>x.id===i.id);if(!c)return s;
        const cc=c.ings.reduce((ss,ci)=>{const r=b.rms.find(x=>x.id===ci.rmId);return ss+(r?(r.pricePerPack/r.packSize)*ci.amt:0);},0);
        return s+(c.yield>0?(cc/c.yield)*i.amt:0);
      },0);
      return{...m,cost:cost.toFixed(2),gm:m.price>0?((m.price-cost)/m.price*100).toFixed(1):0};
    }),
  }))});

  const doSync=async()=>{
    if(!gsUrl)return;
    setGsSyncMsg("⏳ กำลัง sync...");
    try{
      const res=await fetch("/api/sync-sheets",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({gsUrl,payload:buildPayload()})});
      const json=await res.json();
      setGsSyncMsg(json.error?`❌ ${json.error}`:`✅ Sync แล้ว ${new Date().toLocaleTimeString("th-TH")}`);
    }catch(err:any){setGsSyncMsg(`❌ ${err.message||"เชื่อมต่อไม่ได้"}`);}
  };

  useEffect(()=>{
    if(!gsUrl)return;
    if(syncTimerRef.current)clearTimeout(syncTimerRef.current);
    syncTimerRef.current=setTimeout(doSync,10000);
  },[branches,gsUrl]);

  const fixedPD=fixed.reduce((s,f)=>s+(f.period==="วัน"?f.amt:f.period==="เดือน"?f.amt/30:f.amt/365),0);

  // เฉลี่ยจำนวนชิ้นที่ขายต่อวัน (30 วันล่าสุด) เพื่อแบ่ง Fixed Cost ต่อชิ้น
  const avgDailyUnits=useMemo(()=>{
    const keys=Object.keys(salesData||{}).sort().slice(-30);
    if(!keys.length)return 0;
    const total=keys.reduce((s,k)=>s+menus.reduce((ms,m)=>ms+(salesData[k]?.[m.id]||0),0),0);
    return total/keys.length;
  },[salesData,menus]);
  const fixedPerUnit=avgDailyUnits>0?fixedPD/avgDailyUnits:0;

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

  const handleLogin=()=>{
    if(pwInput===APP_PASSWORD){sessionStorage.setItem("cafe_authed","1");setAuthed(true);}
    else{setPwError(true);setPwInput("");}
  };

  if(!authed) return(
    <div style={{fontFamily:"var(--font-sans)",background:"#f8f7ff",minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center"}}>
      <div style={{background:"#fff",borderRadius:24,padding:"40px 44px",width:340,boxShadow:"0 20px 60px rgba(127,119,221,.15)",textAlign:"center"}}>
        <div style={{fontSize:48,marginBottom:8}}>☕</div>
        <div style={{fontWeight:700,fontSize:20,color:"#1e1b4b",marginBottom:4}}>Simple Cafe</div>
        <div style={{fontSize:13,color:"#64748b",marginBottom:28}}>ใส่รหัสผ่านเพื่อเข้าใช้งาน</div>
        <div style={{position:"relative"}}>
          <input autoFocus type={showPw?"text":"password"} placeholder="รหัสผ่าน"
            style={{width:"100%",padding:"12px 44px 12px 16px",borderRadius:12,border:`2px solid ${pwError?"#ef4444":"#e2e8f0"}`,fontSize:15,boxSizing:"border-box",outline:"none",letterSpacing:showPw?1:2}}
            value={pwInput}
            onChange={e=>{setPwInput(e.target.value);setPwError(false);}}
            onKeyDown={e=>{if(e.key==="Enter")handleLogin();}}
          />
          <button
            type="button"
            onClick={()=>setShowPw(v=>!v)}
            style={{position:"absolute",right:12,top:"50%",transform:"translateY(-50%)",background:"none",border:"none",cursor:"pointer",fontSize:18,color:"#94a3b8",padding:0,lineHeight:1}}
          >{showPw?"🙈":"👁️"}</button>
        </div>
        {pwError&&<div style={{color:"#ef4444",fontSize:12,marginTop:8}}>รหัสผ่านไม่ถูกต้อง</div>}
        <button style={{marginTop:16,width:"100%",padding:"12px",borderRadius:12,border:"none",background:"#7F77DD",color:"#fff",fontSize:15,fontWeight:600,cursor:"pointer"}} onClick={handleLogin}>
          เข้าใช้งาน
        </button>
      </div>
    </div>
  );

  return(
    <div style={{fontFamily:"var(--font-sans)",background:"#f8f7ff",minHeight:"100vh",padding:"0 0 3rem"}}>
      <div className="app-header" style={{background:tc.color,padding:"18px 24px 0",transition:"background .3s"}}>
        <div style={{maxWidth:1160,margin:"0 auto"}}>
          <div className="header-top-row" style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:12}}>
            <div style={{display:"flex",alignItems:"center",gap:10}}>
              <div style={{width:36,height:36,borderRadius:10,background:"rgba(255,255,255,.2)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:18}}>☕</div>
              <div>
                <div style={{fontSize:17,fontWeight:500,color:"#fff"}}>ระบบต้นทุนร้านเครื่องดื่ม & เบเกอรี่</div>
                <div className="header-subtitle" style={{fontSize:12,color:"rgba(255,255,255,.7)"}}>วัตถุดิบ → ของผสม → เมนู → ต้นทุน</div>
              </div>
            </div>
            <div style={{display:"flex",alignItems:"center",gap:8}}>
              {gsSyncMsg&&<span className="gs-sync-msg" style={{fontSize:11,color:"rgba(255,255,255,.85)",background:"rgba(0,0,0,.2)",padding:"3px 10px",borderRadius:20}}>{gsSyncMsg}</span>}
              {tgMsg&&<span style={{fontSize:11,color:"rgba(255,255,255,.85)",background:"rgba(0,0,0,.2)",padding:"3px 10px",borderRadius:20}}>{tgMsg}</span>}
              <button onClick={()=>{setShowTgSettings(!showTgSettings);setShowGsSettings(false);}} style={{padding:"6px 14px",borderRadius:20,border:`2px solid ${tgToken&&tgChatId?"rgba(255,255,255,.7)":"rgba(255,255,255,.4)"}`,background:tgToken&&tgChatId?"rgba(255,255,255,.25)":"rgba(255,255,255,.15)",color:"#fff",cursor:"pointer",fontSize:12}}>
                📱<span className="gs-btn-text"> Telegram</span>
              </button>
              <button onClick={()=>{setShowGsSettings(!showGsSettings);setShowTgSettings(false);}} style={{padding:"6px 14px",borderRadius:20,border:"2px solid rgba(255,255,255,.4)",background:"rgba(255,255,255,.15)",color:"#fff",cursor:"pointer",fontSize:12}}>
                ⚙️<span className="gs-btn-text"> Google Sheets</span>
              </button>
            </div>
          </div>
          {showTgSettings&&(
            <div style={{background:"rgba(0,0,0,.25)",borderRadius:12,padding:"14px 16px",marginBottom:12,display:"flex",gap:10,alignItems:"flex-end",flexWrap:"wrap"}}>
              <div style={{flex:1,minWidth:200}}>
                <div style={{fontSize:11,color:"rgba(255,255,255,.7)",marginBottom:4}}>Bot Token</div>
                <input style={{...inp,background:"rgba(255,255,255,.9)",fontSize:12}} placeholder="1234567890:AAH..." value={tgToken} onChange={e=>{setTgToken(e.target.value);try{localStorage.setItem("cafe_tg_token",e.target.value);}catch(ex){}}}/>
              </div>
              <div style={{flex:1,minWidth:140}}>
                <div style={{fontSize:11,color:"rgba(255,255,255,.7)",marginBottom:4}}>Chat ID</div>
                <input style={{...inp,background:"rgba(255,255,255,.9)",fontSize:12}} placeholder="8668867696" value={tgChatId} onChange={e=>{setTgChatId(e.target.value);try{localStorage.setItem("cafe_tg_chatid",e.target.value);}catch(ex){}}}/>
              </div>
              <button style={{padding:"8px 16px",borderRadius:9,background:"#fff",border:"none",color:"#534AB7",cursor:"pointer",fontSize:12,fontWeight:500}} onClick={()=>setShowTgSettings(false)}>บันทึก ✓</button>
              <button style={{padding:"8px 16px",borderRadius:9,background:"#1D9E75",border:"none",color:"#fff",cursor:"pointer",fontSize:12,fontWeight:500}} onClick={async()=>{
                if(!tgToken||!tgChatId){setTgMsg("❌ กรุณาใส่ Token และ Chat ID");setTimeout(()=>setTgMsg(""),4000);return;}
                setTgMsg("⏳ กำลังทดสอบ...");
                try{
                  const r=await fetch(`https://api.telegram.org/bot${tgToken}/sendMessage`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({chat_id:tgChatId,text:"✅ เชื่อมต่อ Telegram สำเร็จ!\nระบบแจ้งเตือนสต๊อกพร้อมใช้งานแล้ว",parse_mode:"HTML"})});
                  const d=await r.json();
                  setTgMsg(d.ok?"✅ ส่งสำเร็จ":`❌ ${d.description||"ส่งไม่ได้"}`);
                }catch(e:any){setTgMsg(`❌ Network error: ${e.message}`);}
                setTimeout(()=>setTgMsg(""),4000);
              }}>📤 ทดสอบส่ง</button>
            </div>
          )}
          {showGsSettings&&(
            <div style={{background:"rgba(0,0,0,.25)",borderRadius:12,padding:"14px 16px",marginBottom:12,display:"flex",gap:10,alignItems:"flex-end",flexWrap:"wrap"}}>
              <div style={{flex:1,minWidth:260}}>
                <div style={{fontSize:11,color:"rgba(255,255,255,.7)",marginBottom:4}}>Google Apps Script URL (Web App)</div>
                <input style={{...inp,background:"rgba(255,255,255,.9)",fontSize:12}} placeholder="https://script.google.com/macros/s/..." value={gsUrl} onChange={e=>{setGsUrl(e.target.value);try{localStorage.setItem("cafe_gs_url",e.target.value);}catch(ex){}}}/>
              </div>
              <button style={{padding:"8px 16px",borderRadius:9,background:"#fff",border:"none",color:"#534AB7",cursor:"pointer",fontSize:12,fontWeight:500}} onClick={()=>setShowGsSettings(false)}>บันทึก ✓</button>
              <button style={{padding:"8px 16px",borderRadius:9,background:"#1D9E75",border:"none",color:"#fff",cursor:"pointer",fontSize:12,fontWeight:500}} onClick={()=>{setShowGsSettings(false);doSync();}}>🔄 Sync ทันที</button>
              <a href="https://script.google.com" target="_blank" rel="noreferrer" style={{padding:"8px 16px",borderRadius:9,background:"rgba(255,255,255,.15)",border:"1.5px solid rgba(255,255,255,.3)",color:"#fff",cursor:"pointer",fontSize:12,textDecoration:"none"}}>เปิด Apps Script ↗</a>
            </div>
          )}
          <div style={{display:"flex",gap:2,overflowX:"auto"}}>
            {TABS.map(t=>(
              <button key={t.id} onClick={()=>setTab(t.id)} style={{display:"flex",alignItems:"center",gap:6,padding:"10px 14px",border:"none",background:tab===t.id?"#fff":"transparent",color:tab===t.id?tc.color:"rgba(255,255,255,.8)",cursor:"pointer",fontSize:13,fontWeight:tab===t.id?500:400,borderRadius:"8px 8px 0 0",transition:"all .15s",whiteSpace:"nowrap"}}>
                <span style={{fontSize:14}}>{t.emoji}</span><span className="tab-label">{t.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="main-content" style={{maxWidth:1160,margin:"0 auto",padding:"24px 16px 0"}}>

      {tab===0&&(
        <div>
          <div className="stats-grid" style={{display:"flex",gap:12,flexWrap:"wrap",marginBottom:20}}>
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
          <div className="dash-grid" style={{display:"grid",gridTemplateColumns:"minmax(0,1.6fr) minmax(0,1fr)",gap:14,marginBottom:14}}>
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
              <div className="form-grid-5" style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr 1fr",gap:10,marginBottom:10}}>
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
                <button style={btnP} onClick={()=>{if(!nr.name)return;setRms([...rms,{...nr,id:Date.now()}].sort((a,b)=>a.name.localeCompare(b.name,"th")));setNr({name:"",unit:"",pricePerPack:0,packSize:1,cat:""});setShowAddRm(false);}}>บันทึก</button>
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
                    <div className="form-grid-4" style={{display:"grid",gridTemplateColumns:"2fr 1fr 1fr 1fr",gap:10,marginBottom:10}}>
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
                    <button style={{...btnP,background:sc.accent}} onClick={()=>{if(!nr.name)return;setRms([...rms,{...nr,id:Date.now(),cat}].sort((a,b)=>a.name.localeCompare(b.name,"th")));setNr({name:"",unit:"",pricePerPack:0,packSize:1,cat:""});setShowAddRm(false);}}>บันทึก</button>
                  </div>
                )}
                <div className="table-scroll"><table style={{width:"100%",borderCollapse:"collapse",minWidth:500}}>
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
                </table></div>
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
              <div style={{fontWeight:500,fontSize:14,color:"#064e3b",marginBottom:12}}>{editCompId?"✏️ แก้ไขของผสม":"เพิ่มของผสมใหม่"}</div>
              <div className="form-grid-4" style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",gap:10,marginBottom:12}}>
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
              <div className="ing-add-row" style={{display:"flex",gap:8,alignItems:"flex-end",marginBottom:14}}>
                <div className="ing-select" style={{flex:2}}><label style={lbl}>เลือกวัตถุดิบ</label>
                  <input style={{...inp,marginBottom:4}} placeholder="🔍 ค้นหาวัตถุดิบ..." value={compRmSearch} onChange={e=>setCompRmSearch(e.target.value)}/>
                  <select style={inp} value={ncIng.rmId} onChange={e=>setNcIng({...ncIng,rmId:+e.target.value})}>
                    <option value="">-- เลือก --</option>
                    {rms.filter(r=>!compRmSearch||r.name.toLowerCase().includes(compRmSearch.toLowerCase())).map(r=><option key={r.id} value={r.id}>{r.name} (฿{cpuOf(r).toFixed(3)}/{r.unit})</option>)}
                  </select>
                </div>
                <div style={{flex:1}}><label style={lbl}>จำนวน</label><input style={inp} type="number" value={ncIng.amt} onChange={e=>setNcIng({...ncIng,amt:+e.target.value})}/></div>
                <button style={{...btnP,background:"#1D9E75",whiteSpace:"nowrap"}} onClick={()=>{if(!ncIng.rmId||!ncIng.amt)return;setNc({...nc,ings:[...nc.ings,{rmId:ncIng.rmId,amt:ncIng.amt}]});setNcIng({rmId:"",amt:0});}}>+ เพิ่ม</button>
              </div>
              {nc.ings.length>0&&nc.yield>0&&<div style={{fontSize:13,color:"#1D9E75",fontWeight:500,marginBottom:12}}>ราคาต่อ{nc.unit||"หน่วย"}: ฿{compCpuOf(nc,rms).toFixed(4)}</div>}
              <div style={{display:"flex",gap:8}}>
                <button style={btnP} onClick={()=>{
                  if(!nc.name||nc.yield<=0)return;
                  if(editCompId){setComps(comps.map(c=>c.id===editCompId?{...nc,id:editCompId}:c));setEditCompId(null);}
                  else{setComps([...comps,{...nc,id:Date.now()}].sort((a,b)=>a.name.localeCompare(b.name,"th")));}
                  setNc({name:"",unit:"",yield:0,cat:"โฮมเมด",ings:[]});setNcIng({rmId:"",amt:0});setShowAddComp(false);
                }}>{editCompId?"อัปเดต":"บันทึก"}</button>
                <button style={btnSm} onClick={()=>{setShowAddComp(false);setEditCompId(null);setNc({name:"",unit:"",yield:0,cat:"โฮมเมด",ings:[]});}}>ยกเลิก</button>
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
                  <div style={{padding:"10px 18px",background:"#fafafa",display:"flex",justifyContent:"space-between",alignItems:"center",fontSize:12,color:"#475569"}}>
                    <span>ต้นทุนรวม: <b style={{color:sc.accent}}>฿{totalCost.toFixed(2)}</b></span>
                    <span>ผลผลิต: <b style={{color:sc.accent}}>{fmt(comp.yield,0)} {comp.unit}</b></span>
                  </div>
                  <div style={{padding:"8px 18px",borderTop:"1px solid #f1f5f9",display:"flex",gap:8,justifyContent:"flex-end"}}>
                    <button style={btnSm} onClick={()=>{setEditCompId(comp.id);setNc({name:comp.name,unit:comp.unit,yield:comp.yield,cat:comp.cat,ings:comp.ings.map(i=>({...i}))});setNcIng({rmId:"",amt:0});setShowAddComp(true);window.scrollTo({top:0,behavior:"smooth"});}}>✏️ แก้ไข</button>
                    <button style={btnDanger} onClick={()=>setComps(comps.filter(x=>x.id!==comp.id))}>ลบ</button>
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
            <div className="filter-row" style={{display:"flex",gap:6}}>
              {["ทั้งหมด","เครื่องดื่ม","เบเกอรี่"].map(c=>(
                <button key={c} style={{padding:"7px 16px",borderRadius:9,border:"1.5px solid "+(catF===c?tc.color:"#e2e8f0"),background:catF===c?tc.color:"#fff",color:catF===c?"#fff":"#374151",cursor:"pointer",fontSize:13,fontWeight:catF===c?500:400,transition:"all .15s"}} onClick={()=>setCatF(c)}>{c}</button>
              ))}
              <button style={btnP} onClick={()=>setShowAddMenu(!showAddMenu)}>+ เพิ่มเมนู</button>
            </div>
          </div>
          {showAddMenu&&(
            <div style={{background:"#fff",borderRadius:14,padding:"20px 22px",border:"1.5px solid #bfdbfe",marginBottom:16}}>
              <div style={{fontWeight:500,fontSize:14,color:"#1e3a5f",marginBottom:12}}>{editMenuId?"✏️ แก้ไขเมนู":"เพิ่มเมนูใหม่"}</div>
              <div className="form-grid-3" style={{display:"grid",gridTemplateColumns:"2fr 1fr 1fr",gap:10,marginBottom:14}}>
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
              <div className="ing-add-row" style={{display:"flex",gap:8,alignItems:"flex-end",marginBottom:12}}>
                <div className="ing-type" style={{flex:1}}><label style={lbl}>ประเภทส่วนผสม</label>
                  <select style={inp} value={nmIng.type} onChange={e=>setNmIng({...nmIng,type:e.target.value,id:""})}><option value="raw">วัตถุดิบ</option><option value="comp">ของผสม</option></select>
                </div>
                <div className="ing-select" style={{flex:2}}><label style={lbl}>เลือกรายการ</label>
                  <input style={{...inp,marginBottom:4}} placeholder="🔍 ค้นหา..." value={rmSearch} onChange={e=>setRmSearch(e.target.value)}/>
                  <select style={inp} value={nmIng.id} onChange={e=>{setNmIng({...nmIng,id:+e.target.value});setRmSearch("");}}>
                    <option value="">-- เลือก --</option>
                    {nmIng.type==="raw"
                      ?rms.filter(r=>!rmSearch||r.name.toLowerCase().includes(rmSearch.toLowerCase())).map(r=><option key={r.id} value={r.id}>{r.name} (฿{cpuOf(r).toFixed(3)}/{r.unit})</option>)
                      :comps.filter(c=>!rmSearch||c.name.toLowerCase().includes(rmSearch.toLowerCase())).map(c=><option key={c.id} value={c.id}>{c.name} (฿{compCpuOf(c,rms).toFixed(3)}/{c.unit})</option>)}
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
                  else{setMenus([...menus,{...nm,id:Date.now()}].sort((a,b)=>a.name.localeCompare(b.name,"th")));}
                  setNm({name:"",cat:"เครื่องดื่ม",price:0,ings:[]});setNmIng({type:"raw",id:"",amt:0});setShowAddMenu(false);
                }}>{editMenuId?"อัปเดตเมนู":"บันทึกเมนู"}</button>
                <button style={btnSm} onClick={()=>{setShowAddMenu(false);setEditMenuId(null);setNm({name:"",cat:"เครื่องดื่ม",price:0,ings:[]});}}>ยกเลิก</button>
              </div>
            </div>
          )}
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(290px,1fr))",gap:14}}>
            {menus.filter(m=>catF==="ทั้งหมด"||m.cat===catF).map((menu,mi)=>{
              const cost=menuCost(menu,rms,comps),gm=(menu.price-cost)/menu.price;
              const totalCost=cost+fixedPerUnit,netGm=menu.price>0?(menu.price-totalCost)/menu.price:0;
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
                  <div style={{padding:"12px 18px",background:"#fafafa"}}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                      <div><div style={{fontSize:11,color:"#64748b"}}>ต้นทุนวัตถุดิบ</div><div style={{fontWeight:500,fontSize:16,color:"#1e293b"}}>฿{cost.toFixed(2)}</div></div>
                      <div style={{textAlign:"center"}}><Ring p={gm*100} color={mColor(gm)}/><div style={{fontSize:10,color:mColor(gm),fontWeight:500,marginTop:2}}>Gross</div></div>
                      <div style={{textAlign:"right"}}><div style={{fontSize:11,color:"#64748b"}}>Gross Margin</div><div style={{fontWeight:500,fontSize:18,color:mColor(gm)}}>{pct(gm)}</div></div>
                    </div>
                    {fixedPD>0&&(
                      <div style={{marginTop:8,paddingTop:8,borderTop:"1px dashed #e2e8f0",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                        {avgDailyUnits>0?(
                          <>
                            <div>
                              <div style={{fontSize:11,color:"#64748b"}}>+ FC <span style={{color:"#94a3b8",fontSize:10}}>≈฿{fixedPerUnit.toFixed(2)}/ชิ้น</span></div>
                              <div style={{fontWeight:500,fontSize:13,color:"#374151"}}>ต้นทุนรวม ฿{totalCost.toFixed(2)}</div>
                            </div>
                            <div style={{textAlign:"right"}}>
                              <div style={{fontSize:11,color:"#64748b"}}>Net Margin</div>
                              <div style={{fontWeight:600,fontSize:18,color:mColor(netGm)}}>{pct(netGm)}</div>
                            </div>
                          </>
                        ):(
                          <div style={{fontSize:11,color:"#94a3b8"}}>
                            FC/วัน ฿{fmt(fixedPD,0)} · <span style={{color:"#BA7517"}}>กรอกยอดขายในหน้า 💰 เพื่อคำนวณ FC/ชิ้น</span>
                          </div>
                        )}
                      </div>
                    )}
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
            <div className="view-toggle" style={{display:"flex",gap:6}}>
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
                <div className="table-scroll"><table style={{width:"100%",borderCollapse:"collapse",minWidth:560}}>
                  <thead><tr style={{background:"#f8f9ff"}}>
                    {["เมนู","ประเภท","ราคาขาย","ต้นทุน+FC/ชิ้น","GM","Net Margin","จำนวนที่ขาย","รายได้","กำไร Net"].map(h=>(
                      <th key={h} style={{...th_s,color:"#3730a3"}}>{h}</th>
                    ))}
                  </tr></thead>
                  <tbody>
                    {menus.map(m=>{
                      const cost=menuCost(m,rms,comps),gm=(m.price-cost)/m.price;
                      const totalCostU=cost+fixedPerUnit,netGm=m.price>0?(m.price-totalCostU)/m.price:0;
                      const qty=getDaySales(selectedDate)[m.id]||0;
                      const rev=m.price*qty,netProfit=(m.price-totalCostU)*qty;
                      return(
                        <tr key={m.id} style={{borderBottom:"1px solid #f1f5f9"}}>
                          <td style={td_s}><span style={{fontWeight:500,color:"#1e293b"}}>{m.name}</span></td>
                          <td style={td_s}><span style={{background:m.cat==="เครื่องดื่ม"?"#EDE9FE":"#D1FAE5",color:m.cat==="เครื่องดื่ม"?"#4C1D95":"#065f46",padding:"1px 8px",borderRadius:20,fontSize:11,fontWeight:500}}>{m.cat}</span></td>
                          <td style={td_s}>฿{m.price}</td>
                          <td style={td_s}><span style={{fontSize:12}}>฿{cost.toFixed(2)}<br/><span style={{color:"#94a3b8",fontSize:11}}>+FC ฿{fixedPerUnit.toFixed(2)}</span><br/><b>฿{totalCostU.toFixed(2)}</b></span></td>
                          <td style={td_s}><span style={{color:mColor(gm),fontWeight:500}}>{pct(gm)}</span></td>
                          <td style={td_s}><span style={{fontWeight:600,color:mColor(netGm)}}>{pct(netGm)}</span></td>
                          <td style={td_s}>
                            <input type="number" min="0" style={{...inp,width:70,textAlign:"center"}} value={qty}
                              onChange={e=>setDaySales(selectedDate,m.id,+e.target.value)}/>
                          </td>
                          <td style={{...td_s,fontWeight:500,color:"#7F77DD"}}>฿{fmt(rev)}</td>
                          <td style={{...td_s,fontWeight:500,color:netProfit>=0?"#1D9E75":"#E24B4A"}}>฿{fmt(netProfit)}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table></div>
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
                <div className="table-scroll"><table style={{width:"100%",borderCollapse:"collapse",minWidth:480}}>
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
                </table></div>
              </div>
            </div>
          )}

          {historyView==="history"&&(
            <div>
              <div style={{fontWeight:500,fontSize:14,color:"#312e81",marginBottom:14}}>เปรียบเทียบ 3 เดือน</div>
              <div className="hist-grid" style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:14,marginBottom:20}}>
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
              <div className="form-grid-3" style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10,marginBottom:14}}>
                <div><label style={lbl}>รายการ</label><input style={inp} value={nf.name} onChange={e=>setNf({...nf,name:e.target.value})}/></div>
                <div><label style={lbl}>จำนวน (฿)</label><input style={inp} type="number" value={nf.amt} onChange={e=>setNf({...nf,amt:+e.target.value})}/></div>
                <div><label style={lbl}>ช่วงเวลา</label>
                  <select style={inp} value={nf.period} onChange={e=>setNf({...nf,period:e.target.value})}>
                    {["วัน","เดือน","ปี"].map(p=><option key={p}>{p}</option>)}
                  </select>
                </div>
              </div>
              <div style={{display:"flex",gap:8}}>
                <button style={btnP} onClick={()=>{if(!nf.name)return;setFixed([...fixed,{...nf,id:Date.now()}].sort((a,b)=>a.name.localeCompare(b.name,"th")));setNf({name:"",amt:0,period:"เดือน",icon:"📦"});setShowAddFixed(false);}}>บันทึก</button>
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

      {tab===6&&(()=>{
        const rmCatsAll=["ทั้งหมด",...Array.from(new Set(rms.map(r=>r.cat)))];
        const filteredRms=rms.filter(r=>stockCatF==="ทั้งหมด"||r.cat===stockCatF);
        const lowCount=rms.filter(r=>stockMin[r.id]&&(stock[r.id]||0)<stockMin[r.id]).length;
        const outCount=rms.filter(r=>(stock[r.id]||0)<=0&&stockMin[r.id]).length;
        const todayUsage=calcDailyUsage(stockDate);
        const alreadyDeducted=!!stockDeducted[stockDate];
        return(
          <div>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:16,flexWrap:"wrap",gap:12}}>
              <div>
                <div style={{fontWeight:500,fontSize:15,color:"#0F6E56"}}>📦 จัดการสต๊อกวัตถุดิบ</div>
                <div style={{fontSize:12,color:"#64748b",marginTop:2}}>ตั้งจำนวนสต๊อก → ยืนยันยอดขาย → ระบบตัดสต๊อกอัตโนมัติ</div>
              </div>
              <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
                {lowCount>0&&<div style={{background:"#FEF3C7",color:"#92400e",padding:"6px 14px",borderRadius:20,fontSize:12,fontWeight:500}}>⚠️ ใกล้หมด {lowCount} รายการ</div>}
                {outCount>0&&<div style={{background:"#FEE2E2",color:"#991b1b",padding:"6px 14px",borderRadius:20,fontSize:12,fontWeight:500}}>🔴 หมดแล้ว {outCount} รายการ</div>}
              </div>
            </div>

            {/* ตัดสต๊อกจากยอดขาย */}
            <div style={{background:"#fff",borderRadius:14,padding:"18px 20px",border:"1.5px solid #9FE1CB",marginBottom:20}}>
              <div style={{fontWeight:500,fontSize:14,color:"#0F6E56",marginBottom:12}}>✂️ ตัดสต๊อกจากยอดขาย</div>
              <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:12,flexWrap:"wrap"}}>
                <div>
                  <label style={{fontSize:12,color:"#64748b",display:"block",marginBottom:4}}>เลือกวันที่</label>
                  <input type="date" style={{...inp,width:160}} value={stockDate} onChange={e=>setStockDate(e.target.value)}/>
                </div>
                <div style={{flex:1,minWidth:200}}>
                  <div style={{fontSize:12,color:"#64748b",marginBottom:4}}>ยอดขายวันนี้:</div>
                  <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
                    {menus.map(m=>{const q=salesData[stockDate]?.[m.id]||0;return q>0&&<span key={m.id} style={{fontSize:11,background:"#E1F5EE",color:"#0F6E56",padding:"2px 8px",borderRadius:8}}>{m.name} ×{q}</span>;})}
                    {!Object.values(salesData[stockDate]||{}).some(v=>v>0)&&<span style={{fontSize:12,color:"#94a3b8"}}>ยังไม่มียอดขายวันนี้</span>}
                  </div>
                </div>
                {alreadyDeducted
                  ?<div style={{padding:"8px 16px",borderRadius:9,background:"#E1F5EE",color:"#0F6E56",fontSize:12,fontWeight:500}}>✅ ตัดสต๊อกแล้ว</div>
                  :<button style={{padding:"8px 18px",borderRadius:9,background:"#0F6E56",border:"none",color:"#fff",cursor:"pointer",fontSize:13,fontWeight:500}} onClick={()=>deductStockForDate(stockDate)}>✂️ ยืนยันตัดสต๊อก</button>
                }
              </div>
              {Object.keys(todayUsage).length>0&&(
                <div style={{borderTop:"1px solid #E1F5EE",paddingTop:10}}>
                  <div style={{fontSize:11,color:"#64748b",marginBottom:6}}>วัตถุดิบที่จะ{alreadyDeducted?"ถูกตัดไปแล้ว":"ถูกตัด"}:</div>
                  <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
                    {Object.entries(todayUsage).map(([id,amt])=>{const r=rms.find(x=>x.id===+id);return r&&<span key={id} style={{fontSize:11,background:"#f1f5f9",padding:"2px 8px",borderRadius:6,color:"#475569"}}>{r.name} -{Number(amt).toFixed(1)}{r.unit}</span>;})}
                  </div>
                </div>
              )}
            </div>

            {/* ตารางสต๊อก */}
            <div style={{background:"#fff",borderRadius:14,border:"1.5px solid #e2e8f0",overflow:"hidden"}}>
              <div style={{padding:"14px 20px",borderBottom:"1px solid #f1f5f9",display:"flex",alignItems:"center",gap:8,flexWrap:"wrap"}}>
                <span style={{fontWeight:500,fontSize:13,color:"#1e293b",marginRight:4}}>วัตถุดิบทั้งหมด ({rms.length} รายการ)</span>
                <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
                  {rmCatsAll.map(c=><button key={c} onClick={()=>setStockCatF(c)} style={{padding:"3px 12px",borderRadius:20,border:"1.5px solid",borderColor:stockCatF===c?"#0F6E56":"#e2e8f0",background:stockCatF===c?"#0F6E56":"#fff",color:stockCatF===c?"#fff":"#64748b",fontSize:11,cursor:"pointer"}}>{c}</button>)}
                </div>
              </div>
              <div className="table-scroll"><table style={{width:"100%",borderCollapse:"collapse",minWidth:480}}>
                <thead>
                  <tr style={{background:"#f8fafc"}}>
                    {["วัตถุดิบ","หน่วย","สต๊อกปัจจุบัน","ขั้นต่ำ","สถานะ",""].map(h=><th key={h} style={{padding:"10px 14px",textAlign:"left",fontSize:11,color:"#64748b",fontWeight:500,borderBottom:"1px solid #f1f5f9"}}>{h}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {filteredRms.map(r=>{
                    const cur=stock[r.id]||0;
                    const min=stockMin[r.id]||0;
                    const isEdit=editStockId===r.id;
                    const status=min>0?(cur<=0?"🔴 หมด":cur<min?"🟡 ใกล้หมด":"🟢 ปกติ"):"–";
                    const statusColor=min>0?(cur<=0?"#991b1b":cur<min?"#92400e":"#065f46"):"#94a3b8";
                    return(
                      <tr key={r.id} style={{borderBottom:"1px solid #f8fafc",background:isEdit?"#f0fdf4":"#fff"}}>
                        <td style={{padding:"10px 14px",fontSize:13,fontWeight:500,color:"#1e293b"}}>{r.name}</td>
                        <td style={{padding:"10px 14px",fontSize:12,color:"#64748b"}}>{r.unit}</td>
                        <td style={{padding:"10px 14px"}}>
                          {isEdit
                            ?<div style={{display:"flex",gap:6,alignItems:"center"}}>
                                <input type="number" style={{...inp,width:80}} value={stock[r.id]||0} onChange={e=>setStock({...stock,[r.id]:+e.target.value})}/>
                                <span style={{fontSize:11,color:"#64748b"}}>+เพิ่ม:</span>
                                <input type="number" style={{...inp,width:70}} value={addAmt} onChange={e=>setAddAmt(+e.target.value)} placeholder="0"/>
                                <button style={{...btnSm,background:"#0F6E56",color:"#fff",border:"none"}} onClick={()=>{setStock({...stock,[r.id]:(stock[r.id]||0)+addAmt});setAddAmt(0);setEditStockId(null);}}>✓</button>
                              </div>
                            :<span style={{fontWeight:500,color:cur<=0&&min>0?"#ef4444":cur<min&&min>0?"#f59e0b":"#1e293b"}}>{Number(cur).toFixed(1)} {r.unit}</span>
                          }
                        </td>
                        <td style={{padding:"10px 14px"}}>
                          {isEdit
                            ?<input type="number" style={{...inp,width:80}} value={stockMin[r.id]||0} onChange={e=>setStockMin({...stockMin,[r.id]:+e.target.value})} placeholder="ขั้นต่ำ"/>
                            :<span style={{fontSize:12,color:"#64748b"}}>{min||"–"}</span>
                          }
                        </td>
                        <td style={{padding:"10px 14px",fontSize:12,fontWeight:500,color:statusColor}}>{status}</td>
                        <td style={{padding:"10px 14px"}}>
                          {isEdit
                            ?<button style={btnSm} onClick={()=>setEditStockId(null)}>ยกเลิก</button>
                            :<button style={btnSm} onClick={()=>{setEditStockId(r.id);setAddAmt(0);}}>แก้ไข</button>
                          }
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table></div>
            </div>
          </div>
        );
      })()}

      </div>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.umd.js" key="cjs"></script>

    </div>
  );
}
