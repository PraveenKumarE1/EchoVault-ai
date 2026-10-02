import express from "express";
import cors from "cors";
const app=express(); app.use(cors()); app.use(express.json({limit:"2mb"}));
const PORT=process.env.PORT||10000;
const BASE=(process.env.MODEL_BASE_URL||"https://api.openai.com/v1").replace(/\/$/,"");
const KEY=process.env.MODEL_API_KEY||"";
const MODEL=process.env.MODEL_NAME||"gpt-4o-mini";
app.get("/api/health",(_,res)=>res.json({ok:true,model:MODEL}));
app.post("/api/agent",async(req,res)=>{
 const {prompt,files=[]}=req.body||{}; if(!prompt)return res.status(400).json({error:"prompt required"});
 if(!KEY)return res.json({message:"No cloud model key is configured. Use offline mode or add MODEL_API_KEY.",files});
 const context=files.map(f=>"FILE: "+f.name+"\n"+f.content).join("\n\n");
 const system="You are Nexus Code, a practical coding agent. Inspect the project context and return JSON only with keys message and files. files must be the complete updated file list when edits are needed. Never invent credentials or claim you executed code. Keep changes focused.\n\nPROJECT:\n"+context;
 try{const r=await fetch(BASE+"/chat/completions",{method:"POST",headers:{"Content-Type":"application/json","Authorization":"Bearer "+KEY},body:JSON.stringify({model:MODEL,temperature:.2,messages:[{role:"system",content:system},{role:"user",content:prompt}]})});
 if(!r.ok)return res.status(502).json({error:"model provider error"}); const d=await r.json(); let raw=d.choices?.[0]?.message?.content||"{}";
 raw=raw.replace(/^\s*\`\`\`json/i,"").replace(/\`\`\`\s*$/,"").trim(); res.json(JSON.parse(raw));
 }catch(e){res.status(500).json({error:"agent request failed"});}
});
app.listen(PORT,()=>console.log("Nexus Code server listening on "+PORT));
