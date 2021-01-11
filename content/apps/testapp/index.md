+++
title = "Testapp"
[extra]
version = 1.0
+++

This is a s`{i,a}`mple web app to test the concept.

{% script(name="pp_json") %}
  <h2>Pretty print JSON</h2>
  <p>Paste valid JSON in the textarea.</p>
  <textarea id="textareaJson"></textarea>
  <button id="buttonJson">Pretty print JSON</button>
  <div id="outputJson"></div>
  <style>
    textarea#textareaJson {
      width: 100%;
      height: 200px;
    }
  </style>
{% end %}

{% script(name="pp_html") %}
  <script src="https://cdnjs.cloudflare.com/ajax/libs/js-beautify/1.13.0/beautify-html.min.js" integrity="sha512-dazDdY6a1NGbyf0X4yNTXHx01KvqPpbbZ2KFVvktIiG/A8d0smpGE4BAf9I+Tzny4bgI890Vmf1cMeIaWE7LsA==" crossorigin="anonymous"></script>
  <h2>Pretty print HTML</h2>
  <p>Paste valid HTML in the textarea.</p>
  <textarea id="textareaHtml"></textarea>
  <button id="buttonHtml">Pretty print HTML</button>
  <code>
    <pre id="outputHtml" />
  </code>
  <style>
    textarea#textareaHtml {
      width: 100%;
      height: 200px;
    }
  </style>
{% end %}
