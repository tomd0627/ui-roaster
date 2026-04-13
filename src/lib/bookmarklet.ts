// Bookmarklet source — injected into an <a href="javascript:..."> link.
// ORIGIN is replaced at runtime with the actual roaster origin so it works
// in both dev (localhost) and production.

// prettier-ignore
const BOOKMARKLET_SOURCE =
  "(function(){" +
  "var o='ORIGIN';" +
  "var w=window.open(o+'/?from=bookmarklet','ui-roaster');" +
  "if(!w){alert('Allow popups for this site to use the Roast This Page bookmarklet.');return;}" +
  "var b=null,r=false,done=false;" +
  // Overall timeout — if the capture hangs (e.g. news sites with many cross-origin images),
  // abort after 12s instead of hanging forever.
  "var abort=setTimeout(function(){if(!done){done=true;alert('This page took too long to capture. Try uploading a screenshot manually.');}},12000);" +
  "function snd(){if(b&&r&&!done){done=true;clearTimeout(abort);w.postMessage({type:'ROAST_IMAGE',imageBase64:b,mimeType:'image/jpeg'},o);}}" +
  "window.addEventListener('message',function h(e){" +
  "if(e.origin!==o||!e.data||e.data.type!=='ROASTER_READY')return;" +
  "r=true;window.removeEventListener('message',h);snd();" +
  "});" +
  "var el=document.createElement('script');" +
  "el.src='https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js';" +
  "el.onload=function(){" +
  // imageTimeout: per-image fetch cap (default is 15 000 ms — too slow for ad-heavy pages).
  // allowTaint:false keeps the canvas exportable; cross-origin images are skipped instead of blocking.
  "html2canvas(document.documentElement,{scale:0.5,useCORS:true,logging:false,allowTaint:false,imageTimeout:3000})" +
  ".then(function(c){" +
  "try{" +
  "c.toBlob(function(blob){" +
  "if(!blob){if(!done){done=true;clearTimeout(abort);alert('Could not export screenshot. Try uploading manually.');}return;}" +
  "var fr=new FileReader();" +
  "fr.onload=function(){b=fr.result.split(',')[1];snd();};" +
  "fr.readAsDataURL(blob);" +
  "},'image/jpeg',0.8);" +
  "}catch(err){if(!done){done=true;clearTimeout(abort);alert('Could not capture this page — it may be blocking screenshot tools. Try uploading a screenshot manually.');}}" +
  "}).catch(function(){if(!done){done=true;clearTimeout(abort);alert('Could not capture this page. Try uploading a screenshot manually.');}});" +
  "};" +
  "el.onerror=function(){if(!done){done=true;clearTimeout(abort);alert('Failed to load screenshot library. Please try again.');}};" +
  "document.head.appendChild(el);" +
  "})()";

export function buildBookmarkletHref(origin: string): string {
  const src = BOOKMARKLET_SOURCE.replace("'ORIGIN'", `'${origin}'`);
  return `javascript:${encodeURIComponent(src)}`;
}
