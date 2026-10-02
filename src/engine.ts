export type LocalResult={text:string;confidence:number;kind:string};
const stop=new Set('the a an and or but is are was were be been to of in on for with as at by from this that it i you we they he she do does did can could would should will your my our their have has had'.split(' '));
const words=(s:string)=>s.toLowerCase().replace(/[^a-z0-9\s]/g,' ').split(/\s+/).filter(x=>x&&!stop.has(x));
const sentences=(s:string)=>s.split(/(?<=[.!?])\s+/).map(x=>x.trim()).filter(Boolean);
export function localAI(input:string):LocalResult{
 const q=input.trim(),l=q.toLowerCase();
 if(!q)return{text:'Tell me what you want to work on.',confidence:.99,kind:'chat'};
 if(/^\s*(hi|hello|hey|vanakkam)\b/.test(l))return{text:'Hello! I’m NexusAI. I can keep working when you are offline, and switch to online services when connectivity is available.',confidence:.98,kind:'chat'};
 if(/\b(time|date)\b/.test(l))return{text:'Your device time is '+new Date().toLocaleString()+'.',confidence:.95,kind:'utility'};
 if(/\b(summarize|summary|shorten)\b/.test(l)){const body=q.replace(/.*?\b(summarize|summary|shorten)\b[:\s]*/i,'');const ss=sentences(body||q);if(ss.length>2)return{text:ss.slice(0,Math.max(1,Math.ceil(ss.length/3))).join(' '),confidence:.88,kind:'summary'}};
 if(/\b(translate)\b/.test(l))return{text:'Offline translation can use the local processing layer. For high-quality multilingual translation, reconnect and enable an online provider.',confidence:.78,kind:'translation'};
 if(/\b(explain|what is|define)\b/.test(l))return{text:'Simple approach: break the topic into its purpose, inputs, process and output. Ask for an example or an exam-style answer.',confidence:.72,kind:'explanation'};
 const ws=words(q),freq:Record<string,number>={};ws.forEach(w=>freq[w]=(freq[w]||0)+1);const top=Object.entries(freq).sort((a,b)=>b[1]-a[1]).slice(0,5).map(x=>x[0]);
 if(/\b(code|python|java|javascript|react|sql|bug|error)\b/.test(l))return{text:'I can work through this offline. Key terms detected: '+(top.join(', ')||'programming')+'. Share the code or error and I’ll break it into steps and suggest a fix.',confidence:.82,kind:'coding'};
 return{text:'I’m in Offline Local mode, so I’m using the browser-side Nexus engine. Main topics: '+(top.join(', ')||'general conversation')+'. Reconnect for cloud-model answers.',confidence:.68,kind:'local'};
}