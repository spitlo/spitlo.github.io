// minified with jsmin

const nms=(a,b)=>{const codePage437='!#$%&()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[]^_`abcdefghijklmnopqrstuvwxyz{|}~ÇüéâäàåçêëèïîìÄÅÉæÆôöòûùÿÖÜ¢£¥ƒáíóúñÑªº¿¬½¼¡«»░▒▓│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌█▄▌▐▀αßΓπΣσµτΦΘΩδ∞φε∩≡±≥≤÷≈°·√ⁿ²'
const scrambleMillieconds=7000
const intervalMilliseconds=80
const source=a.innerText
const target=atob(b)
let loop=true
const startTime=(new Date()).getTime()
function getScrambledString({length}){let returnString=''
for(let x=0;x<length;x++){returnString+=codePage437.charAt(Math.floor(Math.random()*codePage437.length))}
return returnString}
function unscrambleString(force){if(force){for(let x=0;x<charArray.length;x++){charArray[x]=`<span class="unscrambled">${target.substr(x, 1)}</span>`}}else{let unscrambleIndex=Math.floor(Math.random()*charArray.length)
if(charArray[unscrambleIndex].length===1){if(Math.random()<0.7){charArray[unscrambleIndex]=`<span class="unscrambled">${target.substr(unscrambleIndex, 1)}</span>`}else{charArray[unscrambleIndex]=codePage437.charAt(Math.floor(Math.random()*codePage437.length))}}else{unscrambleIndex=Math.floor(Math.random()*charArray.length)
if(charArray[unscrambleIndex].length===1){charArray[unscrambleIndex]=codePage437.charAt(Math.floor(Math.random()*codePage437.length))}}}}
setTimeout(()=>{loop=false},scrambleMillieconds)
let charArray=source.split('')
const loopInterval=setInterval(()=>{const now=(new Date()).getTime()
const diff=now-startTime
if(loop){if(diff<scrambleMillieconds/3){a.innerText=getScrambledString(source)}else{unscrambleString()
a.innerHTML=charArray.join('')}}else{unscrambleString(true)
a.innerHTML=charArray.join('')
clearInterval(loopInterval)}},intervalMilliseconds)}
const getCookie=(name)=>{const localName=`${name}=`
const cookieString=decodeURIComponent(document.cookie)
const cookies=cookieString.split(';')
for(let i=0;i<cookies.length;i++){const cookie=cookies[i].trim()
if(cookie.startsWith(localName)){return cookie.substring(localName.length,cookie.length)}}
return''}
const setCookie=(name,value,days)=>{let expires
if(days){const date=new Date()
date.setTime(date.getTime()+(days*24*60*60*1000))
expires=`; expires=${date.toGMTString()}`}else{expires=''}
document.cookie=`${name}=${value}${expires}; path=/`}
export{nms,getCookie,setCookie}