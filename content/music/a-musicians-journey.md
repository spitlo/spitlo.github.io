+++
title = "A Musician’s Journey"
description = "An experiment in generated music in the form of a sound collage"
date = 2023-05-27

[taxonomies]
categories = ["Electronic", "AI", "Sound Collage", "Work in Progress"]

[extra]
content_class = "musicians-journey"
+++

I wanted to try out [Bark](https://github.com/suno-ai/bark), a transformer-based text-to-audio model by Suno.

I had some unused lyrics lying around, so I created a python script that fed it, line for line, to Bark. The script takes a [language](https://github.com/suno-ai/bark#supported-languages) and a [voice number](https://suno-ai.notion.site/8b8e8749ed514b0cbf3f699013548683?v=bc67cff786b04b50b3ceb756fd05f68c) as arguments, and an optional folder name. The generated file gets saved to a folder named for the verse and line (e.g. `verse1_line4`), and the filename indicates the language and voice used.

When generating the audio, I surrounded each line with `♪`, which has a special meaning to Bark. It tells it to generate the prompt as music. This sometimes leads to the line being "sung", often poorly, and sometimes generates a full piece of realistic music. Sometimes it’s something in between.

After generating **a bunch** of files for English, Korean, Turkish, Spanish etc (Bark usually generates the audio in broken english if the prompt is in english and the language is not), I went through all the folders, picked the "samples" I liked the best, and imported them into Reaper. I set an arbitrary limit of using five samples per line of text, and then I started layering. Most samples are used basically as is (apart from volume, splits and start/end point) but a tinyn amount were slightly time stretched or pitched.

I added a little reverb to each of the ten resulting tracks, picking presets pseudo-randomly. The panning for each track is also pseudo-random (a little to the left, a little to the right, a little to the left etc.)

## The script

Below is the Python script I used to generate the files. It’s pretty specific to this task, but it would be trivial to make it more general (adding the possibility to supply a text file argument for example).

```python
import sys
import os
os.environ["SUNO_ENABLE_MPS"] = "True" # Needed?

import random
import torch
from bark import SAMPLE_RATE, generate_audio, preload_models
from scipy.io.wavfile import write as write_wav

torch.device("mps")

# Defaults
lang = "en"
voice = "6"
base_folder = "blacksheep"

history_prompt="v2/{}_speaker_{}".format(lang, voice)

# Each verse is a string in this list. Each line is separated with a newline character.
text_prompts = [
     "Baa, baa black sheep \nHave you any wool \nYes sir, yes sir \nThree bags full",
     "One for my master \nAnd one for my dame \nAnd one for the little boy \nWho lives down the lane",
]
expressions = [
     "[laughter]",
     "[laughs]",
     "[sighs]",
     "[music]",
     "[gasps]",
     "[clears throat]",
]

verse_number = 0

# Perhaps this should be optional?
if len(sys.argv) < 3:
     print("Please supply language and voice arguments. Folder name is optional.")
     quit()
else:
     lang = sys.argv[1]
     voice = sys.argv[2]
# Base folder is optional
if len(sys.argv) == 4:
     base_folder = sys.argv[3]

if not os.path.exists(base_folder):
     os.makedirs(base_folder)

print("Hang on, preloading models...")
preload_models()

for verse in text_prompts:
     verse_number += 1
     line_number = 0

     for line in verse.splitlines():
          line_number += 1

          # Add a little extra expression sometimes
          expression = ""
          if random.random() > 0.8:
               expression = random.choice(expressions)

          # Generate the audio
          audio_array = generate_audio("{} ♪ {} ♪".format(expression, line))

          # Set folder name and create it if it doesn’t exist
          folder_name = "verse{}_line{}".format(verse_number, line_number)
          full_path = "{}/{}".format(base_folder, folder_name)
          if not os.path.exists(full_path):
               os.makedirs(full_path)

          # Save to disk
          filename = "{}/voice-{}{}_verse-{}_line-{}.wav".format(
               full_path,
               lang,
               voice,
               verse_number,
               line_number
          )
          write_wav(filename, SAMPLE_RATE, audio_array)

```

## The lyrics

These are the stupid lyrics

```txt
He started out playing bass for The Foregone Conclusions
But he left in a week, that was a foregone conclusion
And he switched to playing piano with The Four Bar Blueses,
Stuck behind a piano playing four bar blueses
So he learned the guitar and he joined The Riffs
Happy getting solos but annoyed with the riffs
Played percussion over summer for The Vibraslaps
But his hands got kinda caloused from those vibra slaps

Back to the bass in a band called The Bluff
Swore he could slap but the band called the bluff
Was a backup singer for The Break-ups
But he pulled up his stakes before the inevitable break-up
Was a manager a while for The Snowflakes
But he rage quit – Saying “Y’all a bunch of snowflakes”
Then he toured for a while with The Elderly Statesmen
But they snored when they slept like som elderly statesmen

Played the sax for a while in The Phenomenal Mess
But he quit because their style was a phenomenal mess
Played a little tambo for The Very Legits
But the pay wasn’t shit it wasn’t very legit
So he played the ocarina with Sha-ronne and the PJs
Got fired when he eyeballed Sha-ronne in her PJs
Finally he started a small woodwind combo
Just him and his sax was a would-win combo
```

## The result

The resulting audio can be downloaded from the link below, or you can use the `:play` command to play it directly in your browser.

[A Musician’s Journey 1.1](https://files.mefirst.se/mp3/spitlo_-_a-musicians-journey-1.1.mp3) (05:19, 10,2 MB)

## Changelog

  - v1.1 Decrease volume on intro
  - v1.0 Initial release
