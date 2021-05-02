window.nms = (a, b) => {
  // Most characters from Code Page 437 (removed glyphs missing from Victor Mono for consisten widths)
  const codePage437 = '!#$%&()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[]^_`abcdefghijklmnopqrstuvwxyz{|}~ÇüéâäàåçêëèïîìÄÅÉæÆôöòûùÿÖÜ¢£¥ƒáíóúñÑªº¿¬½¼¡«»░▒▓│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌█▄▌▐▀αßΓπΣσµτΦΘΩδ∞φε∩≡±≥≤÷≈°·√ⁿ²'
  const scrambleMillieconds = 7000
  const intervalMilliseconds = 80

  const source = a.innerText
  const target = atob(b)
  let loop = true
  const startTime = (new Date()).getTime()

  function getScrambledString({length}) {
    let returnString = ''
    for (let x = 0; x < length; x++) {
      returnString += codePage437.charAt(Math.floor(Math.random() * codePage437.length))
    }
    return returnString
  }

  function unscrambleString(force) {
    if (force) {
      for (let x = 0; x < charArray.length; x++) {
        charArray[x] = `<span class="unscrambled">${target.substr(x, 1)}</span>`
      }
    } else {
      let unscrambleIndex = Math.floor(Math.random() * charArray.length)
      if (charArray[unscrambleIndex].length === 1) {
        if (Math.random() < 0.7) {
          charArray[unscrambleIndex] = `<span class="unscrambled">${target.substr(unscrambleIndex, 1)}</span>`
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

  setTimeout(() => {
    // Loop for scrambleMillieconds / 1000 seconds
    loop = false
  }, scrambleMillieconds)

  let charArray = source.split('')
  const loopInterval = setInterval(() => {
    const now = (new Date()).getTime()
    const diff = now - startTime

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
  }, intervalMilliseconds)
}
