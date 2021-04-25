var $commandLine = document.getElementById('commandLine')
var $commandLineHint = document.getElementById('commandLineHints')
var $help = document.getElementById('help')
var $questionMark = document.getElementById('questionMark')
var $searchInput = document.getElementById('search')
var $top = document.getElementById('top')

var commandLineActive = false
var command = ''
var commandHint = ''
var commands = {
  top: function top() {
    $top.scrollIntoView()
  },
  help: function help() {
    // Poor man’s modal
    alert('Sorry, help is not available yet :(')
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
