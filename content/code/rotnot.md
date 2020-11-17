+++
title = "Rotnot"
description = "Set root note for multi-samples"
date = 2020-11-14

[taxonomies]
technologies = ["JavaScript", "Shell"]

[extra]
repo = "https://github.com/spitlo/rotnot"
+++

Rotnot tries to figure out the notes of sound samples based on their filename, and save that note as meta data in the file.

At the moment it works on a bunch of multi sampled instruments I had available, where the filename were either:

- Note+octave (`a#4.wav`)
- Collection_name-note+octave (`MutedTrumpet-Bb2.wav`); or
- The actual midi note (`031.wav`)

The midi note is then written back to the wave file as part of the "Sampler Chunk", in the `MIDI Unity Note` field.

The "Instrument Chunk" har a field with similar purpose, `MIDI Unshifted Note`. Future versions might write to that as well.

## Usage

In the `rotnot` directory, enter:

```bash
node index.js
```

## Rationale

I own a [1010music blackbox hardware sampler](https://1010music.com/product/blackbox). It can load a folder of samples as a multi-sample instrument, but it doesn’t use filenames for note recognition. So I use this to prepare sample packs before moving them to the SD card.
