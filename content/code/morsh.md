+++
title = "Morsh"
description = "Encode/decode morse code on the command line"
date = 2022-03-23

[taxonomies]
technologies = ["Bash"]
categories = ["Work in Progress"]

[extra]
repo = "https://github.com/spitlo/morsh"
first_commit_time = 2022-03-17
first_commit_message = "A screaming comes across the sky"
+++

A Bash script to decode/encode morse code. Slightly buggy and very, very slow. Could also be used as an extremely unpleasant way to uppercase text.

## Installation

Just put the `morsh` script in your `~/bin`. 

## Fancy installation

Clone the repo and put a symlink to the `morsh` script in your `~/bin`. 

## Usage examples

Quickly decode a message from some ancient online puzzle game:

```bash
./morsh ...- --- --- -.. --- --- / -- .- --. .. -.-.
```

Awkwardly uppercase a sentence (removing punctuation, diacritics and fluff in the process):

```bash
echo "I Have No Mouth, and I Must Scream" | ./morsh -e | ./morsh -d
```

Turn Crime and Punishment into something you can reliably broadcast to your entire neighborhood with a simple signal horn and some patience:

```bash
curl https://gutenberg.org/files/2554/2554-0.txt | ./morsh --encode | less
```
