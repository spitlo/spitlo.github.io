//  ------//
//     ____                                 ________
//    / __ \_  ____  ______ ____  ____     / ____/ /_  ____ _________
//   / / / / |/_/ / / / __ `/ _ \/ __ \   / /   / __ \/ __ `/ ___/ _ \
//  / /_/ />  </ /_/ / /_/ /  __/ / / /  / /___/ / / / /_/ (__  )  __/
//  \____/_/|_|\__, /\__, /\___/_/ /_/   \____/_/ /_/\__,_/____/\___/
//            /____//____/
//  -----0-x-y-g-3-n---C-h-4-s-3---- ------------------ ---  ---------- --
// This is a small (work-in-progress) game inspired by an interview I heard on the radio.
// A brasilian woman spoke about the anguish she felt as she drove around town looking for
// oxygen, knowing her father only had two hours worth of oxygen left in his tank.

const TRAVEL_TIMES = {
  hostpital: 21,
  doctor: 18,
  redcross: 13,
}
const BEDROOM_DESCS = {
  original: 'You are sitting by your father’s bedside. Transparent tubing runs across the bedsheet from the mask strapped to his face to an **oxygen tank** standing in a cart with wheels. Your car is parked **outside**.',
  leak: 'You are standing in your father’s bedroom. Your car is parked **outside**.',
}

const printGPS = () => {
  const timeToDad = TRAVEL_TIMES[disk.leavingRoom]
  println('There are a few saved locations that seems interesting:')
  if (disk.leavingRoom !== 'downtown') {
    println(`**Downtown** to the Hospital. The drive there is ${TRAVEL_TIMES.hostpital + (timeToDad / 2)} minutes.`)
  }
  if (disk.leavingRoom !== 'midtown') {
    println(`**Midtown** to a doctor’s office. The drive there is ${TRAVEL_TIMES.doctor + (timeToDad / 2)} minutes.`)
  }
  if (disk.leavingRoom !== 'uptown') {
    println(`**Uptown** to the Red Cross. The drive there is ${TRAVEL_TIMES.redcross + (timeToDad / 2)} minutes.`)
  }
  if (disk.leavingRoom) {
    println(`**Dad** The drive back there is ${timeToDad} minutes.`)
  }
}

const chance = (seed) => seed >= Math.random()

const decreaseTimer = (subtrahend) => {
  disk.timer -= subtrahend
}

const checkOnDad = (timer) => {
  if (chance(1/4)) {
    println(`You only have ${timer} minutes to save your father. Perhaps you should just stay with him and talk?`)
  } else if (chance(1/5)) {
    const whiteLie = Math.ceil(timer / 10) * 10
    println('"How much oxygen do we have left?", your dad asks.')
    println(`"About ${whiteLie} minutes worth, dad. Maybe a bit more," you answer. But you know it’s less.`)
  }
}

const getEmotion = (timer) => {
  /**
   * Returns an emotion based on the timer.
   * TODO: Are the different words in the correct position on the scale?
   */
  let emotion
  if (timer > 100) {
    emotion = ' '
  } else if (timer < 101 && timer > 80) {
    emotion = ` ${pickOne(['restlessly', 'nervously'])} `
  } else if (timer > 60) {
    emotion = ` ${pickOne(['worriedly', 'uneasily'])} `
  } else if (timer > 40) {
    emotion = ` ${pickOne(['timorously', 'apprehensively'])} `
  } else if (timer > 20) {
    emotion = ` ${pickOne(['disheartenedly', 'anxiously'])} `
  } else {
    emotion = ' despondently '
  }
  return emotion
}

const oxygenChase = {
  roomId: 'bedroom',
  timer: 120,
  gps: false,
  leak: false,
  hasLeaked: false,
  leavingRoom: '',
  inventory: [

  ],
  rooms: [
    {
      id: 'bedroom',
      name: 'Your father’s bedroom',
      desc: `${BEDROOM_DESCS.original} Your **car keys** and **phone** are on the bedside table.`,
      onEnter: () => {
        // When we come back to the bedroom, we need to add the travel time from the
        // location we left to here to the timer.
        if (TRAVEL_TIMES.hasOwnProperty(disk.leavingRoom)) {
          decreaseTimer(TRAVEL_TIMES[disk.leavingRoom])
          disk.leavingRoom = ''
        }
      },
      onLook: () => {
        const bedroom = getRoom('bedroom')
        bedroom.desc = ''

        if (disk.leak) {
          decreaseTimer(10)
          println(BEDROOM_DESCS.leak)
        } else {
          decreaseTimer(1)
          println(BEDROOM_DESCS.original)
        }

        const phone = bedroom.items.filter((item) => item.name === 'phone').length > 0
        const keys = bedroom.items.filter((item) => item.name === 'car keys').length > 0
        if (phone && keys) {
          println('Your **car keys** and **phone** are on the bedside table. ')
        } else if (phone) {
          println('Your **phone** is on the bedside table. ')
        } else if (keys) {
          println('Your **car keys** are on the bedside table. ')
        }

        if (disk.leak) {
          println('There is a **loose tube** here, and the oxygen tank is leaking.')
        } else {
          checkOnDad(disk.timer)
        }
      },
      items: [
        {
          name: ['oxygen tank', 'gauge'],
          desc: 'It’s a big oxygen tank, strapped to a cart.',
          onLook: () => println(`You${getEmotion(disk.timer)}check the gauge on the tank. There seems to be about ${disk.timer} minutes of oxygen left.`),
        },
        {
          name: 'phone',
          desc: 'Perhaps there is someone you can call?',
          isTakeable: true,
          onUse: () => {
            console.log('Using phone')
          },
        },
        {
          name: 'car keys',
          desc: 'Perhaps there is somewhere you can go?',
          isTakeable: true,
          onTake: () => {
            println('You reach over to grab your car keys. As you lean over the bed, you press down on the tubing.')
            if (chance(1/2)) {
              decreaseTimer(10)
              disk.leak = true
              println('The tubing pulls hard on the tank, and suddenly snaps loose. At first, you think you broke it, but it is only disconnected from the tank. You scramble frantically to reconnect it as the precious oxygen leaks out into the room.')
              const bedroom = getRoom('bedroom')
              bedroom.items.push({
                name: ['loose tube', 'tubing'],
                desc: 'You should really, really reconnect this tube to the tank.',
                isTakeable: true,
                onUse: () => {
                  decreaseTimer(10)
                  println('You struggle with it, but after a few minutes you are able to reconnect the tube to the tank.')
                  println(`Examining the gauge, you can see there is about ${disk.timer} minutes of oxygen left in the tank.`)
                  disk.hasLeaked = true
                  disk.leak = false
                  bedroom.items = bedroom.items.filter((item) => !item.name.includes('loose tubing'))
                },
              })
            } else {
              decreaseTimer(1)
              println('The tubing pulls hard on the tank. The cart creeks and moves a bit closer, but the tubing stays connected. You remember to be more careful in the future.')
            }
            // Unblock car
            const room = getRoom(disk.roomId)
            const car = getExit('outside', room.exits)
            delete car.block
          },
        },
      ],
      exits: [
        {
          dir: ['outside', 'car'],
          id: 'car',
          block: 'You need to bring your car keys.',
        },
      ],
    },
    {
      id: 'car',
      name: 'In the car',
      desc: 'You’re in your car. There’s a GPS here.',
      onEnter: () => {
        if (disk.leak) {
          // All of the oxygen left in the tank will leak out. Father dies.
          println('You use the GPS to locate a hospital.')
        }
      },
      onLook: () => {
        if (disk.gps) {
          printGPS()
        }
      },
      items: [
        {
          name: ['gps', 'satnav', 'map'],
          onUse: () => {
            if (disk.gps) {
              printGPS()
            } else {
              println('The GPS boots up. The animation seemingly repeats forever, but eventually you’re presented with the welcome screen. Where do you want to go?')
              disk.gps = true
              decreaseTimer(2)
              const car = getRoom('car')
              const hospital = getExit('downtown', car.exits)
              delete hospital.block
              const doctor = getExit('midtown', car.exits)
              delete doctor.block
              const redcross = getExit('uptown', car.exits)
              delete redcross.block
              car.desc = 'Where do you want to go?'
            }
          },
        },
      ],
      exits: [
        {
          dir: ['downtown', 'hospital'],
          id: 'hospital',
          block: 'You won’t be able to find your way to the hospital without the GPS.',
        },
        {
          dir: ['midtown', 'doctor'],
          id: 'doctor',
          block: 'There’s no way you’ll get to the doctor’s office without the GPS.',
        },
        {
          dir: ['uptown', 'redcross'],
          id: 'redcross',
          block: 'You haven’t got a clue where the Red Cross is located. Perhaps you should use the GPS?',
        },
      ],
    },
    {
      id: 'hospital',
      name: 'At the hospital',
      desc: '',
      exits: [{
        dir: ['car', 'outside'],
        id: 'car',
      }],
      onEnter: () => {
        let extraTime = 0
        if (disk.leavingRoom) {
          // We came from somewhere other than father’s, add some extra time
          extraTime = TRAVEL_TIMES[disk.leavingRoom] / 2
        }
        decreaseTimer(TRAVEL_TIMES.hospital + extraTime)
        disk.leavingRoom = 'hospital'
      },
    },
    {
      id: 'doctor',
      name: 'At the doctor’s office',
      desc: '',
      exits: [{
        dir: ['car', 'outside'],
        id: 'car',
      }],
      onEnter: () => {
        let extraTime = 0
        if (disk.leavingRoom) {
          extraTime = TRAVEL_TIMES[disk.leavingRoom] / 2
        }
        decreaseTimer(TRAVEL_TIMES.doctor + extraTime)
        disk.leavingRoom = 'doctor'
      },
    },
    {
      id: 'redcross',
      name: 'At the Red Cross',
      desc: '',
      exits: [{
        dir: ['car', 'outside'],
        id: 'car',
      }],
      onEnter: () => {
        let extraTime = 0
        if (disk.leavingRoom) {
          extraTime = TRAVEL_TIMES[disk.leavingRoom] / 2
        }
        decreaseTimer(TRAVEL_TIMES.redcross + extraTime)
        disk.leavingRoom = 'redcross'
      },
    },
  ],
  characters: [
    {
      name: ['father', 'dad'],
      roomId: 'bedroom',
      desc: 'You look at your father with affection. He smiles back at you.',
      onLook: () => {
        /**
         * Covid patients appearently do not struggle with breathing, but they might
         * breath faster (and faster?) due to lack of oxygen in the blood. This is
         * called silent (or happy) hypoxia.
         */
        let breathing
        let extra = ''
        console.log('Timer', disk.timer)
        if (disk.timer > 100) {
          breathing = 'normal'
        } else if (disk.timer < 101 && disk.timer > 60) {
          breathing = 'hurried'
        } else if (disk.timer > 30) {
          breathing = pickOne(['heavy', 'fast'])
          extra = ' His lips and fingers are faintly blue.'
        } else {
          breathing = 'rapid and shallow'
          extra = ' His entire skin has a blue tint. His looks slightly panicked.'
        }
        println(`His breathing seems ${breathing}.${extra || ''}`)
        checkOnDad(disk.timer)
      },
      topics: [
        {
          option: '**Covid**',
          line: '',
          keyword: 'covid',
          removeOnRead: true,
          onSelected: () => {
            decreaseTimer(5)
          },
        },
        {
          option: '**Mother**',
          line: '',
          keyword: 'mother',
          removeOnRead: true,
          onSelected: () => {
            decreaseTimer(10)
          },
        },
      ],
    },
  ],
};

export default oxygenChase
