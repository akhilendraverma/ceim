/* Céim: Maths, part 2. Seven more generated skills for every class. */
(() => {
  const { R, pick, shuffle, mc, near, rep, E } = U;
  const OBJ = ["🍎", "⭐", "🐞", "🐟", "🚗", "🌸", "🍪", "🎈", "🐥", "⚽"];
  const objs = (emoji, n) => `<div class="objs">${rep(emoji, n)}</div>`;
  const num = (prompt, answer, explain, visual = "") => ({ type: "num", prompt, visual, answer: String(answer), explain });
  const choice = (prompt, answer, wrongs, explain, visual = "") =>
    ({ type: "mc", prompt, visual, choices: mc(answer, wrongs), answer: String(answer), explain });
  const gcd = (a, b) => (b ? gcd(b, a % b) : a);
  const frac = (n, d) => { const g = gcd(n, d); return `${n / g}/${d / g}`; };
  const WORDS = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve", "thirteen",
    "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen", "twenty"];
  const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  function dice(n) {
    const P = { 1: [[50, 50]], 2: [[28, 28], [72, 72]], 3: [[28, 28], [50, 50], [72, 72]], 4: [[28, 28], [72, 28], [28, 72], [72, 72]],
      5: [[28, 28], [72, 28], [50, 50], [28, 72], [72, 72]], 6: [[28, 25], [72, 25], [28, 50], [72, 50], [28, 75], [72, 75]] };
    return `<svg class="shape" viewBox="0 0 100 100"><rect x="6" y="6" width="88" height="88" rx="16" fill="#fff" stroke="#333" stroke-width="3"/>${P[n].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="8" fill="#222"/>`).join("")}</svg>`;
  }
  const bars = (a, b, colA = "#F28482", colB = "#8ECAE6") => `<svg class="rect" viewBox="0 0 260 110">
    <text x="4" y="34" font-size="18" font-weight="700" fill="#555">A</text><rect x="28" y="16" width="${a * 22}" height="24" rx="12" fill="${colA}"/>
    <text x="4" y="84" font-size="18" font-weight="700" fill="#555">B</text><rect x="28" y="66" width="${b * 22}" height="24" rx="12" fill="${colB}"/></svg>`;
  function tenFrame(n) {
    let cells = "";
    for (let i = 0; i < 10; i++) {
      const x = 6 + (i % 5) * 40, y = 6 + Math.floor(i / 5) * 40;
      cells += `<rect x="${x}" y="${y}" width="40" height="40" fill="#fff" stroke="#333" stroke-width="2"/>` + (i < n ? `<circle cx="${x + 20}" cy="${y + 20}" r="13" fill="#E4572E"/>` : "");
    }
    return `<svg class="rect" viewBox="0 0 212 92">${cells}</svg>`;
  }
  function ruler(len) {
    let ticks = "";
    for (let i = 0; i <= 15; i++) ticks += `<line x1="${10 + i * 20}" y1="60" x2="${10 + i * 20}" y2="${i % 5 === 0 ? 76 : 70}" stroke="#333" stroke-width="1.5"/><text x="${10 + i * 20}" y="90" font-size="11" text-anchor="middle">${i}</text>`;
    const end = 10 + len * 20;   // the pencil tip ends exactly on the length mark
    return `<svg class="rect" viewBox="0 0 320 100" style="width:100%;max-width:480px"><rect x="10" y="22" width="${len * 20 - 14}" height="18" rx="3" fill="#F2C14E" stroke="#8a6d1d"/><polygon points="${end - 14},22 ${end},31 ${end - 14},40" fill="#E9967A" stroke="#8a6d1d"/><line x1="${end}" y1="31" x2="${end}" y2="58" stroke="#8a6d1d" stroke-dasharray="3,3"/><rect x="2" y="56" width="316" height="38" fill="#FFF4D6" stroke="#333"/>${ticks}</svg>`;
  }
  function fracShape(parts, shaded, kind) {
    let s = "";
    if (kind === "rect") {
      const w = 200 / parts;
      for (let i = 0; i < parts; i++) s += `<rect x="${10 + i * w}" y="10" width="${w}" height="80" fill="${i < shaded ? "#6C4AB6" : "#fff"}" stroke="#333" stroke-width="2"/>`;
      return `<svg class="rect" viewBox="0 0 220 100">${s}</svg>`;
    }
    for (let i = 0; i < parts; i++) {
      const a1 = (i / parts) * 2 * Math.PI - Math.PI / 2, a2 = ((i + 1) / parts) * 2 * Math.PI - Math.PI / 2;
      const p = (a) => `${(60 + 50 * Math.cos(a)).toFixed(1)},${(60 + 50 * Math.sin(a)).toFixed(1)}`;
      s += `<path d="M60,60 L${p(a1)} A50,50 0 0,1 ${p(a2)} Z" fill="${i < shaded ? "#6C4AB6" : "#fff"}" stroke="#333" stroke-width="2"/>`;
    }
    return `<svg class="shape" viewBox="0 0 120 120">${s}</svg>`;
  }
  function angle(deg) {
    const r = (deg * Math.PI) / 180, x = 30 + 110 * Math.cos(-r), y = 110 + 110 * Math.sin(-r);
    return `<svg class="rect" viewBox="0 0 170 130"><line x1="30" y1="110" x2="160" y2="110" stroke="#333" stroke-width="4" stroke-linecap="round"/><line x1="30" y1="110" x2="${x.toFixed(1)}" y2="${y.toFixed(1)}" stroke="#333" stroke-width="4" stroke-linecap="round"/><path d="M60,110 A30,30 0 0,0 ${(30 + 30 * Math.cos(-r)).toFixed(1)},${(110 + 30 * Math.sin(-r)).toFixed(1)}" fill="none" stroke="#D63F8C" stroke-width="3"/></svg>`;
  }

  // ---------------- Junior Infants ----------------
  CEIM.add("ji", "maths", [
    { title: "Dice dots", desc: "Count the dots", gen() {
      const n = R(1, 6);
      return { type: "mc", prompt: "How many dots?", visual: dice(n), choices: ["1", "2", "3", "4", "5", "6"], answer: String(n), explain: `There are ${n} dots.` };
    } },
    { title: "Which number is bigger?", desc: "Numbers to 10", gen() {
      let a = R(1, 10), b = R(1, 10); while (a === b) b = R(1, 10);
      return { type: "mc", prompt: "Which number is bigger?", choices: [String(a), String(b)], answer: String(Math.max(a, b)), explain: `${Math.max(a, b)} is bigger than ${Math.min(a, b)}.` };
    } },
    { title: "One more", desc: "What is one more?", gen() {
      const n = R(1, 9), o = pick(OBJ);
      return choice(`What is one more than ${n}?`, n + 1, near(n + 1, 2, 1), `${n} and one more is ${n + 1}.`, objs(o, n));
    } },
    { title: "Longer or shorter", desc: "Compare lengths", gen() {
      let a = R(2, 10), b = R(2, 10); while (Math.abs(a - b) < 2) b = R(2, 10);
      const longer = Math.random() < 0.5, ans = longer === (a > b) ? "A" : "B";
      return { type: "mc", prompt: `Which ribbon is ${longer ? "longer" : "shorter"}?`, visual: bars(a, b), choices: ["A", "B"], answer: ans,
        explain: `Ribbon ${a > b ? "A" : "B"} is longer.` };
    } },
    { title: "Heavier or lighter", desc: "Which weighs more?", gen() {
      const P = [["🐘", "🐭"], ["🚗", "🪶"], ["🍉", "🍓"], ["🐄", "🐥"], ["🏠", "🎈"], ["🐻", "🐝"], ["🎃", "🍒"], ["🚌", "🚲"]];
      const [h, l] = pick(P), heavier = Math.random() < 0.6;
      return { type: "mc", prompt: `Which is ${heavier ? "heavier" : "lighter"}?`, choices: shuffle([h, l]), answer: heavier ? h : l,
        explain: `${h} is heavier than ${l}.` };
    } },
    { title: "Odd one out", desc: "Which one is different?", gen() {
      const [a, b] = shuffle(OBJ).slice(0, 2), pos = R(0, 3);
      const row = [a, a, a, a]; row[pos] = b;
      return { type: "mc", prompt: "Which one is different?", visual: `<div class="objs line">${row.join("")}</div>`, choices: shuffle([a, b]), answer: b,
        explain: `${b} is different from the others.` };
    } },
    { title: "Add within 5", desc: "Pictures to add", gen() {
      const a = R(1, 4), b = R(1, 5 - a), o = pick(OBJ);
      return { type: "mc", prompt: `${a} and ${b}. How many altogether?`, visual: `<div class="groups"><div>${objs(o, a)}</div><div class="op">+</div><div>${objs(o, b)}</div></div>`,
        choices: ["1", "2", "3", "4", "5"], answer: String(a + b), explain: `${a} + ${b} = ${a + b}` };
    } },
  ]);

  // ---------------- Senior Infants ----------------
  CEIM.add("si", "maths", [
    { title: "Count backwards", desc: "10, 9, 8…", gen() {
      const s = R(4, 20), seq = [s, s - 1, s - 2];
      return num(`What comes next? ${seq.join(", ")}, ?`, s - 3, `Counting back by one: ${s - 3}.`);
    } },
    { title: "Doubles", desc: "Double numbers to 10", gen() {
      const n = R(1, 5), o = pick(OBJ);
      return num(`Double ${n} is…?`, 2 * n, `${n} + ${n} = ${2 * n}`, `<div class="groups"><div>${objs(o, n)}</div><div class="op">+</div><div>${objs(o, n)}</div></div>`);
    } },
    { title: "Bigger or smaller", desc: "Numbers to 20", gen() {
      let a = R(1, 20), b = R(1, 20); while (a === b) b = R(1, 20);
      const big = Math.random() < 0.5;
      return { type: "mc", prompt: `Which number is ${big ? "bigger" : "smaller"}?`, choices: [String(a), String(b)],
        answer: String(big ? Math.max(a, b) : Math.min(a, b)), explain: `${Math.max(a, b)} is bigger than ${Math.min(a, b)}.` };
    } },
    { title: "Number words", desc: "one, two, three…", gen() {
      const n = R(1, 10);
      return Math.random() < 0.5 ? choice(`Which number is <b>${WORDS[n]}</b>?`, n, near(n, 3, 1), `${WORDS[n]} = ${n}`)
        : choice(`How do you write <b>${n}</b> in words?`, WORDS[n], WORDS.slice(1, 11), `${n} = ${WORDS[n]}`);
    } },
    { title: "Make 10 with a ten frame", desc: "How many more to make 10?", gen() {
      const n = R(1, 9);
      return num("How many more to make 10?", 10 - n, `${n} + ${10 - n} = 10`, tenFrame(n));
    } },
    { title: "3-D shapes", desc: "Cube, sphere, cylinder, cone", gen() {
      const S = [["🎲", "cube"], ["⚽", "sphere"], ["🥫", "cylinder"], ["🍦", "cone"], ["📦", "cuboid"]];
      const [e, n] = pick(S);
      return choice("What 3-D shape is this like?", n, S.map((x) => x[1]), `It is like a ${n}.`, `<div class="big-emoji">${e}</div>`);
    } },
    { title: "Days of the week", desc: "What day comes next?", gen() {
      const i = R(0, 6), after = Math.random() < 0.6;
      const ans = after ? DAYS[(i + 1) % 7] : DAYS[(i + 6) % 7];
      return choice(`What day comes ${after ? "after" : "before"} <b>${DAYS[i]}</b>?`, ans, DAYS.filter((d) => d !== DAYS[i]), `The days go: ${DAYS.join(", ")}.`);
    } },
  ]);

  // ---------------- First Class ----------------
  CEIM.add("c1", "maths", [
    { title: "Add three numbers", desc: "Within 20", gen() {
      const a = R(1, 8), b = R(1, 7), c = R(1, Math.max(1, 20 - a - b));
      return num(`${a} + ${b} + ${c} = ?`, a + b + c, `${a} + ${b} = ${a + b}, then + ${c} = ${a + b + c}`);
    } },
    { title: "Missing number", desc: "? − 4 = 7", gen() {
      const a = R(5, 20), b = R(1, a - 1), t = R(0, 1);
      return t ? num(`? − ${b} = ${a - b}`, a, `${a - b} + ${b} = ${a}`) : num(`${a} − ? = ${a - b}`, b, `${a} − ${b} = ${a - b}`);
    } },
    { title: "Compare: >, < or =", desc: "Numbers to 99", gen() {
      const a = R(1, 99), b = Math.random() < 0.15 ? a : R(1, 99);
      const ans = a > b ? ">" : a < b ? "<" : "=";
      return { type: "mc", prompt: `${a} ___ ${b}`.replace("___", '<span class="blank">__</span>'), choices: [">", "<", "="], answer: ans,
        explain: `${a} ${ans} ${b}. The open side of > and < faces the bigger number.` };
    } },
    { title: "Months of the year", desc: "What month comes next?", gen() {
      const i = R(0, 11), ans = MONTHS[(i + 1) % 12];
      return choice(`What month comes after <b>${MONTHS[i]}</b>?`, ans, MONTHS.filter((m) => m !== MONTHS[i]), `After ${MONTHS[i]} comes ${ans}.`);
    } },
    { title: "Doubles and near doubles", desc: "6 + 6, 6 + 7", gen() {
      const n = R(2, 10), near1 = Math.random() < 0.5;
      return near1 ? num(`${n} + ${n + 1} = ?`, 2 * n + 1, `Double ${n} is ${2 * n}, plus 1 more = ${2 * n + 1}`) : num(`${n} + ${n} = ?`, 2 * n, `Double ${n} = ${2 * n}`);
    } },
    { title: "Halves", desc: "Half of numbers to 20", gen() {
      const n = R(1, 10) * 2; return num(`What is half of ${n}?`, n / 2, `${n / 2} + ${n / 2} = ${n}`);
    } },
    { title: "Number words to 20", desc: "eleven, twelve…", gen() {
      const n = R(11, 20);
      return Math.random() < 0.5 ? choice(`Which number is <b>${WORDS[n]}</b>?`, n, near(n, 3, 10), `${WORDS[n]} = ${n}`)
        : choice(`How do you write <b>${n}</b> in words?`, WORDS[n], WORDS.slice(11), `${n} = ${WORDS[n]}`);
    } },
  ]);

  // ---------------- Second Class ----------------
  CEIM.add("c2", "maths", [
    { title: "Add and subtract 10", desc: "Jump in tens", gen() {
      const n = R(10, 89), plus = Math.random() < 0.5;
      return num(`${n} ${plus ? "+" : "−"} 10 = ?`, plus ? n + 10 : n - 10, `Only the tens change: ${plus ? n + 10 : n - 10}.`);
    } },
    { title: "Hundreds, tens and units", desc: "Place value to 199", gen() {
      const n = R(100, 199), t = Math.floor(n / 10) % 10, u = n % 10;
      return pick([
        () => num(`How many tens are in ${n}? (Look at the tens digit.)`, t, `${n} = 1 hundred, ${t} tens and ${u} units.`),
        () => num(`What number is 1 hundred, ${t} tens and ${u} units?`, n, `100 + ${t * 10} + ${u} = ${n}`),
      ])();
    } },
    { title: "Change from €1", desc: "Money", gen() {
      const c = R(1, 19) * 5;
      return num(`You buy a sweet for ${c}c and pay with €1. How much change do you get (in cent)?`, 100 - c, `€1 = 100c. 100 − ${c} = ${100 - c}c`);
    } },
    { title: "Measure with a ruler", desc: "Centimetres", gen() {
      const n = R(2, 14);
      return num("How long is the pencil, in cm?", n, `The pencil starts at 0 and ends at ${n}, so it is ${n} cm long.`, ruler(n));
    } },
    { title: "Fractions of shapes", desc: "What part is shaded?", gen() {
      const parts = pick([2, 4]), shaded = R(1, parts - 1), ans = frac(shaded, parts);
      return choice("What fraction is shaded?", ans, ["1/2", "1/4", "3/4", "1/3"], `${shaded} of ${parts} equal parts are shaded: ${ans}.`, fracShape(parts, shaded, pick(["rect", "circle"])));
    } },
    { title: "Groups of", desc: "Repeated addition", gen() {
      const g = R(2, 5), n = R(2, 5), o = pick(OBJ);
      const v = `<div class="groups">${Array(g).fill(`<div>${objs(o, n)}</div>`).join("")}</div>`;
      return num(`${g} groups of ${n}. How many altogether?`, g * n, `${Array(g).fill(n).join(" + ")} = ${g * n}`, v);
    } },
    { title: "Time facts", desc: "Days, weeks, hours", gen() {
      const F = [["How many days are in a week?", 7], ["How many months are in a year?", 12], ["How many hours are in a day?", 24],
        ["How many minutes are in an hour?", 60], ["How many days are in a fortnight?", 14], ["How many seconds are in a minute?", 60],
        ["How many weeks are in a year?", 52]];
      const [q, a] = pick(F);
      return choice(q, a, [7, 12, 24, 60, 14, 52, 30, 10], `${q.replace("How many ", "").replace("?", "")}: ${a}`);
    } },
  ]);

  // ---------------- Third Class ----------------
  CEIM.add("c3", "maths", [
    { title: "Subtract three-digit numbers", desc: "Up to 999", gen() {
      const a = R(200, 999), b = R(100, a - 1); return num(`${a} − ${b} = ?`, a - b, `${a} − ${b} = ${a - b}`);
    } },
    { title: "Multiply by 10 and 100", desc: "Shift the digits", gen() {
      const n = R(2, 99), m = pick([10, 100]);
      return num(`${n} × ${m} = ?`, n * m, `Multiplying by ${m} moves each digit ${m === 10 ? "one place" : "two places"} to the left: ${n * m}.`);
    } },
    { title: "Missing factor", desc: "6 × ? = 42", gen() {
      const a = R(2, 10), b = R(2, 10); return num(`${a} × ? = ${a * b}`, b, `${a} × ${b} = ${a * b}`);
    } },
    { title: "Time to five minutes", desc: "Read the clock", gen() {
      const h = R(1, 12), m = R(1, 11) * 5, mm = String(m).padStart(2, "0"), ans = `${h}:${mm}`;
      const wrongs = [`${h % 12 + 1}:${mm}`, `${h}:${String((m + 5) % 60).padStart(2, "0")}`, `${h}:${String((60 - m) % 60).padStart(2, "0")}`, `${m / 5}:${String(h * 5 % 60).padStart(2, "0")}`];
      return choice("What time does the clock show?", ans, wrongs, `The short hand is just past ${h} and the long hand is on ${m / 5}, which means ${m} minutes: ${ans}.`, U.clock(h, m));
    } },
    { title: "Number patterns", desc: "Find the rule", gen() {
      const step = pick([3, 4, 6, 7, 8, 9, 11, 25, 50]) * (Math.random() < 0.3 ? -1 : 1);
      const st = step < 0 ? R(100, 200) : R(1, 60), seq = [0, 1, 2, 3].map((i) => st + i * step);
      return num(`What comes next? ${seq.join(", ")}, ?`, st + 4 * step, `The rule is ${step > 0 ? "add" : "subtract"} ${Math.abs(step)}.`);
    } },
    { title: "Adding money", desc: "Euro and cent", gen() {
      const a = R(1, 30) * 25, b = R(1, 30) * 25, t = a + b;
      return choice(`${U.euro(a)} + ${U.euro(b)} = ?`, U.euro(t), [U.euro(t + 25), U.euro(t - 25), U.euro(t + 100), U.euro(Math.max(5, t - 100))],
        `${U.euro(a)} + ${U.euro(b)} = ${U.euro(t)}`);
    } },
    { title: "Kilograms and grams", desc: "1 kg = 1000 g", gen() {
      return pick([
        () => { const k = R(1, 9); return num(`${k} kg = ? g`, k * 1000, `1 kg = 1000 g, so ${k} kg = ${k * 1000} g`); },
        () => { const f = pick([[1, 2, 500], [1, 4, 250], [3, 4, 750]]); return num(`${f[0]}/${f[1]} kg = ? g`, f[2], `${f[0]}/${f[1]} of 1000 g = ${f[2]} g`); },
        () => { const k = R(1, 5), g = R(1, 9) * 100; return num(`${k} kg ${g} g = ? g`, k * 1000 + g, `${k * 1000} g + ${g} g = ${k * 1000 + g} g`); },
      ])();
    } },
  ]);

  // ---------------- Fourth Class ----------------
  CEIM.add("c4", "maths", [
    { title: "Multiply 3-digit by 1-digit", desc: "e.g. 234 × 3", gen() {
      const a = R(101, 499), b = R(2, 9); return num(`${a} × ${b} = ?`, a * b, `${a} × ${b} = ${a * b}`);
    } },
    { title: "Divide 3-digit by 1-digit", desc: "e.g. 156 ÷ 4", gen() {
      const d = R(2, 9), q = R(12, 99); return num(`${d * q} ÷ ${d} = ?`, q, `${d} × ${q} = ${d * q}`);
    } },
    { title: "Fractions of amounts", desc: "3/4 of 20", gen() {
      const d = pick([3, 4, 5, 6, 8, 10]), n = R(2, d - 1), k = R(2, 9);
      return num(`What is ${n}/${d} of ${d * k}?`, n * k, `1/${d} of ${d * k} = ${k}, so ${n}/${d} = ${n} × ${k} = ${n * k}`);
    } },
    { title: "Decimals and fractions", desc: "0.7 = 7/10", gen() {
      return pick([
        () => { const t = R(1, 9); return choice(`0.${t} = ?`, `${t}/10`, [`${t}/100`, `1/${t}`, `${t + 1}/10`, `${t}/1`], `0.${t} means ${t} tenths: ${t}/10.`); },
        () => { const f = pick([["1/2", "0.5"], ["1/4", "0.25"], ["3/4", "0.75"], ["1/10", "0.1"], ["1/5", "0.2"]]);
          return choice(`${f[0]} = ?`, f[1], ["0.5", "0.25", "0.75", "0.1", "0.2", "1.4", "0.4"], `${f[0]} = ${f[1]}`); },
      ])();
    } },
    { title: "Compare decimals", desc: "Which is bigger?", gen() {
      let a = R(1, 99) / 100, b = R(1, 9) / 10; while (a === b) b = R(1, 9) / 10;
      const A = U.dec(a), B = U.dec(b);
      return { type: "mc", prompt: "Which number is bigger?", choices: shuffle([A, B]), answer: a > b ? A : B,
        explain: `Compare the tenths first: ${a > b ? A : B} is bigger.` };
    } },
    { title: "Types of angles", desc: "Acute, right, obtuse", gen() {
      const t = pick(["acute", "right", "obtuse"]), d = t === "acute" ? R(20, 70) : t === "right" ? 90 : R(110, 160);
      return { type: "mc", prompt: "What type of angle is this?", visual: angle(d), choices: ["acute", "right", "obtuse"], answer: t,
        explain: { acute: "Smaller than a right angle (less than 90°): acute.", right: "Exactly a square corner (90°): a right angle.", obtuse: "Bigger than a right angle but less than 180°: obtuse." }[t] };
    } },
    { title: "Litres and millilitres", desc: "1 l = 1000 ml", gen() {
      return pick([
        () => { const l = R(1, 9); return num(`${l} l = ? ml`, l * 1000, `1 l = 1000 ml, so ${l} l = ${l * 1000} ml`); },
        () => { const m = R(1, 9) * 1000; return num(`${m} ml = ? l`, m / 1000, `${m} ÷ 1000 = ${m / 1000} l`); },
        () => { const f = pick([[1, 2, 500], [1, 4, 250], [3, 4, 750]]); return num(`${f[0]}/${f[1]} l = ? ml`, f[2], `${f[0]}/${f[1]} of 1000 ml = ${f[2]} ml`); },
      ])();
    } },
  ]);

  // ---------------- Fifth Class ----------------
  const isPrime = (n) => { if (n < 2) return false; for (let i = 2; i * i <= n; i++) if (n % i === 0) return false; return true; };
  CEIM.add("c5", "maths", [
    { title: "Divide by a 2-digit number", desc: "e.g. 384 ÷ 12", gen() {
      const d = R(11, 25), q = R(4, 30); return num(`${d * q} ÷ ${d} = ?`, q, `${d} × ${q} = ${d * q}`);
    } },
    { title: "Prime numbers", desc: "Which is prime?", gen() {
      const primes = [], others = [];
      for (let i = 2; i <= 60; i++) (isPrime(i) ? primes : others).push(i);
      const p = pick(primes);
      return choice("Which of these is a prime number?", p, others, `${p} can only be divided by 1 and itself.`);
    } },
    { title: "Factors", desc: "Which number divides exactly?", gen() {
      const n = pick([12, 18, 20, 24, 30, 36, 40, 42, 45, 48, 56, 60, 72]);
      const fs = [], non = [];
      for (let i = 2; i < n; i++) (n % i === 0 ? fs : non).push(i);
      const f = pick(fs);
      return choice(`Which is a factor of ${n}?`, f, non.filter((x) => x < 15), `${n} ÷ ${f} = ${n / f}, with nothing left over.`);
    } },
    { title: "Round decimals", desc: "Nearest whole number", gen() {
      let x = R(10, 999) / 10; if (x * 10 % 10 === 5) x += 0.1;
      x = Number(x.toFixed(1));
      return num(`Round ${x} to the nearest whole number.`, Math.round(x), `The tenths digit is ${Math.round((x % 1) * 10)}, so round ${x % 1 >= 0.5 ? "up" : "down"}: ${Math.round(x)}.`);
    } },
    { title: "Fractions to percentages", desc: "1/4 = 25%", gen() {
      const F = [["1/2", 50], ["1/4", 25], ["3/4", 75], ["1/5", 20], ["2/5", 40], ["1/10", 10], ["3/10", 30], ["7/10", 70], ["4/5", 80], ["1/20", 5]];
      const [f, p] = pick(F);
      return num(`${f} = ?%`, p, `${f} of 100 = ${p}, so ${f} = ${p}%.`);
    } },
    { title: "Perimeter of regular shapes", desc: "All sides equal", gen() {
      const S = [["triangle", 3], ["square", 4], ["pentagon", 5], ["hexagon", 6], ["octagon", 8]], [n, k] = pick(S), s = R(2, 15);
      return num(`A regular ${n} has sides of ${s} cm. What is its perimeter in cm?`, k * s, `A ${n} has ${k} equal sides: ${k} × ${s} = ${k * s} cm.`);
    } },
    { title: "Square numbers", desc: "n × n", gen() {
      const n = R(2, 12);
      return Math.random() < 0.6 ? num(`${n}² = ?`, n * n, `${n}² = ${n} × ${n} = ${n * n}`) : num(`? × ? = ${n * n} (the same number twice)`, n, `${n} × ${n} = ${n * n}`);
    } },
  ]);

  // ---------------- Sixth Class ----------------
  CEIM.add("c6", "maths", [
    { title: "Multiply decimals", desc: "e.g. 2.5 × 4", gen() {
      const a = R(11, 99) / 10, b = R(2, 9); return num(`${a} × ${b} = ?`, U.dec(a * b, 1), `${a} × ${b} = ${U.dec(a * b, 1)}`);
    } },
    { title: "Divide decimals", desc: "e.g. 7.2 ÷ 3", gen() {
      const b = R(2, 9), q = R(11, 99) / 10; return num(`${U.dec(q * b, 1)} ÷ ${b} = ?`, U.dec(q, 1), `${b} × ${U.dec(q, 1)} = ${U.dec(q * b, 1)}`);
    } },
    { title: "Simplify fractions", desc: "Lowest terms", gen() {
      const d0 = pick([3, 4, 5, 7, 8, 9]), n0 = R(1, d0 - 1); if (gcd(n0, d0) !== 1) return this.gen();
      const k = R(2, 6), ans = `${n0}/${d0}`;
      return choice(`Write ${n0 * k}/${d0 * k} in its simplest form.`, ans, [`${n0 * k}/${d0}`, `${n0}/${d0 * k}`, `${n0 + 1}/${d0}`, `${Math.max(1, n0 * 2)}/${d0 * 2 + 1}`],
        `Divide the top and bottom by ${k}: ${ans}.`);
    } },
    { title: "Area of a triangle", desc: "½ × base × height", gen() {
      const b = R(2, 12) * 2, h = R(2, 15); return num(`A triangle has a base of ${b} cm and a height of ${h} cm. What is its area in cm²?`, b * h / 2, `½ × ${b} × ${h} = ${b * h / 2} cm²`);
    } },
    { title: "Radius and diameter", desc: "Circles", gen() {
      const r = R(2, 25);
      return Math.random() < 0.5 ? num(`A circle has a radius of ${r} cm. What is its diameter in cm?`, 2 * r, `Diameter = 2 × radius = ${2 * r} cm`)
        : num(`A circle has a diameter of ${2 * r} cm. What is its radius in cm?`, r, `Radius = diameter ÷ 2 = ${r} cm`);
    } },
    { title: "Probability", desc: "Chance as a fraction", gen() {
      const red = R(1, 8), blue = R(1, 8), green = R(0, 5), t = red + blue + green;
      const c = pick([["red", red], ["blue", blue]]), ans = frac(c[1], t);
      const v = `<div class="objs">${rep("🔴", red)}${rep("🔵", blue)}${rep("🟢", green)}</div>`;
      return choice(`A bag has these marbles. You pick one without looking. What is the chance it is ${c[0]}?`, ans,
        [frac(Math.max(1, t - c[1]), t), `${c[1]}/${t + 1}`, `1/${c[1] + 1}`, frac(c[1] + 1, t + 2)], `${c[1]} of the ${t} marbles are ${c[0]}: ${c[1]}/${t}${ans !== `${c[1]}/${t}` ? ` = ${ans}` : ""}.`, v);
    } },
    { title: "Speed, distance and time", desc: "km per hour", gen() {
      const s = R(4, 12) * 10, t = R(2, 6);
      return pick([
        () => num(`A car travels at ${s} km/h for ${t} hours. How far does it go, in km?`, s * t, `Distance = speed × time = ${s} × ${t} = ${s * t} km`),
        () => num(`A train travels ${s * t} km in ${t} hours. What is its speed in km/h?`, s, `Speed = distance ÷ time = ${s * t} ÷ ${t} = ${s} km/h`),
        () => num(`A bus travels ${s * t} km at ${s} km/h. How many hours does it take?`, t, `Time = distance ÷ speed = ${s * t} ÷ ${s} = ${t} hours`),
      ])();
    } },
  ]);
})();
