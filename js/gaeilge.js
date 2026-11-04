/* Céim: Gaeilge. Vocabulary and grammar practice for primary school Irish. */
(() => {
  const { pick, shuffle, mc, R } = U;
  const ga = (t) => `<span lang="ga" class="ga">${t}</span>`;

  /** Vocabulary skill: rows are [irish, english, emoji?]. Asks in both directions. */
  const vocab = (title, desc, rows) => ({
    title, desc, rows, gen() {
      const [g, e, emoji] = pick(rows);
      const visual = emoji ? `<div class="big-emoji">${emoji}</div>` : "";
      if (Math.random() < 0.5) {
        return { type: "mc", prompt: `What does ${ga(`<b>${g}</b>`)} mean?`, visual, choices: mc(e, rows.map((r) => r[1])), answer: e,
          explain: `${g} = ${e}` };
      }
      return { type: "mc", lang: "ga", prompt: `How do you say <b>${e}</b> in Irish?`, visual, choices: mc(g, rows.map((r) => r[0])), answer: g,
        explain: `${e} = ${g}` };
    },
  });

  const COLOURS = [["dearg", "red", "🔴"], ["gorm", "blue", "🔵"], ["buí", "yellow", "🟡"], ["glas", "green", "🟢"], ["bán", "white", "⚪"],
    ["dubh", "black", "⚫"], ["oráiste", "orange", "🟠"], ["donn", "brown", "🟤"], ["corcra", "purple", "🟣"]];
  const NUMS = [["a haon", "1"], ["a dó", "2"], ["a trí", "3"], ["a ceathair", "4"], ["a cúig", "5"], ["a sé", "6"], ["a seacht", "7"],
    ["a hocht", "8"], ["a naoi", "9"], ["a deich", "10"]];
  const NUMS2 = [["a haon déag", "11"], ["a dó dhéag", "12"], ["a trí déag", "13"], ["a ceathair déag", "14"], ["a cúig déag", "15"],
    ["a sé déag", "16"], ["a seacht déag", "17"], ["a hocht déag", "18"], ["a naoi déag", "19"], ["fiche", "20"]];
  const GREET = [["Dia duit", "Hello"], ["Slán", "Goodbye"], ["Go raibh maith agat", "Thank you"], ["Le do thoil", "Please"],
    ["Maidin mhaith", "Good morning"], ["Oíche mhaith", "Good night"], ["Conas atá tú?", "How are you?"], ["Tá mé go maith", "I am well"]];
  const ANIMALS = [["madra", "dog", "🐶"], ["cat", "cat", "🐱"], ["bó", "cow", "🐮"], ["capall", "horse", "🐴"], ["caora", "sheep", "🐑"],
    ["muc", "pig", "🐷"], ["éan", "bird", "🐦"], ["iasc", "fish", "🐟"], ["coinín", "rabbit", "🐰"], ["luch", "mouse", "🐭"],
    ["lacha", "duck", "🦆"], ["cearc", "hen", "🐔"]];
  const FAMILY = [["Mamaí", "Mammy"], ["Daidí", "Daddy"], ["deartháir", "brother"], ["deirfiúr", "sister"], ["Mamó", "Granny"],
    ["Daideo", "Grandad"], ["uncail", "uncle"], ["aintín", "aunt"], ["leanbh", "baby"]];
  const DAYS = [["Dé Luain", "Monday"], ["Dé Máirt", "Tuesday"], ["Dé Céadaoin", "Wednesday"], ["Déardaoin", "Thursday"],
    ["Dé hAoine", "Friday"], ["Dé Sathairn", "Saturday"], ["Dé Domhnaigh", "Sunday"]];
  const FOOD = [["arán", "bread", "🍞"], ["bainne", "milk", "🥛"], ["im", "butter", "🧈"], ["cáis", "cheese", "🧀"], ["úll", "apple", "🍎"],
    ["oráiste", "orange", "🍊"], ["banana", "banana", "🍌"], ["uisce", "water", "💧"], ["ubh", "egg", "🥚"], ["prátaí", "potatoes", "🥔"],
    ["brioscaí", "biscuits", "🍪"]];
  const SCHOOL = [["peann", "pen", "🖊️"], ["peann luaidhe", "pencil", "✏️"], ["leabhar", "book", "📕"], ["mála scoile", "schoolbag", "🎒"],
    ["rialóir", "ruler", "📏"], ["scriosán", "rubber (eraser)"], ["siosúr", "scissors", "✂️"], ["cathaoir", "chair", "🪑"],
    ["cóipleabhar", "copybook", "📒"], ["bosca lóin", "lunchbox"]];
  const BODY = [["ceann", "head"], ["lámh", "hand", "✋"], ["cos", "leg", "🦵"], ["súil", "eye", "👁️"], ["cluas", "ear", "👂"],
    ["srón", "nose", "👃"], ["béal", "mouth", "👄"], ["gruaig", "hair"], ["fiacla", "teeth", "🦷"], ["glúin", "knee"]];
  const WEATHER = [["Tá sé ag cur báistí.", "It is raining.", "🌧️"], ["Tá an ghrian ag taitneamh.", "The sun is shining.", "☀️"],
    ["Tá sé fuar.", "It is cold.", "🥶"], ["Tá sé te.", "It is hot.", "🥵"], ["Tá sé gaofar.", "It is windy.", "🌬️"],
    ["Tá sé ag cur sneachta.", "It is snowing.", "❄️"], ["Tá sé scamallach.", "It is cloudy.", "☁️"], ["Tá sé ceomhar.", "It is foggy.", "🌫️"]];
  const CLOTHES = [["geansaí", "jumper"], ["bríste", "trousers", "👖"], ["stocaí", "socks", "🧦"], ["bróga", "shoes", "👟"], ["hata", "hat", "👒"],
    ["cóta", "coat", "🧥"], ["gúna", "dress", "👗"], ["sciorta", "skirt"], ["léine", "shirt", "👔"], ["scaif", "scarf", "🧣"]];
  const MONTHS = [["Eanáir", "January"], ["Feabhra", "February"], ["Márta", "March"], ["Aibreán", "April"], ["Bealtaine", "May"],
    ["Meitheamh", "June"], ["Iúil", "July"], ["Lúnasa", "August"], ["Meán Fómhair", "September"], ["Deireadh Fómhair", "October"],
    ["Samhain", "November"], ["Nollaig", "December"]];
  const SEASONS = [["an t-earrach", "spring", "🌱"], ["an samhradh", "summer", "☀️"], ["an fómhar", "autumn", "🍂"], ["an geimhreadh", "winter", "❄️"]];
  const ROOMS = [["cistin", "kitchen", "🍳"], ["seomra suí", "sitting room", "🛋️"], ["seomra leapa", "bedroom", "🛏️"],
    ["seomra folctha", "bathroom", "🛁"], ["gairdín", "garden", "🌷"], ["halla", "hall", "🚪"]];
  const PEOPLE = [["beirt", "2 people"], ["triúr", "3 people"], ["ceathrar", "4 people"], ["cúigear", "5 people"], ["seisear", "6 people"],
    ["seachtar", "7 people"], ["ochtar", "8 people"], ["naonúr", "9 people"], ["deichniúr", "10 people"]];

  // Verbs: [present, past, future, english base]
  const VERBS = [["téim", "chuaigh mé", "rachaidh mé", "go"], ["ithim", "d'ith mé", "íosfaidh mé", "eat"], ["ólaim", "d'ól mé", "ólfaidh mé", "drink"],
    ["feicim", "chonaic mé", "feicfidh mé", "see"], ["déanaim", "rinne mé", "déanfaidh mé", "make"], ["faighim", "fuair mé", "gheobhaidh mé", "get"],
    ["tagaim", "tháinig mé", "tiocfaidh mé", "come"], ["cloisim", "chuala mé", "cloisfidh mé", "hear"], ["tugaim", "thug mé", "tabharfaidh mé", "give"],
    ["deirim", "dúirt mé", "déarfaidh mé", "say"], ["imrím", "d'imir mé", "imreoidh mé", "play"], ["scríobhaim", "scríobh mé", "scríobhfaidh mé", "write"],
    ["rithim", "rith mé", "rithfidh mé", "run"], ["siúlaim", "shiúil mé", "siúlfaidh mé", "walk"]];
  const PAST_EN = { go: "went", eat: "ate", drink: "drank", see: "saw", make: "made", get: "got", come: "came", hear: "heard", give: "gave",
    say: "said", play: "played", write: "wrote", run: "ran", walk: "walked" };
  const present = VERBS.map((v) => [v[0], `I ${v[3]}`]);
  const past = VERBS.map((v) => [v[1], `I ${PAST_EN[v[3]]}`]);
  const future = VERBS.map((v) => [v[2], `I will ${v[3]}`]);

  const HOURS = ["a haon", "a dó", "a trí", "a ceathair", "a cúig", "a sé", "a seacht", "a hocht", "a naoi", "a deich", "a haon déag", "a dó dhéag"];
  const gaTime = (h, m) => {
    const hr = HOURS[h - 1], nx = HOURS[h % 12];
    return m === 0 ? `${hr} a chlog` : m === 30 ? `leathuair tar éis ${hr}` : m === 15 ? `ceathrú tar éis ${hr}` : `ceathrú chun ${nx}`;
  };

  const PERSONS = [["I", "agam", "orm"], ["you", "agat", "ort"], ["he", "aige", "air"], ["she", "aici", "uirthi"],
    ["we", "againn", "orainn"], ["you (all)", "agaibh", "oraibh"], ["they", "acu", "orthu"]];
  const HAVE = [["madra", "a dog"], ["cat", "a cat"], ["rothar", "a bike"], ["peann", "a pen"], ["leabhar", "a book"], ["mála", "a bag"]];
  const HAS = { I: "have", you: "have", he: "has", she: "has", we: "have", "you (all)": "have", they: "have" };
  const FEEL = [["ocras", "hungry"], ["tart", "thirsty"], ["fuacht", "cold"], ["áthas", "happy"], ["brón", "sad"], ["eagla", "afraid"], ["tuirse", "tired"]];
  const BE = { I: "am", you: "are", he: "is", she: "is", we: "are", "you (all)": "are", they: "are" };
  const cap = (s) => s[0].toUpperCase() + s.slice(1);

  const PHRASES = [["Cén aois thú?", "How old are you?"], ["Cá bhfuil tú i do chónaí?", "Where do you live?"], ["Cad is ainm duit?", "What is your name?"],
    ["Is maith liom…", "I like…"], ["Ní maith liom…", "I don't like…"], ["An bhfuil cead agam dul go dtí an leithreas?", "May I go to the toilet?"],
    ["Tá brón orm.", "I'm sorry."], ["Cad é an t-am?", "What time is it?"], ["Go n-éirí leat!", "Good luck!"], ["Lá breithe sona duit!", "Happy birthday!"],
    ["Ar mhaith leat…?", "Would you like…?"], ["Níl a fhios agam.", "I don't know."]];

  CEIM.add("ji", "gaeilge", [
    vocab("Dathanna", "Colours", COLOURS.slice(0, 6)),
    vocab("Uimhreacha 1–5", "Numbers 1 to 5", NUMS.slice(0, 5)),
    vocab("Beannachtaí", "Greetings and manners", GREET.slice(0, 5)),
  ]);
  CEIM.add("si", "gaeilge", [
    vocab("Uimhreacha 1–10", "Numbers 1 to 10", NUMS),
    vocab("Ainmhithe", "Animals", ANIMALS),
    vocab("An Teaghlach", "The family", FAMILY),
  ]);
  CEIM.add("c1", "gaeilge", [
    vocab("Laethanta na Seachtaine", "Days of the week", DAYS),
    vocab("Bia", "Food", FOOD),
    vocab("Ar Scoil", "At school", SCHOOL),
    vocab("An Corp", "The body", BODY),
  ]);
  CEIM.add("c2", "gaeilge", [
    vocab("An Aimsir", "The weather", WEATHER),
    vocab("Éadaí", "Clothes", CLOTHES),
    vocab("Míonna na Bliana", "Months of the year", MONTHS),
    vocab("Séasúir", "Seasons", SEASONS),
  ]);
  CEIM.add("c3", "gaeilge", [
    vocab("An Teach", "Rooms in the house", ROOMS),
    vocab("Briathra: An Aimsir Láithreach", "Verbs: present tense (I eat, I go…)", present),
    vocab("Uimhreacha Pearsanta", "Counting people: beirt, triúr…", PEOPLE),
  ]);
  CEIM.add("c4", "gaeilge", [
    vocab("Briathra: An Aimsir Chaite", "Verbs: past tense (I went, I ate…)", past),
    { title: "An Clog", desc: "Telling the time in Irish", gen() {
      const h = R(1, 12), m = pick([0, 15, 30, 45]), ans = gaTime(h, m);
      const wrongs = [0, 15, 30, 45].map((mm) => gaTime(h, mm)).concat([gaTime(h % 12 + 1, m), gaTime((h + 10) % 12 + 1, m)]);
      return { type: "mc", lang: "ga", prompt: "Cén t-am é? <small>(What time is it?)</small>", visual: U.clock(h, m), choices: mc(ans, wrongs), answer: ans,
        explain: `Tá sé ${ans}.` };
    } },
    { title: "Ag: agam, agat, aige…", desc: "I have, you have, she has…", gen() {
      const [who, form] = pick(PERSONS), [obj, en] = pick(HAVE);
      return { type: "mc", lang: "ga", prompt: `<b>${cap(who)} ${HAS[who]} ${en}.</b><br>${ga(`Tá ${obj} <span class="blank">____</span>.`)}`,
        choices: mc(form, PERSONS.map((p) => p[1])), answer: form, explain: `Tá ${obj} ${form}.` };
    } },
  ]);
  CEIM.add("c5", "gaeilge", [
    vocab("Briathra: An Aimsir Fháistineach", "Verbs: future tense (I will go…)", future),
    vocab("Uimhreacha 11–20", "Numbers 11 to 20", NUMS2),
    { title: "Ar: orm, ort, air…", desc: "Feelings: Tá ocras orm", gen() {
      const [who, , form] = pick(PERSONS), [noun, en] = pick(FEEL);
      return { type: "mc", lang: "ga", prompt: `<b>${cap(who)} ${BE[who]} ${en}.</b><br>${ga(`Tá ${noun} <span class="blank">____</span>.`)}`,
        choices: mc(form, PERSONS.map((p) => p[2])), answer: form, explain: `Tá ${noun} ${form}.` };
    } },
  ]);
  CEIM.add("c6", "gaeilge", [
    { title: "Cén aimsir?", desc: "Past, present or future?", gen() {
      const v = pick(VERBS), t = R(0, 2);
      const names = ["Aimsir Láithreach (present)", "Aimsir Chaite (past)", "Aimsir Fháistineach (future)"];
      return { type: "mc", prompt: `Which tense is ${ga(`<b>${v[t]}</b>`)}?`, choices: names, answer: names[t],
        explain: `${v[t]} = ${[present, past, future][t].find((x) => x[0] === v[t])[1]}` };
    } },
    vocab("Frásaí Úsáideacha", "Useful phrases", PHRASES),
    { title: "Athbhreithniú", desc: "Mixed review of all topics", gen() {
      const all = [COLOURS, NUMS, NUMS2, ANIMALS, FAMILY, DAYS, FOOD, SCHOOL, BODY, CLOTHES, MONTHS, SEASONS, ROOMS];
      return vocab("", "", pick(all)).gen();
    } },
  ]);
})();
