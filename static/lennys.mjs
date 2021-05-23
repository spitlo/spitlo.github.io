const help = () => {
  const instructions = `The following commands are available:
    LOOK:   'look at key'
    TAKE:   'take book'
    GO:     'go north'
    PLAY:   'play oxygen'
    USE:    'use door'
    TALK:   'talk to mary'
    ITEMS:  list items in the room
    INV:    list inventory items
    HELP:   this help menu
  `
  println(instructions)
}

const playGame = (gameSlug) => {
  const decrunch = document.getElementById('decrunch')
  decrunch.className = 'visible'
  setTimeout(() => {
    document.location.href = `/games/${gameSlug}/`
  }, 800)
}

const getShortName = (name) => (name || '').split(' ')[0].toLowerCase()

const getActionFigureSentence = () => {
  const sentences = [
    `"This 'Gorgobot' figure from 1972 is pretty neat, it has telescopic arms and an inflatable chest piece!"`,
    `"I have this Kaboozle Toys’ 'Discombobulon' figure from the desert death match scenes that was never actually released."`,
    `"Yeah, the 'Konglomatron 2000' is pretty priceless, but then again, I’d never sell it so who cares, right?"`,
    `"All of these babies are pretty much priceless, but my personal favorite is this 'Rash Man' figure, it’s a beaut!"`,
    `"Yeah," he starts, then looses the thread and trails off into an adjacent room. Moments later he’s back.`,
    `"If I had to pick one, I’d say this 'The French Tickler' figure is, ahem, 'le pièce de résistance' of my collection, as it were."`,
    `I’d say this 'Hoo-Boy' figure is pretty priceless. The box is mint, the detachable cape is intact and it has the original blue trunks. Plus, he’s a talker!`,
    `I have this full set of 'She-Horse' figures, the four original mane colors from 1969 and the chestnut one released in 1970.`,
  ]
  return pickOne(sentences)
}

const play = (gameId) => {
  let game = getItemInRoom(gameId, disk.roomId) || getItemInInventory(gameId)
  if (!game) {
    println(`You don’t seem to have that game handy.`)
  } else {
    game.onPlay()
    setTimeout(() => {
      playGame(game.slug)
    }, 4000)
  }
}

// Remove some unused commands
delete commands[0].save
delete commands[0].load

// Add some new commands
commands[0] = Object.assign(commands[0], { help })
commands[1] = Object.assign(commands[1], { play })

const lennys = {
  roomId: 'lennys',
  rooms: [
    {
      name: 'Lenny’s E-game Emporium',
      id: 'lennys',
      img: `      ⌠ ⌠  ╤╕ ╤╕ ╕ ╒’⌠   ⌠   ╒═  ╒═╕ ╤╕╒╕ ⌠
      │ ╞═ ││ ││ └┬┘ └┐  ╞╡═ │ ┐ ╞═╡ │└┘│ ╞═
      ╘═╘  ┘╧ ┘╧  ╧  ═╛  ╘═  ╘═╛ ┘ └ ┘  └ ╘══
 ███▄ ██  ▄██ ████   ███▄ ████▄ ██▀ █  ██ ██  ▄██
██▀   ██  ███ ▄   █ █▀ ▀█ █▀  █  █  █  █▀ ██  ███
███▄  ███ █ █ ████  █   █ ████   █  █  █  ███ ███▒
 ▒    ▒▀ ▒  █ █▒    █▒  █ ▒ █    ▒  █  ▒  ▒▀ █  █▒
████   █    █ █     ██  █ █  ██ ███ ▀███  █     █
 ▀████ █▄ ▄██ ██▄    ███  █  ██ ███  ███ ██   ▄██
 `,
      desc: `At Lenny’s, it’s like the Internet never happened. Here, games are physical commodities, sold in boxes, sorted by genre and placed on shelves in rooms with posters on the walls, guarded by life-sized promotional models of the heroes from ancient games like The Legend of Zumba or Brand Theft Auto.

To the **west** is the Ascii Arena, where Lenny keeps all his text-based games. To the **east** is the Pixel Paradise where graphical games are displayed. To the **south** is an exit.".

**Lenny** is here, carefully dusting a collection of action figures housed in a display **cabinet** to the left of the counter. To the right of the counter, there’s a big **crate**. The sign on it says "Discounted games`,
      exits: [
        { dir: ['west', 'Ascii Arena', 'Text Games'], id: 'text-games'},
        { dir: ['east', 'Pixel Paradise', 'Graphical Games'], id: 'graphical-games'},
        { dir: ['south', 'out', 'exit', 'home'], id: 'exit' },
      ],
      items: [
        {
          name: ['crate', 'discount crate', 'discounted games'],
          desc: 'Ths discount crate is empty at the moment.'
        },
        {
          name: ['cabinet', 'display cabinet', 'action figures'],
          desc: `You lean over and inspect the display cabinet. There are some real gems in there.
"No touchy-touchy," Lenny says and wags his finger. "Only looky-looky."`,
        },
      ],
    },
    {
      name: 'The Ascii Arena',
      id: 'text-games',
      desc: `There is a huge banner covering the entire west wall of the room. It reads:
"This is the Dungeon dungeon, the MUD swamp, the Infocom inferno, this is the domain of King Text, the seven bit wonder of the world, the web of the eight bit spider. This is Room 437. This is the Ascii Arena."

Theres a **note** pinned to the banner. The **shelves** are remarkably empty. An opening in the **east** wall leads back to the front room.`,
      exits: [
        { dir: ['east'], id: 'lennys' }
      ],
      onLook: () => {
        println('You’re standing in the Ascii Arena, as Lenny somewhat hyperbolically has christened this tiny room holding all his text-based adventure games.')
      },
      items: [
        {
          name: ['shelves', 'games'],
          desc: `There are a few games lining the shelves, but most of them have giant stickers saying "PRIVATE COLLECTION! NOT FOR SALE, RENT OR USE." The only available games are:
${window.games.map((game) => `- ${game.title} (**${getShortName(game.title)}**)`)}`,
          onLook: () => {
            // Only add games after user examines shelves (is this too much of a hassel maybe?)
            const room = getRoom('text-games')
            let newItems = window.games.filter((game) => game.extra && game.extra.room === 'text-games').map((game) => {
              const shortName = getShortName(game.title)
              return {
                name: [game.title],
                desc: `The back of the box reads:
                "${(game.description || '').toUpperCase()}"`,
                slug: game.slug,
                isTakeable: true,
                onPlay: () => println(`You find an old computer in the corner and fire it up. After a few minutes, you’re welcomed by a familiar screen. You insert the game disk, type "load ${shortName}" and press "enter".`),
                onTake: () => {
                  println(`You pick up ${game.title}. On the back of the box, you read:
"${(game.description || '').toUpperCase()}"

You put the game in your backpack.`)
                },
                onUse: () => println('This is a game. Surely, you’d much rather **play** it then use it?'),
                onLook: () => {
                  println(`According to the fact box, this game was created ${game.date} and written for the __${game.extra.engine}__ engine.`)
                },
              }
            })
            // Add a few more titles for fun
            newItems = newItems.concat(['Pancake Contingency, The', 'Palladium Snitch', 'Constipation, The'].map((game) => ({
              name: game,
              onTake: () => println('Apparently, this game is not for sale, nor for rent, nor for use.'),
            })))
            room.items = room.items.concat(newItems)
          },
        },
        {
          name: ['note', 'disclaimer'],
          desc: `The note reads:
DISCLAIMER!

These games are actually encoded in UTF-8, not ASCII. Sue me.

// LENNY`,
          onTake: () => println('Let’s assume Lenny put it there for a reason.')
        },
      ],
    },
    {
      name: 'The Pixel Paradise',
      id: 'graphical-games',
      desc: `This room is empty at the moment. Perhaps Lenny is pivoting toward text adventures?
A door to the **west** leads back to the main room.`,
      exits: [
        { dir: 'west', id: 'lennys' },
      ],
      items: window.games.filter((game) => game.extra && game.extra.room === 'graphical-games').map((game) => ({ name: [game.title] }))
    },
    {
      name: 'Leaving Lenny’s',
      id: 'exit',
      onEnter: () => {
        println(`"Bye, Lenny," you say. "I’ll see you another day."
Lenny looks up at you, surprised that you are still there. He gives you a vacant thumbs-up, then continues dusting.`)
        setTimeout(() => {
          // Start fading out text
          document.body.className = 'exiting'
          const frameElement = window.frameElement
          if (frameElement) {
            // Transition iframe to a dot in the middle of the screen. Then remove parent.
            // TODO: Use transitionend listener instead of timeouts
            setTimeout(() => {
              frameElement.className = 'closed'
              setTimeout(() => {
                frameElement.parentElement.remove()
              }, 1200)
            }, 1500)
          } else {
            // We are not in an iframe. Go to start page.
            setTimeout(() => {
              window.location.href = '/'
            }, 2000)
          }
        }, 4000)
      }
    },
  ],
  characters: [
    {
      name: ['Lenny'],
      roomId: 'lennys',
      desc: `Lenny doesn’t look anything at all like you’d picture a purveyor of retro games, action figures and role-playing paraphernalia. In fact, judging by his jawline alone, you’d have him pegged as a personal trainer for the elderly or a retired police officer. But his tight, sleeveless t-shirt says "I got the Babel Fish", and on his left wrist is a Casio C-80 calculator watch.
He’s busy dusting his collection of action figures.`,
      onTalk: () => {
        println(`You clear your throat loudly. Nothing happens. "Lenny," you say. Lenny starts whistling.
"Oh, mighty keeper of... the realm?" you submit. Lenny stops dusting momentarily and glances at you.
"I, your humble servant, eh, haveth... an inquisition?" You give up. "Hey, Lenny, stop dusting. I want to ask you something."
Lenny puts his feather duster in his belt fancily -- like a modern-day, domiciliary Zorro -- and steps over to you.`)
        const lenny = getCharacter('lenny')
        delete lenny.onTalk
      },
      topics: [
        {
          option: 'Compliment Lenny’s display **cabinet**',
          keyword: 'cabinet',
          removeOnRead: false,
          line: () => `${
            getCharacter('lenny').chatLog.includes('cabinet')
              ? '"Awesome collection! Any other favorites?"'
              : '"Wow, Lenny. That’s some hero collection you’ve got there," you say. Lenny looks up, self-assured. You continue, "Any priceless ones?"'
            }
"Well..." Lenny scratches his stubble. ${
  getActionFigureSentence()
}`,
        },
        ...window.games.map((game) => {
          const shortName = getShortName(game.title)
          return {
            option: `Ask Lenny about ${game.title} (**${shortName}**)`,
            keyword: shortName,
            removeOnRead: false,
            line: `"Hey, Lenny," you smile. "I’m looking for a title, '${game.title}'. Do you know it?"
Lenny sighs, than begrudingly limps away to the next room. When he returns, ha has a game box in his hand. He lets his reading glasses slide from his forehead down the length of his nose. Then, keeping the box at arms length, he reads from the back:
"${(game.description || '').toUpperCase()}"

"This game belongs in the ${game.extra.room === 'text-games' ? 'Ascii Arena' : 'Pixel Paradise'}, you can pick it up there," he says. He disappears again, and comes back empty-handed.`,
          }
        }),
      ]
    },
  ],
}

export default lennys
