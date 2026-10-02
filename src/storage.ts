export type Message={id:string;role:'user'|'assistant';text:string;time:number;mode:'online'|'offline'};
export type Chat={id:string;title:string;created:number;messages:Message[]};
export function loadChats():Chat[]{try{return JSON.parse(localStorage.getItem('nexusai_chats_v1')||'[]')}catch{return[]}}
export function saveChats(c:Chat[]){localStorage.setItem('nexusai_chats_v1',JSON.stringify(c))}
export function loadNotes():string[]{try{return JSON.parse(localStorage.getItem('nexusai_notes')||'[]')}catch{return[]}}
export function saveNotes(n:string[]){localStorage.setItem('nexusai_notes',JSON.stringify(n))}