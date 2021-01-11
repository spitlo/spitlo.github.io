(function () {
  const textArea = document.getElementById('textareaJson')
  const button = document.getElementById('buttonJson')
  const output = document.getElementById('outputJson')
  button.onclick = function buttonOnclick() {
    const json = textArea.value
    try {
      output.innerHTML = `<pre>${JSON.stringify(JSON.parse(json), null, 2)}</pre>`
    } catch (error) {
      output.innerHTML = `<p>Could not parse json.<br>Error:</p><pre>${error}</pre>`
    }
  }

}())
