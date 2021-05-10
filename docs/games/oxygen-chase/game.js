// minified with jsmin

const TRAVEL_TIMES={hospital:21,doctor:18,redcross:13,}
const BEDROOM_DESCS={original:'You are sitting by your father’s bedside. Transparent tubing runs across the bedsheet from the mask strapped to his face to an **oxygen tank** standing in a cart with wheels. Your car is parked **outside**.',leak:'You are standing in your father’s bedroom. Your car is parked **outside**.',}
const printGPS=()=>{const timeToDad=disk.leavingRoom?TRAVEL_TIMES[disk.leavingRoom]:0
println('There are a few saved locations that seems interesting:')
if(disk.leavingRoom!=='downtown'){println(`**Downtown** to the Hospital. The drive there is ${TRAVEL_TIMES.hospital + (timeToDad / 2)} minutes.`)}
if(disk.leavingRoom!=='midtown'){println(`**Midtown** to a doctor’s office. The drive there is ${TRAVEL_TIMES.doctor + (timeToDad / 2)} minutes.`)}
if(disk.leavingRoom!=='uptown'){println(`**Uptown** to the Red Cross. The drive there is ${TRAVEL_TIMES.redcross + (timeToDad / 2)} minutes.`)}
if(disk.leavingRoom){println(`**Dad** The drive back there is ${timeToDad} minutes.`)}}
const enterLocation=(location)=>{let extraTime=0
if(disk.leavingRoom&&disk.leavingRoom!==location){extraTime=TRAVEL_TIMES[disk.leavingRoom]/2}
decreaseTimer(TRAVEL_TIMES.hospital+extraTime)
disk.leavingRoom=location
console.debug(`Entering ${location}. Timer is now ${disk.timer}`)
const car=getRoom('car')
const bedroom=car.exits.find((exit)=>exit.id==='bedroom')
if(!bedroom){car.exits.push({dir:['dad','dad’s','bedroom'],id:'bedroom',})}}
const chance=(seed)=>seed>=Math.random()
const decreaseTimer=(subtrahend)=>{disk.timer-=subtrahend}
const getName=(character)=>{const char=getCharacter(character,disk.character)
const namesLength=char.name.length
return namesLength===0?char[0]:char[namesLength-1]}
const checkOnDad=()=>{let breathing
let extra=''
let breathingClass='breathing-normal'
if((disk&&disk.leak)||disk.timer<10){breathing='hindered'
extra=' His face is turning blue as he tries to remove the face mask.'
breathingClass='breathing-hindered'}else if(disk.timer>100){breathing='normal'}else if(disk.timer<101&&disk.timer>60){breathing='hurried'
breathingClass='breathing-hurried'}else if(disk.timer>30){breathing=pickOne(['heavy','fast'])
extra=' His lips and fingers are faintly blue.'
breathingClass='breathing-fast'}else{breathing='rapid and shallow'
extra=' His entire skin has a blue tint. His looks slightly panicked.'
breathingClass='breathing-rapid'}
println(`His breathing seems ${breathing}.${extra || ''}`,breathingClass)
if(disk.leak){println('You really, really should try to reconnect the tube to the tank.')}else{if(chance(1/4)){println(`You only have ${disk.timer} minutes to save your father. Perhaps you should just stay with him and talk?`)}else if(chance(1/5)){const whiteLie=Math.ceil(disk.timer/10)*10
println('"How much oxygen do we have left?", your dad asks.')
println(`"About ${whiteLie} minutes worth, dad. Maybe a bit more," you answer. But you know it’s less.`)}}}
const getEmotionAdverb=()=>{let emotion
if(disk.timer>100){emotion=' '}else if(disk.timer<101&&disk.timer>80){emotion=` ${pickOne(['restlessly', 'nervously'])} `}else if(disk.timer>60){emotion=` ${pickOne(['worriedly', 'uneasily'])} `}else if(disk.timer>40){emotion=` ${pickOne(['timorously', 'apprehensively'])} `}else if(disk.timer>20){emotion=` ${pickOne(['disheartenedly', 'anxiously'])} `}else{emotion=' despondently '}
return emotion}
const oxygenChase={roomId:'bedroom',timer:120,gps:false,leak:false,hasLeaked:false,leavingRoom:'',inventory:[],rooms:[{id:'bedroom',name:'Your father’s bedroom',desc:`${BEDROOM_DESCS.original} Your **car keys** and **phone** are on the bedside table.`,onEnter:()=>{if(TRAVEL_TIMES.hasOwnProperty(disk.leavingRoom)){decreaseTimer(TRAVEL_TIMES[disk.leavingRoom])
disk.leavingRoom=''
checkOnDad()}},onLook:()=>{const bedroom=getRoom('bedroom')
bedroom.desc=''
if(disk.leak){decreaseTimer(10)
println(BEDROOM_DESCS.leak)
println(`You${getEmotionAdverb()}look at your dad.`)
checkOnDad()}else{decreaseTimer(1)
println(BEDROOM_DESCS.original)}
const phone=bedroom.items.find((item)=>item.name==='phone')
const keys=bedroom.items.find((item)=>item.name==='car keys')
if(phone&&keys){println('Your **car keys** and **phone** are on the bedside table. ')}else if(phone){println('Your **phone** is on the bedside table. ')}else if(keys){println('Your **car keys** are on the bedside table. ')}
if(disk.leak){println('There is a **loose tube** here, and the oxygen tank is leaking.')}else{checkOnDad()}},items:[{name:['oxygen tank','gauge'],desc:'It’s a big oxygen tank, strapped to a cart.',onLook:()=>println(`You${getEmotionAdverb()}check the gauge on the tank. There seems to be about ${disk.timer} minutes of oxygen left.`),},{name:'phone',desc:'Who could you call?',isTakeable:true,onUse:()=>{println('You scroll through all your contacts, but you can’t think of anyone who could help you.')
decreaseTimer(5)},},{name:'car keys',desc:'Perhaps there is somewhere you can go?',isTakeable:true,onTake:()=>{println('You reach over to grab your car keys. As you lean over the bed, you press down on the tubing.')
if(chance(1/2)){decreaseTimer(10)
disk.leak=true
println('It pulls hard on the tank, and suddenly snaps loose. At first, you think you broke it, but it is only disconnected from the tank. Precious oxygen leaks out into the room.')
const bedroom=getRoom('bedroom')
bedroom.items.push({name:['loose tube','tubing'],desc:'You should really, really reconnect this tube to the tank.',isTakeable:true,onUse:()=>{decreaseTimer(10)
println('You scramble frantically to reconnect the tube to the tank, and after a few minutes the leaking stops.')
println(`Examining the gauge, you can see there is about ${disk.timer} minutes of oxygen left in the tank.`)
disk.hasLeaked=true
disk.leak=false
bedroom.items=bedroom.items.filter((item)=>!item.name.includes('loose tubing'))},})}else{decreaseTimer(1)
println('The tubing pulls hard on the tank. The cart creeks and moves a bit closer, but the tubing stays connected. You remember to be more careful in the future.')}
const room=getRoom(disk.roomId)
const car=getExit('outside',room.exits)
delete car.block},},],exits:[{dir:['outside','car'],id:'car',block:'You need to bring your car keys.',},],},{id:'car',name:'In the car',desc:'You’re in your car. There’s a GPS here.',onEnter:()=>{if(disk.leak){println('You use the GPS to locate a hospital.')}},onLook:()=>{if(disk.gps){println('You check the GPS.')
printGPS()}},items:[{name:['gps','satnav','map'],onUse:()=>{if(disk.gps){printGPS()}else{println('The GPS boots up. The animation seemingly repeats forever, but eventually you’re presented with the welcome screen.')
printGPS()
println('Where do you want to go?')
disk.gps=true
decreaseTimer(2)
const car=getRoom('car')
const hospital=getExit('downtown',car.exits)
delete hospital.block
const doctor=getExit('midtown',car.exits)
delete doctor.block
const redcross=getExit('uptown',car.exits)
delete redcross.block
car.desc='Where do you want to go?'}},},],exits:[{dir:['downtown','hospital'],id:'hospital',block:'You won’t be able to find your way to the hospital without the GPS.',},{dir:['midtown','doctor'],id:'doctor',block:'There’s no way you’ll get to the doctor’s office without the GPS.',},{dir:['uptown','redcross'],id:'redcross',block:'You haven’t got a clue where the Red Cross is located. Perhaps you should use the GPS?',},],},{id:'hospital',name:'At the hospital',desc:`You’re standing in the lobby of the town’s hospital. Plastic plants adorn the corners of the room, and dashed yellow lines on the floor disappear off behind closed doors.

A **receptionist** sits behind a huge desk.`,exits:[{dir:['car','outside'],id:'car',}],onEnter:()=>{enterLocation('hospital')},},{id:'doctor',name:'At the doctor’s office',desc:'',exits:[{dir:['car','outside'],id:'car',}],onEnter:()=>{enterLocation('doctor')},},{id:'redcross',name:'At the Red Cross',desc:'',exits:[{dir:['car','outside'],id:'car',}],onEnter:()=>{enterLocation('redcross')},},],characters:[{name:['father','dad'],roomId:'bedroom',desc:'You look at your father with affection. He smiles back at you.',onLook:()=>{checkOnDad()},topics:[{option:'**Covid**, huh?',line:'',keyword:'covid',removeOnRead:true,onSelected:()=>{decreaseTimer(5)},},{option:'Look, dad. I spoke to **Mother**.',line:'',keyword:'mother',removeOnRead:true,onSelected:()=>{decreaseTimer(10)},},{option:'**How** are you, dad?',line:'',keyword:'how',removeOnRead:false,onSelected:()=>{decreaseTimer(1)
checkOnDad()},},],},{name:['receptionist'],roomId:'hospital',desc:'A **receptionist** sits behind a huge desk, reading something on his phone. A name tag on his chest reads "René".',onLook:()=>{getCharacter('receptionist').name.push('René')},topics:[{option:'Ask for **oxygen**',line:`"I need an oxygen tank," you say. "I’ll pay for it, if that’s what you need. No questions asked."

The receptionist looks up at you. "Does this look like a dive shop?" he spits.`,keyword:'oxygen',removeOnRead:true,onSelected:()=>decreaseTimer(1),},{option:'Ask to speak to an **administrator**',line:`"I want to speak to an administrator," you say sternly.

René shuffles a few papers, restarts a lucky cat whose arm is slowing down somewhat, and picks up his phone again.

"The administrator is busy," he mumbles.`,keyword:'administrator',prereqs:['oxygen'],removeOnRead:true,onSelected:()=>decreaseTimer(2),},{option:'**Insist** on speaking to an administrator',line:`"Put down your phone and look at me," you half-scream at the receptionist.

"I insist, I really need to speak to an administrator."`,keyword:'insist',prereqs:['administrator'],removeOnRead:true,onSelected:()=>decreaseTimer(3),},{option:'**Beg** to speak to an administrator',line:`"Listen. I really need to see an administrator. I need oxygen, badly."
"My father barely has any left in his tank."

"He is dying."`,keyword:'beg',prereqs:['insist'],removeOnRead:true,onSelected:()=>decreaseTimer(4),},{option:'**Demand** to speak to a god damned administrator',line:`You bang your fist in the desk. "Call up a god damned administrator," you scream. "I’m not asking!"

The receptionist looks up again, unamused. Slowly, he slides the desk phone closer and begins to dial a number, laboriously pressing each key and pausing. "There," he says after an eternity. Then, into the mouthpiece, "This is René in the reception. Can you come down? Uh-mmm, yeah." He looks back at you and continues, "Your wish is my command."`,keyword:'demand',prereqs:['beg'],removeOnRead:true,onSelected:()=>{decreaseTimer(8)
disk.characters.push({name:['administrator','hospital administrator'],roomId:'hospital',desc:'The hospital **administrator**, a woman in her late fifties or early sixties with ash-blond hair and an uninviting smile.',onLook:()=>{getCharacter('administrator').name.push('Catrine')},topics:[{option:'Ask for **oxygen**',line:'"As I told, um, René here," you say, glancing at the receptionist’s name tag, "I’m in dire need of oxygen. My father has precious little left in his tank. Please, can you help me?"',keyword:'oxygen',onSelected:()=>decreaseTimer(4),},],},)
println(`After a few minutes, an elevator dings as the doors slide up.
[...]
"I’m the administrator," she says. "And you are?"`)},},],},],};export default oxygenChase