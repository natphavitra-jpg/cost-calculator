// ======================================================
// วิธีใช้:
// 1. เปิด Google Sheets ใหม่
// 2. Extensions → Apps Script
// 3. ลบโค้ดเดิม วาง code นี้ทั้งหมด
// 4. Deploy → New deployment → Web app
//    - Execute as: Me
//    - Who has access: Anyone
// 5. Copy URL ที่ได้ ไปวางในระบบ (Settings → Google Sheets URL)
// ======================================================

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const now = new Date().toLocaleString("th-TH");

    data.branches.forEach(branch => {
      // --- Sheet: เมนู ---
      const menuSheetName = branch.name + " - เมนู";
      let menuSheet = ss.getSheetByName(menuSheetName) || ss.insertSheet(menuSheetName);
      menuSheet.clearContents();
      const menuRows = [["เมนู", "ประเภท", "ราคาขาย (฿)", "ต้นทุน (฿)", "Gross Margin (%)", "อัปเดตล่าสุด"]];
      branch.menus.forEach(m => {
        menuRows.push([m.name, m.cat, m.price, Number(m.cost || 0).toFixed(2), Number(m.gm || 0).toFixed(1), now]);
      });
      menuSheet.getRange(1, 1, menuRows.length, menuRows[0].length).setValues(menuRows);

      // --- Sheet: วัตถุดิบ ---
      const rmSheetName = branch.name + " - วัตถุดิบ";
      let rmSheet = ss.getSheetByName(rmSheetName) || ss.insertSheet(rmSheetName);
      rmSheet.clearContents();
      const rmRows = [["วัตถุดิบ", "หมวด", "ราคาต่อแพ็ค (฿)", "ปริมาณ", "หน่วย", "ราคาต่อหน่วย (฿)", "อัปเดตล่าสุด"]];
      branch.rms.forEach(r => {
        rmRows.push([r.name, r.cat, r.pricePerPack, r.packSize, r.unit, (r.pricePerPack / r.packSize).toFixed(4), now]);
      });
      rmSheet.getRange(1, 1, rmRows.length, rmRows[0].length).setValues(rmRows);

      // --- Sheet: Fixed Cost ---
      const fcSheetName = branch.name + " - Fixed Cost";
      let fcSheet = ss.getSheetByName(fcSheetName) || ss.insertSheet(fcSheetName);
      fcSheet.clearContents();
      const fcRows = [["รายการ", "จำนวน (฿)", "ช่วงเวลา", "อัปเดตล่าสุด"]];
      branch.fixed.forEach(f => {
        fcRows.push([f.name, f.amt, f.period, now]);
      });
      fcSheet.getRange(1, 1, fcRows.length, fcRows[0].length).setValues(fcRows);
    });

    return ContentService
      .createTextOutput(JSON.stringify({ success: true, updated: now }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService.createTextOutput("API is running").setMimeType(ContentService.MimeType.TEXT);
}
