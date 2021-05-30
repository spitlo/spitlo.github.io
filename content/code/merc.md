+++
title = "Merc"
description = "A pretty basic client for Gemini, written for Deno"
date = 2020-11-16

[taxonomies]
technologies = ["Deno", "TypeScript", "Bash"]

[extra]
repo = "https://github.com/spitlo/mercuriceratops"
first_commit = 2020-05-16
+++

## A Gemini client written for Deno

Merc (formally Mercuriceratops) is a basic client for Gemini, inspired by the [100 LOC demos](https://tildegit.org/solderpunk) by solderpunk.

The name is a nod to and a gentle jab at the tendency in both Deno and Gemini communities to name projects after dinosaurs and zodiac stuff, respectively. The [mercuriceratops](https://en.wikipedia.org/wiki/Mercuriceratops) is a dinosaur of the type species *Mercuriceratops gemini*.

<div class="alert">
  This project is now on hold, since I can’t figure out how to make Deno accept most certificates.
</div>

## Install/update

See [the repo](https://github.com/spitlo/mercuriceratops) for up-to-date install instructions.

## Usage

To visit a Gemini page, enter the URL at the `URL>` prompt or start it with a URL as argument.
Merc only handles Gemini links for now, and you can leave out the protocol part of the URL.
To go back, enter 'b' at the prompt. To quit, enter 'q'.
To search using gus.guru, enter 's' and then enter your query at the `SEARCH>` prompt.
To follow a link, enter the link number and press enter.

You can also supply a URL directly.

### Options

```txt
  -h, --help
          Prints help end exits
  -d, --dump
          Prints document body and exits
  -w, --width <number>
          Wraps text at <number> columns
  -p, --paginate <number>
          Show <number> of rows at a time.
          Defaults to 50 if no <number> is supplied
```
