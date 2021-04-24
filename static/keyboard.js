var $searchInput = document.getElementById('search')
var $help = document.getElementById('help')
var $questionMark = document.getElementById('questionMark')

var pressed = {
  'ctrlKey': false,
}

var navigation = {
  'H': '/',
  'C': '/code/',
  'M': '/music/',
  'T': '/tags/'
}

document.onkeydown = function(event) {
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