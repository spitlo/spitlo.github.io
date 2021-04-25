var $commandLine = document.getElementById('commandLine')
var $commandLineHint = document.getElementById('commandLineHints')
var $help = document.getElementById('help')
var $questionMark = document.getElementById('questionMark')
var $searchInput = document.getElementById('search')
var $top = document.getElementById('top')
var h = `
_  _ ____ ____ ____ _  _ ___ ____ ____
|_/  |__| |__/ |__| |_/   |  |___ |__/
| \_ |  | |  \ |  | | \_  |  |___ |  \

// ___  ____ _  _
// |  \ |___ |  |
// |__/ |___  \/

// ____
// |
// |___


`
var alphabet = {
  a: [['____'],['|__|'],['|  |']],
  b: [['___ '],['|__]'],['|__]']],
  c: [['____'],['|   '],['|___']],
  d: [['___ '],['|  \\'],['|__/']],
  e: [['____'],['|___'],['|___']],
  f: [['____'],['|___'],['|   ']],
  g: [['____'],['| __'],['|__]']],
  h: [['_  _'],['|__|'],['|  |']],
  i: [['_'],['|'],['|']],
  j: [[' _'],[' |'],['_|']],
  k: [['_  _'],['|_/ '],['| \\_']],
  l: [['_   '],['|   '],['|___']],
  m: [['_  _'],['|\\/|'],['|  |']],
  n: [['_  _'],['|\\ |'],['| \\|']],
  o: [['____'],['|  |'],['|__|']],
  p: [['___ '],['|__]'],['|   ']],
  q: [['____'],['|  |'],['|_\\|']],
  r: [['____'],['|__/'],['|  \\']],
  s: [['____'],['[__ '],['___]']],
  t: [['___'],[' | '],[' | ']],
  u: [['_  _'],['|  |'],['|__|']],
  v: [['_  _'],['|  |'],[' \\/ ']],
  w: [['_ _ _'],['| | |'],['|_|_|']],
  x: [['_  _'],['\/'],['_/\_']],
  y: [['_   _'],[' \\_/ '],['  |  ']],
  z: [['___'],[' / '],['/__']],
  ' ': [['    '], ['    '], ['    ']],
  '-': [['    '], [' __ '], ['    ']],
  '.': [['   '], ['   '], [' * ']],
  ':': [['   '], [' , '], [' ’ ']]
}
var commandLineActive = false
var command = ''
var commandHint = ''
var commands = {
  help: function help() {
    // Poor man’s modal
    alert('Sorry, help is not available yet :(')
  },
  print: function print() {
    document.body.className = 'print'
    var toc = document.getElementsByTagName('details')[0]
    if (toc) {
      toc.setAttribute('open', true)
    }
    var header = document.getElementsByTagName('h1')[0]
    if (header) {
      var headerText = header.innerText
      var figlet = [[''],[''],['']]
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
      figletHeader.innerText = figlet.join('\n')
      header.insertAdjacentElement('afterend', figletHeader)
    }
  },
  top: function top() {
    $top.scrollIntoView()
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

function updateCommandLineHint(content) {
  $commandLineHint.innerHTML = '<span>' + (content || commandHint) + '</span>'
}

function updateCommandLineText(content) {
  $commandLine.innerHTML = '<span>' + (content || command) + '</span>'
  if (command) {
    var commandNames = Object.keys(commands)
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

function evaluateCommand() {
  if (commands[command]) {
    commands[command]()
  } else {
    alert('Sorry, that’s not something I understand.\nTry using the tab completion to enter commands correctly.')
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
        evaluateCommand()
      }
      deactivateCommandMode()
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

    if (/^[A-Za-z0-9]$/.test(event.key)) {
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
