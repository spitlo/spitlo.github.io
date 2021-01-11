(function () {
  const beautifyConfig = {
    indent_size: 2,
    indent_char: ' ',
    indent_with_tabs: false,
    editorconfig: false,
    eol: '\n',
    end_with_newline: true,
    indent_level: 0,
    preserve_newlines: false,
    space_in_paren: false,
    space_in_empty_paren: false,
    jslint_happy: false,
    space_after_anon_function: false,
    space_after_named_function: false,
    brace_style: 'collapse',
    unindent_chained_methods: false,
    break_chained_methods: false,
    keep_array_indentation: false,
    unescape_strings: false,
    wrap_line_length: 0,
    e4x: false,
    comma_first: false,
    operator_position: 'before-newline',
    indent_empty_lines: false,
  }
  const textArea = document.getElementById('textareaHtml')
  const button = document.getElementById('buttonHtml')
  const output = document.getElementById('outputHtml')
  button.onclick = function buttonOnclick() {
    const html = textArea.value
    try {
      output.innerText = html_beautify(html, beautifyConfig)
    } catch (error) {
      output.innerHTML = `<p>Could not parse html.<br>Error:</p><pre>${error}</pre>`
    }
  }
}())
