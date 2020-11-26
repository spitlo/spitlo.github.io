+++
title = "Spoons"
description = "My Hammerspoon config with some custom Spoons"
date = 2020-02-12

[taxonomies]
technologies = ["Lua"]

[extra]
repo = "https://github.com/spitlo/hammerspoon"
+++

I use [Hammerspoon](https://www.hammerspoon.org/) together with [Karabiner-Elements](https://karabiner-elements.pqrs.org/) on macOS to set up keyboard shortcuts and window management.

This repo contains a mix of some of the official Spoons and some of my own or customized Spoons, along with my Hammerspoon config.

## Config

My Hammerspoon hyper key is `Shift` + `Ctrl` + `Alt` + `Cmd`. I use Karabiner to map `Caps Lock` to that.

The stuff I use most is probably the WinWin Spoon mentioned below. It’s a window manager that uses a 2x2 grid, and I have mapped `Hyper` + `Keypad 1-9` to the different screens locations. So if I press `Caps Lock` + `Keypad 7`, the active window resizes to the top left corner of the screen, let’s call it A1:

```text
           1                  2
  +------------------+------------------+
  |                  |                  |
A |        A1        |                  |
  |                  |                  |
  +-------------------------------------+
  |                  |                  |
B |                  |                  |
  |                  |                  |
  +------------------+------------------+
```

The keys in between the corner keys resizes the window to fill the corresponding row. So `Caps Lock` + `Keypad 4` resizes the window to cover squares A1 and B1. Lastly, `Caps Lock` + `Keypad 5` centers the window on the screen but does not maximize it.

On my laptop, I use Karabiner to map `Fn` + `Q/W/E`, `A/S/D` and `Z/X/C` to the keypad numbers to have the same functionality.

`Hyper` + `I`, `J`, `K` and `L` moves windows around (Sorry, vim lovers). `Hyper` + `Arrow Up/Down/Left/Right` resizes window with the smart resizing described below. `Hyper` + `Home/End` moves windows between monitors.

`Alt` + `Tab` activates the next window of the current application, which is good for jumping between projects in VS Code for example.

`Hyper` + `N` opens [nvAlt](https://brettterpstra.com/projects/nvalt/).

## Spoons

### WinWin

The WinWin Spoon included is customized to add a method, `smartStepResize`, that resizes the focused window "smartly" by one step.

Smartly in this context means:

- If window gravitates to the left, `right` and `left` expands and shrinks the window on the right border (see illustration).
- If window is more to the right, it resizes on the left border.
- The same principal applies to `up` and `down`.
- When a window is full width or full height, it will shrink/expand in the 'direction' direction.

```text
  +------------------+------------------+
  |   +-------------------+             |
  |   |              |    |             |
  |   |              |  < | >           |
  +-------------------------------------+
  |   |         /\   |    |             |
  |   +-------------------+             |
  |             \/   |                  |
  +------------------+------------------+
```

### Symbats

There is also a Spoon for quickly finding glyphs from the "[Miscellaneous Symbols](https://en.wikipedia.org/wiki/Miscellaneous_Symbols)" and "[Dingbats](https://en.wikipedia.org/wiki/Dingbat#Dingbats_Unicode_block)" unicode blocks. I have it mapped to `Hyper` + `S`. When triggered, it shows a searchable list of symbols. When a symbol is selected, it gets copied to the clipboard.

### HttpStatus

`Hyper` + `H` triggers something similar to Symbats but for HTTP response codes.

### ClipboardTool

`Hyper` + `C` triggers something similar to Symbats and HttpStatus but for the clipboard.
