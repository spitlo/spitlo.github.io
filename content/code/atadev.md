+++
title = "At-a-dev"
description = "Short message service for devs"
date = 2020-11-16

[taxonomies]
technologies = ["Shell", "Git"]

[extra]
repo = "https://github.com/spitlo/atadev"
first_commit = 2020-10-09
+++

At-a-dev is a simple bash script to enable `@`:ing other devs in code and getting notifications about mentions on `git pull`.

Use it as a post-merge hook and it will check new files for any mentions and alert the user.

Use it as a command line tool and it will show you all your messages.

## Usage example

The office nitpicker spots a few flagrant style crimes, and commits and pushes the following in `src/index.js`:

```javascript, hl_lines=1 3 5
var myConst = { // @John Please use const and not var
  a: 1,
  b: 2 // @Bella Please add a trailing comma here, see our style guide
}
// @John and @Bella You should both enable an ESLint plugin in your $EDITOR
```

When John runs `git pull`, he sees the following message:

```txt
Mentions in ./src/index.js
==========================
On line 5:
  var myConst = { // @John Please use const and not var
On line 9:
  // @John and @Bella You should both enable an ESLint plugin in your $EDITOR
```

When Bella runs `git pull`, she sees the following message:

```txt
Mentions in ./src/index.js
==========================
On line 7:
  b: 2 // @Bella Please add a trailing comma here, see our style guide
On line 9:
  // @John and @Bella You should both enable an ESLint plugin in your $EDITOR
```

Bella and John makes their respective changes and remove the relevant message.

Perhaps one of them adds a new message:

```javascript, hl_lines=6
const myConst = {
  a: 1,
  b: 2,
}
// @John and @Bella You should both enable an ESLint plugin in your $EDITOR
// Hey, @OfficeNitpicker, it’s better to @ one dev per line, see our style guide
```

## Installation

See [the repo](https://github.com/spitlo/atadev) for up-to-date install instructions.
