/* Céim: Junior Cycle Gaeilge (First to Third Year). */
(() => {
  const { pick, shuffle, mc } = U;
  const ga = (t) => `<span lang="ga" class="ga">${t}</span>`;

  /** rows: [irish, english]; asks in both directions. */
  const vocab = (title, desc, rows) => ({
    title, desc, gen() {
      const [g, e] = pick(rows);
      if (Math.random() < 0.5) return { type: "mc", prompt: `What does ${ga(`<b>${g}</b>`)} mean?`, choices: mc(e, rows.map((r) => r[1])), answer: e, explain: `${g} = ${e}` };
      return { type: "mc", lang: "ga", prompt: `How do you say <b>${e}</b> in Irish?`, choices: mc(g, rows.map((r) => r[0])), answer: g, explain: `${e} = ${g}` };
    },
  });
  /** rows: [prompt text, answer]; Irish answers. */
  const toGa = (title, desc, ask, rows, why) => ({
    title, desc, gen() {
      const [q, a] = pick(rows);
      return { type: "mc", lang: "ga", prompt: ask(q), choices: mc(a, rows.map((r) => r[1])), answer: a, explain: why ? why(q, a) : `${q} → ${a}` };
    },
  });

  // ---------------- First Year ----------------
  CEIM.add("y1", "gaeilge", [
    vocab("Focail cheisteanna", "Question words", [["Cad?", "What?"], ["Cé?", "Who?"], ["Cathain?", "When?"], ["Cá?", "Where?"], ["Conas?", "How?"],
      ["Cén fáth?", "Why?"], ["Cé mhéad?", "How many?"], ["Cén t-am?", "What time?"], ["Cé leis?", "Whose?"]]),
    vocab("Mothúcháin", "Feelings: Tá … orm", [["Tá áthas orm", "I am happy"], ["Tá brón orm", "I am sad"], ["Tá fearg orm", "I am angry"], ["Tá eagla orm", "I am afraid"],
      ["Tá tuirse orm", "I am tired"], ["Tá ocras orm", "I am hungry"], ["Tá tart orm", "I am thirsty"], ["Tá imní orm", "I am worried"], ["Tá díomá orm", "I am disappointed"]]),
    vocab("Caitheamh aimsire", "Hobbies", [["peil", "football"], ["iománaíocht", "hurling"], ["snámh", "swimming"], ["léitheoireacht", "reading"], ["rothaíocht", "cycling"],
      ["damhsa", "dancing"], ["ceol", "music"], ["cluichí ríomhaire", "computer games"], ["siopadóireacht", "shopping"], ["scannáin", "films"]]),
    vocab("Áiteanna sa bhaile", "Places in town", [["an leabharlann", "the library"], ["an séipéal", "the church"], ["an t-ospidéal", "the hospital"], ["an stáisiún traenach", "the train station"],
      ["an pháirc", "the park"], ["an linn snámha", "the swimming pool"], ["an phictiúrlann", "the cinema"], ["an t-ollmhargadh", "the supermarket"], ["oifig an phoist", "the post office"], ["an banc", "the bank"]]),
    vocab("Mo theach", "Rooms in the house", [["an chistin", "the kitchen"], ["an seomra suí", "the sitting room"], ["an seomra codlata", "the bedroom"], ["an seomra folctha", "the bathroom"],
      ["an halla", "the hall"], ["an gairdín", "the garden"], ["an t-áiléar", "the attic"], ["an seomra bia", "the dining room"]]),
    toGa("An Aimsir Chaite: sé / sí", "Past tense with he and she", (e) => `How do you say <b>${e}</b> in Irish?`, [
      ["He went", "Chuaigh sé"], ["She ate", "D'ith sí"], ["He saw", "Chonaic sé"], ["She got", "Fuair sí"], ["He made", "Rinne sé"], ["She came", "Tháinig sí"],
      ["He heard", "Chuala sé"], ["She gave", "Thug sí"], ["He said", "Dúirt sé"], ["She was", "Bhí sí"], ["He played", "D'imir sé"], ["She drank", "D'ól sí"]]),
  ]);

  // ---------------- Second Year ----------------
  CEIM.add("y2", "gaeilge", [
    vocab("An Modh Coinníollach", "I would…", [["rachainn", "I would go"], ["d'íosfainn", "I would eat"], ["d'ólfainn", "I would drink"], ["d'fheicfinn", "I would see"],
      ["dhéanfainn", "I would do"], ["gheobhainn", "I would get"], ["thiocfainn", "I would come"], ["chloisfinn", "I would hear"], ["thabharfainn", "I would give"],
      ["déarfainn", "I would say"], ["bheinn", "I would be"], ["cheannóinn", "I would buy"]]),
    vocab("Ábhair scoile", "School subjects", [["Mata", "Maths"], ["Stair", "History"], ["Tíreolaíocht", "Geography"], ["Eolaíocht", "Science"], ["Ealaín", "Art"], ["Ceol", "Music"],
      ["Corpoideachas", "PE"], ["Fraincis", "French"], ["Gearmáinis", "German"], ["Spáinnis", "Spanish"], ["Staidéar Gnó", "Business Studies"], ["Eacnamaíocht Bhaile", "Home Economics"]]),
    vocab("Aidiachtaí", "Describing people", [["cainteach", "chatty"], ["cairdiúil", "friendly"], ["cliste", "clever"], ["leisciúil", "lazy"], ["greannmhar", "funny"], ["cróga", "brave"],
      ["cineálta", "kind"], ["ciúin", "quiet"], ["foighneach", "patient"], ["flaithiúil", "generous"], ["spórtúil", "sporty"]]),
    toGa("Forainmneacha réamhfhoclacha: le", "liom, leat, leis…", (q) => `<b>${q}</b> = ?`, [["le + mé", "liom"], ["le + tú", "leat"], ["le + é", "leis"], ["le + í", "léi"],
      ["le + sinn", "linn"], ["le + sibh", "libh"], ["le + iad", "leo"]], (q, a) => `${q} = ${a}`),
    toGa("Forainmneacha réamhfhoclacha: do", "dom, duit, dó…", (q) => `<b>${q}</b> = ?`, [["do + mé", "dom"], ["do + tú", "duit"], ["do + é", "dó"], ["do + í", "di"],
      ["do + sinn", "dúinn"], ["do + sibh", "daoibh"], ["do + iad", "dóibh"]], (q, a) => `${q} = ${a}`),
    vocab("Laethanta saoire", "Holidays", [["óstán", "hotel"], ["trá", "beach"], ["eitleán", "aeroplane"], ["aerfort", "airport"], ["mála taistil", "suitcase"], ["pas", "passport"],
      ["campáil", "camping"], ["ticéad", "ticket"], ["grianghraf", "photograph"], ["uachtar gréine", "sun cream"], ["saoire", "holiday"]]),
  ]);

  // ---------------- Third Year (Junior Cert) ----------------
  const TENSES = ["An Aimsir Láithreach", "An Aimsir Chaite", "An Aimsir Fháistineach", "An Modh Coinníollach"];
  const TENSE_ROWS = [
    ["Ithim mo bhricfeasta gach maidin.", 0], ["D'ith mé mo bhricfeasta inné.", 1], ["Íosfaidh mé mo bhricfeasta amárach.", 2], ["D'íosfainn pióg dá mbeadh ocras orm.", 3],
    ["Téim ar scoil ar an mbus.", 0], ["Chuaigh mé go dtí an trá inné.", 1], ["Rachaidh mé go Corcaigh amárach.", 2], ["Rachainn go Meiriceá dá mbeadh airgead agam.", 3],
    ["Feicim mo chairde gach lá.", 0], ["Chonaic mé scannán aréir.", 1], ["Feicfidh mé mo sheanmháthair Dé Domhnaigh.", 2], ["D'fheicfinn an domhan dá mbeinn saibhir.", 3],
    ["Bím tuirseach tar éis na scoile.", 0], ["Bhí mé tinn an tseachtain seo caite.", 1], ["Beidh mé sa chéad bhliain eile.", 2], ["Bheinn sásta cabhrú leat.", 3],
  ];
  const QA = [
    ["Ar ith tú?", "D'ith mé", "Níor ith mé"], ["An ndeachaigh tú?", "Chuaigh mé", "Ní dheachaigh mé"], ["An bhfaca tú?", "Chonaic mé", "Ní fhaca mé"],
    ["An bhfuair tú?", "Fuair mé", "Ní bhfuair mé"], ["An ndearna tú?", "Rinne mé", "Ní dhearna mé"], ["An raibh tú?", "Bhí mé", "Ní raibh mé"],
    ["Ar chuala tú?", "Chuala mé", "Níor chuala mé"], ["An dtáinig tú?", "Tháinig mé", "Níor tháinig mé"], ["An dtug tú?", "Thug mé", "Níor thug mé"],
    ["An ndúirt tú?", "Dúirt mé", "Ní dúirt mé"],
  ];

  CEIM.add("y3", "gaeilge", [
    { title: "Na hAimsirí", "desc": "Which tense is it?", gen() {
      const [s, t] = pick(TENSE_ROWS);
      return { type: "mc", prompt: `Which tense is this?<br>${ga(`“${s}”`)}`, choices: [...TENSES], answer: TENSES[t], explain: `“${s}” is in ${TENSES[t]}.` };
    } },
    { title: "Ceisteanna agus freagraí", desc: "Answer yes or no in the past tense", gen() {
      const [q, yes, no] = pick(QA), pos = Math.random() < 0.5, ans = pos ? yes : no;
      const others = QA.filter((r) => r[0] !== q).flatMap((r) => [r[1], r[2]]);
      return { type: "mc", lang: "ga", prompt: `${ga(`<b>${q}</b>`)}<br>Answer <b>${pos ? "yes" : "no"}</b>:`, choices: mc(ans, [pos ? no : yes, ...shuffle(others).slice(0, 2)]), answer: ans,
        explain: `${q} → ${yes} / ${no}` };
    } },
    toGa("An Aimsir Fháistineach", "Irregular verbs: I will…", (e) => `How do you say <b>${e}</b> in Irish?`, [["I will go", "Rachaidh mé"], ["I will eat", "Íosfaidh mé"],
      ["I will see", "Feicfidh mé"], ["I will get", "Gheobhaidh mé"], ["I will do", "Déanfaidh mé"], ["I will come", "Tiocfaidh mé"], ["I will hear", "Cloisfidh mé"],
      ["I will give", "Tabharfaidh mé"], ["I will say", "Déarfaidh mé"], ["I will be", "Beidh mé"]]),
    vocab("An timpeallacht", "The environment", [["truailliú", "pollution"], ["athchúrsáil", "recycling"], ["bruscar", "rubbish"], ["aeráid", "climate"], ["fuinneamh", "energy"],
      ["plaisteach", "plastic"], ["dúlra", "nature"], ["timpeallacht", "environment"], ["téamh domhanda", "global warming"], ["fuinneamh in-athnuaite", "renewable energy"]]),
    vocab("An tsláinte", "Health", [["tinneas cinn", "a headache"], ["slaghdán", "a cold"], ["cógas", "medicine"], ["dochtúir", "doctor"], ["ospidéal", "hospital"],
      ["tinneas fiacaile", "toothache"], ["scornach thinn", "a sore throat"], ["fiabhras", "a fever"], ["cos bhriste", "a broken leg"], ["otharcharr", "ambulance"], ["altra", "nurse"]]),
    vocab("Nathanna don scrúdú", "Useful phrases for essays", [["Ar an gcéad dul síos", "First of all"], ["Ina theannta sin", "As well as that"], ["Mar sin", "Therefore"],
      ["Ar an taobh eile den scéal", "On the other hand"], ["I mo thuairim", "In my opinion"], ["Mar fhocal scoir", "To conclude"], ["Mar shampla", "For example"],
      ["Gan dabht", "Without doubt"], ["Ar ndóigh", "Of course"]]),
  ]);
})();
