
export default function getCookie(cookiename){
 var name = cookiename + "=";
 var cs = document.cookie.split(';');
 for(var i=0;i<cs.length;i++){
   var c = cs[i].trim();
   if(c.indexOf(name)==0) return c.substring(name.length,c.length);
 }
}
