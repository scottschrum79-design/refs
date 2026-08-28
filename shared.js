const CFG=window.REFS_CONFIG||{};
function configured(){return /^https:\/\/.+\.supabase\.co$/.test(CFG.supabaseUrl||"")&&!String(CFG.supabaseAnonKey||"").startsWith("PASTE_")}
function headers(token){return{apikey:CFG.supabaseAnonKey,Authorization:`Bearer ${token||CFG.supabaseAnonKey}`,"Content-Type":"application/json"}}
async function rpc(name,body={},token){if(!configured())throw new Error("The new Supabase database has not been connected yet.");const r=await fetch(`${CFG.supabaseUrl}/rest/v1/rpc/${name}`,{method:"POST",headers:headers(token),body:JSON.stringify(body),cache:"no-store"});const data=await r.json().catch(()=>({}));if(!r.ok)throw new Error(data.message||data.error_description||`Request failed (${r.status})`);return data}
function fmtDate(d){return new Intl.DateTimeFormat("en-US",{weekday:"short",month:"short",day:"numeric",year:"numeric"}).format(new Date(`${d}T12:00:00`))}
function fmtTime(t){const [h,m]=String(t).slice(0,5).split(":").map(Number);return new Intl.DateTimeFormat("en-US",{hour:"numeric",minute:"2-digit"}).format(new Date(2000,0,1,h,m))}
function esc(s){return String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"}[c]))}
function gameSummary(g){return `${fmtDate(g.game_date)} at ${fmtTime(g.start_time)} · ${g.age_group} · ${g.location} · ${g.field_name}`}
