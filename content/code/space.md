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

It loads a new background image on each reload, and randomizes the sequence to be played. By default, "auto-evolve" is enabled, which means that as the sequence plays, it alters itself randomly so it plays a continuosly changing "song". If you want to create your own sequence, simply clear the playing sequence, disable auto-evolve and create your own sequence by clicking the corresponding dots. The order of channels are as follows:

```txt
0: kick
1: snare
2: clap
3: hat
4: cymbal
5: tom
6: fx1
7: fx2
8: synth, C2
9: synth, C3
```

The spinning logo thing is done with [Zdog](https://github.com/metafizzy/zdog) and [Zfont](https://github.com/jaames/zfont). The "music" is generated with [Tone.js](https://github.com/Tonejs/Tone.js). Colors are extracted from the current background image using [node-vibrant](https://github.com/Vibrant-Colors/node-vibrant).

The prompt for ImaginAIry -- for anyone interested -- was "70's sci-fi landscape", the full comand was:

```bash
imagine "70's sci-fi landscape" -w 1024 -h 256 -r 100 --tile
```

Then I went for a walk while that toasted my battery. From those one hundred images I picked the 78 I liked the best.

