// minified with jsmin

const TRAVEL_TIMES={hospital:21,doctor:18,redcross:13,}
const BEDROOM_DESCS={original:'You are sitting by your **dad**’s bedside. Transparent tubes wind across the bedsheet from the mask strapped to his face to an **oxygen tank** standing in a cart on wheels. Your **car** is parked outside.',leak:'You are standing in your **dad**’s bedroom. Your **car** is parked outside.',}
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
const car=getRoom('car')
const bedroom=car.exits.find((exit)=>exit.id==='bedroom')
if(!bedroom){car.exits.push({dir:['dad','dad’s','bedroom'],id:'bedroom',})}}
const getApproximateTimeLeft=(roundUp=false)=>roundUp?Math.ceil(disk.timer/10)*10:Math.floor(disk.timer/10)*10
const createLeak=()=>{decreaseTimer(10)
disk.leak=true
println('There is a **loose tube** here, and the oxygen tank is leaking.')
const bedroom=getRoom('bedroom')
bedroom.items.push({name:['loose tube','tubing'],desc:'You should really, really reconnect this tube to the tank.',isTakeable:true,onUse:()=>{decreaseTimer(10)
println('You scramble frantically to reconnect the tube to the tank, and after a few minutes the leaking stops.')
println(`Examining the gauge, you can see there is about ${getApproximateTimeLeft()} minutes of oxygen left in the tank.`)
disk.hasLeaked=true
disk.leak=false
bedroom.items=bedroom.items.filter((item)=>!item.name.includes('loose tubing'))
const carExit=getExit('car',bedroom.exits)
delete carExit.block},})
const carExit=getExit('car',bedroom.exits)
carExit.block='The oxygen tank is leaking and your father is dying from hypoxia. Is now really a good time to leave?'}
const chance=(value)=>value>=Math.random()
const decreaseTimer=(subtrahend)=>{disk.timer-=subtrahend}
const getName=(character,capitalize=true)=>{const char=getCharacter(character)
const namesLength=char.name.length
return namesLength===1?`${capitalize ? 'T' : 't'}he ${char.name[0]}`:char.name[namesLength-1]}
const checkOnDad=()=>{let breathing
let extra=''
let breathingClass='breathing-normal'
if(disk.leak||disk.timer<10){breathing='hindered'
extra=' His face is turning blue as he tries to remove the face mask.'
breathingClass='breathing-hindered'}else if(disk.timer>100){breathing='normal'}else if(disk.timer<101&&disk.timer>60){breathing='hurried'
breathingClass='breathing-hurried'}else if(disk.timer>30){breathing=pickOne(['heavy','fast'])
extra=' His lips and fingers are faintly blue.'
breathingClass='breathing-fast'}else{breathing='rapid and shallow'
extra=' His entire skin has a blue tint. His looks slightly panicked.'
breathingClass='breathing-rapid'}
println(`His breathing seems ${breathing}.${extra || ''}`,breathingClass)
if(disk.leak){println('You really, really should try to reconnect the tube to the tank.')}else{if(chance(1/4)){println(`There’s only ${getApproximateTimeLeft()} minutes of oxygen left in your father’s tank. Perhaps you should just sit with him and talk?`)}else if(chance(1/5)){const whiteLie=getApproximateTimeLeft(true)
println('"How much oxygen do we have left?", your dad asks.')
println(`"About ${whiteLie} minutes worth, dad. Maybe a bit more," you answer. But you know it’s less.`)}}}
const getEmotionAdverb=()=>{let emotion
if(disk.timer>100){emotion=' '}else if(disk.timer<101&&disk.timer>80){emotion=` ${pickOne(['restlessly', 'nervously'])} `}else if(disk.timer>60){emotion=` ${pickOne(['worriedly', 'uneasily'])} `}else if(disk.timer>40){emotion=` ${pickOne(['timorously', 'apprehensively'])} `}else if(disk.timer>20){emotion=` ${pickOne(['disheartenedly', 'anxiously'])} `}else{emotion=' despondently '}
return emotion}
const oxygenChase={roomId:'bedroom',timer:120,gps:false,leak:false,hasLeaked:false,leavingRoom:'',inventory:[],rooms:[{id:'bedroom',img:`
   ░░ ░  ░ ░ ░  ░░  ░░░ ░  ░
  ░  ░ ░░  ░░░ ░    ░   ░░ ░
  ▒  ▒ ▒▒  ▒▒▒ ▒ ▒▒ ▒▒  ▒ ▒▒
   ▓▓ ▓  ▓  ▓   ▓▓  ▓▓▓ ▓  ▓
      ╓─┐ ╥ ╥ ╓─╥ ╓─┐ ╓─┐
      ║   ╟─╢ ╟─╢ ╚═╗ ╠═
      ╙─┘ ╙ ╙ ╙ ╙ └─╜ ╙─┘`,name:'Your father’s bedroom',desc:`${BEDROOM_DESCS.original} Your **car keys** and **phone** are on the bedside table.`,onEnter:()=>{const bedroom=getRoom('bedroom')
bedroom.img=''
if(TRAVEL_TIMES.hasOwnProperty(disk.leavingRoom)){decreaseTimer(TRAVEL_TIMES[disk.leavingRoom])
disk.leavingRoom=''}
if(bedroom.visits>1){if(!disk.hasLeaked){if(chance(2/3)){println(`You hurry back into your dad’s bedroom. Taking the last step toward the bed, you tangle your foot in the loops of the tube, and before you’re able to stop yourself, you tear the tube from the tank.
Your heart sinks as precious oxygen starts leaking out into the room.`)
createLeak()}else{println(`You hurry back into your dad’s bedroom and sit back down beside him.`)
checkOnDad()}}else{println(`You’re glad to be back, even though you haven’t got any good news. You look${getEmotionAdverb()}at your dad.`)
checkOnDad()}}},onLook:()=>{const bedroom=getRoom('bedroom')
bedroom.desc=''
if(disk.leak){decreaseTimer(10)
println(BEDROOM_DESCS.leak)}else{decreaseTimer(1)
println(BEDROOM_DESCS.original)}
const phone=bedroom.items.find((item)=>item.name==='phone')
const keys=bedroom.items.find((item)=>item.name==='car keys')
if(phone&&keys){println('Your **car keys** and **phone** are on the bedside table. ')}else if(phone){println('Your **phone** is on the bedside table. ')}else if(keys){println('Your **car keys** are on the bedside table. ')}
if(disk.leak){println('There is a **loose tube** here, and the oxygen tank is leaking.')}
println(`You${getEmotionAdverb()}look at your dad.`)
checkOnDad()},items:[{name:['oxygen tank','gauge'],desc:'It’s a big oxygen tank, strapped to a cart.',onLook:()=>println(`You${getEmotionAdverb()}check the gauge on the tank. There seems to be about ${getApproximateTimeLeft()} minutes of oxygen left.`),},{name:'phone',desc:'Who could you call?',isTakeable:true,onUse:()=>{println('You scroll through all your contacts, but you can’t think of a single one who could help you. You put the phone in your pocket.')
decreaseTimer(5)},},{name:'car keys',desc:'Perhaps there is somewhere you can go?',isTakeable:true,onUse:()=>{println('There’s nothing here to use them on. Perhaps you should **take** them?')},onTake:()=>{println('You reach over to grab your car keys. As you lean over the bed, you press down on the tubing.')
if(chance(1/2)){println('It pulls hard on the tank, and suddenly snaps loose. At first, you think you broke it, but it is only disconnected from the tank. Precious oxygen leaks out into the room.')
createLeak()}else{decreaseTimer(1)
println('The tubing pulls hard on the tank. The cart creeks and moves a bit closer, but the tubing stays connected. You remember to be more careful in the future.')
const bedroom=getRoom('bedroom')
const carExit=getExit('car',bedroom.exits)
delete carExit.block}},},],exits:[{dir:['car','outside'],id:'car',block:'You need to bring your car keys.',},],},{id:'car',name:'In the car',desc:'You’re in your car. There’s a **GPS** here.',onLook:()=>{if(disk.gps){println('You check the GPS.')
printGPS()}},items:[{name:['gps','satnav','map'],onUse:()=>{if(disk.gps){printGPS()}else{println('The GPS boots up. The animation seemingly repeats forever, but eventually you’re presented with the welcome screen.')
decreaseTimer(2)
printGPS()
disk.gps=true
const car=getRoom('car')
car.desc='Where do you want to go?'
println(car.desc)
const hospital=getExit('downtown',car.exits)
delete hospital.block
const doctor=getExit('midtown',car.exits)
delete doctor.block
const redcross=getExit('uptown',car.exits)
delete redcross.block}},},],exits:[{dir:['dad','dad’s','bedroom'],id:'bedroom',},{dir:['downtown','hospital'],id:'hospital',block:'You won’t be able to find your way to the hospital without the **GPS**.',},{dir:['midtown','doctor'],id:'doctor',block:'There’s no way you’ll get to the doctor’s office without the **GPS**.',},{dir:['uptown','redcross'],id:'redcross',block:'You haven’t got a clue where the Red Cross is located. Perhaps you should use the **GPS**?',},],},{id:'hospital',name:'At the hospital',desc:`You’re standing in the lobby of the town’s hospital. Plastic plants adorn the corners of an otherwise drab room. Dashed yellow lines on the floor taper off and disappear, mostly, behind closed doors.

A **receptionist** sits behind a huge, beige desk.`,exits:[{dir:['car','outside'],id:'car',}],onEnter:()=>{enterLocation('hospital')},},{id:'doctor',name:'At the doctor’s office',desc:'',exits:[{dir:['car','outside'],id:'car',}],onEnter:()=>{enterLocation('doctor')},},{id:'redcross',name:'At the Red Cross',desc:'',exits:[{dir:['car','outside'],id:'car',}],onEnter:()=>{enterLocation('redcross')},},],characters:[{name:['father','dad'],roomId:'bedroom',desc:'You look at your father with affection. He smiles back at you.',onLook:()=>{checkOnDad()},topics:[{option:'That **covid**, huh?',line:'',keyword:'covid',removeOnRead:true,onSelected:()=>{decreaseTimer(5)},},{option:'Look, dad. I spoke to **mother**.',line:'',keyword:'mother',removeOnRead:true,onSelected:()=>{decreaseTimer(10)},},{option:'**How** are you feeling, dad?',line:'',keyword:'how',removeOnRead:false,onSelected:()=>{decreaseTimer(1)
checkOnDad()},},],},{name:['receptionist'],roomId:'hospital',desc:'The receptionist appears to be in his twenties, but looks almost boyish behind the oversized desk. He’s staring at his phone. A name tag on his chest reads "**André**".',onLook:()=>{getCharacter('receptionist').name.push('André')},topics:[{option:'Ask for **oxygen**',keyword:'oxygen',removeOnRead:true,line:()=>`"Hi. I need an oxygen tank," you say. "I’ll pay for it, if that’s what you need. No questions asked."

${getName('receptionist')} looks up at you. "Does this look like a dive shop?" he snarks.

You’re not off to a good start. It’s apparent you’ll need to try a different approach.`,onSelected:()=>decreaseTimer(1),},{option:'**Ask** to speak to an administrator',keyword:'ask',prereqs:['oxygen'],removeOnRead:true,line:()=>`"Can I please speak to an administrator?" you ask sternly.
${getName('receptionist')} shuffles a few papers, restarts a lucky cat whose arm is slowing down somewhat, and picks up his phone again.
"The administrator is busy," he mumbles.`,onSelected:()=>decreaseTimer(2),},{option:'**Insist** on speaking to an administrator',keyword:'insist',prereqs:['oxygen'],removeOnRead:true,line:()=>`"Put down your phone and look at me," you say in your most decisive tone. "I insist, I __really__ need to speak to an administrator."
${getName('receptionist')} ignores you completely at first, but after a few seconds he looks up. "Well, I __really__ need to get back to work," he says, smiling vacantly.`,onSelected:()=>decreaseTimer(2),},{option:'**Beg** to speak to an administrator',keyword:'beg',prereqs:['oxygen'],removeOnRead:true,line:()=>`"Listen. I really need to see an administrator. I need oxygen, badly."
"My father barely has any left in his tank."
Then you add, "He is dying."

${getName('receptionist')} shakes his head faux-emphatically. "Aren’t we all?" he sighs.`,onSelected:()=>decreaseTimer(1),},{option:'**Demand** to speak to a god damned administrator',keyword:'demand',prereqs:['ask','insist','beg'],removeOnRead:true,line:()=>`You bang your fist on the desk. "Call up a god damned administrator," you cry out. "I’m not asking!"

${getName('receptionist')} looks up again, unamused. Slowly, he slides the desk phone closer and begins to dial a number, laboriously moving his finger from key to key and pausing between digits. "There," he says after an eternity. Then, into the mouthpiece, "This is André in the reception. Can you come down? Uh-mmm, yeah." He looks back at you and continues, "Your wish is my command."`,onSelected:()=>{endConversation()
decreaseTimer(6)
println(`After a few minutes, an elevator dings as the doors slide up.
A woman in her late fifties or early sixties glides out of the elevator and walks up to you. She leans against the desk.
"I’m the administrator," she says. "I am a __very__ busy woman."`)
disk.characters.push({name:['administrator'],roomId:'hospital',desc:'The hospital administrator is a (very busy) woman with ash-blond hair and an uninviting smile. She, too, has a name tag. It reads "**Catrine**".',onLook:()=>{getCharacter('administrator').name.push('Catrine')},topics:[{option:'**Introduce** yourself',keyword:'introduce',removeOnRead:true,line:()=>`"${
                      getCharacter('administrator').chatLog.includes('oxygen')
                        ? 'Sorry. '
                        : ''
                      }Hi. My name is..." you start. "Actually, my name is not important, I’m not a patient here, but... ${
                      getCharacter('administrator').chatLog.includes('oxygen')
                        ? ''
                        : `Listen,my father has covid,his breathing is really bad and he only has about ${getApproximateTimeLeft()}minutes worth of oxygen left in his tank.`
                      }I need a new tank, badly. Can you help me?"

${getName('administrator')} eyes you up and down. "Look, I don’t know what Andrè told you, but we don’t just give away stuff to people."`,onSelected:()=>decreaseTimer(2),},{option:'Ask for **oxygen**',keyword:'oxygen',removeOnRead:true,line:()=>`${
                      getCharacter('administrator').chatLog.includes('introduce')
                        ? ''
                        : '"As I told, um, André here," you say, glancing at the receptionist’s name tag, '
                      }"I’m in dire need of oxygen. My father has precious little left in his tank. Like ${getApproximateTimeLeft()} minutes.
Please, can you help me?"

${getName('administrator')} looks at you sullenly. "I’m not in the business of vendoring oxygen. I’m in the business of running a hospital."`,onSelected:()=>decreaseTimer(2),},{option:'**Negotiate**',keyword:'negotiate',removeOnRead:true,prereqs:['introduce','oxygen'],line:()=>`You take a deep breath. "Is there __anything__ I can do to persuade you? Anything?"
"Frankly? No," ${getName('administrator', false)} sighs. "I want to help you, but we’re running out of oxygen ourselves. This whole situation is... Well, it’s fucked up if you pardon my french."`,onSelected:()=>decreaseTimer(2),},{option:'**Fold**',keyword:'fold',removeOnRead:true,prereqs:['negotiate'],line:()=>{const doctor=getRoom('doctor')
const redcross=getRoom('redcross')
let line=`You glance at your watch. It’s time to give up.`
if(doctor.visits===0){line=`${line} You still haven’t tried the doctor’s office.`}
if(doctor.visits===0&&redcross.visits===0){line=`${line} Or the Red Cross.`}else if(redcross.visits===0){line=`${line} You still haven’t tried the Red Cross.`}else{line=`${line} You should probably get back to your father and spend the last few minutes with him.`}
println(line)},onSelected:()=>{decreaseTimer(2)
endConversation()},},],},)},},],},],};export default oxygenChase