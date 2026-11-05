/* Céim: Junior Cycle English (First to Third Year). */
(() => {
  const { pick, shuffle, mc } = U;
  const bank = (title, desc, items, make) => ({ title, desc, gen() { return make(pick(items), items); } });
  const fill = (s) => s.replace("___", '<span class="blank">____</span>');
  /** rows: [question, answer]; wrong answers come from the other rows. */
  const pair = (title, desc, rows, ask, explainFn) => bank(title, desc, rows, ([a, b], all) => ({
    type: "mc", prompt: ask(a), choices: mc(b, all.map((x) => x[1])), answer: b, explain: explainFn ? explainFn(a, b) : `${a} → ${b}`,
  }));
  /** rows: [sentence with ___, answer, [wrongs]] */
  const blanks = (title, desc, rows) => bank(title, desc, rows, ([s, ok, wrong]) => ({
    type: "mc", prompt: fill(s), choices: shuffle([ok, ...wrong]), answer: ok, explain: s.replace("___", ok),
  }));
  /** rows: [text, label, why?]; choices are always the full label set. */
  const sort = (title, desc, question, labels, rows) => bank(title, desc, rows, ([t, l, why]) => ({
    type: "mc", prompt: `${question}<br>“${t}”`, choices: labels.length <= 4 ? [...labels] : mc(l, labels), answer: l, explain: why || `This is ${l.toLowerCase()}.`,
  }));
  const pickBest = (title, desc, question, rows) => bank(title, desc, rows, ([ok, wrong, why]) => ({
    type: "mc", prompt: question, choices: shuffle([ok, ...wrong]), answer: ok, explain: why,
  }));

  // ---------------- First Year ----------------
  const POS = ["noun", "verb", "adjective", "adverb", "pronoun", "preposition", "conjunction"];
  const POS_ROWS = [
    ["The <u>ancient</u> castle stood on the hill.", "adjective"], ["She sang <u>beautifully</u> at the concert.", "adverb"],
    ["We <u>sprinted</u> across the pitch.", "verb"], ["The <u>courage</u> of the firefighters amazed us.", "noun"],
    ["<u>They</u> arrived late for the match.", "pronoun"], ["The cat hid <u>under</u> the table.", "preposition"],
    ["I wanted to go, <u>but</u> it was raining.", "conjunction"], ["The <u>orchestra</u> tuned up before the show.", "noun"],
    ["He <u>rarely</u> eats breakfast.", "adverb"], ["Ciara <u>borrowed</u> my calculator.", "verb"],
    ["It was a <u>gloomy</u> November evening.", "adjective"], ["We walked <u>through</u> the forest.", "preposition"],
    ["You can have tea <u>or</u> coffee.", "conjunction"], ["Give the book to <u>her</u>.", "pronoun"],
    ["The crowd cheered <u>loudly</u>.", "adverb"], ["Her <u>happiness</u> was obvious.", "noun"],
  ];
  const POETRY = [
    ["comparing two things using “like” or “as”", "simile", "Her smile was as bright as the sun."],
    ["saying one thing <i>is</i> another", "metaphor", "The classroom was a zoo."],
    ["the same sound at the start of nearby words", "alliteration", "Six slippery snails slid slowly."],
    ["a word that sounds like the noise it describes", "onomatopoeia", "The bacon sizzled and the fire crackled."],
    ["giving human qualities to something that is not human", "personification", "The wind whispered through the trees."],
    ["a group of lines in a poem (like a paragraph)", "stanza", "A poem of four verses has four of these."],
    ["repeated vowel sounds in nearby words", "assonance", "The rain in Spain stays mainly in the plain."],
    ["a big exaggeration for effect", "hyperbole", "I've told you a million times!"],
  ];
  const PERSON = [
    ["I walked slowly to the gate, my heart pounding.", "first person"], ["We had never seen so much snow.", "first person"],
    ["My brother and I built a treehouse last summer.", "first person"],
    ["You open the door and you see a long, dark corridor.", "second person"], ["You will need a pencil and a ruler.", "second person"],
    ["She waited at the bus stop for an hour.", "third person"], ["The detective examined the room carefully.", "third person"],
    ["They had lived in Galway all their lives.", "third person"], ["He knew that something was wrong.", "third person"],
  ];
  const FACT = [
    ["Dublin is the capital of Ireland.", "Fact"], ["Water boils at 100 °C at sea level.", "Fact"],
    ["The Shannon is the longest river in Ireland.", "Fact"], ["There are 24 hours in a day.", "Fact"],
    ["Ireland joined the EU (then the EEC) in 1973.", "Fact"], ["A triangle has three sides.", "Fact"],
    ["Hurling is the most exciting sport in the world.", "Opinion"], ["Maths is easier than English.", "Opinion"],
    ["Summer is the best season of the year.", "Opinion"], ["That film was far too long.", "Opinion"],
    ["Everyone should learn to play the guitar.", "Opinion"], ["Galway is the most beautiful city in Ireland.", "Opinion"],
  ];
  const CONFUSED1 = [
    ["The head teacher is also called the ___.", "principal", ["principle"]],
    ["Honesty is an important ___ to live by.", "principle", ["principal"]],
    ["She paid me a lovely ___ about my essay.", "compliment", ["complement"]],
    ["The red scarf will ___ your green coat.", "complement", ["compliment"]],
    ["The car was ___ at the traffic lights.", "stationary", ["stationery"]],
    ["Pens, paper and folders are sold in the ___ shop.", "stationery", ["stationary"]],
    ["The rain will ___ our plans for the picnic.", "affect", ["effect"]],
    ["The new rule had a big ___ on the school.", "effect", ["affect"]],
    ["The students left ___ bags in the hall.", "their", ["there", "they're"]],
    ["___ going to the cinema tonight.", "They're", ["Their", "There"]],
  ];
  const SYN1 = [["enormous", "huge"], ["fragile", "easily broken"], ["reluctant", "unwilling"], ["vanish", "disappear"], ["furious", "very angry"],
    ["cautious", "careful"], ["ancient", "very old"], ["generous", "giving"], ["peculiar", "strange"], ["exhausted", "very tired"], ["vacant", "empty"], ["swift", "fast"]];
  const ANT1 = [["generous", "mean"], ["ancient", "modern"], ["victory", "defeat"], ["expand", "shrink"], ["guilty", "innocent"], ["permanent", "temporary"],
    ["artificial", "natural"], ["scarce", "plentiful"], ["timid", "bold"], ["complicated", "simple"], ["accept", "refuse"], ["minimum", "maximum"]];
  const APOS = [
    ["One girl owns the bike. It is the ___ bike.", "girl's", ["girls'", "girls"]],
    ["Many girls own the bikes. They are the ___ bikes.", "girls'", ["girl's", "girls"]],
    ["The coats belong to the children. They are the ___ coats.", "children's", ["childrens'", "childrens"]],
    ["The team belongs to the teacher. It is the ___ team.", "teacher's", ["teachers'", "teachers"]],
    ["The staffroom belongs to all the teachers. It is the ___ staffroom.", "teachers'", ["teacher's", "teachers"]],
    ["The bone belongs to the dog. It is the ___ bone.", "dog's", ["dogs'", "dogs"]],
    ["The changing room belongs to the men. It is the ___ changing room.", "men's", ["mens'", "mens"]],
    ["The toys belong to my two brothers. They are my ___ toys.", "brothers'", ["brother's", "brothers"]],
  ];

  CEIM.add("y1", "english", [
    sort("Parts of speech", "Noun, verb, adjective, adverb…", "What part of speech is the underlined word?", POS, POS_ROWS.map(([s, p]) => [s, p, `The underlined word is a ${p}.`])),
    bank("Poetry terms", "Simile, metaphor, alliteration…", POETRY, ([def, term, ex], all) => (Math.random() < 0.5
      ? { type: "mc", prompt: `Which poetic term means: <b>${def}</b>?`, choices: mc(term, all.map((r) => r[1])), answer: term, explain: `${term}: e.g. “${ex}”` }
      : { type: "mc", prompt: `Which technique is used here?<br>“${ex}”`, choices: mc(term, all.map((r) => r[1])), answer: term, explain: `This is ${term}: ${def.replace(/<\/?i>/g, "")}.` })),
    sort("Narrative voice", "First, second or third person", "Which narrative voice is this?", ["first person", "second person", "third person"], PERSON),
    sort("Fact or opinion", "Can it be proved?", "Is this a fact or an opinion?", ["Fact", "Opinion"], FACT.map(([s, l]) => [s, l, l === "Fact" ? "This can be checked and proved." : "This is someone’s view; people could disagree."])),
    blanks("Commonly confused words", "principal/principle, affect/effect…", CONFUSED1),
    pair("Vocabulary: synonyms", "Words with similar meanings", SYN1, (w) => `Which word or phrase means the same as <b>${w}</b>?`, (a, b) => `${a} means ${b}.`),
    pair("Vocabulary: antonyms", "Words with opposite meanings", ANT1, (w) => `What is the opposite of <b>${w}</b>?`, (a, b) => `The opposite of ${a} is ${b}.`),
    blanks("Apostrophes of possession", "girl's or girls'?", APOS),
  ]);

  // ---------------- Second Year ----------------
  const PERSUADE = [
    ["Do you really want to live in a world without trees?", "rhetorical question"],
    ["Nine out of ten students say homework is too long.", "statistics"],
    ["Innocent, helpless animals are suffering every single day.", "emotive language"],
    ["We must act now. We must act together. We must act today.", "repetition"],
    ["The new park will be safe, clean and fun.", "rule of three"],
    ["You have the power to change this. Yes, you!", "direct address"],
    ["Dr Murphy, a leading heart surgeon, says exercise saves lives.", "expert opinion"],
    ["This is the greatest invention in the history of the world.", "exaggeration"],
  ];
  const LIT = [
    ["the main character of a story", "protagonist"], ["the character who opposes the main character", "antagonist"],
    ["where and when a story takes place", "setting"], ["the most exciting or tense point of the plot", "climax"],
    ["the main message or idea of a text", "theme"], ["a scene that goes back to an earlier time", "flashback"],
    ["the person who tells the story", "narrator"], ["the sequence of events in a story", "plot"],
    ["a struggle or problem between characters or forces", "conflict"], ["the way the story ends and problems are solved", "resolution"],
  ];
  const LETTERS = [
    ["Dear Sir or Madam,", "Yours faithfully,", "Use “Yours faithfully” when you don’t know the person’s name."],
    ["Dear Sir/Madam,", "Yours faithfully,", "Use “Yours faithfully” when you don’t know the person’s name."],
    ["To whom it may concern,", "Yours faithfully,", "Use “Yours faithfully” when you don’t know the person’s name."],
    ["Dear Ms Byrne,", "Yours sincerely,", "Use “Yours sincerely” when you have named the person."],
    ["Dear Mr O’Connor,", "Yours sincerely,", "Use “Yours sincerely” when you have named the person."],
    ["Dear Principal Walsh,", "Yours sincerely,", "Use “Yours sincerely” when you have named the person."],
    ["Dear Granny,", "Love,", "A letter to family is informal, so a friendly ending like “Love” fits."],
    ["Hi Aoife,", "See you soon,", "A note to a friend is informal."],
  ];
  const CONFUSED2 = [
    ["My sister is taller ___ me.", "than", ["then"]], ["We had dinner and ___ watched a film.", "then", ["than"]],
    ["Don't ___ your ticket or you won't get in.", "lose", ["loose"]], ["This tooth is ___ and wobbly.", "loose", ["lose"]],
    ["I ___ your apology.", "accept", ["except"]], ["Everyone came ___ Seán, who was sick.", "except", ["accept"]],
    ["My coach gave me some good ___.", "advice", ["advise"]], ["I would ___ you to study every evening.", "advise", ["advice"]],
    ["Football ___ is on Tuesday.", "practice", ["practise"]], ["You need to ___ the piano every day.", "practise", ["practice"]],
    ["The dog wagged ___ tail.", "its", ["it's"]], ["___ raining again.", "It's", ["Its"]],
  ];
  const CONTEXT = [
    ["The <b>hostile</b> crowd booed the referee.", "unfriendly", ["welcoming", "silent", "tiny"]],
    ["After the long hike we were <b>famished</b>.", "very hungry", ["very happy", "lost", "bored"]],
    ["The instructions were so <b>vague</b> that nobody knew what to do.", "unclear", ["detailed", "short", "funny"]],
    ["She gave a <b>candid</b> answer, telling the whole truth.", "honest", ["sweet", "rude", "quick"]],
    ["The old house was in a <b>dilapidated</b> state, with broken windows everywhere.", "falling apart", ["freshly painted", "expensive", "crowded"]],
    ["He was <b>elated</b> when he heard he had won.", "overjoyed", ["worried", "confused", "tired"]],
    ["The bridge was closed as a <b>precaution</b> during the storm.", "safety measure", ["punishment", "celebration", "mistake"]],
    ["Her <b>meticulous</b> notes covered every tiny detail.", "very careful", ["messy", "short", "colourful"]],
    ["The teacher was <b>lenient</b> and gave us extra time.", "not strict", ["very strict", "angry", "absent"]],
    ["The village was <b>remote</b>, miles from the nearest town.", "far away", ["noisy", "modern", "small"]],
  ];
  const RUNON = [
    ["I was tired, so I went to bed.", ["I was tired I went to bed.", "I was tired, I went to bed.", "I was tired so, I went to bed."]],
    ["It was raining. We stayed inside.", ["It was raining we stayed inside.", "It was raining, we stayed inside.", "It was, raining we stayed inside."]],
    ["The bus was late; we missed the start of the match.", ["The bus was late we missed the start of the match.", "The bus was late, we missed the start of the match.", "The bus, was late we missed the start of the match."]],
    ["Aoife loves music, and she plays three instruments.", ["Aoife loves music she plays three instruments.", "Aoife loves music, she plays three instruments.", "Aoife loves music and, she plays three instruments."]],
    ["We arrived early because we wanted good seats.", ["We arrived early we wanted good seats.", "We arrived early, we wanted good seats.", "We arrived, early because we wanted good seats."]],
  ];
  const ROOTS = [["bio", "life"], ["geo", "earth"], ["tele", "far"], ["aqua", "water"], ["photo", "light"], ["chron", "time"],
    ["port", "carry"], ["scrib / script", "write"], ["dict", "say"], ["aud", "hear"], ["vis / vid", "see"], ["graph", "write or draw"], ["micro", "small"], ["phon", "sound"]];
  const REGISTER = [
    ["Hey, what's up? Wanna grab a pizza later?", "Informal"], ["I am writing to complain about the condition of the local park.", "Formal"],
    ["That gig was class, it was deadly!", "Informal"], ["We would be grateful if you could reply at your earliest convenience.", "Formal"],
    ["Ya coming to the match or wha?", "Informal"], ["Students are reminded that mobile phones must be switched off during exams.", "Formal"],
    ["Thanks a mil for the lift, you're a legend.", "Informal"], ["The committee has decided to postpone the meeting until further notice.", "Formal"],
  ];

  CEIM.add("y2", "english", [
    pair("Persuasive techniques", "How writers persuade", PERSUADE, (t) => `Which persuasive technique is used here?<br>“${t}”`, (a, b) => `This uses ${b}.`),
    pair("Literary terms", "Protagonist, setting, theme…", LIT, (d) => `Which word means <b>${d}</b>?`, (a, b) => `The ${b} is ${a}.`),
    bank("Formal letters", "Yours sincerely or faithfully?", LETTERS, ([open, close, why]) => ({
      type: "mc", prompt: `A letter begins “<b>${open}</b>”. How should it end?`, choices: shuffle(["Yours faithfully,", "Yours sincerely,", "Love,", "See you soon,"]), answer: close, explain: why })),
    blanks("Confused words 2", "then/than, lose/loose, its/it's…", CONFUSED2),
    bank("Vocabulary in context", "Use the sentence to work out the meaning", CONTEXT, ([s, ok, wrong]) => ({
      type: "mc", prompt: `What does the word in bold mean?<br>“${s}”`, choices: shuffle([ok, ...wrong]), answer: ok, explain: `Here it means “${ok}”.` })),
    pickBest("Run-on sentences", "Punctuate sentences correctly", "Which sentence is punctuated correctly?", RUNON.map(([ok, w]) => [ok, w, `“${ok}” joins the ideas correctly. Two sentences cannot be joined by just a comma or nothing at all.`])),
    pair("Word roots", "Latin and Greek roots", ROOTS, (r) => `What does the root <b>${r}</b> mean?`, (a, b) => `${a} means “${b}”.`),
    sort("Formal or informal?", "Register", "Is this written in a formal or informal register?", ["Formal", "Informal"], REGISTER),
  ]);

  // ---------------- Third Year (Junior Cert) ----------------
  const SHAKES = [["thou", "you (subject)"], ["thee", "you (object)"], ["thy", "your"], ["art", "are"], ["hath", "has"], ["doth", "does"],
    ["wherefore", "why"], ["ere", "before"], ["anon", "soon"], ["prithee", "please"], ["hither", "here"], ["whence", "from where"], ["methinks", "I think"], ["alas", "sadly"]];
  const DEVICES = [
    ["The audience knows something that a character does not.", "dramatic irony"],
    ["The weather reflects the mood: a storm rages as the king loses his mind.", "pathetic fallacy"],
    ["Two contradictory words placed together, like “bitter sweet” or “deafening silence”.", "oxymoron"],
    ["Two contrasting things placed side by side to highlight their differences.", "juxtaposition"],
    ["Hints or clues about what will happen later in the story.", "foreshadowing"],
    ["A character speaks their thoughts aloud, alone on stage.", "soliloquy"],
    ["A short remark to the audience that the other characters cannot hear.", "aside"],
    ["Something happens that is the opposite of what we would expect.", "irony"],
    ["A character with a fatal flaw that leads to their downfall.", "tragic hero"],
  ];
  const TEXTTYPES = [
    ["Preheat the oven to 180 °C. Mix the flour and sugar, then add two eggs.", "Instructional"],
    ["Once upon a time, in a village by the sea, there lived a lonely fisherman.", "Narrative"],
    ["The golden sand glittered under a sky of the palest blue, and gulls wheeled overhead.", "Descriptive"],
    ["Ban junk food in schools now! Our health depends on it — don't you agree?", "Persuasive"],
    ["The Cliffs of Moher are 214 metres high and attract over a million visitors a year.", "Informative"],
    ["On one hand, uniforms save money; on the other, they limit self-expression.", "Discursive"],
    ["Step 1: Open the app. Step 2: Tap ‘Settings’. Step 3: Choose ‘Wi-Fi’.", "Instructional"],
    ["Vote for me as class captain! I will fight for longer breaks and better lunches.", "Persuasive"],
  ];
  const VOCAB3 = [["ubiquitous", "found everywhere"], ["ambiguous", "having more than one meaning"], ["benevolent", "kind and generous"],
    ["ephemeral", "lasting a very short time"], ["meticulous", "very careful about detail"], ["obsolete", "no longer used"],
    ["pragmatic", "practical and realistic"], ["resilient", "able to recover quickly"], ["tenacious", "determined, not giving up"],
    ["eloquent", "fluent and persuasive in speech"], ["inevitable", "certain to happen"], ["frugal", "careful with money"],
    ["melancholy", "a deep sadness"], ["candid", "honest and direct"]];
  const PASSIVE = [
    ["The dog chased the cat.", "The cat was chased by the dog.", ["The dog was chased by the cat.", "The cat chased the dog.", "The cat is chased by the dog."]],
    ["Shakespeare wrote Macbeth.", "Macbeth was written by Shakespeare.", ["Shakespeare was written by Macbeth.", "Macbeth is written by Shakespeare.", "Macbeth wrote Shakespeare."]],
    ["The students painted the mural.", "The mural was painted by the students.", ["The students were painted by the mural.", "The mural is painted by the students.", "The mural painted the students."]],
    ["The referee stopped the match.", "The match was stopped by the referee.", ["The referee was stopped by the match.", "The match is stopped by the referee.", "The match stopped the referee."]],
    ["A storm damaged the roof.", "The roof was damaged by a storm.", ["A storm was damaged by the roof.", "The roof is damaged by a storm.", "The roof damaged a storm."]],
    ["The chef cooks the meals.", "The meals are cooked by the chef.", ["The meals were cooked by the chef.", "The chef is cooked by the meals.", "The meals cook the chef."]],
  ];
  const WHOM = [
    ["___ is knocking at the door?", "Who", ["Whom"]], ["To ___ should I send the letter?", "whom", ["who"]],
    ["The girl ___ won the prize is in my class.", "who", ["whom"]], ["The man with ___ I spoke was very helpful.", "whom", ["who"]],
    ["___ wants to come to the cinema?", "Who", ["Whom"]], ["For ___ is this present?", "whom", ["who"]],
    ["She is the author ___ wrote my favourite book.", "who", ["whom"]], ["The players, most of ___ were tired, went home.", "whom", ["who"]],
  ];
  const TONE = [
    ["Oh great, another Monday. Just what I needed.", "sarcastic"], ["I still remember those long summer days at Granny's farm, the smell of hay, the laughter.", "nostalgic"],
    ["The door creaked open. Somewhere in the darkness, something was breathing.", "ominous"], ["We won! We actually won! I can't stop smiling!", "joyful"],
    ["How dare they ignore us again! This is completely unacceptable!", "angry"], ["The empty chair at the table reminded us that he was gone.", "mournful"],
  ];
  const TRAPS = [
    ["___ coat is this on the floor?", "Whose", ["Who's"]], ["___ coming to the party on Friday?", "Who's", ["Whose"]],
    ["The team played ___ best game of the season.", "its", ["it's"]], ["You're going to be late if ___ not careful.", "you're", ["your"]],
    ["I should ___ studied harder.", "have", ["of"]], ["The ___ of the storm were felt for weeks.", "effects", ["affects"]],
    ["Please ___ the tickets to the office.", "bring", ["brung"]], ["Each of the students ___ a laptop.", "has", ["have"]],
  ];

  CEIM.add("y3", "english", [
    pair("Shakespeare's language", "Thou, hath, wherefore…", SHAKES, (w) => `In Shakespeare, what does <b>${w}</b> mean?`, (a, b) => `“${a}” means “${b}”.`),
    pair("Dramatic and literary devices", "Irony, soliloquy, foreshadowing…", DEVICES, (d) => `Which device is described?<br>${d}`, (a, b) => `This is ${b}.`),
    sort("Text types", "Narrative, persuasive, informative…", "What type of writing is this?", ["Instructional", "Narrative", "Descriptive", "Persuasive", "Informative", "Discursive"], TEXTTYPES),
    pair("Advanced vocabulary", "Words for the Junior Cert", VOCAB3, (w) => `What does <b>${w}</b> mean?`, (a, b) => `${a} means ${b}.`),
    bank("Active and passive voice", "Change the sentence to passive", PASSIVE, ([act, ok, wrong]) => ({
      type: "mc", prompt: `Change to the passive voice:<br>“${act}”`, choices: shuffle([ok, ...wrong]), answer: ok, explain: `The object becomes the subject, and the tense stays the same: “${ok}”` })),
    blanks("Who or whom?", "Subject or object", WHOM),
    pair("Tone", "How does the writer sound?", TONE, (t) => `What is the tone of this?<br>“${t}”`, (a, b) => `The tone is ${b}.`),
    blanks("Exam grammar traps", "whose/who's, have/of…", TRAPS),
  ]);
})();
