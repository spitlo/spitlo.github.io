var $searchInput = document.getElementById('search')
var $help = document.getElementById('help')
var $questionMark = document.getElementById('questionMark')

var navigation = {
  'H': '/',
  'C': '/code/',
  'M': '/music/',
  'T': '/tags/'
}

document.onkeydown = function(event) {
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

$questionMark.onclick = function() {
  if ($help.className === 'visible') {
    $help.className = ''
  } else {
    $help.className = 'visible'
  }
}