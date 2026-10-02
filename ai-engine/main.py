from fastapi import FastAPI
from pydantic import BaseModel
import re
from collections import Counter
app=FastAPI(title="EchoVault AI Engine",version="1.0.0")
class Text(BaseModel): text:str
TOPICS={"AI":["ai","machine learning","deep learning","model","neural"],"software":["react","node","python","java","api","database","github"],"career":["resume","job","interview","skill","portfolio"],"learning":["study","course","exam","learn","notes"],"ideas":["idea","innovation","hackathon","future","smart city"]}
@app.get("/health")
def health(): return {"status":"ok","engine":"echovault-nlp"}
@app.post("/classify")
def classify(body:Text):
 t=body.text.lower(); scores={k:sum(t.count(w) for w in v) for k,v in TOPICS.items()}; category=max(scores,key=scores.get) if max(scores.values(),default=0)>0 else "general"; tokens=re.findall(r"[a-zA-Z]{4,}",t); common=[w for w,n in Counter(tokens).most_common(8) if w not in {"this","that","with","from","about"}]; return {"category":category,"keywords":common,"scores":scores}
@app.post("/relations")
def relations(body:Text):
 t=body.text.lower(); entities=[k for k,v in TOPICS.items() if any(w in t for w in v)]; return {"entities":entities,"relations":[{"from":a,"to":b,"type":"related"} for a in entities for b in entities if a<b]}