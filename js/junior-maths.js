/* Céim: Junior Cycle Maths (First to Third Year). Every question is generated. */
(() => {
  const { R, pick, shuffle, mc, near } = U;
  const num = (prompt, answer, explain, extra = {}) => ({ type: "num", prompt, answer: String(answer), explain, neg: String(answer).startsWith("-"), ...extra });
  const choice = (prompt, answer, wrongs, explain, visual = "") => ({ type: "mc", prompt, visual, choices: mc(answer, wrongs), answer: String(answer), explain });
  const gcd = (a, b) => (b ? gcd(b, a % b) : Math.abs(a));
  const frac = (n, d) => { const g = gcd(n, d); n /= g; d /= g; if (d < 0) { n = -n; d = -d; } return d === 1 ? String(n) : `${n}/${d}`; };
  const M = (n) => (n < 0 ? `−${-n}` : String(n));                 // display a number with a proper minus sign
  const P = (n) => (n < 0 ? `(−${-n})` : String(n));               // bracket negatives inside sums
  // Algebra term formatting: coef + variable, e.g. 3x, −x, x
  const T = (c, v = "x") => (c === 1 ? v : c === -1 ? `−${v}` : `${M(c)}${v}`);
  const plus = (c) => (c < 0 ? ` − ${-c}` : ` + ${c}`);
  const plusT = (c, v = "x") => (c < 0 ? ` − ${T(-c, v)}` : ` + ${T(c, v)}`);
  const nz = (a, b) => { let v = 0; while (v === 0) v = R(a, b); return v; };
  const sup = (n) => String(n).split("").map((d) => "⁰¹²³⁴⁵⁶⁷⁸⁹"[d]).join(""); // plain text, safe in choices and explanations

  // ---------------- First Year ----------------
  CEIM.add("y1", "maths", [
    { title: "Integers: multiply and divide", desc: "Signs: − × − = +", gen() {
      const a = nz(-12, 12), b = nz(-9, 9);
      return Math.random() < 0.5 ? num(`${M(a)} × ${M(b)} = ?`, a * b, `${a * b < 0 ? "Different signs give a negative" : "Same signs give a positive"}: ${M(a * b)}.`)
        : num(`${M(a * b)} ÷ ${M(b)} = ?`, a, `${a < 0 ? "Different signs give a negative" : "Same signs give a positive"}: ${M(a)}.`);
    } },
    { title: "BIMDAS", desc: "Brackets, indices, then ×, ÷, +, −", gen() {
      const a = R(2, 9), b = R(2, 5), c = R(2, 6), d = R(1, 9);
      return pick([
        () => num(`${a} + ${b}${sup(2)} × ${c} = ?`, a + b * b * c, `Indices first: ${b}² = ${b * b}. Then × ${c} = ${b * b * c}. Then + ${a} = ${a + b * b * c}.`),
        () => num(`(${a} + ${d})${sup(2)} − ${c} = ?`, (a + d) ** 2 - c, `Brackets: ${a + d}. Indices: ${(a + d) ** 2}. Then − ${c} = ${(a + d) ** 2 - c}.`),
        () => num(`${a * c} ÷ ${c} + ${b} × ${d} = ?`, a + b * d, `${a * c} ÷ ${c} = ${a}, ${b} × ${d} = ${b * d}, then ${a} + ${b * d} = ${a + b * d}.`),
      ])();
    } },
    { title: "Add and subtract fractions", desc: "Different denominators", gen() {
      const d1 = pick([2, 3, 4, 5, 6]), d2 = pick([3, 4, 5, 6, 8].filter((x) => x !== d1)), n1 = R(1, d1 - 1), n2 = R(1, d2 - 1);
      const sub = Math.random() < 0.4 && n1 / d1 > n2 / d2;
      const ans = frac(sub ? n1 * d2 - n2 * d1 : n1 * d2 + n2 * d1, d1 * d2);
      const wrong = [frac(n1 + n2, d1 + d2), frac(sub ? n1 - n2 : n1 + n2, d1 * d2), frac(n1 * d2 + n2 * d1 + 1, d1 * d2), frac(Math.abs(n1 * d2 - n2 * d1) + (sub ? 1 : 0) || 1, d1 * d2)];
      return choice(`${n1}/${d1} ${sub ? "−" : "+"} ${n2}/${d2} = ?`, ans, wrong, `Use a common denominator of ${d1 * d2}: ${n1 * d2}/${d1 * d2} ${sub ? "−" : "+"} ${n2 * d1}/${d1 * d2}, which simplifies to ${ans}.`);
    } },
    { title: "Multiply and divide fractions", desc: "e.g. 2/3 × 3/4", gen() {
      const a = R(1, 5), b = R(a + 1, 9), c = R(1, 5), d = R(c + 1, 9), div = Math.random() < 0.4;
      const ans = div ? frac(a * d, b * c) : frac(a * c, b * d);
      return choice(`${a}/${b} ${div ? "÷" : "×"} ${c}/${d} = ?`, ans, [frac(a * c, b * d + 1), frac(a + c, b + d), frac(a * d, b * c + 1), div ? frac(a * c, b * d) : frac(a * d, b * c)],
        div ? `Flip the second fraction and multiply: ${a}/${b} × ${d}/${c} = ${ans}.` : `Multiply tops and bottoms: ${a * c}/${b * d}${a * c + "/" + b * d === ans ? "" : ` = ${ans}`}.`);
    } },
    { title: "Simplify ratios", desc: "e.g. 12 : 18 = 2 : 3", gen() {
      let a = R(1, 7), b = R(1, 7); while (a === b || gcd(a, b) !== 1) b = R(1, 7);
      const k = R(2, 9), ans = `${a} : ${b}`;
      return choice(`Write ${a * k} : ${b * k} in its simplest form.`, ans, [`${b} : ${a}`, `${a * 2} : ${b * 2}`, `${a + 1} : ${b}`, `${a} : ${b + 1}`], `Divide both by ${k}: ${ans}.`);
    } },
    { title: "Powers and square roots", desc: "2⁵, √81", gen() {
      return Math.random() < 0.5 ? (() => { const b = R(2, 6), e = R(2, b <= 3 ? 6 : 4); return num(`${b}${sup(e)} = ?`, b ** e, `${Array(e).fill(b).join(" × ")} = ${b ** e}`); })()
        : (() => { const r = R(2, 15); return num(`√${r * r} = ?`, r, `${r} × ${r} = ${r * r}`); })();
    } },
    { title: "Simplify expressions", desc: "Collect like terms", gen() {
      const a = nz(-6, 9), b = nz(-6, 6), c = nz(-9, 9), d = nz(-9, 9);
      const x = a + b, k = c + d;
      const show = (xc, kc) => (xc === 0 ? M(kc) : `${T(xc)}${kc === 0 ? "" : plus(kc)}`);
      const ans = show(x, k);
      return choice(`Simplify: ${T(a)}${plus(c)}${plusT(b)}${plus(d)}`, ans, [show(x + 1, k), show(x, k + 2), show(a - b || 1, k), show(x, c - d || 3), `${T(x + k)}`],
        `x terms: ${M(a)} + ${P(b)} = ${M(x)}. Numbers: ${M(c)} + ${P(d)} = ${M(k)}. Answer: ${ans}.`);
    } },
    { title: "Evaluate expressions", desc: "Substitute a value", gen() {
      const x = nz(-5, 6), a = nz(-5, 7), b = nz(-10, 10);
      return pick([
        () => num(`If x = ${M(x)}, what is ${T(a)}${plus(b)}?`, a * x + b, `${M(a)} × ${P(x)}${plus(b)} = ${M(a * x)}${plus(b)} = ${M(a * x + b)}`),
        () => num(`If x = ${M(x)}, what is x${sup(2)}${plus(b)}?`, x * x + b, `${P(x)}² = ${x * x}, then ${x * x}${plus(b)} = ${M(x * x + b)}`),
      ])();
    } },
    { title: "Solve linear equations", desc: "e.g. 3x − 4 = 11", gen() {
      const x = nz(-9, 12), a = nz(-6, 8), b = nz(-15, 15), c = a * x + b;
      return num(`Solve: ${T(a)}${plus(b)} = ${M(c)}`, x, `${T(a)} = ${M(c)}${plus(-b)} = ${M(c - b)}, so x = ${M(c - b)} ÷ ${P(a)} = ${M(x)}.`);
    } },
    { title: "Angles in triangles and on lines", desc: "180°", gen() {
      return Math.random() < 0.5 ? (() => { const a = R(25, 100), b = R(20, 150 - a); return num(`Two angles of a triangle are ${a}° and ${b}°. What is the third angle (in degrees)?`, 180 - a - b, `The angles in a triangle add to 180°: 180 − ${a} − ${b} = ${180 - a - b}°.`); })()
        : (() => { const a = R(15, 165); return num(`Two angles on a straight line. One is ${a}°. What is the other (in degrees)?`, 180 - a, `Angles on a straight line add to 180°: 180 − ${a} = ${180 - a}°.`); })();
    } },
    { title: "Mean, median, mode and range", desc: "Statistics", gen() {
      const k = pick([5, 7]), vals = Array.from({ length: k }, () => R(1, 20));
      const sorted = [...vals].sort((a, b) => a - b);
      const what = pick(["median", "range", "mode", "mean"]);
      if (what === "mode") { vals[1] = vals[3]; }
      if (what === "mean") { const s = vals.reduce((a, b) => a + b, 0), r = s % k; vals[0] += r ? k - r : 0; }
      const srt = [...vals].sort((a, b) => a - b), sum = vals.reduce((a, b) => a + b, 0);
      const counts = {}; vals.forEach((v) => (counts[v] = (counts[v] || 0) + 1));
      const max = Math.max(...Object.values(counts)), modes = Object.keys(counts).filter((v) => counts[v] === max);
      if (what === "mode" && modes.length !== 1) return this.gen();
      const ans = { median: srt[(k - 1) / 2], range: srt[k - 1] - srt[0], mode: Number(modes[0]), mean: sum / k }[what];
      const ex = { median: `In order: ${srt.join(", ")}. The middle value is ${ans}.`, range: `Largest − smallest = ${srt[k - 1]} − ${srt[0]} = ${ans}.`,
        mode: `${ans} appears most often.`, mean: `Total ${sum} ÷ ${k} = ${ans}.` }[what];
      void sorted;
      return num(`Find the <b>${what}</b> of: ${vals.join(", ")}`, ans, ex);
    } },
    { title: "Sets", desc: "Union, intersection, elements", gen() {
      const pool = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
      const both = pool.slice(0, R(1, 3)), onlyA = pool.slice(3, 3 + R(1, 3)), onlyB = pool.slice(6, 6 + R(1, 3));
      const A = shuffle([...both, ...onlyA]).sort((a, b) => a - b), B = shuffle([...both, ...onlyB]).sort((a, b) => a - b);
      const q = pick([["A ∩ B", both.length, "in both A and B"], ["A ∪ B", both.length + onlyA.length + onlyB.length, "in A or B (or both)"], ["A \\ B", onlyA.length, "in A but not in B"]]);
      return num(`A = {${A.join(", ")}}, B = {${B.join(", ")}}. How many elements are in ${q[0]}?`, q[1], `${q[0]} means the elements ${q[2]}: ${q[1]}.`);
    } },
  ]);

  // ---------------- Second Year ----------------
  CEIM.add("y2", "maths", [
    { title: "Percentage increase and decrease", desc: "Find the new amount", gen() {
      const p = pick([5, 10, 15, 20, 25, 30, 40]), base = R(2, 30) * 20, up = Math.random() < 0.5, ans = base * (100 + (up ? p : -p)) / 100;
      return num(`€${base} ${up ? "increased" : "decreased"} by ${p}% = € ?`, U.dec(ans), `${p}% of ${base} = ${U.dec(base * p / 100)}. ${base} ${up ? "+" : "−"} ${U.dec(base * p / 100)} = ${U.dec(ans)}.`);
    } },
    { title: "VAT", desc: "Adding VAT to a price", gen() {
      const rate = pick([23, 13.5, 9]), base = R(1, 40) * 20, vat = base * rate / 100;
      return Math.random() < 0.5
        ? num(`A bill is €${base} before VAT at ${rate}%. How much is the VAT (in €)?`, U.dec(vat), `${rate}% of €${base} = €${U.dec(vat)}.`)
        : num(`A bill is €${base} before VAT at ${rate}%. What is the total including VAT (in €)?`, U.dec(base + vat), `VAT = €${U.dec(vat)}. Total = €${base} + €${U.dec(vat)} = €${U.dec(base + vat)}.`);
    } },
    { title: "Expand brackets", desc: "3(2x + 4)", gen() {
      let k = nz(-5, 6); while (Math.abs(k) === 1) k = nz(-5, 6); const a = nz(-5, 6), b = nz(-9, 9);
      const ans = `${T(k * a)}${plus(k * b)}`;
      return choice(`Expand: ${M(k)}(${T(a)}${plus(b)})`, ans, [`${T(k * a)}${plus(b)}`, `${T(a)}${plus(k * b)}`, `${T(k * a)}${plus(-k * b)}`, `${T(k + a)}${plus(k * b)}`],
        `Multiply each term by ${M(k)}: ${M(k)} × ${T(a)} = ${T(k * a)}, ${M(k)} × ${P(b)} = ${M(k * b)}.`);
    } },
    { title: "Factorise: common factor", desc: "6x + 9 = 3(2x + 3)", gen() {
      const k = R(2, 9); let a = R(1, 6), b = R(1, 9); while (gcd(a, b) !== 1) b = R(1, 9);
      const neg = Math.random() < 0.4;
      const ans = `${k}(${T(a)}${neg ? " − " : " + "}${b})`;
      return choice(`Factorise: ${T(k * a)}${neg ? " − " : " + "}${k * b}`, ans, [`${k}(${T(a)}${neg ? " + " : " − "}${b})`, `${k * a}(x${neg ? " − " : " + "}${b})`, `x(${k * a}${neg ? " − " : " + "}${k * b})`, `${k}(${T(a * k)}${neg ? " − " : " + "}${b})`],
        `${k} goes into both terms: ${ans}.`);
    } },
    { title: "Equations with x on both sides", desc: "5x − 3 = 2x + 9", gen() {
      const x = nz(-8, 10), a = R(3, 9), c = R(1, a - 1), b = nz(-12, 12), d = (a - c) * x + b;
      return num(`Solve: ${T(a)}${plus(b)} = ${T(c)}${plus(d)}`, x, `${T(a)} − ${T(c)} = ${M(d)} − ${P(b)} → ${T(a - c)} = ${M(d - b)} → x = ${M(x)}.`);
    } },
    { title: "Simultaneous equations", desc: "Two equations, two unknowns", gen() {
      const x = nz(-6, 9), y = nz(-6, 9), a = R(1, 3), b = R(1, 3);
      const e1 = `${T(a)}${plusT(b, "y")} = ${M(a * x + b * y)}`, e2 = `x − y = ${M(x - y)}`;
      const ask = pick(["x", "y"]);
      return num(`${e1}<br>${e2}<br>What is ${ask}?`, ask === "x" ? x : y, `The solution is x = ${M(x)}, y = ${M(y)}. Check: ${M(a)}(${M(x)}) + ${M(b)}(${M(y)}) = ${M(a * x + b * y)}.`);
    } },
    { title: "Rules of indices", desc: "aᵐ × aⁿ = aᵐ⁺ⁿ", gen() {
      const m = R(2, 9), n = R(2, 6);
      return pick([
        () => num(`a${sup(m)} × a${sup(n)} = a<sup>?</sup>`, m + n, `Multiply → add the powers: ${m} + ${n} = ${m + n}.`),
        () => num(`a${sup(m + n)} ÷ a${sup(n)} = a<sup>?</sup>`, m, `Divide → subtract the powers: ${m + n} − ${n} = ${m}.`),
        () => num(`(a${sup(m)})${sup(n)} = a<sup>?</sup>`, m * n, `Power of a power → multiply: ${m} × ${n} = ${m * n}.`),
      ])();
    } },
    { title: "Scientific notation", desc: "a × 10ⁿ", gen() {
      const a = R(11, 99) / 10, n = R(2, 7), val = Math.round(a * 10 ** n);
      return Math.random() < 0.6 ? num(`${val.toLocaleString("en-IE")} = ${a} × 10<sup>?</sup>`, n, `Move the decimal point ${n} places: ${a} × 10${sup(n)}.`)
        : choice(`Write ${a} × 10${sup(n)} as an ordinary number.`, val.toLocaleString("en-IE"), [(val * 10).toLocaleString("en-IE"), (val / 10).toLocaleString("en-IE"), Math.round(a * 10 ** (n - 2)).toLocaleString("en-IE")],
          `Move the decimal point ${n} places right: ${val.toLocaleString("en-IE")}.`);
    } },
    { title: "Pythagoras' theorem", desc: "a² + b² = c²", gen() {
      const [a, b, c] = pick([[3, 4, 5], [5, 12, 13], [8, 15, 17], [7, 24, 25], [20, 21, 29]]), k = pick([1, 1, 2, 3]);
      return Math.random() < 0.6 ? num(`A right-angled triangle has shorter sides ${a * k} cm and ${b * k} cm. How long is the hypotenuse (in cm)?`, c * k, `c² = ${a * k}² + ${b * k}² = ${(a * k) ** 2 + (b * k) ** 2}, so c = ${c * k}.`)
        : num(`A right-angled triangle has a hypotenuse of ${c * k} cm and one side of ${a * k} cm. How long is the other side (in cm)?`, b * k, `b² = ${c * k}² − ${a * k}² = ${(c * k) ** 2 - (a * k) ** 2}, so b = ${b * k}.`);
    } },
    { title: "Circles: circumference and area", desc: "Use π = 3.14", gen() {
      const r = R(1, 15);
      return Math.random() < 0.5 ? num(`A circle has a radius of ${r} cm. Using π = 3.14, what is its circumference (in cm)?`, U.dec(2 * 3.14 * r), `C = 2πr = 2 × 3.14 × ${r} = ${U.dec(2 * 3.14 * r)} cm`)
        : num(`A circle has a radius of ${r} cm. Using π = 3.14, what is its area (in cm²)?`, U.dec(3.14 * r * r), `A = πr² = 3.14 × ${r}² = ${U.dec(3.14 * r * r)} cm²`);
    } },
    { title: "Slope and midpoint", desc: "Coordinate geometry", gen() {
      const x1 = R(-6, 6), y1 = R(-6, 6), dx = nz(-4, 4) * 2, m = nz(-3, 3), x2 = x1 + dx, y2 = y1 + m * dx;
      const pt = (x, y) => `(${M(x)}, ${M(y)})`;
      return Math.random() < 0.5 ? num(`What is the slope of the line through ${pt(x1, y1)} and ${pt(x2, y2)}?`, m, `Slope = (y₂ − y₁) ÷ (x₂ − x₁) = ${M(y2 - y1)} ÷ ${P(x2 - x1)} = ${M(m)}.`)
        : choice(`What is the midpoint of ${pt(x1, y1)} and ${pt(x2, y2)}?`, pt((x1 + x2) / 2, (y1 + y2) / 2), [pt((x2 - x1) / 2, (y2 - y1) / 2), pt((x1 + x2) / 2, y1), pt(x1 + x2, y1 + y2), pt((y1 + y2) / 2, (x1 + x2) / 2)],
          `Average the x values and the y values: ${pt((x1 + x2) / 2, (y1 + y2) / 2)}.`);
    } },
    { title: "Counting outcomes and probability", desc: "Sample spaces", gen() {
      return pick([
        () => { const [a, an] = pick([["a coin", 2], ["a die", 6], ["a spinner with 4 colours", 4]]), [b, bn] = pick([["a coin", 2], ["a die", 6], ["a spinner with 3 sections", 3]]);
          return num(`You use ${a} and ${b}. How many possible outcomes are there?`, an * bn, `${an} × ${bn} = ${an * bn} outcomes.`); },
        () => { const t = R(2, 12), ways = 6 - Math.abs(7 - t);
          return choice(`Two dice are rolled and the scores are added. What is the probability of a total of ${t}?`, frac(ways, 36), [frac(ways + 1, 36), `1/${t}`, frac(ways, 12), `${t}/36`], `There are ${ways} ways to make ${t} out of 36 outcomes: ${frac(ways, 36)}.`); },
      ])();
    } },
  ]);

  // ---------------- Third Year (Junior Cert) ----------------
  CEIM.add("y3", "maths", [
    { title: "Factorise quadratics", desc: "x² + bx + c", gen() {
      const p = nz(-9, 9), q = nz(-9, 9), b = p + q, c = p * q;
      const br = (n) => `(x${plus(n)})`;
      const ans = `${br(p)}${br(q)}`;
      return choice(`Factorise: x${sup(2)}${b === 0 ? "" : plusT(b)}${plus(c)}`, ans, [`${br(-p)}${br(-q)}`, `${br(p)}${br(-q)}`, `${br(-p)}${br(q)}`, `${br(b)}${br(c === b ? c + 1 : 1)}`],
        `Find two numbers that multiply to ${M(c)} and add to ${M(b)}: ${M(p)} and ${M(q)}.`);
    } },
    { title: "Solve quadratic equations", desc: "Find both roots", gen() {
      const p = nz(-9, 9); let q = nz(-9, 9); while (q === p) q = nz(-9, 9);
      const b = -(p + q), c = p * q, roots = [p, q].sort((a, b2) => a - b2);
      const show = (r) => `x = ${M(r[0])} or x = ${M(r[1])}`;
      return choice(`Solve: x${sup(2)}${b === 0 ? "" : plusT(b)}${plus(c)} = 0`, show(roots), [show([-roots[1], -roots[0]]), show([roots[0], -roots[1]].sort((a, b2) => a - b2)), show([-roots[0], roots[1]].sort((a, b2) => a - b2)), show([roots[0] - 1, roots[1] + 1])],
        `It factorises as (x${plus(-p)})(x${plus(-q)}) = 0, so ${show(roots)}.`);
    } },
    { title: "Difference of two squares", desc: "x² − a² = (x − a)(x + a)", gen() {
      const a = R(2, 12), k = pick([1, 1, 2, 3]);
      const lhs = k === 1 ? `x${sup(2)} − ${a * a}` : `${k * k}x${sup(2)} − ${a * a}`;
      const kx = k === 1 ? "x" : `${k}x`, ans = `(${kx} − ${a})(${kx} + ${a})`;
      return choice(`Factorise: ${lhs}`, ans, [`(${kx} − ${a})${sup(2)}`, `(${kx} + ${a})${sup(2)}`, `(${kx} − ${a * a})(${kx} + 1)`, `${kx}(${kx} − ${a})`],
        `${lhs} = (${kx})² − ${a}², a difference of two squares: ${ans}.`);
    } },
    { title: "Solve inequalities", desc: "2x + 3 < 11", gen() {
      const x = R(-5, 9), a = R(2, 6), b = nz(-10, 10), sym = pick(["<", ">", "≤", "≥"]);
      const ans = `x ${sym} ${M(x)}`, flip = { "<": ">", ">": "<", "≤": "≥", "≥": "≤" }[sym];
      return choice(`Solve: ${T(a)}${plus(b)} ${sym} ${M(a * x + b)}`, ans, [`x ${flip} ${M(x)}`, `x ${sym} ${M(x + 1)}`, `x ${sym} ${M(a * x + b)}`, `x ${flip} ${M(-x)}`],
        `${T(a)} ${sym} ${M(a * x + b)}${plus(-b)} = ${M(a * x)}, so x ${sym} ${M(x)}.`);
    } },
    { title: "Functions", desc: "f(x) notation", gen() {
      const a = nz(-5, 6), b = nz(-10, 10), x = nz(-5, 6);
      return Math.random() < 0.6 ? num(`f(x) = ${T(a)}${plus(b)}. Find f(${M(x)}).`, a * x + b, `f(${M(x)}) = ${M(a)} × ${P(x)}${plus(b)} = ${M(a * x + b)}.`)
        : num(`f(x) = x${sup(2)}${plusT(a)}. Find f(${M(x)}).`, x * x + a * x, `f(${M(x)}) = ${P(x)}² + ${P(a)} × ${P(x)} = ${x * x} + ${P(a * x)} = ${M(x * x + a * x)}.`);
    } },
    { title: "Linear graphs: y = mx + c", desc: "Slope and y-intercept", gen() {
      const m = nz(-6, 6), c = R(-9, 9), eq = `y = ${T(m)}${c === 0 ? "" : plus(c)}`;
      return Math.random() < 0.5 ? num(`What is the slope of ${eq}?`, m, `In y = mx + c, the slope is m = ${M(m)}.`)
        : num(`Where does ${eq} cross the y-axis? (Give the y value.)`, c, `In y = mx + c, the line crosses the y-axis at c = ${M(c)}.`);
    } },
    { title: "Trigonometry ratios", desc: "sin, cos, tan", gen() {
      const [a, b, c] = pick([[3, 4, 5], [5, 12, 13], [8, 15, 17], [7, 24, 25]]);
      const r = pick(["sin", "cos", "tan"]), ans = { sin: frac(a, c), cos: frac(b, c), tan: frac(a, b) }[r];
      const v = `<svg class="rect" viewBox="0 0 240 150"><polygon points="30,130 210,130 210,30" fill="#E8EAF6" stroke="#333" stroke-width="2"/><rect x="198" y="118" width="12" height="12" fill="none" stroke="#333"/>
        <text x="120" y="146" text-anchor="middle" font-size="14">adjacent = ${b}</text><text x="216" y="84" font-size="14">${a}</text><text x="104" y="70" font-size="14" text-anchor="end">hyp = ${c}</text><text x="52" y="124" font-size="15">A</text></svg>`;
      return choice(`What is ${r} A?`, ans, [frac(a, c), frac(b, c), frac(a, b), frac(b, a), frac(c, a)], `${r} = ${{ sin: "opposite ÷ hypotenuse", cos: "adjacent ÷ hypotenuse", tan: "opposite ÷ adjacent" }[r]} = ${ans}.`, v);
    } },
    { title: "Surface area and volume", desc: "Cuboids and cylinders", gen() {
      return Math.random() < 0.5 ? (() => { const l = R(2, 12), w = R(2, 10), h = R(2, 8), sa = 2 * (l * w + l * h + w * h);
        return num(`A cuboid is ${l} cm × ${w} cm × ${h} cm. What is its total surface area (in cm²)?`, sa, `2(lw + lh + wh) = 2(${l * w} + ${l * h} + ${w * h}) = ${sa} cm²`); })()
        : (() => { const r = R(1, 10), h = R(2, 15), v = 3.14 * r * r * h;
        return num(`A cylinder has radius ${r} cm and height ${h} cm. Using π = 3.14, what is its volume (in cm³)?`, U.dec(v), `V = πr²h = 3.14 × ${r * r} × ${h} = ${U.dec(v)} cm³`); })();
    } },
    { title: "Compound interest", desc: "Savings over 2 or 3 years", gen() {
      const p = R(5, 50) * 100, r = pick([2, 3, 4, 5, 10]), n = pick([2, 3]);
      const fv = Math.round(p * (1 + r / 100) ** n * 100) / 100;
      return num(`€${p.toLocaleString("en-IE")} is saved at ${r}% compound interest per year. How much is it worth after ${n} years (in €, to the nearest cent)?`, fv.toFixed(2),
        `Multiply by ${1 + r / 100} each year: €${p} × ${1 + r / 100}${sup(n)} = €${fv.toFixed(2)}.`);
    } },
    { title: "Distance between two points", desc: "Coordinate geometry", gen() {
      const [a, b, c] = pick([[3, 4, 5], [6, 8, 10], [5, 12, 13], [8, 15, 17]]);
      const x1 = R(-6, 6), y1 = R(-6, 6), sx = pick([1, -1]), sy = pick([1, -1]);
      const flip = Math.random() < 0.5, x2 = x1 + sx * (flip ? b : a), y2 = y1 + sy * (flip ? a : b);
      return num(`What is the distance between (${M(x1)}, ${M(y1)}) and (${M(x2)}, ${M(y2)})?`, c, `√(${P(x2 - x1)}² + ${P(y2 - y1)}²) = √${c * c} = ${c}.`);
    } },
    { title: "Profit and loss", desc: "Percentage on cost price", gen() {
      const cost = R(2, 40) * 10, p = pick([10, 20, 25, 30, 40, 50]), profit = Math.random() < 0.65, sell = cost * (100 + (profit ? p : -p)) / 100;
      return num(`A shop buys an item for €${cost} and sells it for €${U.dec(sell)}. What is the percentage ${profit ? "profit" : "loss"} on the cost price?`, p,
        `${profit ? "Profit" : "Loss"} = €${U.dec(Math.abs(sell - cost))}. ${U.dec(Math.abs(sell - cost))} ÷ ${cost} × 100 = ${p}%.`);
    } },
    { title: "Patterns: the nth term", desc: "Linear sequences", gen() {
      const a = nz(-5, 7), b = R(-6, 9), seq = [1, 2, 3, 4].map((n) => a * n + b);
      const ans = `${T(a, "n")}${b === 0 ? "" : plus(b)}`;
      return choice(`What is the nth term (Tₙ) of: ${seq.map(M).join(", ")}, …?`, ans, [`${T(b || 1, "n")}${plus(a)}`, `${T(a, "n")}${plus(b + a)}`, `n${plus(a)}`, `${T(a + 1, "n")}${plus(b)}`],
        `It ${a > 0 ? "goes up" : "goes down"} by ${Math.abs(a)} each time, so ${T(a, "n")}. When n = 1: ${M(a)}${plus(b)} = ${M(seq[0])}. So Tₙ = ${ans}.`);
    } },
  ]);
})();
