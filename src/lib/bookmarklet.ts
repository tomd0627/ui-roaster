// Bookmarklet source — injected into an <a href="javascript:..."> link.
// ORIGIN is replaced at runtime with the actual roaster origin so it works
// in both dev (localhost) and production.

// prettier-ignore
const BOOKMARKLET_SOURCE =
  "(function(){" +
  "var o='ORIGIN';" +
  "var w=window.open(o+'/?from=bookmarklet','ui-roaster');" +
  "if(!w){alert('Allow popups for this site to use the Roast This Page bookmarklet.');return;}" +
  "var b=null,r=false;" +
  "function snd(){if(b&&r)w.postMessage({type:'ROAST_IMAGE',imageBase64:b,mimeType:'image/jpeg'},o);}" +
  "window.addEventListener('message',function h(e){" +
  "if(e.origin!==o||!e.data||e.data.type!=='ROASTER_READY')return;" +
  "r=true;window.removeEventListener('message',h);snd();" +
  "});" +
  "var el=document.createElement('script');" +
  "el.src='https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js';" +
  "el.onload=function(){" +
  "html2canvas(document.documentElement,{scale:0.5,useCORS:true,logging:false,allowTaint:true})" +
  ".then(function(c){" +
  "c.toBlob(function(blob){" +
  "var fr=new FileReader();" +
  "fr.onload=function(){b=fr.result.split(',')[1];snd();};" +
  "fr.readAsDataURL(blob);" +
  "},'image/jpeg',0.8);" +
  "}).catch(function(){alert('Could not capture this page. Try uploading a screenshot manually.');});" +
  "};" +
  "el.onerror=function(){alert('Failed to load screenshot library. Please try again.');};" +
  "document.head.appendChild(el);" +
  "})()";

export function buildBookmarkletHref(origin: string): string {
  const src = BOOKMARKLET_SOURCE.replace("'ORIGIN'", `'${origin}'`);
  return `javascript:${encodeURIComponent(src)}`;
}
