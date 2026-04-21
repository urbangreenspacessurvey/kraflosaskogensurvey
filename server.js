const express=require('express');
const sqlite3=require('sqlite3').verbose();
const cors=require('cors');
const path=require('path');
const app=express();
const PORT=process.env.PORT||3000;
const DB_PATH=process.env.DB_PATH||path.join(__dirname,'survey.db');
app.use(cors());app.use(express.json({limit:'2mb'}));app.use(express.static(path.join(__dirname,'public')));
const db=new sqlite3.Database(DB_PATH);
function run(sql,params=[]){return new Promise((resolve,reject)=>db.run(sql,params,function(err){if(err)reject(err);else resolve(this)}))}
function all(sql,params=[]){return new Promise((resolve,reject)=>db.all(sql,params,(err,rows)=>{if(err)reject(err);else resolve(rows)}))}
async function initSchema(){
  await run(`CREATE TABLE IF NOT EXISTS survey_responses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    language TEXT,
    nature_overlap TEXT,
    bond_1 TEXT,bond_2 TEXT,bond_3 TEXT,bond_4 TEXT,
    func_1 TEXT,func_2 TEXT,func_3 TEXT,func_4 TEXT,func_5 TEXT,func_6 TEXT,func_7 TEXT,func_8 TEXT,func_9 TEXT,func_10 TEXT,func_11 TEXT,
    routine_1 TEXT,routine_2 TEXT,routine_3 TEXT,routine_4 TEXT,routine_5 TEXT,routine_6 TEXT,routine_7 TEXT,routine_8 TEXT,routine_9 TEXT,
    multi_1 TEXT,multi_2 TEXT,multi_3 TEXT,multi_4 TEXT,multi_5 TEXT,multi_6 TEXT,multi_7 TEXT,multi_8 TEXT,multi_9 TEXT,multi_10 TEXT,multi_11 TEXT,
    distance_from_forest TEXT,age_group TEXT,gender TEXT,education_level TEXT,visit_frequency TEXT
  )`);
  await run(`CREATE TABLE IF NOT EXISTS map_pins (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    response_id INTEGER NOT NULL,
    lat REAL,lng REAL,activity TEXT,emotion TEXT,note TEXT,
    FOREIGN KEY (response_id) REFERENCES survey_responses(id)
  )`);
}
initSchema().catch(err=>console.error('Schema init error:',err));
app.get('/',(req,res)=>res.sendFile(path.join(__dirname,'public','index.html')));
app.post('/submit',async(req,res)=>{
  try{
    const b=req.body||{}; const r=b.responses||{};
    const result=await run(`INSERT INTO survey_responses (
      language,nature_overlap,
      bond_1,bond_2,bond_3,bond_4,
      func_1,func_2,func_3,func_4,func_5,func_6,func_7,func_8,func_9,func_10,func_11,
      routine_1,routine_2,routine_3,routine_4,routine_5,routine_6,routine_7,routine_8,routine_9,
      multi_1,multi_2,multi_3,multi_4,multi_5,multi_6,multi_7,multi_8,multi_9,multi_10,multi_11,
      distance_from_forest,age_group,gender,education_level,visit_frequency
    ) VALUES (
      ?, ?, ?, ?, ?, ?,
      ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,
      ?, ?, ?, ?, ?, ?, ?, ?, ?,
      ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,
      ?, ?, ?, ?, ?
    )`,[
      b.language||'en',b.nature_overlap||null,
      r.bond_1||null,r.bond_2||null,r.bond_3||null,r.bond_4||null,
      r.func_1||null,r.func_2||null,r.func_3||null,r.func_4||null,r.func_5||null,r.func_6||null,r.func_7||null,r.func_8||null,r.func_9||null,r.func_10||null,r.func_11||null,
      r.routine_1||null,r.routine_2||null,r.routine_3||null,r.routine_4||null,r.routine_5||null,r.routine_6||null,r.routine_7||null,r.routine_8||null,r.routine_9||null,
      r.multi_1||null,r.multi_2||null,r.multi_3||null,r.multi_4||null,r.multi_5||null,r.multi_6||null,r.multi_7||null,r.multi_8||null,r.multi_9||null,r.multi_10||null,r.multi_11||null,
      b.distance_from_forest||null,b.age_group||null,b.gender||null,b.education_level||null,b.visit_frequency||null
    ]);
    const responseId=result.lastID; const pins=Array.isArray(b.place_pins)?b.place_pins:[];
    for(const p of pins){await run(`INSERT INTO map_pins (response_id,lat,lng,activity,emotion,note) VALUES (?,?,?,?,?,?)`,[responseId,p.lat??null,p.lng??null,p.activity??null,p.emotion??null,p.note??null])}
    res.json({success:true,response_id:responseId});
  }catch(err){console.error('Submit error:',err);res.status(500).json({success:false,error:'Server error'})}
});
function esc(v){return String(v??'').replace(/[&<>"']/g,s=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[s]))}

function csvEscape(v){
  const s = String(v ?? '');
  if (/[",\n]/.test(s)) return '"' + s.replace(/"/g, '""') + '"';
  return s;
}
function rowsToCsv(rows, fallbackCols=[]){
  const cols = rows.length ? Object.keys(rows[0]) : fallbackCols;
  const lines = [cols.join(',')];
  for (const row of rows){
    lines.push(cols.map(c => csvEscape(row[c])).join(','));
  }
  return { cols, csv: lines.join('\n') };
}
app.get('/export/responses.csv', async (req, res) => {
  try{
    const rows = await all(`SELECT * FROM survey_responses ORDER BY id DESC`);
    const fallbackCols = ['id','created_at','language','nature_overlap','bond_1','bond_2','bond_3','bond_4','func_1','func_2','func_3','func_4','func_5','func_6','func_7','func_8','func_9','func_10','func_11','routine_1','routine_2','routine_3','routine_4','routine_5','routine_6','routine_7','routine_8','routine_9','multi_1','multi_2','multi_3','multi_4','multi_5','multi_6','multi_7','multi_8','multi_9','multi_10','multi_11','distance_from_forest','age_group','gender','education_level','visit_frequency'];
    const { csv } = rowsToCsv(rows, fallbackCols);
    res.setHeader('Content-Type', 'text/csv; charset=utf-8');
    res.setHeader('Content-Disposition', 'attachment; filename="survey_responses.csv"');
    res.send('\ufeff' + csv);
  }catch(err){console.error(err);res.status(500).send('CSV export error')}
});
app.get('/export/map-pins.csv', async (req, res) => {
  try{
    const rows = await all(`SELECT * FROM map_pins ORDER BY id DESC`);
    const { csv } = rowsToCsv(rows, ['id','response_id','lat','lng','activity','emotion','note']);
    res.setHeader('Content-Type', 'text/csv; charset=utf-8');
    res.setHeader('Content-Disposition', 'attachment; filename="map_pins.csv"');
    res.send('\ufeff' + csv);
  }catch(err){console.error(err);res.status(500).send('CSV export error')}
});

app.get('/database',async(req,res)=>{try{const rows=await all(`SELECT * FROM survey_responses ORDER BY id DESC`);const pins=await all(`SELECT * FROM map_pins ORDER BY id DESC`);const cols=rows.length?Object.keys(rows[0]):['id','created_at','language','nature_overlap','bond_1','bond_2','bond_3','bond_4','func_1','func_2','func_3','func_4','func_5','func_6','func_7','func_8','func_9','func_10','func_11','routine_1','routine_2','routine_3','routine_4','routine_5','routine_6','routine_7','routine_8','routine_9','multi_1','multi_2','multi_3','multi_4','multi_5','multi_6','multi_7','multi_8','multi_9','multi_10','multi_11','distance_from_forest','age_group','gender','education_level','visit_frequency'];const rowsHtml=rows.map(r=>`<tr>${cols.map(c=>`<td>${esc(r[c])}</td>`).join('')}</tr>`).join('');const pinsCols=pins.length?Object.keys(pins[0]):['id','response_id','lat','lng','activity','emotion','note'];const pinsHtml=pins.map(r=>`<tr>${pinsCols.map(c=>`<td>${esc(r[c])}</td>`).join('')}</tr>`).join('');res.send(`<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Survey database</title><style>body{font-family:system-ui,Segoe UI,Arial,sans-serif;margin:0;background:#f6fbf7}.wrap{max-width:1700px;margin:0 auto;padding:18px}h1,h2{color:#235f33}.card{background:#fff;border-radius:16px;padding:14px;box-shadow:0 8px 24px rgba(0,0,0,.06);margin-bottom:20px}.table-wrap{overflow:auto}table{width:100%;border-collapse:collapse;min-width:1200px}th,td{border:1px solid #d8e2db;padding:8px;text-align:left;vertical-align:top;white-space:normal;word-break:break-word}th{background:#235f33;color:#fff;position:sticky;top:0}a.btn{display:inline-block;background:#235f33;color:#fff;text-decoration:none;padding:10px 14px;border-radius:10px;font-weight:700}</style></head><body><div class="wrap"><a class="btn" href="/">Back to survey</a><h1>Survey responses</h1><div class="card"><div class="table-wrap"><table><thead><tr>${cols.map(c=>`<th>${esc(c)}</th>`).join('')}</tr></thead><tbody>${rowsHtml}</tbody></table></div></div><h2>Map pins</h2><div class="card"><div class="table-wrap"><table><thead><tr>${pinsCols.map(c=>`<th>${esc(c)}</th>`).join('')}</tr></thead><tbody>${pinsHtml}</tbody></table></div></div></div></body></html>`)}catch(err){console.error(err);res.status(500).send('Database error')}});
app.listen(PORT,()=>console.log(`Server running on http://localhost:${PORT}`));
