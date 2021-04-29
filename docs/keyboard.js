var $commandLine = document.getElementById('commandLine')
var $commandLineHint = document.getElementById('commandLineHints')
var $help = document.getElementById('help')
var $player = document.getElementById('player')
var $questionMark = document.getElementById('questionMark')
var $searchInput = document.getElementById('search')
var $top = document.getElementById('top')

var alphabet = {
  a: ['____','|__|','|  |'],
  b: ['___ ','|__]','|__]'],
  c: ['____','|   ','|___'],
  d: ['___ ','|  \\','|__/'],
  e: ['____','|___','|___'],
  f: ['____','|___','|   '],
  g: ['____','| __','|__]'],
  h: ['_  _','|__|','|  |'],
  i: ['_','|','|'],
  j: [' _',' |','_|'],
  k: ['_  _','|_/ ','| \\_'],
  l: ['_   ','|   ','|___'],
  m: ['_  _','|\\/|','|  |'],
  n: ['_  _','|\\ |','| \\|'],
  o: ['____','|  |','|__|'],
  p: ['___ ','|__]','|   '],
  q: ['____','|  |','|_\\|'],
  r: ['____','|__/','|  \\'],
  s: ['____','[__ ','___]'],
  t: ['___',' | ',' | '],
  u: ['_  _','|  |','|__|'],
  v: ['_  _','|  |',' \\/ '],
  w: ['_ _ _','| | |','|_|_|'],
  x: ['_  _',' \\/ ','_/\\_'],
  y: ['_   _',' \\_/ ','  |  '],
  z: ['___',' / ','/__'],
  ' ': ['    ','    ','    '],
  '-': ['    ',' __ ','    '],
  '.': ['   ','   ',' * '],
  ':': ['   ',' , ',' ’ ']
}
var songIndex = 0
var commandLineActive = false
var command = ''
var commandHint = ''
var commands = {
  help: function help() {
    var helpMessage = ''
    helpMessage += '<code>top</code> Go to top of page<br>'
    helpMessage += '<code>print</code> Render page in a dot matrix friendly way<br>'
    helpMessage += '<code>unprint</code> Undo the above command<br>'
    // Audio
    helpMessage += '<code>play</code> Play any linked music<br>'
    // helpMessage += '<code>pause</code>/<code>stop</code> Pause/stop player<br>'
    helpMessage += '<code>pause</code> Pause player<br>'
    helpMessage += '<code>prev</code>/<code>next</code> Previous/next song in playlist<br>'
    // MEta
    helpMessage += '<code>help</code> Show this message<br>'
    helpMessage += 'Commands are tab completable. Type <code>:</code> to try a command.'
    showCommandLineAlert('Available commands', helpMessage)
  },

  print: function print() {
    // Show a stripped down version of page, suitable
    // for printing or just nerding out.
    document.body.classList.add('print')
    var toc = document.getElementsByTagName('details')[0]
    if (toc) {
      toc.setAttribute('open', true)
    }
    var header = document.getElementsByTagName('h1')[0]
    var printHeader = document.getElementById('printHeader')
    if (header && !printHeader) {
      var headerText = header.innerText
      var figlet = ['', '', '']
      for (x = 0; x <= headerText.length; x++) {
        var char = headerText.substr(x, 1).toLowerCase()
        if (alphabet[char]) {
          for (y = 0; y < figlet.length; y++) {
            figlet[y] = figlet[y] + ' ' + alphabet[char][y]
          }
        }
      }
      var figletHeader = document.createElement('pre')
      var underline = new Array(figlet[figlet.length - 1].length).join('-')
      figlet.push(' ' + underline)
      figletHeader.id = 'printHeader'
      figletHeader.innerText = figlet.join('\n')
      header.insertAdjacentElement('afterend', figletHeader)
      // The timeout let’s us return the function immediately, to close
      // the command line overlay. Also it gives the user a view of the
      // print version of the site.
      setTimeout(window.print, 1000)
    }
  },

  top: function top() {
    $top.scrollIntoView()
  },

  unprint: function unprint() {
    document.body.classList.remove('print')
    var toc = document.getElementsByTagName('details')[0]
    if (toc) {
      toc.removeAttribute('open')
    }
  },

  play: function play() {
    if ($player) {
      if ($player.src && $player.paused) {
        $player.play()
      } else {
        var songs = document.querySelectorAll('a[href$="mp3"]')
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

  pause: function pause() {
    if ($player) {
      $player.pause()
    }
  },

  _stop: function stop() {
    if ($player) {
      // This does not work
      $player.src = ''
      songIndex = 0
    }
  },

  prev: function prev() {
    var songs = document.querySelectorAll('a[href$="mp3"]')
    if (songs && songs.length > 0) {
      songIndex = (songIndex === 0) ? songs.length - 1 : songIndex - 1
      $player.src = songs[songIndex]
    }
  },

  next: function next() {
    var songs = document.querySelectorAll('a[href$="mp3"]')
    if (songs && songs.length > 0) {
      songIndex = (songIndex === songs.length - 1) ? 0 : songIndex + 1
      $player.src = songs[songIndex]
    }
  }
}

var navigation = {
  'H': '/',
  'C': '/code/',
  'M': '/music/',
  'T': '/tags/'
}

var pressed = {
  'ctrlKey': false,
}

function findPartialMatch(stack, needle) {
  if (needle.substring(0, 1) === '_') {
    return
  }
  // Find elements in array "stack" that starts with letter(s) "needle"
  var matches = stack.filter(function(value) {
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
    message = message + '<br>Type <code>:</code> to try another command.'
  } else {
    $commandLineHint.classList.add('help')
  }
  $commandLineHint.innerHTML = '<strong>' + title + '</strong><div>' + message + '</div>'
}

function updateCommandLineHint(content) {
  $commandLineHint.innerHTML = '<span>' + (content || commandHint) + '</span>'
}

function updateCommandLineText(content) {
  $commandLine.innerHTML = '<span>' + (content || command) + '</span>'
  if (command) {
    var commandNames = Object.keys(commands)
    // Don’t sort for now, perhaps we want to be able to control the priority
    // of hints (earlier in the commands object = more likely hint)
    // commandNames.sort()
    var partialMatch = findPartialMatch(commandNames, command)
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
}

function evaluateCommand(command) {
  if (commands[command]) {
    commands[command]()
  } else {
    showCommandLineAlert('Sorry, that’s not something I understand', 'Try using the tab completion to enter commands correctly or type <code>help</code> to view a list of valid commands.', true)
  }
}

document.onkeydown = function(event) {
  // Are we in command mode?
  if (commandLineActive) {
    if (event.key === 'Escape') {
      deactivateCommandMode()
      return
    }

    if (event.key === 'Enter') {
      if (command) {
        var nextCommand = command
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
        var links = document.getElementsByClassName('numberedLink')
        var linkIndex = parseInt(event.key) - 1
        var link = links[linkIndex]
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
      var prevLink = document.querySelector('a[rel=prev]')
      if (prevLink) {
        location.href = prevLink.href
      }
      break

    case '>':
      var nextLink = document.querySelector('a[rel=next]')
      if (nextLink) {
        location.href = nextLink.href
      }
      break

      default:
      break
  }
}

document.onkeyup = function(event) {
  if (!event.ctrlKey) {
    pressed.ctrlKey = false
    document.body.classList.remove('showLinkNumbers')
  }
}

$questionMark.onclick = function() {
  if ($help.className === 'visible') {
    $help.className = ''
  } else {
    $help.className = 'visible'
  }
}
