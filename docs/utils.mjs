// minified with jsmin

const alphabet={a:['____','|__|','|  |'],b:['___ ','|__]','|__]'],c:['____','|   ','|___'],d:['___ ','|  \\','|__/'],e:['____','|___','|___'],f:['____','|___','|   '],g:['____','| __','|__]'],h:['_  _','|__|','|  |'],i:['_','|','|'],j:[' _',' |','_|'],k:['_  _','|_/ ','| \\_'],l:['_   ','|   ','|___'],m:['_  _','|\\/|','|  |'],n:['_  _','|\\ |','| \\|'],o:['____','|  |','|__|'],p:['___ ','|__]','|   '],q:['____','|  |','|_\\|'],r:['____','|__/','|  \\'],s:['____','[__ ','___]'],t:['___',' | ',' | '],u:['_  _','|  |','|__|'],v:['_  _','|  |',' \\/ '],w:['_ _ _','| | |','|_|_|'],x:['_  _',' \\/ ','_/\\_'],y:['_   _',' \\_/ ','  |  '],z:['___',' / ','/__'],' ':['    ','    ','    '],'-':['    ',' __ ','    '],'.':['   ','   ',' * '],':':['   ',' , ',' ’ '],}
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
const deleteCookie=(name)=>{if(getCookie(name)){const date=new Date(0)
document.cookie=`${name}=; expires=${date.toGMTString()}; path=/`}}
const dotmatrix=()=>{document.body.classList.add('dotmatrix')
const toc=document.getElementsByTagName('details')[0]
if(toc){toc.setAttribute('open',true)}
const header=document.getElementsByTagName('h1')[0]
const dotmatrixHeader=document.getElementById('dotmatrixHeader')
if(header&&!dotmatrixHeader){const headerText=header.innerText
const figlet=['','','']
for(let char of headerText){char=char.toLowerCase();if(alphabet[char]){for(let y=0;y<figlet.length;y++){figlet[y]=`${figlet[y]} ${alphabet[char][y]}`}}}
const figletHeader=document.createElement('pre')
const underline=new Array(figlet[figlet.length-1].length).join('-')
figlet.push(` ${underline}`)
figletHeader.id='dotmatrixHeader'
figletHeader.innerText=figlet.join('\n')
header.insertAdjacentElement('afterend',figletHeader)}}
export{nms,getCookie,setCookie,deleteCookie,dotmatrix}