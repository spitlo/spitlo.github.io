// This is based on https://github.com/getzola/zola/blob/master/docs/static/search.js

function debounce(func, wait) {
  let timeout

  return function () {
    const context = this
    const args = arguments
    clearTimeout(timeout)

    timeout = setTimeout(() => {
      timeout = null
      func.apply(context, args)
    }, wait)
  }
}

// Taken from mdbook
// The strategy is as follows:
// First, assign a value to each word in the document:
//   Words that correspond to search terms (stemmer aware): 40
//   Normal words: 2
//   First word in a sentence: 8
// Then use a sliding window with a constant number of words and count the
// sum of the values of the words within the window. Then use the window that got the
// maximum sum. If there are multiple maximas, then get the last one.
// Enclose the terms in <strong>.
function makeTeaser(body, terms) {
  const TERM_WEIGHT = 40
  const NORMAL_WORD_WEIGHT = 2
  const FIRST_WORD_WEIGHT = 8
  const TEASER_MAX_WORDS = 30

  const stemmedTerms = terms.map(w => elasticlunr.stemmer(w.toLowerCase()))
  let termFound = false
  let index = 0
  const weighted = [] // Contains elements of ['word', weight, index_in_document]

  // Split in sentences, then words
  const sentences = body.toLowerCase().trim().replace(/(?:\r\n|\r|\n)/g, ' ').split('. ')
  for (var i in sentences) {
    const words = sentences[i].split(' ')
    let value = FIRST_WORD_WEIGHT

    for (const j in words) {
      var word = words[j]

      if (word.length > 0) {
        for (const k in stemmedTerms) {
          if (elasticlunr.stemmer(word).startsWith(stemmedTerms[k])) {
            value = TERM_WEIGHT
            termFound = true
          }
        }
        weighted.push([word, value, index])
        value = NORMAL_WORD_WEIGHT
      }

      index += word.length
      index += 1  // ' ' or '.' if last word in sentence
    }

    index += 1  // Because we split at a two-char boundary '. '
  }

  if (weighted.length === 0) {
    return body
  }

  const windowWeights = []
  const windowSize = Math.min(weighted.length, TEASER_MAX_WORDS)
  // We add a window with all the weights first
  let curSum = 0
  for (var i = 0; i < windowSize; i++) {
    curSum += weighted[i][1]
  }
  windowWeights.push(curSum)

  for (var i = 0; i < weighted.length - windowSize; i++) {
    curSum -= weighted[i][1]
    curSum += weighted[i + windowSize][1]
    windowWeights.push(curSum)
  }

  // If we didn't find the term, just pick the first window
  let maxSumIndex = 0
  if (termFound) {
    let maxFound = 0
    // Backwards
    for (var i = windowWeights.length - 1; i >= 0; i--) {
      if (windowWeights[i] > maxFound) {
        maxFound = windowWeights[i]
        maxSumIndex = i
      }
    }
  }

  const teaser = []
  let startIndex = weighted[maxSumIndex][2]
  for (var i = maxSumIndex; i < maxSumIndex + windowSize; i++) {
    var word = weighted[i]
    if (i === maxSumIndex && word[1] !== FIRST_WORD_WEIGHT) {
      // We start in the middle of a sentence, add ellipsis
      teaser.push('…')
    }

    if (startIndex < word[2]) {
      // Missing text from index to start of `word`
      teaser.push(body.substring(startIndex, word[2]))
      startIndex = word[2]
    }

    // Add <strong/> around search terms
    if (word[1] === TERM_WEIGHT) {
      teaser.push('<strong>')
    }
    startIndex = word[2] + word[0].length
    teaser.push(body.substring(word[2], startIndex))

    if (word[1] === TERM_WEIGHT) {
      teaser.push('</strong>')
    }
  }
  teaser.push('…')
  return teaser.join('')
}

function getResultSection(result) {
  const url = result ? result.ref : ''
  if (url.match(/\/code\//)) {
    return 'code'
  } else if (url.match(/\/music\//)) {
    return 'music'
  } else if (url.match(/\/tags\//)) {
    return 'tags'
  } else {
    return 'root'
  }
}

function formatSearchResultItem(item, terms) {
  return `<div class="${getResultSection(item)}"><a href="${item.ref}"><div class="title">${item.doc.title} (<date>${item.doc.date.substring(0, 10)}</date>)</div><div class="teaser">${makeTeaser(item.doc.body || item.doc.description, terms)}</div><div class="help">ENTER</div></a></div>`
}

function initSearch() {
  const $searchInput = document.getElementById('search')
  const $searchResults = document.getElementById('searchResults')
  const $searchResultsItems = document.getElementById('searchResultsItems')

  // Exit early of search is not setup in markup
  if (!$searchInput) {
    return
  }

  const options = {
    bool: 'OR',
    fields: {
      title: { boost: 2 },
      body: { boost: 1 },
    },
    expand: true,
  }
  let currentTerm = ''
  const index = elasticlunr.Index.load(window.searchIndex)

  let selectedIndex = 0
  let results = []

  function clearSearch() {
    selectedIndex = 0
    results = []
    $searchResultsItems.innerHTML = ''
    $searchInput.value = currentTerm = ''
    $searchInput.blur()
    $searchResults.style.display = 'none'
  }

  $searchInput.addEventListener('keyup', debounce(() => {
    const term = $searchInput.value.trim()
    if (term === currentTerm || !index) {
      return
    }
    $searchResults.style.display = term === '' ? 'none' : 'block'
    $searchResultsItems.innerHTML = ''
    if (term === '') {
      currentTerm = ''
      return
    }
    results = index.search(term, options)

    if (results.length === 0) {
      $searchResults.style.display = 'none'
      currentTerm = ''
      return
    }
    currentTerm = term
    const MAX_ITEMS = window.innerHeight > 600 ? 8 : 4
    for (let i = 0; i < Math.min(results.length, MAX_ITEMS); i++) {
      const item = document.createElement('li')
      item.innerHTML = formatSearchResultItem(results[i], term.split(' '))
      $searchResultsItems.appendChild(item)
    }
  }, 150))

  $searchInput.addEventListener('keydown', ({key}) => {
    const term = $searchInput.value.trim()
    if (key === 'Escape') {
      clearSearch()
    }

    if (term === '') {
      return
    }

    if (key === 'ArrowUp' || key === 'ArrowDown') {
      if ($searchResultsItems.children && $searchResultsItems.children[selectedIndex - 1]) {
        $searchResultsItems.children[selectedIndex - 1].className = ''
      }

      if (key === 'ArrowUp') {
        if (selectedIndex > 1) {
          selectedIndex--
        } else {
          selectedIndex = results.length
        }
      } else if (key === 'ArrowDown') {
        if (selectedIndex < results.length) {
          selectedIndex++
        } else {
          selectedIndex = 1
        }
      }
      if ($searchResultsItems.children && $searchResultsItems.children[selectedIndex - 1]) {
        $searchResultsItems.children[selectedIndex - 1].className = 'selected'
      }
    } else if (key === 'Enter') {
      const result = results[selectedIndex - 1]
      if (result) {
        document.location.href = result.ref
      }
    }
  })

  $searchInput.addEventListener('input', ({data}) => {
    // Make sure we clear search when user presses [×] in search field, but only then.
    // In other cases we want to keep search focused (user deleted word).
    const term = $searchInput.value.trim()
    if (!term && typeof data === 'undefined') {
      clearSearch()
    }
  })
}

if (document.readyState === 'complete' ||
    (document.readyState !== 'loading' && !document.documentElement.doScroll)
) {
  initSearch()
} else {
  document.addEventListener('DOMContentLoaded', initSearch)
}
