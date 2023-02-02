+++
title = "Space"
description = "A generative ambient music player"
date = 2023-01-28

[taxonomies]
technologies = ["JavaScript", "Vite"]
categories = ["Work in Progress"]

[extra]
repo = "https://github.com/spitlo/space"
first_commit_time = 2023-01-27
first_commit_message = "It was a pleasure to burn"
+++

Space is some kind of generative ambient music machine inspired by a bunch of tiling images I created using [ImaginAIry](https://github.com/brycedrennan/imaginAIry/). It’s available online at [spitlo.com/space/](https://spitlo.com/space/).

The "music" is generated with [Tone.js](https://github.com/Tonejs/Tone.js) from samples created with [Dance Diffusion](https://huggingface.co/spaces/harmonai/dance-diffusion) using the `glitch-440k` model and then split on transients. Channel 10 has a special role (no, it’s not a drum track, sorry MIDI heads) -- everytime a note is struck on it, it either plays the sample for that track, or a short sine note. The sine note is picked randomly on each play, from an array of notes (usually a scale) picked randomly on each load. The octave is also set randomly for each note, ranging from 2 to 7. Finally, the duration is set randomly from an eighth note to a sixty-fourth note, with shorter notes being a bit more likely.

It loads a new background image on each reload, and randomizes the sequence to be played. By default, "auto-evolve" is enabled, which means that as the sequence plays, it alters itself randomly so it plays a continuously changing "song". If you want to create your own sequence, simply clear the playing sequence, disable auto-evolve and create your own sequence by clicking the corresponding dots.

The spinning logo thing is done with [Zdog](https://github.com/metafizzy/zdog) and [Zfont](https://github.com/jaames/zfont). Colors are extracted from the current background image using [node-vibrant](https://github.com/Vibrant-Colors/node-vibrant). Random song and band names are based on [Synthgen 2000](https://github.com/tirdadc/synthwave).

The prompt for ImaginAIry -- for anyone interested -- was "70's sci-fi landscape", the full comand was:

```bash
imagine "70's sci-fi landscape" -w 1024 -h 256 -r 100 --tile
```

Then I went for a walk while that toasted my battery. From those one hundred images I picked the 78 I liked the best.

Another way to toast your battery is to leave Space running in an open browser tab :)
