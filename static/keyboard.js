var $commandLine = document.getElementById('commandLine')
var $commandLineHint = document.getElementById('commandLineHints')
var $help = document.getElementById('help')
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
  x: ['_  _',' \/ ','_/\_'],
  y: ['_   _',' \\_/ ','  |  '],
  z: ['___',' / ','/__'],
  ' ': ['    ','    ','    '],
  '-': ['    ',' __ ','    '],
  '.': ['   ','   ',' * '],
  ':': ['   ',' , ',' ’ ']
}
var commandLineActive = false
var command = ''
var commandHint = ''
var commands = {
  help: function help() {
    var helpMessage = ''
    helpMessage += '<code>top</code> Go to top of page<br>'
    helpMessage += '<code>print</code> Render page in a dot matrix friendly way<br>'
    helpMessage += '<code>unprint</code> Undo the above command<br>'
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

function showCommandLineAlert(title, message, isError) {
  $commandLineHint.className = 'alertMode'
  if (isError) {
    $commandLineHint.classList.add('error')
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
    showCommandLineAlert('Sorry, that’s not something I understand', 'Try using the tab completion to enter commands correctly or type <code>help</code> to view a list of valid commands.<br>Type <code>:</code> to try again.', true)
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
