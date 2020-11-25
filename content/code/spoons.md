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

## Spoons

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

There is also a Spoon for quickly finding glyphs from the "[Miscellaneous Symbols](https://en.wikipedia.org/wiki/Miscellaneous_Symbols)" and "[Dingbats](https://en.wikipedia.org/wiki/Dingbat#Dingbats_Unicode_block)" unicode blocks. I have it mapped to Hyper+s.

## Config

My Hammerspoon hyper key is `shift` + `ctrl` + `alt` + `cmd`. I use Karabiner to map `Caps Lock` to that. The stuff I use most is probably the WinWin Spoon mentioned above. It uses a 2x2 grid, and I have mapped `Hyper` + `Keypad 1-9` to the different screens locations. So if I press `Caps Lock` + `Keypad 7`, the active window resizes to the top left corner of the screen, A1 (see below). The keys in between the corner keys resizes the window to fill the corresponding row. So `Caps Lock` + `Keypad 4` resizes the window to A1 and B1. `Caps Lock` + `Keypad 5` centers the window on the screen but does not maximize it.

```text
           1                  2
  +------------------+------------------+
  |                  |                  |
A |                  |                  |
  |                  |                  |
  +-------------------------------------+
  |                  |                  |
B |                  |                  |
  |                  |                  |
  +------------------+------------------+
```

On my laptop, I use Karabiner to map `Fn` + `Q` - `W` - `E`, `A` - `S` - `D` and `Z` - `X` - `C` to the keypad numbers to have the same functionality.

`Caps Lock`+ `i`, `j`, `k` and `l` moves windows around. `Caps Lock` + `Arrow up/down/left/right` resizes window with the smart resizing described above. `Caps Lock` + `home` and `end` moves windows between screens.
