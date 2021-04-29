# Spitlo.github.io (spitlo.com)

This is my personal website, generated by [Zola](https://getzola.org) and hosted with GitHub pages under a custom domain (<https://spitlo.com>).

## Debug

To output all Tera variables in code, add this:

```html
  <!---{{ __tera_context }}--->
```

## To do

- [ ] Add controls for audio player
- [ ] Embed hidden audio links in pages that player can pick up on?
- [ ] Fix numbered links on startpage (starts from 1 on each new `<ul>`)
- [ ] Improve favicon
- [ ] Improve search
  - [ ] Implement search for mobile
  - [ ] Fix bug with search not working after editing query
  - [ ] Add ellipsis in front of cropped text
- [ ] Make font smaller in SVG titles (text overlaps in Tor Browser)
- [ ] Randomize start page
- [ ] Switch to using OGG instead of MP3 for audio?
- [x] Add favicon
- [x] Add `first_commit` date to code projects
- [x] Create a start page
- [x] Finish tags landing page
- [x] Finish tech tags page
- [x] Implement keyboard navigation
  - [x] Command mode ("`:`")
  - [x] Help ("`?`")
  - [x] Menu items ("`H`", "`C`", "`M`", "`T`")
  - [x] Search ("`/`")
  - [x] `1`-`9` triggers the first nine links in content area
  - [x] ~~Command palette ("`Shift`+`Cmd/Ctrl`+`p`")~~
  - [x] ~~Expand TOCs~~
- [x] Implement search?
- [x] In the heel, always put a right-aligned `$white` shape to connect with the "cloud" in the footer
- [x] Styling for Previous/Next article links
- [x] Update the ~~`balls`~~ `shapes` macro to take a ~~`shape`~~ `type` argument, to match the squares and triangles of the header and footer
- [x] Use `word_count` to decide whether to show a TOC or not
- [x] ~~Create GitHub action that deploys site only when editing files directly in GitHub. Possible?~~ Use `workflow_dispatch` to enable deploys from GitHub
