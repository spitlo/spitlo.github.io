// spitlo.com search functions

function debounce(func,wait){var timeout
return function(){var context=this
var args=arguments
clearTimeout(timeout)
timeout=setTimeout(function(){timeout=null
func.apply(context,args)},wait)}}
function makeTeaser(body,terms){var TERM_WEIGHT=40
var NORMAL_WORD_WEIGHT=2
var FIRST_WORD_WEIGHT=8
var TEASER_MAX_WORDS=30
var stemmedTerms=terms.map(function(w){return elasticlunr.stemmer(w.toLowerCase())})
var termFound=false
var index=0
var weighted=[]
var sentences=body.toLowerCase().trim().replace(/(?:\r\n|\r|\n)/g,' ').split('. ')
for(var i in sentences){var words=sentences[i].split(' ')
var value=FIRST_WORD_WEIGHT
for(var j in words){var word=words[j]
if(word.length>0){for(var k in stemmedTerms){if(elasticlunr.stemmer(word).startsWith(stemmedTerms[k])){value=TERM_WEIGHT
termFound=true}}
weighted.push([word,value,index])
value=NORMAL_WORD_WEIGHT}
index+=word.length
index+=1}
index+=1}
if(weighted.length===0){return body}
var windowWeights=[]
var windowSize=Math.min(weighted.length,TEASER_MAX_WORDS)
var curSum=0
for(var i=0;i<windowSize;i++){curSum+=weighted[i][1]}
windowWeights.push(curSum)
for(var i=0;i<weighted.length-windowSize;i++){curSum-=weighted[i][1]
curSum+=weighted[i+windowSize][1]
windowWeights.push(curSum)}
var maxSumIndex=0
if(termFound){var maxFound=0
for(var i=windowWeights.length-1;i>=0;i--){if(windowWeights[i]>maxFound){maxFound=windowWeights[i]
maxSumIndex=i}}}
var teaser=[]
var startIndex=weighted[maxSumIndex][2]
for(var i=maxSumIndex;i<maxSumIndex+windowSize;i++){var word=weighted[i]
if(i===maxSumIndex&&word[1]!==FIRST_WORD_WEIGHT){teaser.push('…')}
if(startIndex<word[2]){teaser.push(body.substring(startIndex,word[2]))
startIndex=word[2]}
if(word[1]===TERM_WEIGHT){teaser.push('<strong>')}
startIndex=word[2]+word[0].length
teaser.push(body.substring(word[2],startIndex))
if(word[1]===TERM_WEIGHT){teaser.push('</strong>')}}
teaser.push('…')
return teaser.join('')}
function getResultSection(result){var url=result?result.ref:''
if(url.match(/\/code\//)){return'code'}else if(url.match(/\/music\//)){return'music'}else if(url.match(/\/tags\//)){return'tags'}}
function formatSearchResultItem(item,terms){return'<div class="'+getResultSection(item)+'">'
+'<a href="'+item.ref+'">'
+'<div class="title">'+item.doc.title+'</div>'
+'<div class="teaser">'+makeTeaser(item.doc.body||item.doc.description,terms)+'</div>'
+'<div class="help">ENTER</div></a></div>'}
function initSearch(){var $searchInput=document.getElementById('search')
var $searchResults=document.getElementById('searchResults')
var $searchResultsItems=document.getElementById('searchResultsItems')
var MAX_ITEMS=8
if(!$searchInput){return}
var options={bool:'OR',fields:{title:{boost:2},body:{boost:1},},expand:true}
var currentTerm=''
var index=elasticlunr.Index.load(window.searchIndex)
var selectedIndex=0
var results=[]
function clearSearch(){selectedIndex=0
results=[]
$searchResultsItems.innerHTML=''
$searchInput.value=currentTerm=''
$searchInput.blur()
$searchResults.style.display='none'}
$searchInput.addEventListener('keyup',debounce(function(event){var term=$searchInput.value.trim()
if(term===currentTerm||!index){return}
$searchResults.style.display=term===''?'none':'block'
$searchResultsItems.innerHTML=''
if(term===''){return}
results=index.search(term,options)
if(results.length===0){$searchResults.style.display='none'
return}
currentTerm=term
for(var i=0;i<Math.min(results.length,MAX_ITEMS);i++){var item=document.createElement('li')
item.innerHTML=formatSearchResultItem(results[i],term.split(' '))
$searchResultsItems.appendChild(item)}},150))
$searchInput.addEventListener('keyup',function(event){var term=$searchInput.value.trim()
if(event.key==='Escape'){clearSearch()}
if(term===''){return}
if(event.key==='ArrowUp'||event.key==='ArrowDown'){if($searchResultsItems.children&&$searchResultsItems.children[selectedIndex-1]){$searchResultsItems.children[selectedIndex-1].className=''}
if(event.key==='ArrowUp'){if(selectedIndex>1){selectedIndex--}else{selectedIndex=results.length}}else if(event.key==='ArrowDown'){if(selectedIndex<results.length){selectedIndex++}else{selectedIndex=1}}
if($searchResultsItems.children&&$searchResultsItems.children[selectedIndex-1]){$searchResultsItems.children[selectedIndex-1].className='selected'}}else if(event.key==='Enter'){result=results[selectedIndex-1]
if(result){document.location.href=result.ref}}})
$searchInput.addEventListener('search',function(event){var term=$searchInput.value.trim()
if(!term){clearSearch()}})}
if(document.readyState==='complete'||(document.readyState!=='loading'&&!document.documentElement.doScroll)){initSearch()}else{document.addEventListener('DOMContentLoaded',initSearch)}