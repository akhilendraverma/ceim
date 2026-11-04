/* Céim: English, part 2. More skills for every class. */
(() => {
  const { pick, shuffle, mc, sample, R } = U;
  const bank = (title, desc, items, make) => ({ title, desc, gen() { return make(pick(items), items); } });
  const fill = (s) => s.replace("___", '<span class="blank">____</span>');
  const pair = (title, desc, rows, ask, explainFn) => bank(title, desc, rows, ([a, b], all) => ({
    type: "mc", prompt: ask(a), choices: mc(b, all.map((x) => x[1])), answer: b, explain: explainFn ? explainFn(a, b) : `${a} → ${b}`,
  }));
  /** Sentence blanks: rows are [sentence with ___, answer, [wrongs]] */
  const blanks = (title, desc, rows) => bank(title, desc, rows, ([s, ok, wrong]) => ({
    type: "mc", prompt: fill(s), choices: shuffle([ok, ...wrong]), answer: ok, explain: s.replace("___", ok),
  }));
  /** Find-the-word: rows are [sentence, answer]; choices are other words in the sentence. */
  const STOP = new Set(["the", "a", "an", "and", "to", "in", "on", "of", "at", "my", "his", "her", "our", "is", "was", "i", "we", "they", "he", "she", "it"]);
  const findWord = (title, desc, label, rows) => bank(title, desc, rows, ([s, w]) => {
    const words = [...new Set(s.replace(/[.,!?]/g, "").split(" ").filter((x) => !STOP.has(x.toLowerCase()) && x !== w))];
    return { type: "mc", prompt: `Which word is the <b>${label}</b>?<br>“${s}”`, choices: shuffle([w, ...sample(words, 3)]), answer: w,
      explain: `“${w}” is the ${label}.` };
  });

  // ---------------- Junior Infants ----------------
  const LAST = [["🐱", "cat"], ["🐶", "dog"], ["☀️", "sun"], ["🚌", "bus"], ["🎩", "hat"], ["🐷", "pig"], ["🛏️", "bed"], ["🦊", "fox"],
    ["☕", "cup"], ["🗺️", "map"], ["🐔", "hen"], ["🕸️", "web"]];
  const COLOURS = [["🔴", "red"], ["🔵", "blue"], ["🟢", "green"], ["🟡", "yellow"], ["🟠", "orange"], ["🟣", "purple"], ["⚫", "black"], ["⚪", "white"], ["🟤", "brown"]];
  const PICS = [["🐱", "cat"], ["🐶", "dog"], ["🐟", "fish"], ["🐝", "bee"], ["🐮", "cow"], ["🐷", "pig"], ["🦆", "duck"], ["🐸", "frog"],
    ["🍎", "apple"], ["🚗", "car"], ["🌳", "tree"], ["⭐", "star"], ["🌙", "moon"], ["🏠", "house"]];
  const SYLL = [["cat", 1], ["dog", 1], ["sun", 1], ["apple", 2], ["rabbit", 2], ["pencil", 2], ["tiger", 2], ["monkey", 2],
    ["banana", 3], ["elephant", 3], ["butterfly", 3], ["umbrella", 3], ["dinosaur", 3], ["caterpillar", 4], ["watermelon", 4]];

  CEIM.add("ji", "english", [
    bank("Last sounds", "What sound does it end with?", LAST, ([e, w]) => ({
      type: "mc", prompt: "What sound does this end with?", visual: `<div class="big-emoji">${e}</div><div class="word-hint">${w}</div>`, speak: w,
      choices: mc(w.at(-1), "bdfgmnpstx".split("")), answer: w.at(-1), explain: `${w} ends with “${w.at(-1)}”.` })),
    bank("Next letter", "a, b, c…", "abcdefghijklmnopqrstuvwxy".split(""), (l) => {
      const ans = String.fromCharCode(l.charCodeAt(0) + 1);
      return { type: "mc", prompt: `Which letter comes after <b>${l}</b>?`, choices: mc(ans, "abcdefghijklmnopqrstuvwxyz".split("")), answer: ans,
        explain: `${l}, ${ans}… in the alphabet.` };
    }),
    bank("Colour words", "Match colour to word", COLOURS, ([e, w], all) => ({
      type: "mc", prompt: "What colour is this?", visual: `<div class="big-emoji">${e}</div>`, speak: "What colour is this?",
      choices: mc(w, all.map((x) => x[1]), 3), answer: w, explain: `It is ${w}.` })),
    bank("Picture words", "Which word matches?", PICS, ([e, w], all) => ({
      type: "mc", prompt: "Which word matches the picture?", visual: `<div class="big-emoji">${e}</div>`, speak: "Which word matches the picture?",
      choices: mc(w, all.map((x) => x[1]), 3), answer: w, explain: `It is a ${w}.` })),
    bank("Clap the syllables", "How many beats?", SYLL, ([w, n]) => ({
      type: "mc", prompt: `Clap it out! How many beats (syllables) in <b>${w}</b>?`, speak: w, choices: ["1", "2", "3", "4"], answer: String(n),
      explain: `${w} has ${n} beat${n > 1 ? "s" : ""}.` })),
  ]);

  // ---------------- Senior Infants ----------------
  const DIGRAPH = [["🐑", "sheep", "sh"], ["🚢", "ship", "sh"], ["👟", "shoe", "sh"], ["🐚", "shell", "sh"], ["🐤", "chick", "ch"], ["🧀", "cheese", "ch"],
    ["🪑", "chair", "ch"], ["🍒", "cherry", "ch"], ["👍", "thumb", "th"], ["3️⃣", "three", "th"], ["🧵", "thread", "th"]];
  const SIGHT = [["the", ["teh", "th"]], ["said", ["sed", "siad"]], ["was", ["wos", "wuz"]], ["they", ["thay", "tey"]], ["you", ["yuo", "yu"]],
    ["are", ["ar", "aer"]], ["come", ["cum", "coem"]], ["some", ["sum", "soem"]], ["here", ["hear", "heer"]], ["have", ["hav", "haev"]],
    ["what", ["wot", "whot"]], ["one", ["won", "wun"]], ["two", ["tow", "tu"]], ["there", ["thare", "ther"]]];
  const RHYME_SETS = [["cat", "hat", "mat", "bat"], ["pen", "hen", "ten", "men"], ["log", "dog", "frog", "jog"], ["sun", "bun", "run", "fun"],
    ["cake", "lake", "bake", "snake"], ["bed", "red", "fed", "shed"], ["pig", "wig", "dig", "big"], ["ring", "king", "sing", "wing"]];
  const NAMES = ["Aoife", "Seán", "Priya", "Liam", "Niamh", "Arjun", "Ciara", "Oisín", "Ananya", "Conor", "Róisín", "Ravi"];

  CEIM.add("si", "english", [
    bank("sh, ch or th?", "Two letters, one sound", DIGRAPH, ([e, w, d]) => ({
      type: "mc", prompt: "Which sound does it start with?", visual: `<div class="big-emoji">${e}</div><div class="word-hint">__${w.slice(2)}</div>`, speak: w,
      choices: ["sh", "ch", "th"], answer: d, explain: `${w} starts with “${d}”.` })),
    bank("Tricky words", "Which is spelt correctly?", SIGHT, ([w, wrong]) => ({
      type: "mc", prompt: "Which word is spelt correctly?", speak: w, choices: shuffle([w, ...wrong]), answer: w, explain: `The correct spelling is “${w}”.` })),
    bank("Which does not rhyme?", "Odd one out", RHYME_SETS, (set, all) => {
      const odd = pick(pick(all.filter((s) => s !== set)));
      const three = sample(set, 3);
      return { type: "mc", prompt: "Which word does <b>not</b> rhyme with the others?", choices: shuffle([...three, odd]), answer: odd,
        explain: `${three.join(", ")} rhyme. ${odd} does not.` };
    }),
    bank("Names need capitals", "Pick the correct name", NAMES, (n) => ({
      type: "mc", prompt: "Which name is written correctly?", choices: shuffle([n, n.toLowerCase(), n[0].toLowerCase() + n.slice(1).toUpperCase()]), answer: n,
      explain: "Names start with a capital letter." })),
    bank("Animal words", "Read the word", [["🐴", "horse"], ["🐑", "sheep"], ["🐐", "goat"], ["🦉", "owl"], ["🐻", "bear"], ["🦁", "lion"],
      ["🐯", "tiger"], ["🐭", "mouse"], ["🐰", "rabbit"], ["🐍", "snake"], ["🦊", "fox"], ["🐼", "panda"]], ([e, w], all) => ({
      type: "mc", prompt: "Which word matches the animal?", visual: `<div class="big-emoji">${e}</div>`, choices: mc(w, all.map((x) => x[1]), 3), answer: w,
      explain: `It is a ${w}.` })),
  ]);

  // ---------------- First Class ----------------
  const VOWEL_TEAM = [["🌳", "tr__", "ee"], ["🌙", "m__n", "oo"], ["🌧️", "r__n", "ai"], ["🐝", "b__", "ee"], ["🥄", "sp__n", "oo"], ["🚆", "tr__n", "ai"],
    ["🐑", "sh__p", "ee"], ["🐌", "sn__l", "ai"], ["👢", "b__t", "oo"], ["🦶", "f__t", "ee"], ["🐟", "f__sh", "i"]].filter((x) => x[2] !== "i");
  const QWORDS = [["___ is your name?", "What"], ["___ do you live?", "Where"], ["___ is your birthday?", "When"], ["___ is at the door?", "Who"],
    ["___ are you crying?", "Why"], ["___ old are you?", "How"], ["___ did you put my book?", "Where"], ["___ time is it?", "What"], ["___ is your teacher?", "Who"]];
  const DAYS = [["Wednesday", ["Wensday", "Wednsday"]], ["Tuesday", ["Teusday", "Tusday"]], ["Thursday", ["Thrusday", "Thirsday"]],
    ["Saturday", ["Saterday", "Saturdy"]], ["February", ["Febuary", "Febrary"]], ["Friday", ["Fryday", "Firday"]], ["Monday", ["Munday", "Mondey"]]];
  const DESCRIBE = [["🔥", "hot"], ["❄️", "cold"], ["🐘", "big"], ["🐜", "tiny"], ["🐢", "slow"], ["🚀", "fast"], ["😃", "happy"], ["😢", "sad"],
    ["🍋", "sour"], ["🍰", "sweet"], ["🦒", "tall"], ["🌵", "spiky"]];
  const AAN = ["apple", "dog", "egg", "umbrella", "banana", "orange", "cat", "ice cream", "owl", "hat", "elephant", "pencil", "insect", "bus", "octopus"];
  const ING = [["jump", "jumping", ["jumpping", "jumpeing"]], ["run", "running", ["runing", "runeing"]], ["make", "making", ["makeing", "makking"]],
    ["swim", "swimming", ["swiming", "swimeing"]], ["play", "playing", ["plaing", "playying"]], ["ride", "riding", ["rideing", "ridding"]],
    ["sit", "sitting", ["siting", "siteing"]], ["read", "reading", ["readding", "reding"]], ["write", "writing", ["writeing", "writting"]], ["sing", "singing", ["singging", "singeing"]]];

  CEIM.add("c1", "english", [
    bank("ee, oo or ai?", "Vowel teams", VOWEL_TEAM, ([e, w, t]) => ({
      type: "mc", prompt: "Which letters are missing?", visual: `<div class="big-emoji">${e}</div><div class="word-hint">${w}</div>`, speak: w.replace("__", t),
      choices: ["ee", "oo", "ai"], answer: t, explain: `The word is ${w.replace("__", t)}.` })),
    bank("Question words", "who, what, where, when, why, how", QWORDS, ([s, w]) => ({
      type: "mc", prompt: fill(s), choices: mc(w, ["Who", "What", "Where", "When", "Why", "How"]), answer: w, explain: s.replace("___", w) })),
    bank("Spell the days and months", "Tricky spellings", DAYS, ([w, wrong]) => ({
      type: "mc", prompt: "Which is spelt correctly?", choices: shuffle([w, ...wrong]), answer: w, explain: `The correct spelling is ${w}.` })),
    bank("Describing pictures", "Pick the best describing word", DESCRIBE, ([e, w], all) => ({
      type: "mc", prompt: "Which word best describes this?", visual: `<div class="big-emoji">${e}</div>`, choices: mc(w, all.map((x) => x[1]), 3), answer: w,
      explain: `It is ${w}.` })),
    bank("a or an?", "an before a vowel sound", AAN, (w) => {
      const ans = /^[aeiou]/.test(w) ? "an" : "a";
      return { type: "mc", prompt: `<span class="blank">__</span> ${w}`, choices: ["a", "an"], answer: ans,
        explain: ans === "an" ? `“${w}” starts with a vowel sound, so use “an”.` : `“${w}” starts with a consonant sound, so use “a”.` };
    }),
    bank("Adding -ing", "jump → jumping", ING, ([w, ok, wrong]) => ({
      type: "mc", prompt: `Add <b>-ing</b> to <b>${w}</b>.`, choices: shuffle([ok, ...wrong]), answer: ok,
      explain: /([bcdfgmnprt])\1ing$/.test(ok) ? `Short word with one vowel: double the last letter, then add -ing: ${ok}.` : w.endsWith("e") ? `Drop the “e”, then add -ing: ${ok}.` : `Just add -ing: ${ok}.` })),
  ]);

  // ---------------- Second Class ----------------
  const SILENT = [["knee", "k"], ["lamb", "b"], ["write", "w"], ["knife", "k"], ["thumb", "b"], ["wrist", "w"], ["knock", "k"], ["comb", "b"],
    ["wrong", "w"], ["climb", "b"], ["gnome", "g"], ["wrap", "w"], ["knot", "k"]];
  const SECOND = [["cat", "cow", "cup"], ["bat", "bed", "bus"], ["dig", "dog", "duck"], ["map", "milk", "mud"], ["pan", "pen", "pot"], ["sad", "sing", "sun"],
    ["tap", "ten", "top"], ["hat", "hen", "hug"], ["rat", "red", "run"], ["fan", "fish", "fox"]];
  const PL_Y = [["baby", "babies"], ["lady", "ladies"], ["party", "parties"], ["puppy", "puppies"], ["story", "stories"], ["city", "cities"],
    ["boy", "boys"], ["day", "days"], ["key", "keys"], ["toy", "toys"], ["monkey", "monkeys"], ["fly", "flies"]];
  const COMP = [["This tree is ___ than that one. (tall)", "taller", ["tallest", "more tall"]], ["An elephant is ___ than a mouse. (big)", "bigger", ["biggest", "biger"]],
    ["She is the ___ girl in the class. (fast)", "fastest", ["faster", "fastier"]], ["Today is ___ than yesterday. (hot)", "hotter", ["hoter", "hottest"]],
    ["This is the ___ day of my life! (happy)", "happiest", ["happyest", "happier"]], ["My painting is ___ than yours. (good)", "better", ["gooder", "best"]],
    ["That was the ___ film ever. (bad)", "worst", ["baddest", "worse"]], ["A cheetah is ___ than a horse. (quick)", "quicker", ["quickest", "more quick"]]];
  const PRON = [["Mary is my friend. ___ is kind.", "She", ["He", "They"]], ["Tom plays football. ___ is fast.", "He", ["She", "It"]],
    ["The dogs are hungry. ___ want food.", "They", ["It", "We"]], ["The book is new. ___ is on the table.", "It", ["They", "She"]],
    ["Dad and I went fishing. ___ caught a fish.", "We", ["They", "Us"]], ["Can you help ___? (me)", "me", ["I", "my"]],
    ["Granny is here. Say hello to ___.", "her", ["she", "hers"]], ["The children are outside. Call ___ in.", "them", ["they", "their"]]];

  CEIM.add("c2", "english", [
    bank("Silent letters", "kn, wr, mb…", SILENT, ([w, l]) => ({
      type: "mc", prompt: `Which letter is <b>silent</b> in <b>${w}</b>?`, speak: w, choices: mc(l, w.split("").filter((c) => c !== l && c !== "e"), 3), answer: l,
      explain: `In “${w}” you don't hear the “${l}”.` })),
    bank("ABC order: second letter", "When words start the same", SECOND, (set) => ({
      type: "mc", prompt: "Which word comes first in ABC order?", choices: shuffle(set), answer: [...set].sort()[0],
      explain: "They all start with the same letter, so look at the second letter." })),
    bank("Plurals with y", "babies, boys", PL_Y, ([one, many]) => ({
      type: "mc", prompt: `One ${one}, two <span class="blank">____</span>`, choices: mc(many, [one + "s", one.slice(0, -1) + "ies", one + "es"], 3), answer: many,
      explain: many.endsWith("ies") ? `A consonant before “y”: change y to ies (${many}).` : `A vowel before “y”: just add s (${many}).` })),
    blanks("Comparing words", "taller, tallest", COMP),
    blanks("Pronouns", "he, she, it, they…", PRON),
    findWord("Nouns", "Naming words", "noun", [["The cat is sleeping.", "cat"], ["My brother is very tall.", "brother"], ["We went to the beach.", "beach"],
      ["She opened the window.", "window"], ["The baby is asleep.", "baby"], ["He kicked the ball.", "ball"], ["Our teacher is funny.", "teacher"], ["I lost my pencil.", "pencil"]]),
  ]);

  // ---------------- Third Class ----------------
  const ADV = [["She sang loudly.", "loudly"], ["The tortoise walked slowly.", "slowly"], ["He quickly ate his lunch.", "quickly"], ["They played happily.", "happily"],
    ["The baby slept peacefully.", "peacefully"], ["She carefully carried the eggs.", "carefully"], ["The dog barked angrily.", "angrily"], ["He whispered quietly.", "quietly"]];
  const COLL = [["a ___ of cows", "herd"], ["a ___ of sheep", "flock"], ["a ___ of bees", "swarm"], ["a ___ of fish", "shoal"], ["a ___ of wolves", "pack"],
    ["a ___ of lions", "pride"], ["a ___ of flowers", "bunch"], ["a ___ of players", "team"], ["a ___ of puppies", "litter"], ["a ___ of ships", "fleet"], ["a ___ of birds", "flock"]];
  const IRREG = [["child", "children"], ["mouse", "mice"], ["foot", "feet"], ["tooth", "teeth"], ["man", "men"], ["woman", "women"], ["goose", "geese"],
    ["sheep", "sheep"], ["person", "people"], ["fish", "fish"]];
  const GENDER = [["king", "queen"], ["prince", "princess"], ["uncle", "aunt"], ["nephew", "niece"], ["son", "daughter"], ["husband", "wife"],
    ["brother", "sister"], ["actor", "actress"], ["bull", "cow"], ["waiter", "waitress"], ["grandfather", "grandmother"], ["boy", "girl"]];
  const SPEECH = [
    ["“Come here,” said Mum.", ["“Come here, said Mum.”", "Come here, “said Mum.”"]],
    ["“Can I play?” asked Liam.", ["“Can I play? asked Liam.”", "Can I play? “asked Liam.”"]],
    ["Aoife shouted, “Watch out!”", ["Aoife shouted, Watch out!", "“Aoife shouted, Watch out!”"]],
    ["“I'm hungry,” said Ravi.", ["“I'm hungry, said Ravi.”", "I'm hungry, “said Ravi.”"]],
    ["The teacher said, “Line up, please.”", ["The teacher said, Line up, please.", "“The teacher said, Line up, please.”"]],
    ["“Where is my bag?” asked Niamh.", ["Where is my bag? “asked Niamh.”", "“Where is my bag? asked Niamh.”"]]];

  CEIM.add("c3", "english", [
    findWord("Verbs", "Doing words in sentences", "verb", [["The dog chased the ball.", "chased"], ["Aoife painted a picture.", "painted"], ["We climbed the hill.", "climbed"],
      ["The bird sings every morning.", "sings"], ["He threw the stone.", "threw"], ["They built a sandcastle.", "built"], ["I drink milk every day.", "drink"], ["The baby cried all night.", "cried"]]),
    bank("Adverbs", "Words that tell how", ADV, ([s, w]) => {
      const words = s.replace(/[.]/g, "").split(" ").filter((x) => x !== w && !["The", "She", "He", "They", "his", "the"].includes(x));
      return { type: "mc", prompt: `Which word tells <b>how</b>?<br>“${s}”`, choices: shuffle([w, ...sample(words, Math.min(2, words.length))]), answer: w,
        explain: `“${w}” is an adverb. It tells how.` };
    }),
    bank("Collective nouns", "A herd of cows", COLL, ([s, w]) => ({
      type: "mc", prompt: fill(s), choices: mc(w, ["herd", "flock", "swarm", "shoal", "pack", "pride", "bunch", "team", "litter", "fleet"]),
      answer: w, explain: s.replace("___", w) })),
    bank("Irregular plurals", "child → children", IRREG, ([one, many]) => ({
      type: "mc", prompt: `One ${one}, two <span class="blank">____</span>`, choices: shuffle([...new Set([many, one + "s", one + "es"])]), answer: many,
      explain: `The plural of ${one} is ${many}.` })),
    pair("Male and female words", "king and queen", GENDER, (a) => `What is the female word for <b>${a}</b>?`, (a, b) => `${a} → ${b}`),
    bank("Speech marks", "Who said what?", SPEECH, ([ok, wrong]) => ({
      type: "mc", prompt: "Which sentence uses speech marks correctly?", choices: shuffle([ok, ...wrong]), answer: ok,
      explain: "Speech marks go around the words that are actually spoken." })),
  ]);

  // ---------------- Fourth Class ----------------
  const PROPER = [["Dublin", ["city", "river", "town"]], ["Monday", ["day", "week", "morning"]], ["Shannon", ["river", "lake", "sea"]],
    ["December", ["month", "winter", "year"]], ["Ireland", ["country", "island", "map"]], ["Diwali", ["festival", "party", "holiday"]],
    ["Croke Park", ["stadium", "pitch", "match"]], ["India", ["country", "flag", "place"]]];
  const HOMO2 = [["I can ___ the birds singing.", "hear", ["here"]], ["Come over ___!", "here", ["hear"]], ["We swam in the ___.", "sea", ["see"]],
    ["Please ___ your name.", "write", ["right"]], ["Turn ___ at the shop.", "right", ["write"]], ["I ___ my lunch.", "ate", ["eight"]],
    ["There are ___ legs on a spider.", "eight", ["ate"]], ["We need ___ to bake a cake.", "flour", ["flower"]], ["A rose is a ___.", "flower", ["flour"]],
    ["The ___ rode a horse.", "knight", ["night"]], ["The ___ is very dark.", "night", ["knight"]], ["I ate a juicy ___.", "pear", ["pair"]], ["I need a new ___ of shoes.", "pair", ["pear"]]];
  const ABBR = [["Dr", "Doctor"], ["Mr", "Mister"], ["St", "Street (or Saint)"], ["Rd", "Road"], ["Feb", "February"], ["Mon", "Monday"], ["km", "kilometre"],
    ["cm", "centimetre"], ["kg", "kilogram"], ["e.g.", "for example"], ["etc.", "and so on"], ["Ave", "Avenue"]];
  const TYPES = [["Close the door.", "command"], ["The sky is blue.", "statement"], ["Are you coming?", "question"], ["What a great goal!", "exclamation"],
    ["Sit down, please.", "command"], ["I have two sisters.", "statement"], ["Where do you live?", "question"], ["How amazing!", "exclamation"],
    ["Wash your hands.", "command"], ["It rained all day.", "statement"], ["Did you see that?", "question"], ["What a mess!", "exclamation"]];
  const ROOT = [["unhappiness", "happy"], ["replayed", "play"], ["careless", "care"], ["kindness", "kind"], ["disagreement", "agree"], ["helpful", "help"],
    ["rewritten", "write"], ["uncomfortable", "comfort"], ["misunderstood", "understand"], ["preview", "view"], ["painter", "paint"], ["unlocked", "lock"]];

  CEIM.add("c4", "english", [
    findWord("Prepositions", "on, under, behind…", "preposition", [["The cat hid under the bed.", "under"], ["We walked through the forest.", "through"],
      ["The ball is behind the wall.", "behind"], ["He jumped over the fence.", "over"], ["She sat between her friends.", "between"],
      ["The plane flew above the clouds.", "above"], ["They waited outside the shop.", "outside"], ["I put my book inside my bag.", "inside"]]),
    bank("Proper nouns", "Names need capital letters", PROPER, ([p, common]) => ({
      type: "mc", prompt: "Which is a <b>proper noun</b>?", choices: shuffle([p, ...common]), answer: p,
      explain: `${p} is the name of one particular thing, so it's a proper noun and has a capital letter.` })),
    blanks("Homophones", "hear/here, see/sea…", HOMO2),
    pair("Abbreviations", "Dr, Mr, km…", ABBR, (a) => `What does <b>${a}</b> stand for?`, (a, b) => `${a} = ${b}`),
    bank("Types of sentences", "Statement, question, command, exclamation", TYPES, ([s, t]) => ({
      type: "mc", prompt: `“${s}”<br>What type of sentence is this?`, choices: ["statement", "question", "command", "exclamation"], answer: t,
      explain: { statement: "It tells you something.", question: "It asks something.", command: "It tells someone to do something.", exclamation: "It shows strong feeling." }[t] })),
    pair("Root words", "unhappiness → happy", ROOT, (a) => `What is the <b>root word</b> of <b>${a}</b>?`, (a, b) => `${a} is built from “${b}”.`),
  ]);

  // ---------------- Fifth Class ----------------
  const REPORTED = [["She said that she was tired.", "reported"], ["“I am tired,” she said.", "direct"], ["He told me he would be late.", "reported"],
    ["“I'll be late,” he said.", "direct"], ["They asked if they could go.", "reported"], ["“Can we go?” they asked.", "direct"],
    ["Mum said we had to tidy up.", "reported"], ["“Tidy up now,” said Mum.", "direct"]];
  const REL = [["The boy ___ won the race is my cousin.", "who", ["which", "whose"]], ["The book ___ I read was great.", "which", ["who", "whose"]],
    ["That's the girl ___ dog barks all night.", "whose", ["who", "which"]], ["The teacher ___ helped me is kind.", "who", ["which", "whose"]],
    ["The bike, ___ was red, was stolen.", "which", ["who", "whose"]], ["The man ___ car broke down called for help.", "whose", ["who", "which"]]];
  const APOS2 = [["the girl's coat", "belonging"], ["can't", "missing letters"], ["the dog's bone", "belonging"], ["I'm", "missing letters"],
    ["Seán's bike", "belonging"], ["won't", "missing letters"], ["the teacher's desk", "belonging"], ["they're", "missing letters"], ["Dad's car", "belonging"], ["it's", "missing letters"]];
  const PREF = [["pre-", "before"], ["sub-", "under"], ["mis-", "wrongly"], ["re-", "again"], ["anti-", "against"], ["tri-", "three"], ["bi-", "two"],
    ["inter-", "between"], ["auto-", "self"], ["super-", "above or more"], ["trans-", "across"], ["micro-", "very small"]];
  const IEEI = [["receive", ["recieve"]], ["believe", ["beleive"]], ["friend", ["freind"]], ["ceiling", ["cieling"]], ["piece", ["peice"]], ["weird", ["wierd"]],
    ["field", ["feild"]], ["neighbour", ["nieghbour"]], ["their", ["thier"]], ["science", ["sceince"]], ["receipt", ["reciept"]], ["chief", ["cheif"]]];
  const LISTS = [["apples", "pears", "bananas", "grapes"], ["red", "blue", "green", "yellow"], ["Aoife", "Liam", "Priya", "Conor"], ["Cork", "Galway", "Sligo", "Kerry"],
    ["pens", "pencils", "rulers", "rubbers"], ["football", "hurling", "cricket", "tennis"]];

  CEIM.add("c5", "english", [
    bank("Direct or reported speech", "Speech marks or not?", REPORTED, ([s, t]) => ({
      type: "mc", prompt: `“${s.replace(/[“”]/g, "'")}”<br>Is this direct speech or reported speech?`, choices: ["direct", "reported"], answer: t,
      explain: t === "direct" ? "It gives the exact words spoken, in speech marks." : "It tells us what was said without the exact words." })),
    blanks("who, which, whose", "Relative pronouns", REL),
    bank("Why the apostrophe?", "Belonging or missing letters", APOS2, ([w, t]) => ({
      type: "mc", prompt: `In <b>${w}</b>, what does the apostrophe show?`, choices: ["belonging", "missing letters"], answer: t,
      explain: t === "belonging" ? "It shows that something belongs to someone." : "It shows where letters have been left out." })),
    pair("Prefix meanings", "pre-, sub-, tri-…", PREF, (a) => `What does the prefix <b>${a}</b> mean?`, (a, b) => `${a} means “${b}”.`),
    bank("ie or ei?", "Tricky spellings", IEEI, ([w, wrong]) => ({
      type: "mc", prompt: "Which is spelt correctly?", choices: shuffle([w, ...wrong]), answer: w, explain: `The correct spelling is “${w}”.` })),
    bank("Commas in lists", "Pick the correct sentence", LISTS, (l) => {
      const ok = `I like ${l[0]}, ${l[1]}, ${l[2]} and ${l[3]}.`;
      const wrongs = [`I like ${l[0]} ${l[1]} ${l[2]} and ${l[3]}.`, `I like, ${l[0]}, ${l[1]}, ${l[2]}, and, ${l[3]}.`, `I like ${l[0]}, ${l[1]} ${l[2]}, and ${l[3]}`];
      return { type: "mc", prompt: "Which sentence uses commas correctly?", choices: shuffle([ok, ...wrongs]), answer: ok,
        explain: "Put a comma between items in a list, with “and” before the last one, and end with a full stop." };
    }),
  ]);

  // ---------------- Sixth Class ----------------
  const VOICE = [["The dog chased the cat.", "active"], ["The cat was chased by the dog.", "passive"], ["Aoife wrote the story.", "active"],
    ["The story was written by Aoife.", "passive"], ["The storm damaged the roof.", "active"], ["The roof was damaged by the storm.", "passive"],
    ["Our team won the cup.", "active"], ["The cup was won by our team.", "passive"], ["The chef cooked the dinner.", "active"], ["The dinner was cooked by the chef.", "passive"]];
  const CLAUSE = [["Although it was raining, we played outside.", "Although it was raining"], ["We stayed in because it was cold.", "because it was cold"],
    ["When the bell rang, everyone ran out.", "When the bell rang"], ["I'll help you if you ask nicely.", "if you ask nicely"],
    ["She smiled while she read the letter.", "while she read the letter"], ["Before we eat, we wash our hands.", "Before we eat"]];
  const PUNC = [["I have three pets___ a dog, a cat and a rabbit.", ":", "A colon introduces a list."], ["It was late___ we went home.", ";", "A semicolon joins two closely linked sentences."],
    ["You need three things___ a pen, a ruler and a copy.", ":", "A colon introduces a list."], ["Some people love rain___ others hate it.", ";", "A semicolon joins two closely linked sentences."],
    ["She had one dream___ to play for Ireland.", ":", "A colon introduces an explanation."], ["The match was over___ we had won.", ";", "A semicolon joins two closely linked sentences."]];
  const SPELL = [["necessary", ["neccessary", "necesary"]], ["separate", ["seperate", "separete"]], ["definitely", ["definately", "definitly"]],
    ["accommodation", ["accomodation", "acommodation"]], ["embarrass", ["embarass", "embaras"]], ["rhythm", ["rythm", "rhythym"]],
    ["conscience", ["concience", "conscence"]], ["government", ["goverment", "govenment"]], ["library", ["libary", "liberry"]],
    ["environment", ["enviroment", "envirnment"]], ["occasion", ["occassion", "ocasion"]], ["tomorrow", ["tommorow", "tomorow"]]];
  const ROOTS = [["aqua", "aquarium", "water"], ["bio", "biology", "life"], ["geo", "geography", "earth"], ["graph", "autograph", "write"], ["phon", "telephone", "sound"],
    ["tele", "television", "far"], ["port", "transport", "carry"], ["scope", "telescope", "look at"], ["therm", "thermometer", "heat"], ["photo", "photograph", "light"],
    ["dict", "dictionary", "say"], ["struct", "construct", "build"]];

  CEIM.add("c6", "english", [
    bank("Active or passive voice", "Who does the action?", VOICE, ([s, t]) => ({
      type: "mc", prompt: `“${s}”<br>Is this sentence active or passive?`, choices: ["active", "passive"], answer: t,
      explain: t === "active" ? "The subject does the action." : "The subject has the action done to it (often with “by”)." })),
    bank("Subordinate clauses", "The part that can't stand alone", CLAUSE, ([s, c]) => {
      const main = s.replace(c, "").replace(/^[,\s]+|[,\s.]+$/g, "");
      return { type: "mc", prompt: `“${s}”<br>Which part is the <b>subordinate clause</b>?`, choices: shuffle([c, main]), answer: c,
        explain: `“${c}” doesn't make sense on its own, so it's the subordinate clause.` };
    }),
    bank("Colon or semicolon?", ": and ;", PUNC, ([s, p, why]) => ({
      type: "mc", prompt: fill(s), choices: [":", ";", ","], answer: p, explain: why })),
    bank("Commonly misspelt words", "Spelling challenge", SPELL, ([w, wrong]) => ({
      type: "mc", prompt: "Which is spelt correctly?", choices: shuffle([w, ...wrong]), answer: w, explain: `The correct spelling is “${w}”.` })),
    bank("Greek and Latin roots", "What does the root mean?", ROOTS, ([r, ex, m], all) => ({
      type: "mc", prompt: `What does <b>${r}</b> mean in “${ex}”?`, choices: mc(m, all.map((x) => x[2])), answer: m, explain: `“${r}” means ${m}.` })),
  ]);
})();
