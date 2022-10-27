import { deleteCookie, dotmatrix, getCookie, nms, setCookie } from './utils.mjs';

const $bottom = document.getElementById('bottom')
const $commandLine = document.getElementById('commandLine')
const $commandLineHint = document.getElementById('commandLineHints')
const $help = document.getElementById('help')
const $html = document.getElementsByTagName('html')[0]
const $main = document.getElementsByTagName('main')[0]
const $player = document.getElementById('player')
const $questionMark = document.getElementById('questionMark')
const $scrambled = document.getElementsByClassName('scrambled')
const $searchInput = document.getElementById('search')
const $top = document.getElementById('top')

let songIndex = 0
let commandLineActive = false
let confirmKeys = null
let command = ''
let commandHint = ''
const commands = {
  help: () => {
    const helpMessage =
`
<code>top</code> Go to top of page<br>
<code>dotmatrix</code> Render page in a dot matrix friendly way<br>
<code>notmatrix</code> Undo the above command<br>
<code>play</code> Play any linked music<br>
<code>pause</code> Pause player<br>
<code>prev</code>/<code>next</code> Previous/next song in playlist<br>
<code>games</code> Show the games "menu"<br>
<code>ajour (beta)</code> Open my feed reader in an iframe<br>
<code>dark</code>/<code>light</code> Change theme with option to save choice in a cookie<br>
<code>help</code> Show this message<br>
Commands are tab completable. Type <code>:</code> to try a command.
`
    showCommandLineAlert('Available commands', helpMessage)
  },

  top: () => {
    $top.scrollIntoView()
  },

  dotmatrix: () => {
    // Show a stripped down version of page, suitable
    // for printing or just nerding out.
    dotmatrix()
    showCommandLineConfirm(
      'Set a cookie?',
      'Do you want to set a cookie to remember this?',
      () => setCookie('theme', 'dotmatrix', 365),
      () => deleteCookie('theme'),
      'Concur.',
      'Oppose.'
    )
  },

  notmatrix: () => {
    document.body.classList.remove('dotmatrix')
    const theme = getCookie('theme')
    console.log(theme)
    if (theme === 'dotmatrix') {
      console.log('Removing theme cookie')
      deleteCookie('theme')
    }
    const toc = document.getElementsByTagName('details')[0]
    if (toc) {
      toc.removeAttribute('open')
    }
  },

  play: () => {
    if ($player) {
      if ($player.src && $player.paused) {
        $player.play()
      } else {
        const songs = document.querySelectorAll('a[href$="mp3"]')
        if (songs && songs.length > 0) {
          // $player.className = 'visible'
          $player.src = songs[songIndex]
          $player.addEventListener('ended', commands.next, false)
        } else {
          showCommandLineAlert('Sorry, no audio found', 'I couldn’t find any audio files to play on this page.', true)
        }
      }
    } else {
      showCommandLineAlert('No audio player', 'Sorry, your web browser doesn’t seem to support audio.', true)
    }
  },

  pause: () => {
    if ($player) {
      $player.pause()
    }
  },

  _stop: () => {
    if ($player) {
      // This does not work
      $player.src = ''
      songIndex = 0
    }
  },

  prev: () => {
    const songs = document.querySelectorAll('a[href$="mp3"]')
    if (songs && songs.length > 0) {
      songIndex = (songIndex === 0) ? songs.length - 1 : songIndex - 1
      $player.src = songs[songIndex]
    }
  },

  next: () => {
    const songs = document.querySelectorAll('a[href$="mp3"]')
    if (songs && songs.length > 0) {
      songIndex = (songIndex === songs.length - 1) ? 0 : songIndex + 1
      $player.src = songs[songIndex]
    }
  },

  nomoresecrets: () => {
    for (let x = 0; x < $scrambled.length; x++) {
      const $element = $scrambled[x]
      if (nms) {
        $bottom.scrollIntoView()
        const s = $element.classList.contains('email') ? 'aGlAc3BpdGxvLmNvbQ==' : 'OVlKQzlWREU='
        nms($element, s)
      }
    }
  },

  games: () => {
    const gameWrapper = document.createElement('div')
    gameWrapper.id = 'gameWrapper'
    const gameFrame = document.createElement('iframe')
    gameFrame.setAttribute('src', '/games/')
    document.body.appendChild(gameWrapper)
    gameWrapper.appendChild(gameFrame)

    gameWrapper.addEventListener('click', () => {
      if (confirm('Are you sure? Have you saved?')) {
        // document.body.removeChild()
        gameWrapper.remove()
      }
    })
  },

  ajour: () => {
    const ajourFrame = document.createElement('iframe')
    ajourFrame.setAttribute('src', 'https://spitlo.com/ajour/')
    ajourFrame.id = 'ajour'
    $main.appendChild(ajourFrame)
    $top.scrollIntoView()
  },

  light: () => {
    if ($html.classList.contains('dark')) {
      $html.classList.remove('dark')
    }
    $html.classList.add('light')
    showCommandLineConfirm(
      'Set a cookie?',
      'Do you want to set a cookie to remember this?',
      () => setCookie('theme', 'light', 365),
      () => deleteCookie('theme'),
      'Yes, please!',
      'I’d rather not'
    )
  },

  dark: () => {
    if ($html.classList.contains('light')) {
      $html.classList.remove('light')
    }
    $html.classList.add('dark')
    showCommandLineConfirm(
      'Set a cookie?',
      'Do you want to set a cookie to remember this?',
      () => setCookie('theme', 'dark', 365),
      () => deleteCookie('theme'),
      'Sure, shoot!',
      'Hell, no!'
    )
  },
}

const navigation = {
  'H': '/',
  'C': '/code/',
  'M': '/music/',
  'T': '/tags/',
}

const pressed = {
  'ctrlKey': false,
}

function findPartialMatch(stack, needle) {
  if (needle.substring(0, 1) === '_') {
    return
  }
  // Find elements in array "stack" that starts with letter(s) "needle"
  const matches = stack.filter(value => {
    if (value) {
      return value.substring(0, needle.length) === needle
    }
  })
  if (matches) {
    return matches[0]
  }
}

function showCommandLineAlert(title, message, isError) {
  $commandLineHint.className = 'alertMode'
  if (isError) {
    $commandLineHint.classList.add('error')
    message = `${message}<br>Type <code>:</code> to try another command.`
  } else {
    $commandLineHint.classList.add('help')
  }
  $commandLineHint.innerHTML = `<strong>${title}</strong><div>${message}</div>`
}

function showCommandLineConfirm(
  title, message,
  confirmCallback, declineCallback,
  confirmText = 'Yes, please', declineText = 'No, thanks'
) {
  confirmKeys = {
    confirm: {
      key: confirmText[0],
      fn: confirmCallback
    },
    decline: {
      key: declineText[0],
      fn: declineCallback,
    },
  }
  $commandLineHint.className = 'alertMode'
  $commandLineHint.classList.add('confirm')
  $commandLineHint.innerHTML = `<strong>${title}</strong><div>${message}</div>`
  const $confirmButton = document.createElement('button')
  $confirmButton.innerHTML = `<u>${confirmText[0]}</u>${confirmText.substring(1)}`
  $confirmButton.onclick = () => {
    deactivateCommandMode()
    confirmCallback && confirmCallback()
  }
  $confirmButton.className = 'confirm'
  const $declineButton = document.createElement('button')
  $declineButton.innerHTML = `<u>${declineText[0]}</u>${declineText.substring(1)}`
  $declineButton.onclick = () => {
    deactivateCommandMode()
    declineCallback && declineCallback()
  }
  $declineButton.className = 'decline'
  const $buttonWrapper = document.createElement('div')
  $buttonWrapper.appendChild($declineButton)
  $buttonWrapper.appendChild($confirmButton)
  $commandLineHint.appendChild($buttonWrapper)
}

function updateCommandLineHint(content) {
  $commandLineHint.innerHTML = `<span>${content || commandHint}</span>`
}

function updateCommandLineText(content) {
  $commandLine.innerHTML = `<span>${content || command}</span>`
  if (command) {
    const commandNames = Object.keys(commands)
    // Don’t sort for now, perhaps we want to be able to control the priority
    // of hints (earlier in the commands object = more likely hint)
    // commandNames.sort()
    const partialMatch = findPartialMatch(commandNames, command)
    if (partialMatch) {
      commandHint = partialMatch
    } else {
      commandHint = ''
    }
    updateCommandLineHint()
  }
}

function activateCommandMode() {
  updateCommandLineText()
  updateCommandLineHint()
  commandLineActive = true
  $commandLine.className = 'visible'
  $commandLineHint.className = 'visible'
}

function deactivateCommandMode() {
  commandLineActive = false
  $commandLine.className = $commandLineHint.className = ''
  command = commandHint = ''
  confirmKeys = null
}

function evaluateCommand(command) {
  if (commands[command]) {
    commands[command]()
  } else {
    showCommandLineAlert('Sorry, that’s not something I understand', 'Try using the tab completion to enter commands correctly or type <code>help</code> to view a list of valid commands.', true)
  }
}

document.onkeydown = event => {
  // Are we in command mode?
  if (commandLineActive) {
    if (event.key === 'Escape') {
      deactivateCommandMode()
      return
    }

    if (event.key === 'Enter') {
      if (command) {
        const nextCommand = command
        deactivateCommandMode()
        evaluateCommand(nextCommand)
      } else {
        // deactivateCommandMode()
      }

      return
    }

    if (event.key === 'Backspace') {
      command = command.slice(0, -1)
      updateCommandLineText()
    }

    if (event.key === 'Tab') {
      event.preventDefault()
      if (commandHint) {
        command = commandHint
        updateCommandLineText()
      }
    }

    if (/^[A-Za-z0-9_]$/.test(event.key)) {
      command = command + event.key
      updateCommandLineText()
    }

    if (command === '') {
      commandHint = ''
      updateCommandLineHint()
    }

    return
  }

  // Let user interact with confirm dialog by keyboard
  if (confirmKeys && event.key.toLowerCase() === confirmKeys.confirm.key.toLowerCase()) {
    confirmKeys.confirm.fn && confirmKeys.confirm.fn()
    deactivateCommandMode()
  }
  if (confirmKeys && event.key.toLowerCase() === confirmKeys.decline.key.toLowerCase()) {
    confirmKeys.decline.fn && confirmKeys.decline.fn()
    deactivateCommandMode()
  }

  // Advanced shortcuts
  if (event.ctrlKey) {
    pressed.ctrlKey = true
    document.body.classList.add('showLinkNumbers')
  }

  // Simple shortcuts
  switch (event.key) {
    case '/':
      event.preventDefault()
      if ($searchInput) {
        $searchInput.focus()
      }
      break

    case 'H':
    case 'C':
    case 'M':
    case 'T':
      event.preventDefault()
      location.href = navigation[event.key]
      break

    case '1':
    case '2':
    case '3':
    case '4':
    case '5':
    case '6':
    case '7':
    case '8':
    case '9':
      if (event.ctrlKey) {
        const links = document.getElementsByClassName('numberedLink')
        const linkIndex = parseInt(event.key) - 1
        const link = links[linkIndex]
        if (link && link.href) {
          location.href = link.href
        }
      }
      break

    case '?':
      $help.className = 'visible'
      break

    case ':':
      event.preventDefault()
      activateCommandMode()
      break

    case 'Escape':
      $help.className = ''
      break

    case '<':
      const prevLink = document.querySelector('a[rel=prev]')
      if (prevLink) {
        location.href = prevLink.href
      }
      break

    case '>':
      const nextLink = document.querySelector('a[rel=next]')
      if (nextLink) {
        location.href = nextLink.href
      }
      break

    default:
      break
  }
}

document.onkeyup = ({ctrlKey}) => {
  if (!ctrlKey) {
    pressed.ctrlKey = false
    document.body.classList.remove('showLinkNumbers')
  }
}

$questionMark.onclick = () => {
  if ($help.className === 'visible') {
    $help.className = ''
  } else {
    $help.className = 'visible'
  }
}
