/* Céim: Maths. Every question is generated, so practice never runs out. */
(() => {
  const { R, pick, shuffle, mc, near, rep, euro, E } = U;
  const OBJ = ["🍎", "⭐", "🐞", "🐟", "🚗", "🌸", "🍪", "🎈", "🐥", "⚽"];

  const objs = (emoji, n) => `<div class="objs">${rep(emoji, n)}</div>`;
  const num = (prompt, answer, explain, visual = "") => ({ type: "num", prompt, visual, answer: String(answer), explain });
  const choice = (prompt, answer, wrongs, explain, visual = "") =>
    ({ type: "mc", prompt, visual, choices: mc(answer, wrongs), answer: String(answer), explain });

  const clock = U.clock;
  const timeWords = (h, m) => {
    const next = h % 12 + 1;
    return m === 0 ? `${h} o'clock` : m === 30 ? `half past ${h}` : m === 15 ? `quarter past ${h}` : `quarter to ${next}`;
  };

  const SHAPES = {
    circle: '<circle cx="50" cy="50" r="38"/>',
    square: '<rect x="14" y="14" width="72" height="72"/>',
    triangle: '<polygon points="50,10 90,86 10,86"/>',
    rectangle: '<rect x="6" y="26" width="88" height="48"/>',
    star: '<polygon points="50,6 61,38 95,38 67,58 78,92 50,71 22,92 33,58 5,38 39,38"/>',
  };
  const shape = (n, color) => `<svg class="shape" viewBox="0 0 100 100" fill="${color}" stroke="#333" stroke-width="2">${SHAPES[n]}</svg>`;

  const COINS = [1, 2, 5, 10, 20, 50];
  const coin = (c) => `<span class="coin c${c}">${c}c</span>`;

  const gcd = (a, b) => (b ? gcd(b, a % b) : a);

  // ---------------- Junior Infants ----------------
  CEIM.add("ji", "maths", [
    { title: "Count up to 5", desc: "How many can you see?", gen() {
      const n = R(1, 5), o = pick(OBJ);
      return { type: "mc", prompt: "How many can you see?", visual: objs(o, n), choices: ["1", "2", "3", "4", "5"], answer: String(n), explain: `There are ${n}.` };
    } },
    { title: "Count up to 10", desc: "Count the objects", gen() {
      const n = R(3, 10), o = pick(OBJ);
      return choice("How many can you see?", n, near(n, 2, 1), `Count them one by one: there are ${n}.`, objs(o, n));
    } },
    { title: "More or fewer", desc: "Which group has more?", gen() {
      const o = pick(OBJ); let a = R(1, 8), b = R(1, 8); while (a === b) b = R(1, 8);
      const v = `<div class="groups"><div><b>A</b>${objs(o, a)}</div><div><b>B</b>${objs(o, b)}</div></div>`;
      const fewer = Math.random() < 0.4;
      const ans = fewer ? (a < b ? "A" : "B") : (a > b ? "A" : "B");
      return { type: "mc", prompt: `Which group has ${fewer ? "fewer" : "more"}?`, visual: v, choices: ["A", "B"], answer: ans,
        explain: `Group A has ${a} and group B has ${b}.` };
    } },
    { title: "Name the shape", desc: "Circle, square, triangle…", gen() {
      const names = Object.keys(SHAPES), n = pick(names);
      return choice("What shape is this?", n, names, `This shape is a ${n}.`, shape(n, pick(["#FFB703", "#8ECAE6", "#F28482", "#90BE6D"])));
    } },
    { title: "What comes next?", desc: "Finish the pattern", gen() {
      const [a, b] = shuffle(OBJ).slice(0, 2);
      const pat = pick([[a, b], [a, a, b], [a, b, b]]);
      const len = pat.length * 2 + R(0, pat.length - 1);
      const seq = Array.from({ length: len }, (_, i) => pat[i % pat.length]);
      const ans = pat[len % pat.length];
      return { type: "mc", prompt: "What comes next?", visual: `<div class="objs">${seq.join("")}❓</div>`, choices: shuffle([a, b]), answer: ans,
        explain: `The pattern repeats: ${pat.join(" ")}.` };
    } },
  ]);

  // ---------------- Senior Infants ----------------
  CEIM.add("si", "maths", [
    { title: "Count up to 20", desc: "Count larger groups", gen() {
      const n = R(8, 20), o = pick(OBJ);
      return num("How many can you see?", n, `There are ${n}.`, objs(o, n));
    } },
    { title: "Add within 10", desc: "How many altogether?", gen() {
      const a = R(1, 6), b = R(1, 10 - a), o = pick(OBJ);
      return num(`${a} and ${b} more. How many altogether?`, a + b, `${a} + ${b} = ${a + b}`,
        `<div class="groups"><div>${objs(o, a)}</div><div class="op">+</div><div>${objs(o, b)}</div></div>`);
    } },
    { title: "Take away within 10", desc: "How many are left?", gen() {
      const a = R(3, 10), b = R(1, a - 1), o = pick(["🍪", "🧁", "🍓", "🎈"]);
      return num(`There are ${a}. ${b} ${b === 1 ? "is" : "are"} taken away. How many are left?`, a - b, `${a} − ${b} = ${a - b}`, objs(o, a));
    } },
    { title: "Before and after", desc: "Numbers up to 20", gen() {
      const n = R(1, 19), after = Math.random() < 0.5;
      return num(`What number comes ${after ? "after" : "before"} ${n}?`, after ? n + 1 : n - 1,
        `${after ? n + 1 : n - 1} comes ${after ? "after" : "before"} ${n}.`);
    } },
    { title: "First, second, third", desc: "Ordinal numbers", gen() {
      const row = shuffle(["🐶", "🐱", "🐰", "🐸", "🐵"]);
      const words = ["first", "second", "third", "fourth", "fifth"], i = R(0, 4);
      return { type: "mc", prompt: `Which animal is ${words[i]} in the line? (Start from the left.)`,
        visual: `<div class="objs line">${row.join("")}</div>`, choices: shuffle([row[i], ...shuffle(row.filter((x) => x !== row[i])).slice(0, 3)]),
        answer: row[i], explain: `Counting from the left, the ${words[i]} animal is ${row[i]}.` };
    } },
  ]);

  // ---------------- First Class ----------------
  CEIM.add("c1", "maths", [
    { title: "Add within 20", desc: "Addition facts", gen() {
      const a = R(2, 15), b = R(1, 20 - a); return num(`${a} + ${b} = ?`, a + b, `${a} + ${b} = ${a + b}`);
    } },
    { title: "Subtract within 20", desc: "Subtraction facts", gen() {
      const a = R(5, 20), b = R(1, a); return num(`${a} − ${b} = ?`, a - b, `${a} − ${b} = ${a - b}`);
    } },
    { title: "Make 10", desc: "Number bonds", gen() {
      const a = R(0, 10); return num(`${a} + ? = 10`, 10 - a, `${a} + ${10 - a} = 10`);
    } },
    { title: "Tens and units", desc: "Place value to 99", gen() {
      const t = R(1, 9), u = R(0, 9), n = t * 10 + u;
      return pick([
        () => num(`How many tens are in ${n}?`, t, `${n} = ${t} tens and ${u} units.`),
        () => num(`How many units are in ${n}?`, u, `${n} = ${t} tens and ${u} units.`),
        () => num(`What number is ${t} tens and ${u} units?`, n, `${t} tens = ${t * 10}, plus ${u} units = ${n}.`),
      ])();
    } },
    { title: "Tell the time", desc: "O'clock and half past", gen() {
      const h = R(1, 12), m = pick([0, 30]), ans = timeWords(h, m);
      const wrongs = [timeWords(h % 12 + 1, m), timeWords(h, m === 0 ? 30 : 0), timeWords((h + 10) % 12 + 1, m), timeWords(h % 12 + 1, m === 0 ? 30 : 0)];
      return choice("What time is it?", ans, wrongs, m === 0 ? `The long hand is on 12, so it's ${ans}.` : `The long hand is on 6, so it's ${ans}.`, clock(h, m));
    } },
    { title: "Count the coins", desc: "Add up cent", gen() {
      const cs = Array.from({ length: R(2, 3) }, () => pick([1, 2, 5, 10, 20]));
      const t = cs.reduce((a, b) => a + b, 0);
      return num("How much money is here? (in cent)", t, `${cs.map((c) => c + "c").join(" + ")} = ${t}c`, `<div class="coins">${cs.map(coin).join("")}</div>`);
    } },
  ]);

  // ---------------- Second Class ----------------
  CEIM.add("c2", "maths", [
    { title: "Add within 99", desc: "Two-digit addition", gen() {
      const a = R(11, 70), b = R(5, 99 - a); return num(`${a} + ${b} = ?`, a + b, `${a} + ${b} = ${a + b}`);
    } },
    { title: "Subtract within 99", desc: "Two-digit subtraction", gen() {
      const a = R(20, 99), b = R(5, a - 1); return num(`${a} − ${b} = ?`, a - b, `${a} − ${b} = ${a - b}`);
    } },
    { title: "Odd or even", desc: "Numbers to 100", gen() {
      const n = R(1, 100), ans = n % 2 ? "odd" : "even";
      return { type: "mc", prompt: `Is ${n} odd or even?`, choices: ["odd", "even"], answer: ans, explain: `${n} ends in ${n % 10}, so it is ${ans}.` };
    } },
    { title: "Halves and quarters", desc: "Half of, quarter of", gen() {
      return Math.random() < 0.5
        ? (() => { const n = R(1, 20) * 2; return num(`What is half of ${n}?`, n / 2, `${n} ÷ 2 = ${n / 2}`); })()
        : (() => { const n = R(1, 10) * 4; return num(`What is a quarter of ${n}?`, n / 4, `${n} ÷ 4 = ${n / 4}`); })();
    } },
    { title: "Tell the time", desc: "Quarter past and quarter to", gen() {
      const h = R(1, 12), m = pick([0, 15, 30, 45]), ans = timeWords(h, m);
      const all = [0, 15, 30, 45].map((mm) => timeWords(h, mm)).concat([timeWords(h % 12 + 1, m)]);
      return choice("What time is it?", ans, all, `The short hand is near ${h}${m === 45 ? "–" + (h % 12 + 1) : ""} and the long hand is on ${m / 5 || 12}: ${ans}.`, clock(h, m));
    } },
    { title: "Count in steps", desc: "2s, 3s, 5s and 10s", gen() {
      const s = pick([2, 3, 5, 10]), st = s * R(0, 5), seq = [0, 1, 2, 3].map((i) => st + i * s);
      return num(`What comes next? ${seq.join(", ")}, ?`, st + 4 * s, `The numbers go up in ${s}s: ${seq[3]} + ${s} = ${st + 4 * s}.`);
    } },
  ]);

  // ---------------- Third Class ----------------
  CEIM.add("c3", "maths", [
    { title: "Times tables", desc: "2× to 10× tables", gen() {
      const a = R(2, 10), b = R(1, 10); return num(`${a} × ${b} = ?`, a * b, `${a} × ${b} = ${a * b}`);
    } },
    { title: "Division facts", desc: "Share equally", gen() {
      const a = R(2, 10), b = R(1, 10); return num(`${a * b} ÷ ${a} = ?`, b, `${a} × ${b} = ${a * b}, so ${a * b} ÷ ${a} = ${b}.`);
    } },
    { title: "Add three-digit numbers", desc: "Up to 999", gen() {
      const a = R(100, 600), b = R(50, 999 - a); return num(`${a} + ${b} = ?`, a + b, `${a} + ${b} = ${a + b}`);
    } },
    { title: "Rounding", desc: "Nearest 10 and 100", gen() {
      const to = pick([10, 100]), n = to === 10 ? R(11, 99) : R(101, 999);
      const ans = Math.round(n / to) * to;
      return num(`Round ${n} to the nearest ${to}.`, ans, `${n} is closer to ${ans}.`);
    } },
    { title: "Fractions of a set", desc: "1/2, 1/3, 1/4, 1/5…", gen() {
      const d = R(2, 6), k = R(2, 8), n = d * k;
      return num(`What is 1/${d} of ${n}?`, k, `${n} ÷ ${d} = ${k}`);
    } },
    { title: "Perimeter", desc: "Distance around a rectangle", gen() {
      const l = R(3, 15), w = R(2, 10);
      return num(`A rectangle is ${l} cm long and ${w} cm wide. What is its perimeter in cm?`, 2 * (l + w),
        `${l} + ${w} + ${l} + ${w} = ${2 * (l + w)} cm`, `<svg class="rect" viewBox="0 0 160 100"><rect x="10" y="20" width="140" height="60" fill="#CDEAC0" stroke="#333" stroke-width="2"/><text x="80" y="14" text-anchor="middle" font-size="13">${l} cm</text><text x="156" y="55" text-anchor="end" font-size="13">${w} cm</text></svg>`);
    } },
  ]);

  // ---------------- Fourth Class ----------------
  CEIM.add("c4", "maths", [
    { title: "Multiply 2-digit by 1-digit", desc: "e.g. 34 × 6", gen() {
      const a = R(12, 99), b = R(2, 9); return num(`${a} × ${b} = ?`, a * b, `${a} × ${b} = ${a * b}`);
    } },
    { title: "Division with remainders", desc: "e.g. 29 ÷ 4", gen() {
      const d = R(3, 9), q = R(2, 12), r = R(1, d - 1), n = d * q + r;
      const ans = `${q} r ${r}`;
      return choice(`${n} ÷ ${d} = ?`, ans, [`${q + 1} r ${r}`, `${q} r ${(r + 1) % d || 1}`, `${q - 1} r ${r}`, `${q} r ${d - r}`, `${q}`],
        `${d} × ${q} = ${d * q}, and ${n} − ${d * q} = ${r} left over.`);
    } },
    { title: "Add tenths", desc: "Decimals to one place", gen() {
      const a = R(1, 50) / 10, b = R(1, 50) / 10, ans = U.dec(a + b, 1);
      return num(`${a} + ${b} = ?`, ans, `${a} + ${b} = ${ans}`);
    } },
    { title: "Area of a rectangle", desc: "Square centimetres", gen() {
      const l = R(2, 12), w = R(2, 10);
      return num(`A rectangle is ${l} cm by ${w} cm. What is its area in cm²?`, l * w, `Area = length × width = ${l} × ${w} = ${l * w} cm²`);
    } },
    { title: "Equivalent fractions", desc: "1/2 = ?/8", gen() {
      const d = pick([2, 3, 4, 5]), n = R(1, d - 1), k = R(2, 5);
      return num(`${n}/${d} = ?/${d * k}`, n * k, `Multiply the top and bottom by ${k}: ${n}/${d} = ${n * k}/${d * k}`);
    } },
    { title: "Place value to thousands", desc: "Value of a digit", gen() {
      const n = R(1000, 9999), s = String(n), i = R(0, 3), place = [1000, 100, 10, 1][i];
      const digit = Number(s[i]);
      if (digit === 0 || s.split(String(digit)).length > 2) return this.gen();   // the digit must appear only once
      const ans = digit * place;
      return choice(`What is the value of the ${digit} in ${n.toLocaleString("en-IE")}?`, ans, [digit, digit * 10, digit * 100, digit * 1000],
        `The ${digit} is in the ${["thousands", "hundreds", "tens", "units"][i]} place, so it's worth ${ans}.`);
    } },
  ]);

  // ---------------- Fifth Class ----------------
  CEIM.add("c5", "maths", [
    { title: "Add and subtract decimals", desc: "Hundredths", gen() {
      const a = R(100, 999) / 100, b = R(10, 500) / 100;
      return Math.random() < 0.5 ? num(`${a.toFixed(2)} + ${b.toFixed(2)} = ?`, U.dec(a + b), `${a.toFixed(2)} + ${b.toFixed(2)} = ${U.dec(a + b)}`)
        : (() => { const [x, y] = a > b ? [a, b] : [b, a]; return num(`${x.toFixed(2)} − ${y.toFixed(2)} = ?`, U.dec(x - y), `${x.toFixed(2)} − ${y.toFixed(2)} = ${U.dec(x - y)}`); })();
    } },
    { title: "Percentages of amounts", desc: "10%, 25%, 50%…", gen() {
      const p = pick([10, 20, 25, 50, 75]), n = R(2, 20) * (p === 25 || p === 75 ? 4 : 10);
      return num(`What is ${p}% of ${n}?`, n * p / 100, `${p}% of ${n} = ${n} × ${p} ÷ 100 = ${n * p / 100}`);
    } },
    { title: "Multiply 2-digit by 2-digit", desc: "e.g. 23 × 14", gen() {
      const a = R(11, 45), b = R(11, 29); return num(`${a} × ${b} = ?`, a * b, `${a} × ${b} = ${a * b}`);
    } },
    { title: "Add fractions", desc: "Same denominator", gen() {
      const d = pick([4, 5, 6, 8, 10, 12]), a = R(1, d - 2), b = R(1, d - 1 - a);
      const ans = `${a + b}/${d}`;
      return choice(`${a}/${d} + ${b}/${d} = ?`, ans, [`${a + b}/${d * 2}`, `${a + b + 1}/${d}`, `${Math.max(1, a + b - 1)}/${d}`, `${a * b}/${d}`],
        `Add the tops, keep the bottom: ${a} + ${b} = ${a + b}, so ${ans}.`);
    } },
    { title: "24-hour clock", desc: "Convert am/pm times", gen() {
      const h = R(1, 11), m = pick([0, 15, 30, 45]), pm = Math.random() < 0.6;
      const mm = String(m).padStart(2, "0"), h24 = pm ? h + 12 : h, ans = `${String(h24).padStart(2, "0")}:${mm}`;
      return choice(`What is ${h}:${mm} ${pm ? "pm" : "am"} in 24-hour time?`, ans,
        [`${String(pm ? h : h + 12).padStart(2, "0")}:${mm}`, `${String((h24 + 1) % 24).padStart(2, "0")}:${mm}`, `${h}:${mm}`, `${String((h24 + 22) % 24).padStart(2, "0")}:${mm}`],
        pm ? `Afternoon and evening times: add 12 to the hour (${h} + 12 = ${h24}).` : `Morning times keep the same hour: ${ans}.`);
    } },
    { title: "Find the average", desc: "Mean of a set", gen() {
      const k = R(3, 5), mean = R(4, 30);
      const vals = Array.from({ length: k - 1 }, () => mean + R(-4, 4));
      const last = mean * k - vals.reduce((a, b) => a + b, 0);
      if (last < 0) return this.gen();
      const all = shuffle([...vals, last]);
      return num(`What is the average of ${all.join(", ")}?`, mean, `Add them (${all.reduce((a, b) => a + b, 0)}) and divide by ${k}: ${mean}.`);
    } },
  ]);

  // ---------------- Sixth Class ----------------
  CEIM.add("c6", "maths", [
    { title: "Percentage discounts", desc: "Sale prices", gen() {
      const p = pick([10, 20, 25, 50]), price = R(2, 20) * (p === 25 ? 4 : 10);
      const ans = price - price * p / 100;
      return num(`A jacket costs €${price}. It is reduced by ${p}%. What is the new price in €?`, ans, `${p}% of €${price} = €${price * p / 100}. €${price} − €${price * p / 100} = €${ans}`);
    } },
    { title: "Sharing in a ratio", desc: "e.g. 2 : 3", gen() {
      const a = R(1, 4), b = R(a + 1, 6), part = R(2, 10), total = (a + b) * part;
      return num(`Share €${total} in the ratio ${a} : ${b}. How much is the larger share in €?`, b * part,
        `${a} + ${b} = ${a + b} parts. €${total} ÷ ${a + b} = €${part} per part. ${b} × €${part} = €${b * part}`);
    } },
    { title: "Simple equations", desc: "Find the missing number", gen() {
      const x = R(2, 15);
      return pick([
        () => { const a = R(2, 20); return num(`x + ${a} = ${x + a}. What is x?`, x, `x = ${x + a} − ${a} = ${x}`); },
        () => { const a = R(2, 9); return num(`${a}x = ${a * x}. What is x?`, x, `x = ${a * x} ÷ ${a} = ${x}`); },
        () => { const a = R(2, 6), b = R(1, 12); return num(`${a}x + ${b} = ${a * x + b}. What is x?`, x, `${a}x = ${a * x + b} − ${b} = ${a * x}, so x = ${x}`); },
      ])();
    } },
    { title: "Positive and negative numbers", desc: "Integers", gen() {
      const a = R(-10, 10), b = R(1, 12), plus = Math.random() < 0.5;
      const ans = plus ? a + b : a - b;
      return { ...num(`${a} ${plus ? "+" : "−"} ${b} = ?`, ans, `Start at ${a} and move ${b} ${plus ? "up" : "down"} the number line: ${ans}.`), neg: true };
    } },
    { title: "Order of operations", desc: "Brackets, ×, ÷ before + and −", gen() {
      const a = R(2, 12), b = R(2, 9), c = R(2, 9);
      return pick([
        () => num(`${a} + ${b} × ${c} = ?`, a + b * c, `Multiply first: ${b} × ${c} = ${b * c}, then ${a} + ${b * c} = ${a + b * c}`),
        () => num(`(${a} + ${b}) × ${c} = ?`, (a + b) * c, `Brackets first: ${a} + ${b} = ${a + b}, then × ${c} = ${(a + b) * c}`),
        () => num(`${a * c} − ${b} × ${c} = ?`, a * c - b * c, `Multiply first: ${b} × ${c} = ${b * c}, then ${a * c} − ${b * c} = ${a * c - b * c}`),
      ])();
    } },
    { title: "Volume of a cuboid", desc: "Cubic centimetres", gen() {
      const l = R(2, 10), w = R(2, 8), h = R(2, 6);
      return num(`A box is ${l} cm long, ${w} cm wide and ${h} cm high. What is its volume in cm³?`, l * w * h, `Volume = ${l} × ${w} × ${h} = ${l * w * h} cm³`);
    } },
  ]);
})();
