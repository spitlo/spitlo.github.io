// Most characters from Code Page 437 (removed glyphs missing from Victor Mono for consisten widths)
var codePage437 = '!#$%&()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[]^_`abcdefghijklmnopqrstuvwxyz{|}~ÇüéâäàåçêëèïîìÄÅÉæÆôöòûùÿÖÜ¢£¥ƒáíóúñÑªº¿¬½¼¡«»░▒▓│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌█▄▌▐▀αßΓπΣσµτΦΘΩδ∞φε∩≡±≥≤÷≈°·√ⁿ²'
var scrambleMillieconds = 7000
var intervalMilliseconds = 80

window.nms = function(a, b) {
  var source = a.innerText
  var target = atob(b)
  var loop = true
  var startTime = (new Date()).getTime()

  function getScrambledString(str) {
    var returnString = ''
    for (var x = 0; x < str.length; x++) {
      returnString += codePage437.charAt(Math.floor(Math.random() * codePage437.length))
    }
    return returnString
  }

  function unscrambleString(force) {
    if (force) {
      for (var x = 0; x < charArray.length; x++) {
        charArray[x] = '<span class="unscrambled">' + target.substr(x, 1) + '</span>'
      }
    } else {
      var unscrambleIndex = Math.floor(Math.random() * charArray.length)
      if (charArray[unscrambleIndex].length === 1) {
        if (Math.random() < 0.7) {
          charArray[unscrambleIndex] = '<span class="unscrambled">' + target.substr(unscrambleIndex, 1) + '</span>'
        } else {
          charArray[unscrambleIndex] = codePage437.charAt(Math.floor(Math.random() * codePage437.length))
        }
      } else {
        // Try again to increase chance of unscrambling in time
        unscrambleIndex = Math.floor(Math.random() * charArray.length)
        if (charArray[unscrambleIndex].length === 1) {
          charArray[unscrambleIndex] = codePage437.charAt(Math.floor(Math.random() * codePage437.length))
        }
      }
    }
  }

  setTimeout(function() {
    // Loop for scrambleMillieconds / 1000 seconds
    loop = false
  }, scrambleMillieconds)

  var charArray = source.split('')
  var loopInterval = setInterval(function() {
    var now = (new Date()).getTime()
    var diff = now - startTime

    if (loop) {
      if (diff < scrambleMillieconds / 3) {
        a.innerText = getScrambledString(source)
      } else {
        unscrambleString()
        a.innerHTML = charArray.join('')
      }
    } else {
      // If we’re not done by now, make sure string is fully unscrambled
      unscrambleString(true)
      a.innerHTML = charArray.join('')
      clearInterval(loopInterval)
    }
  }, intervalMilliseconds);
}
