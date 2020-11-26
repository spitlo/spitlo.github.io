+++
title = "Revercss"
description = "Declaration-first CSS paradigm"
date = 2014-12-05

[taxonomies]
technologies = ["JavaScript"]

[extra]
repo = "https://github.com/spitlo/revercss"
+++

Revercss was made as a joke many years ago, and "marketed" as

> a declaration-first paradigm for lean, consistent CSS and increased project maintainibility

But I still kinda like the idea, especially for small projects.

I also made [a gulp plugin for it](https://github.com/spitlo/gulp-revercss/) when that was still a thing.

Perhaps I should make a syntax highlighting scheme for it as well.

## Syntax

In Revercss, style declarations are first-class citizens. Selectors belong to one or many declarations:

```css
color: red {
  a, h1
}

color: rgba(100, 0, 0, .5) {
  #logo,
  ul.menu>li a
}

border: 2px solid {
  button,
  #logo,
  ul.menu>li a
}

text-decoration: none {
  ul.menu>li a
}

min-width: 200px {
  button,
  input[type="text"]
}

padding: 8px {
  button,
  input,
  ul.menu>li a
}

box-sizing: border-box {
  html
}

box-sizing: inherit {
  *, *:before, *:after
}

```

## Usage

### Console output

```bash
revercss example.revcss
```

### File output

```bash
revercss example.revcss -o parsed.css
```

### From stdin

```bash
cat example.revcss | revercss
```

## Options

```text
  -c, --compact
          Output compact CSS
  -m, --minified
          Output minified CSS
  -t, --tabs
          Use tabs instead of spaces in output
  -s, --spaces
          Number of spaces/tabs to indent (default: 2)
  -o, --outfile <file>
          Write to FILE rather than the console
  -h, --help
          Display help and usage details
```
