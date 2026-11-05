/* Céim: shared helpers and the skill registry */
window.CEIM = {
  classes: [
    { id: "ji", name: "Junior Infants", short: "JI", color: "#E4572E" },
    { id: "si", name: "Senior Infants", short: "SI", color: "#F29E1F" },
    { id: "c1", name: "First Class", short: "1", color: "#3FA34D" },
    { id: "c2", name: "Second Class", short: "2", color: "#1F8FBF" },
    { id: "c3", name: "Third Class", short: "3", color: "#6C4AB6" },
    { id: "c4", name: "Fourth Class", short: "4", color: "#D63F8C" },
    { id: "c5", name: "Fifth Class", short: "5", color: "#0E8C7A" },
    { id: "c6", name: "Sixth Class", short: "6", color: "#B5651D" },
    { id: "y1", name: "First Year", short: "1Y", color: "#3949AB", junior: true },
    { id: "y2", name: "Second Year", short: "2Y", color: "#546E7A", junior: true },
    { id: "y3", name: "Third Year", short: "3Y", color: "#B71C1C", junior: true, note: "Junior Cert" },
  ],
  subjects: [
    { id: "maths", name: "Maths", ga: "Mata" },
    { id: "english", name: "English", ga: "Béarla" },
    { id: "gaeilge", name: "Gaeilge", ga: "Gaeilge" },
  ],
  skills: [],
  add(cls, subject, list) {
    // Numbering continues from earlier lists, so new files can add more skills to a class without changing old ids.
    const start = this.skills.filter((s) => s.cls === cls && s.subject === subject).length;
    list.forEach((s, i) => this.skills.push({ ...s, cls, subject, id: `${cls}-${subject}-${start + i + 1}` }));
  },
};

const U = {
  R(a, b) { return a + Math.floor(Math.random() * (b - a + 1)); },
  pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; },
  shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
    return a;
  },
  sample(arr, n) { return U.shuffle(arr).slice(0, n); },
  E(s) { return String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c])); },
  /** Multiple choice: the answer plus up to n-1 different wrong options, shuffled. */
  mc(answer, wrongs, n = 4) {
    const a = String(answer);
    const pool = [...new Set(wrongs.map(String))].filter((w) => w !== a);
    return U.shuffle([a, ...U.sample(pool, n - 1)]);
  },
  /** Numeric wrong answers near the right one. */
  near(ans, spread = 3, min = 0) {
    const out = new Set();
    let guard = 0;
    while (out.size < 6 && guard++ < 100) {
      const v = ans + U.R(-spread, spread);
      if (v !== ans && v >= min) out.add(v);
    }
    return [...out];
  },
  rep(emoji, n) { return Array(n).fill(emoji).join(""); },
  euro(c) { return c >= 100 ? "€" + (c / 100).toFixed(2) : c + "c"; },
  dec(x, dp = 2) { return String(Number(x.toFixed(dp))); },
  clock(h, m) {
    const ha = ((h % 12) + m / 60) * 30, ma = m * 6;
    const hand = (a, len, w, col = "#222") => {
      const r = (a - 90) * Math.PI / 180;
      return `<line x1="60" y1="60" x2="${(60 + len * Math.cos(r)).toFixed(1)}" y2="${(60 + len * Math.sin(r)).toFixed(1)}" stroke="${col}" stroke-width="${w}" stroke-linecap="round"/>`;
    };
    let nums = "";
    for (let i = 1; i <= 12; i++) {
      const r = (i * 30 - 90) * Math.PI / 180;
      nums += `<text x="${(60 + 44 * Math.cos(r)).toFixed(1)}" y="${(64 + 44 * Math.sin(r)).toFixed(1)}" text-anchor="middle" font-size="11" font-family="sans-serif" fill="#333">${i}</text>`;
    }
    return `<svg class="clock" viewBox="0 0 120 120" role="img" aria-label="clock"><circle cx="60" cy="60" r="56" fill="#fff" stroke="#333" stroke-width="3"/>${nums}${hand(ma, 42, 3)}${hand(ha, 28, 6, "#C0392B")}<circle cx="60" cy="60" r="4" fill="#222"/></svg>`;
  },
};
