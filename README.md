# Céim: primary school practice

Free Maths, English and Gaeilge practice for Irish students, from Junior Infants to Sixth Class and on through First, Second and Third Year to the Junior Cert.
281 skills (Maths 138, English 99, Gaeilge 44): Maths questions are generated fresh every time; English and Gaeilge questions come from word and sentence lists.
No accounts, no ads, no tracking. Stars are saved in the browser (localStorage) only.

## Files
- `index.html`: the page shell
- `css/style.css`: the design
- `js/util.js`: helpers and the list of classes/subjects
- `js/maths.js`, `js/maths2.js`, `js/english.js`, `js/english2.js`, `js/gaeilge.js`: primary skills, grouped by class
- `js/junior-maths.js`, `js/junior-english.js`, `js/junior-gaeilge.js`: Junior Cycle skills (classes `y1`, `y2`, `y3`)
  (load order matters: the part-2 files add more skills after the first files)
- `js/app.js`: home, class pages, practice rounds, stars, Parents & teachers page (contact email at the top)
- `sw.js`, `manifest.webmanifest`, `icons/`: offline support and app install

## Adding a skill
In the subject file, find the class (e.g. `CEIM.add("c3", "english", [ ... ])`) and add an item to the list.
Vocabulary lists in `gaeilge.js` are simple `["Irish", "English", "emoji"]` rows.

## Publish
GitHub Pages: Settings -> Pages -> Deploy from a branch -> main / (root).
