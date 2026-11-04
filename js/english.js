/* Céim: English. Questions are drawn at random from word and sentence lists for each class. */
(() => {
  const { pick, shuffle, mc, sample } = U;

  /** Build a skill from a list of items: each item -> question. */
  const bank = (title, desc, items, make) => ({ title, desc, gen() { return make(pick(items), items); } });
  const fill = (s) => s.replace("___", '<span class="blank">____</span>');

  // ---------------- Junior Infants ----------------
  const LETTERS = [["🍎", "apple"], ["⚽", "ball"], ["🐱", "cat"], ["🐶", "dog"], ["🥚", "egg"], ["🐟", "fish"], ["🐐", "goat"],
    ["🎩", "hat"], ["🔑", "key"], ["🦁", "lion"], ["🌙", "moon"], ["👃", "nose"], ["🐙", "octopus"], ["🐷", "pig"],
    ["🐰", "rabbit"], ["☀️", "sun"], ["🌳", "tree"], ["☂️", "umbrella"], ["🎻", "violin"], ["🐋", "whale"], ["🦓", "zebra"]];
  const RHYMES = [["cat", "hat", "mat"], ["dog", "log", "frog"], ["sun", "bun", "run"], ["pig", "wig", "dig"], ["bee", "tree", "see"],
    ["cake", "lake", "snake"], ["fish", "dish", "wish"], ["car", "star", "jar"], ["bed", "red", "shed"], ["mouse", "house"],
    ["goat", "coat", "boat"], ["hen", "pen", "ten"], ["ball", "wall", "tall"], ["moon", "spoon", "soon"], ["king", "ring", "sing"]];

  CEIM.add("ji", "english", [
    bank("First sounds", "What letter does it start with?", LETTERS, ([e, w]) => ({
      type: "mc", prompt: "What sound does this start with?", visual: `<div class="big-emoji">${e}</div><div class="word-hint">${w}</div>`,
      speak: w, choices: mc(w[0], "abcdefghijklmnoprstuvwz".split("")), answer: w[0], explain: `${w} starts with “${w[0]}”.`,
    })),
    bank("Rhyming words", "Which words sound the same at the end?", RHYMES, (set, all) => {
      const [a, b] = sample(set, 2);
      const wrongs = all.filter((s) => s !== set).map((s) => pick(s));
      return { type: "mc", prompt: `Which word rhymes with <b>${a}</b>?`, speak: `Which word rhymes with ${a}?`, choices: mc(b, wrongs, 3), answer: b, explain: `${a} and ${b} rhyme.` };
    }),
    bank("Big and small letters", "Match capital letters", "abcdefghijklmnopqrstuvwxyz".split(""), (l) => {
      const capital = Math.random() < 0.5;
      const ans = capital ? l.toUpperCase() : l;
      const pool = "abcdefghijklmnopqrstuvwxyz".split("").map((x) => (capital ? x.toUpperCase() : x));
      return { type: "mc", prompt: capital ? `Find the capital letter for <b>${l}</b>.` : `Find the small letter for <b>${l.toUpperCase()}</b>.`,
        choices: mc(ans, pool), answer: ans, explain: `${l.toUpperCase()} and ${l} are the same letter.` };
    }),
  ]);

  // ---------------- Senior Infants ----------------
  const CVC = [["🐱", "cat"], ["🐶", "dog"], ["🐷", "pig"], ["☀️", "sun"], ["🛏️", "bed"], ["🎩", "hat"], ["🚌", "bus"], ["🦊", "fox"],
    ["🐔", "hen"], ["☕", "cup"], ["🗺️", "map"], ["🐛", "bug"], ["🦇", "bat"], ["🥫", "tin"], ["🔟", "ten"]];
  const OPP = [["big", "small"], ["hot", "cold"], ["up", "down"], ["happy", "sad"], ["fast", "slow"], ["day", "night"], ["open", "closed"],
    ["wet", "dry"], ["full", "empty"], ["old", "new"], ["light", "dark"], ["in", "out"], ["top", "bottom"], ["yes", "no"], ["tall", "short"]];
  const GROUPS = {
    colour: ["red", "blue", "green", "yellow", "pink", "purple", "brown", "grey"],
    animal: ["dog", "cat", "cow", "horse", "sheep", "duck", "fox", "rabbit"],
    food: ["bread", "apple", "cheese", "banana", "soup", "rice", "carrot", "egg"],
  };

  CEIM.add("si", "english", [
    bank("Missing vowel", "a, e, i, o or u?", CVC, ([e, w]) => ({
      type: "mc", prompt: "Which letter is missing?", visual: `<div class="big-emoji">${e}</div><div class="word-hint">${w[0]} _ ${w[2]}</div>`,
      speak: w, choices: ["a", "e", "i", "o", "u"], answer: w[1], explain: `The word is ${w}.`,
    })),
    bank("Opposites", "big and small…", OPP, (pair, all) => {
      const [a, b] = Math.random() < 0.5 ? pair : [pair[1], pair[0]];
      return { type: "mc", prompt: `What is the opposite of <b>${a}</b>?`, speak: `What is the opposite of ${a}?`,
        choices: mc(b, all.filter((p) => p !== pair).flat(), 3), answer: b, explain: `${a} and ${b} are opposites.` };
    }),
    bank("Sort the words", "Colours, animals and food", Object.keys(GROUPS), (g) => {
      const ans = pick(GROUPS[g]);
      const wrongs = Object.keys(GROUPS).filter((k) => k !== g).flatMap((k) => GROUPS[k]);
      return { type: "mc", prompt: `Which word is ${g === "animal" ? "an" : "a"} <b>${g}</b>?`, speak: `Which word is a ${g}?`,
        choices: mc(ans, wrongs, 3), answer: ans, explain: `${ans} is ${g === "animal" ? "an" : "a"} ${g}.` };
    }),
  ]);

  // ---------------- First Class ----------------
  const PLURALS = [["cat", "cats"], ["dog", "dogs"], ["book", "books"], ["car", "cars"], ["tree", "trees"], ["box", "boxes"],
    ["bus", "buses"], ["fox", "foxes"], ["dish", "dishes"], ["brush", "brushes"], ["glass", "glasses"], ["bench", "benches"],
    ["hat", "hats"], ["sock", "socks"], ["witch", "witches"]];
  const ABC = ["apple", "bread", "cloud", "dance", "eagle", "farm", "garden", "house", "island", "jelly", "kite", "lemon", "milk",
    "nest", "orange", "puppy", "queen", "river", "seal", "table", "uncle", "van", "window", "yo-yo", "zoo"];
  const NAMES = ["Aoife", "Seán", "Priya", "Liam", "Niamh", "Arjun", "Ciara", "Oisín", "Ananya", "Conor"];
  const PLACES = ["park", "shop", "beach", "library", "farm", "zoo"];
  const VERBS = ["run", "jump", "swim", "sing", "read", "write", "kick", "climb", "eat", "sleep"];
  const NOUNS = ["table", "apple", "garden", "pencil", "window", "teacher", "rabbit", "shoe", "school", "flower"];

  CEIM.add("c1", "english", [
    bank("Plurals", "One cat, two cats", PLURALS, ([one, many]) => ({
      type: "mc", prompt: `One ${one}, two ${'<span class="blank">____</span>'}`, speak: `One ${one}, two what?`,
      choices: mc(many, [one + "s", one + "es", one, one + "ies"].filter((x) => x !== many), 3), answer: many,
      explain: many.endsWith("es") ? `Words ending in s, x, sh, ch or ss add “es”: ${many}.` : `Add “s”: ${many}.`,
    })),
    bank("ABC order", "Which word comes first?", [0], () => {
      const ws = sample(ABC, 3), first = [...ws].sort()[0];
      return { type: "mc", prompt: "Which word comes first in ABC order?", choices: shuffle(ws), answer: first,
        explain: `${first} starts with “${first[0]}”, which comes first in the alphabet.` };
    }),
    bank("Capital letters and full stops", "Pick the correct sentence", [0], () => {
      const n = pick(NAMES), p = pick(PLACES), ok = `${n} went to the ${p}.`;
      const wrongs = [`${n.toLowerCase()} went to the ${p}.`, `${n} went to the ${p}`, `${n} Went to the ${p}.`];
      return { type: "mc", prompt: "Which sentence is written correctly?", choices: shuffle([ok, ...wrongs]), answer: ok,
        explain: "A sentence starts with a capital letter, names have capital letters, and it ends with a full stop." };
    }),
    bank("Doing words", "Find the verb", VERBS, (v) => ({
      type: "mc", prompt: "Which word is a <b>doing word</b> (verb)?", choices: mc(v, NOUNS, 3), answer: v, explain: `“${v}” is something you can do.` })),
  ]);

  // ---------------- Second Class ----------------
  const PAST = [["go", "went", ["goed", "going"]], ["see", "saw", ["seed", "seeing"]], ["eat", "ate", ["eated", "eating"]],
    ["run", "ran", ["runned", "running"]], ["sit", "sat", ["sitted", "sitting"]], ["swim", "swam", ["swimmed", "swimming"]],
    ["drink", "drank", ["drinked", "drinking"]], ["come", "came", ["comed", "coming"]], ["make", "made", ["maked", "making"]],
    ["take", "took", ["taked", "taking"]], ["write", "wrote", ["writed", "writing"]], ["sing", "sang", ["singed", "singing"]],
    ["walk", "walked", ["walk", "walking"]], ["jump", "jumped", ["jump", "jumping"]], ["play", "played", ["plaied", "playing"]]];
  const CONTR = [["do not", "don't"], ["can not", "can't"], ["I am", "I'm"], ["it is", "it's"], ["she is", "she's"], ["we are", "we're"],
    ["they are", "they're"], ["I will", "I'll"], ["you are", "you're"], ["is not", "isn't"], ["did not", "didn't"], ["I have", "I've"]];
  const PUNCT = [["Where is my coat", "?"], ["I like ice cream", "."], ["Watch out", "!"], ["What time is it", "?"], ["The dog is asleep", "."],
    ["Can you help me", "?"], ["Hooray, we won", "!"], ["My sister is seven", "."], ["How old are you", "?"], ["Wow, that's amazing", "!"],
    ["It is raining today", "."], ["Do you like football", "?"]];
  const SYN1 = [["big", "large"], ["small", "little"], ["happy", "glad"], ["fast", "quick"], ["begin", "start"], ["shut", "close"],
    ["angry", "cross"], ["end", "finish"], ["smile", "grin"], ["jump", "leap"], ["shout", "yell"], ["quiet", "silent"]];

  CEIM.add("c2", "english", [
    bank("Past tense", "Yesterday I…", PAST, ([v, past, wrong]) => ({
      type: "mc", prompt: `Yesterday I ${'<span class="blank">____</span>'}. <small>(${v})</small>`, choices: shuffle([past, ...wrong]), answer: past,
      explain: `Yesterday I ${past}.` })),
    bank("Contractions", "do not → don't", CONTR, ([full, short], all) => ({
      type: "mc", prompt: `What is the short form of <b>${full}</b>?`, choices: mc(short, all.map((p) => p[1]), 3), answer: short,
      explain: `${full} = ${short}. The apostrophe shows where letters are missing.` })),
    bank("End punctuation", ". ? or !", PUNCT, ([s, p]) => ({
      type: "mc", prompt: `Which mark ends this sentence?<br><b>${s}</b> ____`, choices: [".", "?", "!"], answer: p,
      explain: p === "?" ? "It asks something, so it needs a question mark." : p === "!" ? "It shows strong feeling, so it needs an exclamation mark." : "It tells something, so it needs a full stop." })),
    bank("Words that mean the same", "Synonyms", SYN1, ([a, b], all) => ({
      type: "mc", prompt: `Which word means the same as <b>${a}</b>?`, choices: mc(b, all.filter((p) => p[0] !== a).map((p) => p[1]), 3), answer: b,
      explain: `${a} and ${b} mean nearly the same thing.` })),
  ]);

  // ---------------- Third Class ----------------
  const HOMO = [["The children put on ___ coats.", "their"], ["Put the box over ___.", "there"], ["___ going to the cinema.", "They're"],
    ["___ are three apples on the table.", "There"], ["I think ___ late again.", "they're"], ["We visited ___ new house.", "their"],
    ["I have ___ brothers.", "two"], ["Can I come ___?", "too"], ["We walked ___ the shop.", "to"], ["This tea is ___ hot.", "too"],
    ["She gave a present ___ her mum.", "to"], ["It costs ___ euro.", "two"]];
  const ADJ = [["The fluffy dog barked.", "fluffy"], ["A tall man waved.", "tall"], ["We ate a delicious pizza.", "delicious"],
    ["The old castle was empty.", "old"], ["She wore a red scarf.", "red"], ["The noisy crowd cheered.", "noisy"],
    ["I found a shiny coin.", "shiny"], ["The tiny mouse ran away.", "tiny"], ["They swam in the cold sea.", "cold"], ["He told a funny joke.", "funny"]];
  const COMPOUND = [["sun", "flower"], ["foot", "ball"], ["rain", "bow"], ["tooth", "brush"], ["play", "ground"], ["snow", "man"],
    ["butter", "fly"], ["cup", "cake"], ["fire", "work"], ["bed", "room"], ["pan", "cake"], ["star", "fish"]];
  const PREFIX = [["not happy", "unhappy"], ["do again", "redo"], ["not agree", "disagree"], ["not kind", "unkind"], ["write again", "rewrite"],
    ["not like", "dislike"], ["fill again", "refill"], ["not tidy", "untidy"], ["not honest", "dishonest"], ["not safe", "unsafe"],
    ["play again", "replay"], ["not obey", "disobey"]];

  CEIM.add("c3", "english", [
    bank("there / their / they're, to / too / two", "Homophones", HOMO, ([s, w]) => {
      const set = ["there", "their", "they're"].includes(w.toLowerCase()) ? ["there", "their", "they're"] : ["to", "too", "two"];
      const cap = w[0] === w[0].toUpperCase();
      const choices = set.map((x) => (cap ? x[0].toUpperCase() + x.slice(1) : x));
      return { type: "mc", prompt: fill(s), choices, answer: w, explain: `The sentence is: ${s.replace("___", w)}` };
    }),
    bank("Adjectives", "Describing words", ADJ, ([s, a]) => {
      const words = s.replace(".", "").split(" ").filter((x) => !["The", "A", "a", "the", "We", "She", "He", "I", "They", "in"].includes(x));
      return { type: "mc", prompt: `Which word is the <b>adjective</b> (describing word)?<br>“${s}”`, choices: mc(a, words), answer: a,
        explain: `“${a}” describes the noun.` };
    }),
    bank("Compound words", "Two words make one", COMPOUND, ([a, b]) => {
      const w = a + b;
      return { type: "mc", prompt: `Which two words make <b>${w}</b>?`, choices: shuffle([`${a} + ${b}`, `${w.slice(0, 2)} + ${w.slice(2)}`, `${w.slice(0, a.length + 1)} + ${w.slice(a.length + 1)}`]),
        answer: `${a} + ${b}`, explain: `${a} + ${b} = ${w}` };
    }),
    bank("Prefixes", "un-, re-, dis-", PREFIX, ([mean, w]) => {
      const root = w.replace(/^(un|re|dis)/, "");
      return { type: "mc", prompt: `Which word means <b>${mean}</b>?`, choices: mc(w, ["un" + root, "re" + root, "dis" + root]), answer: w,
        explain: `${w} means ${mean}.` };
    }),
  ]);

  // ---------------- Fourth Class ----------------
  const APOS = [["The bone belongs to the dog.", "the dog's bone", ["the dogs' bone", "the dogs bone"]],
    ["The coats belong to the girls.", "the girls' coats", ["the girl's coats", "the girls coats"]],
    ["The bike belongs to Sam.", "Sam's bike", ["Sams' bike", "Sams bike"]],
    ["The toys belong to the babies.", "the babies' toys", ["the baby's toys", "the babies toys"]],
    ["The car belongs to my dad.", "my dad's car", ["my dads' car", "my dads car"]],
    ["The nests belong to the birds.", "the birds' nests", ["the bird's nests", "the birds nests"]],
    ["The tail belongs to the cat.", "the cat's tail", ["the cats' tail", "the cats tail"]],
    ["The classroom belongs to the teachers.", "the teachers' classroom", ["the teacher's classroom", "the teachers classroom"]]];
  const ANT = [["ancient", "modern"], ["brave", "cowardly"], ["generous", "selfish"], ["arrive", "depart"], ["victory", "defeat"],
    ["increase", "decrease"], ["include", "exclude"], ["temporary", "permanent"], ["rough", "smooth"], ["shallow", "deep"],
    ["wide", "narrow"], ["accept", "refuse"]];
  const CONJ = [["I wanted to play outside ___ it was raining.", "but"], ["We stayed in ___ it was raining.", "because"],
    ["She ate an apple ___ a banana.", "and"], ["You can have juice ___ milk.", "or"], ["He was tired ___ he went to bed.", "so"],
    ["I like football ___ I don't like tennis.", "but"], ["We were late ___ the bus broke down.", "because"],
    ["It was sunny ___ we went to the beach.", "so"], ["Would you like tea ___ coffee?", "or"], ["I brushed my teeth ___ washed my face.", "and"]];
  const AGREE = [["The dogs ___ loudly.", "bark", "barks"], ["My sister ___ the piano.", "plays", "play"], ["The children ___ in the yard.", "play", "plays"],
    ["He ___ to school every day.", "walks", "walk"], ["The birds ___ south in winter.", "fly", "flies"], ["Our teacher ___ funny stories.", "tells", "tell"],
    ["They ___ pizza on Fridays.", "eat", "eats"], ["The sun ___ in the east.", "rises", "rise"]];

  CEIM.add("c4", "english", [
    bank("Apostrophes for owning", "dog's or dogs'?", APOS, ([s, ok, wrong]) => ({
      type: "mc", prompt: `${s} Which is correct?`, choices: shuffle([ok, ...wrong]), answer: ok,
      explain: /s' /.test(ok) ? "More than one owner ending in s: put the apostrophe after the s." : "One owner: add ’s." })),
    bank("Opposites", "Antonyms", ANT, (pair, all) => {
      const [a, b] = Math.random() < 0.5 ? pair : [pair[1], pair[0]];
      return { type: "mc", prompt: `What is the opposite of <b>${a}</b>?`, choices: mc(b, all.filter((p) => p !== pair).flat(), 3), answer: b,
        explain: `${a} and ${b} are opposites.` };
    }),
    bank("Joining words", "and, but, so, because, or", CONJ, ([s, w]) => ({
      type: "mc", prompt: fill(s), choices: mc(w, ["and", "but", "so", "because", "or"]), answer: w, explain: s.replace("___", w) })),
    bank("Verb agreement", "The dogs bark / The dog barks", AGREE, ([s, ok, bad]) => ({
      type: "mc", prompt: fill(s), choices: shuffle([ok, bad]), answer: ok, explain: s.replace("___", ok) })),
  ]);

  // ---------------- Fifth Class ----------------
  const SIMMET = [["Her smile was as bright as the sun.", "simile"], ["The classroom was a zoo.", "metaphor"], ["He ran like the wind.", "simile"],
    ["Time is money.", "metaphor"], ["The baby was as light as a feather.", "simile"], ["My brother is a couch potato.", "metaphor"],
    ["She sings like an angel.", "simile"], ["The snow was a white blanket.", "metaphor"], ["He was as brave as a lion.", "simile"],
    ["Her heart is made of gold.", "metaphor"], ["The water was as cold as ice.", "simile"], ["Life is a rollercoaster.", "metaphor"]];
  const ITS = [["___ raining again.", "It's"], ["The dog wagged ___ tail.", "its"], ["I think ___ time to go.", "it's"], ["The tree lost ___ leaves.", "its"],
    ["Is ___ your coat?", "this"], ["___ late, so go to bed.", "It's"], ["___ bag is on the chair.", "Your"], ["___ going to love this!", "You're"],
    ["Is this ___ pencil?", "your"], ["I think ___ right.", "you're"]];
  const SUFFIX = [["without care", "careless"], ["full of care", "careful"], ["full of hope", "hopeful"], ["without hope", "hopeless"],
    ["the state of being kind", "kindness"], ["the state of being dark", "darkness"], ["full of joy", "joyful"], ["without fear", "fearless"],
    ["the act of enjoying", "enjoyment"], ["the act of moving", "movement"], ["full of colour", "colourful"], ["without help", "helpless"]];
  const SYN2 = [["enormous", "huge"], ["brave", "courageous"], ["angry", "furious"], ["tired", "exhausted"], ["happy", "delighted"],
    ["scared", "terrified"], ["clever", "intelligent"], ["quickly", "rapidly"], ["wealthy", "rich"], ["odd", "strange"], ["begin", "commence"], ["help", "assist"]];

  CEIM.add("c5", "english", [
    bank("Simile or metaphor?", "Figurative language", SIMMET, ([s, t]) => ({
      type: "mc", prompt: `“${s}”<br>Is this a simile or a metaphor?`, choices: ["simile", "metaphor"], answer: t,
      explain: t === "simile" ? "It compares using “like” or “as”, so it's a simile." : "It says one thing IS another, so it's a metaphor." })),
    bank("its / it's, your / you're", "Tricky words", ITS.filter((x) => x[1] !== "this"), ([s, w]) => {
      const lower = w.toLowerCase(), set = lower.startsWith("it") ? ["its", "it's"] : ["your", "you're"];
      const cap = w[0] === w[0].toUpperCase();
      return { type: "mc", prompt: fill(s), choices: set.map((x) => (cap ? x[0].toUpperCase() + x.slice(1) : x)), answer: w,
        explain: lower.includes("'") ? `${w} = ${lower.startsWith("it") ? "it is" : "you are"}.` : `${w} shows belonging.` };
    }),
    bank("Suffixes", "-ful, -less, -ness, -ment", SUFFIX, ([mean, w], all) => ({
      type: "mc", prompt: `Which word means <b>${mean}</b>?`, choices: (() => {
        const words = all.map((x) => x[1]).filter((x) => x !== w);
        const same = words.filter((x) => x.slice(0, 4) === w.slice(0, 4)).slice(0, 1);
        return shuffle([w, ...same, ...sample(words.filter((x) => !same.includes(x)), 3 - same.length)]);
      })(), answer: w,
      explain: `${w} means ${mean}.` })),
    bank("Synonyms", "Stronger words", SYN2, ([a, b], all) => ({
      type: "mc", prompt: `Which word means the same as <b>${a}</b>?`, choices: mc(b, all.filter((p) => p[0] !== a).map((p) => p[1]), 3), answer: b,
      explain: `${a} and ${b} have nearly the same meaning.` })),
  ]);

  // ---------------- Sixth Class ----------------
  const IDIOMS = [["It's raining cats and dogs.", "It's raining very heavily."], ["That test was a piece of cake.", "It was very easy."],
    ["Let's break the ice.", "Start a conversation in a new group."], ["I'm going to hit the hay.", "I'm going to bed."],
    ["I'm feeling under the weather.", "I'm feeling a bit sick."], ["We go there once in a blue moon.", "We go there very rarely."],
    ["That phone cost an arm and a leg.", "It was very expensive."], ["He let the cat out of the bag.", "He told a secret."],
    ["She's on cloud nine.", "She's extremely happy."], ["Don't spill the beans!", "Don't tell the secret!"],
    ["You hit the nail on the head.", "You described it exactly right."], ["The ball is in your court.", "It's your turn to decide."]];
  const FORMAL = [["Hi, what's up?", "Good morning, how may I help you?"], ["Thanks a million!", "Thank you very much for your help."],
    ["Can't make it, sorry.", "I regret that I am unable to attend."], ["Gimme a sec.", "Please wait a moment."],
    ["See ya!", "I look forward to seeing you."], ["This is dead good.", "This is excellent."], ["Wanna come?", "Would you like to attend?"],
    ["Loads of people came.", "A large number of people attended."]];
  const FIG = [["The leaves danced in the wind.", "personification"], ["Sally sells seashells by the seashore.", "alliteration"],
    ["Buzz! went the bee.", "onomatopoeia"], ["I've told you a million times!", "hyperbole"], ["He is as quiet as a mouse.", "simile"],
    ["The stars winked at us.", "personification"], ["Peter Piper picked a peck of pickled peppers.", "alliteration"],
    ["The door creaked open.", "onomatopoeia"], ["My bag weighs a ton!", "hyperbole"], ["The moon is a silver coin.", "metaphor"],
    ["The wind howled angrily.", "personification"], ["Splash! The ball hit the water.", "onomatopoeia"]];
  const CONFUSED = [["There were ___ people at the match than last week.", "fewer", "less"], ["I drink ___ milk than my brother.", "less", "fewer"],
    ["The rain will ___ our plans.", "affect", "effect"], ["The medicine had a good ___.", "effect", "affect"],
    ["Please ___ your bag here.", "leave", "let"], ["She ___ me use her pen.", "let", "leave"],
    ["Can I ___ your ruler?", "borrow", "lend"], ["Will you ___ me your ruler?", "lend", "borrow"],
    ["He ___ the ball over the wall.", "threw", "through"], ["We walked ___ the forest.", "through", "threw"]];

  CEIM.add("c6", "english", [
    bank("Idioms", "What does it really mean?", IDIOMS, ([s, m], all) => ({
      type: "mc", prompt: `“${s}”<br>What does this mean?`, choices: mc(m, all.filter((x) => x[1] !== m).map((x) => x[1]), 3), answer: m,
      explain: `“${s.replace(/[.!]$/, "")}” means: ${m}` })),
    bank("Formal or informal", "Choose the formal way", FORMAL, ([inf, form], all) => ({
      type: "mc", prompt: "Which of these is <b>formal</b> language?", choices: shuffle([form, inf, pick(all.filter((x) => x[0] !== inf))[0]]), answer: form,
      explain: `“${form}” is formal. “${inf}” is informal, like chatting with friends.` })),
    bank("Figurative language", "Personification, alliteration…", FIG, ([s, t]) => ({
      type: "mc", prompt: `“${s}”<br>What kind of figurative language is this?`,
      choices: mc(t, ["personification", "alliteration", "onomatopoeia", "hyperbole", "simile", "metaphor"]), answer: t,
      explain: { personification: "It gives human actions to something that isn't human.", alliteration: "Many words start with the same sound.",
        onomatopoeia: "The word sounds like the noise it describes.", hyperbole: "It's a huge exaggeration.",
        simile: "It compares using “like” or “as”.", metaphor: "It says one thing IS another." }[t] })),
    bank("Commonly confused words", "fewer/less, affect/effect…", CONFUSED, ([s, ok, bad]) => ({
      type: "mc", prompt: fill(s), choices: shuffle([ok, bad]), answer: ok, explain: s.replace("___", ok) })),
  ]);
})();
