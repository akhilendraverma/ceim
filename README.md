# Céim: primary school practice

Free Maths, English and Gaeilge practice for Irish primary school children, Junior Infants to Sixth Class.
102 skills: Maths questions are generated fresh every time; English and Gaeilge questions come from word and sentence lists.
No accounts, no ads, no tracking. Stars are saved in the browser (localStorage) only.

## Files
- `index.html`: the page shell
- `css/style.css`: the design
- `js/util.js`: helpers and the list of classes/subjects
- `js/maths.js`, `js/english.js`, `js/gaeilge.js`: the skills, grouped by class
- `js/app.js`: home, class pages, practice rounds, stars, Parents & teachers page (contact email at the top)
- `sw.js`, `manifest.webmanifest`, `icons/`: offline support and app install

## Adding a skill
In the subject file, find the class (e.g. `CEIM.add("c3", "english", [ ... ])`) and add an item to the list.
Vocabulary lists in `gaeilge.js` are simple `["Irish", "English", "emoji"]` rows.

## Publish
GitHub Pages: Settings -> Pages -> Deploy from a branch -> main / (root).
