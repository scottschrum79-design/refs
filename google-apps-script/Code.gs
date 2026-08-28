const ADMIN_EMAIL = 'scott@cvsoccer.club';
function doPost(e) {
  try {
    const d = JSON.parse(e.postData.contents || '{}');
    if (d.action !== 'refereeSignupEmail') return json({ok:false,error:'Unknown action'});
    const c=d.claim||{};
    const subject='CV Soccer referee signup confirmation';
    const when=[c.gameDate,c.startTime].filter(Boolean).join(' at ');
    const body=`Hello ${c.parentFirst||''},\n\n${c.childFirst||'Your child'} is signed up to referee the ${c.ageGroup||'U8'} game on ${when}.\nLocation: ${c.location||''}\nField: ${c.fieldName||''}\nAverage game length: ${c.durationMinutes||''} minutes\n\nThank you,\nCV Soccer`;
    if(c.parentEmail) MailApp.sendEmail(c.parentEmail,subject,body);
    MailApp.sendEmail(ADMIN_EMAIL,`New referee signup: ${c.childFirst||''} ${c.childLast||''}`,body+`\n\nParent: ${c.parentFirst||''} ${c.parentLast||''}\nEmail: ${c.parentEmail||''}\nPhone: ${c.parentPhone||''}`);
    return json({ok:true});
  } catch(err) { return json({ok:false,error:String(err)}); }
}
function json(value){return ContentService.createTextOutput(JSON.stringify(value)).setMimeType(ContentService.MimeType.JSON);}
