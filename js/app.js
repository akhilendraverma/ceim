/* Céim: pages, practice rounds and stars */
(() => {
  const CONTACT = "akhilendraverma@gmail.com";   // shown on the Parents & teachers page
  const ROUND = 10;                                 // questions per round
  const KEY = "ceim-progress-v1";
  const app = document.getElementById("app");
  const { E } = U;

  const PRAISE = ["Maith thú!", "Ar fheabhas!", "Iontach!", "Sár-obair!", "Go hiontach!"];
  const PRAISE_EN = { "Maith thú!": "Well done!", "Ar fheabhas!": "Excellent!", "Iontach!": "Wonderful!", "Sár-obair!": "Great work!", "Go hiontach!": "Brilliant!" };
  const SUBJ_ICON = { maths: "➗", english: "📖", gaeilge: "☘️" };

  // ---------- progress (this device only) ----------
  let store = {};
  try { store = JSON.parse(localStorage.getItem(KEY) || "{}") || {}; } catch (e) { store = {}; }
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(store)); } catch (e) {} };
  const stars = (id) => (store[id] && store[id].stars) || 0;
  const starStr = (n, max = 3) => `<span class="stars" aria-label="${n} of ${max} stars">${"★".repeat(n)}<span class="off">${"★".repeat(max - n)}</span></span>`;

  const skillsOf = (cls, subj) => CEIM.skills.filter((s) => s.cls === cls && (!subj || s.subject === subj));
  const code = (s) => {
    const list = skillsOf(s.cls, s.subject);
    return `${{ maths: "M", english: "B", gaeilge: "G" }[s.subject]}.${list.indexOf(s) + 1}`;
  };
  const cls = (id) => CEIM.classes.find((c) => c.id === id);

  // ---------- speech (English only; Irish voices are rarely installed) ----------
  const canSpeak = "speechSynthesis" in window;
  function speak(text) {
    if (!canSpeak || !text) return;
    const u = new SpeechSynthesisUtterance(text);
    const v = speechSynthesis.getVoices().find((v) => /^en-(IE|GB)/i.test(v.lang)) || speechSynthesis.getVoices().find((v) => /^en/i.test(v.lang));
    if (v) u.voice = v;
    u.lang = v ? v.lang : "en-IE"; u.rate = 0.9;
    speechSynthesis.cancel(); speechSynthesis.speak(u);
  }
  if (canSpeak) speechSynthesis.getVoices();
  const plain = (html) => { const d = document.createElement("div"); d.innerHTML = html; return d.textContent.replace(/_{2,}/g, "blank"); };

  // ---------- pages ----------
  function home() {
    const total = CEIM.skills.length, earned = CEIM.skills.reduce((a, s) => a + stars(s.id), 0);
    const cards = CEIM.classes.map((c) => {
      const rows = CEIM.subjects.map((sub) => {
        const list = skillsOf(c.id, sub.id), got = list.reduce((a, s) => a + stars(s.id), 0);
        return `<a class="row" href="#/class/${c.id}/${sub.id}"><span>${SUBJ_ICON[sub.id]} ${sub.name}</span><span class="count">${list.length} skills ›</span>${got ? `<span class="mini">★ ${got}</span>` : ""}</a>`;
      }).join("");
      const sampleTopics = [skillsOf(c.id, "maths")[0], skillsOf(c.id, "english")[0], skillsOf(c.id, "gaeilge")[0]]
        .map((s) => s.title.toLowerCase().replace(/:.*$/, "").replace(/\?$/, "")).join(", ");
      return `<article class="card" style="--c:${c.color}">
        <a class="card-head" href="#/class/${c.id}"><span class="badge">${c.short}</span><h2>${c.name}</h2></a>
        <p class="topics">${E(sampleTopics[0].toUpperCase() + sampleTopics.slice(1))} and more.</p>
        <div class="rows">${rows}</div>
      </article>`;
    }).join("");
    app.innerHTML = `
      <section class="hero">
        <h1>Practise one <span class="hl">céim</span> at a time</h1>
        <p>Free Maths, English and Gaeilge practice for primary school, from Junior Infants to Sixth Class.
        Pick your class, choose a skill and answer ${ROUND} questions to earn up to three stars.</p>
        ${earned ? `<p class="earned">You have <b>${earned}</b> of ${total * 3} stars so far. Maith thú!</p>` : ""}
      </section>
      <section class="cards">${cards}</section>`;
  }

  function classPage(cid, focus) {
    const c = cls(cid);
    if (!c) return home();
    const cols = CEIM.subjects.map((sub) => {
      const items = skillsOf(cid, sub.id).map((s) => `
        <li><a href="#/practice/${s.id}"><span class="code">${code(s)}</span>
          <span class="t"><b ${s.subject === "gaeilge" ? 'lang="ga"' : ""}>${E(s.title)}</b><small>${E(s.desc || "")}</small></span>
          ${starStr(stars(s.id))}</a></li>`).join("");
      return `<section class="subject ${focus === sub.id ? "focus" : ""}" id="s-${sub.id}"><h2>${SUBJ_ICON[sub.id]} ${sub.name}${sub.ga !== sub.name ? ` <small lang="ga">${sub.ga}</small>` : ""}</h2><ol class="skills">${items}</ol></section>`;
    }).join("");
    app.innerHTML = `
      <div class="class-head" style="--c:${c.color}"><a href="#/" class="back">‹ All classes</a><h1><span class="badge">${c.short}</span>${c.name}</h1></div>
      <div class="subjects">${cols}</div>`;
    if (focus) { const el = document.getElementById("s-" + focus); if (el && window.innerWidth < 900) el.scrollIntoView(); }
  }

  // ---------- practice ----------
  let round = null;
  function practice(id) {
    const s = CEIM.skills.find((x) => x.id === id);
    if (!s) return home();
    round = { s, n: 0, right: 0, seen: new Set() };
    next();
  }

  function newQuestion(s, seen) {
    let q, tries = 0;
    do { q = s.gen(); tries++; } while (seen.has(q.prompt + q.answer + (q.visual || "")) && tries < 25);
    seen.add(q.prompt + q.answer + (q.visual || ""));
    return q;
  }

  function next() {
    const { s } = round;
    if (round.n >= ROUND) return results();
    const q = round.q = newQuestion(s, round.seen);
    round.n++;
    const c = cls(s.cls);
    const sub = CEIM.subjects.find((x) => x.id === s.subject);
    const sayBtn = canSpeak && q.lang !== "ga" && s.subject !== "gaeilge"
      ? `<button class="say" type="button" aria-label="Read the question aloud">🔊</button>` : "";
    const answerUI = q.type === "mc"
      ? `<div class="choices ${q.choices.every((x) => String(x).length <= 3) ? "short" : ""}">${q.choices.map((ch) =>
          `<button type="button" class="choice" ${q.lang === "ga" ? 'lang="ga"' : ""} data-v="${E(ch)}">${E(ch)}</button>`).join("")}</div>`
      : `<form class="numform" autocomplete="off">
           ${q.neg ? '<button type="button" class="minus" aria-label="minus sign">−</button>' : ""}
           <input class="numin" type="text" inputmode="decimal" aria-label="Your answer" placeholder="?" enterkeyhint="done">
           <button class="check" type="submit">Check</button></form>`;
    app.innerHTML = `
      <div class="practice" style="--c:${c.color}">
        <div class="p-top">
          <a class="back" href="#/class/${s.cls}/${s.subject}">‹ ${c.name} · ${sub.name}</a>
          <div class="p-title"><span class="code">${code(s)}</span> <span ${s.subject === "gaeilge" ? 'lang="ga"' : ""}>${E(s.title)}</span></div>
          <div class="p-meter" aria-label="Question ${round.n} of ${ROUND}"><span style="width:${((round.n - 1) / ROUND) * 100}%"></span></div>
          <div class="p-count">Question ${round.n} of ${ROUND} · ✓ ${round.right}</div>
        </div>
        <div class="qcard">
          <div class="prompt"><span class="ptext">${q.prompt}</span>${sayBtn}</div>
          ${q.visual ? `<div class="visual">${q.visual}</div>` : ""}
          ${answerUI}
          <div class="feedback" aria-live="polite"></div>
        </div>
      </div>`;
    const say = app.querySelector(".say");
    if (say) say.onclick = () => speak(q.speak ? `${plain(q.prompt)} ${q.speak}` : plain(q.prompt));
    if (q.type === "mc") {
      app.querySelectorAll(".choice").forEach((b) => (b.onclick = () => answer(b.dataset.v, b)));
    } else {
      const f = app.querySelector(".numform"), inp = app.querySelector(".numin");
      inp.focus({ preventScroll: true });
      f.onsubmit = (e) => { e.preventDefault(); if (inp.value.trim()) answer(inp.value, inp); };
      const m = app.querySelector(".minus");
      if (m) m.onclick = () => { inp.value = inp.value.startsWith("-") ? inp.value.slice(1) : "-" + inp.value; inp.focus(); };
    }
  }

  const norm = (v) => String(v).trim().replace(/[−–]/g, "-").replace(/[€c,\s]|cm²|cm³|cm/g, "");
  function isRight(q, v) {
    if (q.type === "mc") return v === q.answer;
    const a = norm(v), b = norm(q.answer);
    return a !== "" && !isNaN(Number(a)) ? Number(a) === Number(b) : a.toLowerCase() === b.toLowerCase();
  }

  function answer(v, el) {
    const q = round.q, ok = isRight(q, v);
    if (ok) round.right++;
    app.querySelectorAll(".choice, .check, .numin, .minus").forEach((b) => (b.disabled = true));
    if (q.type === "mc") {
      app.querySelectorAll(".choice").forEach((b) => {
        if (b.dataset.v === q.answer) b.classList.add("right");
        else if (b === el) b.classList.add("wrong");
      });
    } else el.classList.add(ok ? "right" : "wrong");
    const p = U.pick(PRAISE);
    app.querySelector(".feedback").innerHTML = ok
      ? `<div class="fb ok"><b lang="ga">${p}</b> <span>${PRAISE_EN[p]}</span><p>${E(q.explain || "")}</p></div>`
      : `<div class="fb no"><b lang="ga">Beagnach!</b> <span>Nearly!</span><p>The answer is <b>${E(q.answer)}</b>. ${E(q.explain || "")}</p></div>`;
    const fb = app.querySelector(".feedback");
    fb.insertAdjacentHTML("beforeend", `<button class="nextbtn" type="button">${round.n >= ROUND ? "See my stars" : "Next question"} ›</button>`);
    const nb = fb.querySelector(".nextbtn");
    nb.onclick = next; nb.focus({ preventScroll: true });
    fb.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }

  function results() {
    const { s, right } = round;
    const st = right >= 9 ? 3 : right >= 7 ? 2 : right >= 5 ? 1 : 0;
    const rec = store[s.id] || { stars: 0, rounds: 0 };
    const better = st > rec.stars;
    store[s.id] = { stars: Math.max(st, rec.stars), rounds: rec.rounds + 1, last: right };
    save();
    const list = skillsOf(s.cls, s.subject), nxt = list[list.indexOf(s) + 1];
    const msg = st === 3 ? "Ar fheabhas! You're a star!" : st === 2 ? "Maith thú! Nearly perfect." : st === 1 ? "Good effort! Try again for more stars." : "Keep practising. You'll get there!";
    app.innerHTML = `
      <div class="practice done" style="--c:${cls(s.cls).color}">
        <div class="qcard result">
          <div class="bigstars">${starStr(st)}</div>
          <h1>${right} out of ${ROUND}</h1>
          <p class="msg">${msg}</p>
          ${better && rec.stars ? `<p class="best">New best for this skill!</p>` : ""}
          <div class="actions">
            <a class="btn" href="#/practice/${s.id}?again=${Date.now()}">Try again</a>
            ${nxt ? `<a class="btn primary" href="#/practice/${nxt.id}">Next skill: ${E(nxt.title)} ›</a>` : ""}
            <a class="btn ghost" href="#/class/${s.cls}/${s.subject}">Back to ${cls(s.cls).name}</a>
          </div>
        </div>
      </div>`;
  }

  function progressPage() {
    const blocks = CEIM.classes.map((c) => {
      const list = skillsOf(c.id), got = list.reduce((a, s) => a + stars(s.id), 0), done = list.filter((s) => stars(s.id) === 3).length;
      return `<a class="prog" href="#/class/${c.id}" style="--c:${c.color}"><span class="badge">${c.short}</span><span class="t"><b>${c.name}</b><small>${done} of ${list.length} skills with 3 stars</small></span><span class="bar"><span style="width:${(got / (list.length * 3)) * 100}%"></span></span><span class="n">★ ${got}</span></a>`;
    }).join("");
    app.innerHTML = `<div class="page"><h1>My stars</h1>
      <p>Stars are saved in this browser on this device only. Nobody else can see them.</p>
      <div class="progs">${blocks}</div>
      <p><button class="btn ghost" id="reset" type="button">Start again (clear my stars)</button></p></div>`;
    document.getElementById("reset").onclick = () => {
      if (confirm("Clear all stars on this device?")) { store = {}; save(); progressPage(); }
    };
  }

  function about() {
    const n = (sub) => CEIM.skills.filter((s) => s.subject === sub).length;
    app.innerHTML = `<div class="page prose">
      <h1>For parents and teachers</h1>
      <p><b>Céim</b> (Irish for “step”) is free practice for primary school children in Ireland, from Junior Infants to Sixth Class.
      It has ${CEIM.skills.length} skills: ${n("maths")} in Maths, ${n("english")} in English and ${n("gaeilge")} in Gaeilge, following topics
      commonly taught in each class.</p>
      <h2>How it works</h2>
      <ul><li>Each skill is a round of ${ROUND} questions. Maths questions are generated fresh every time, so children can practise as often as they like.</li>
      <li>Every answer is followed by a short explanation, so a wrong answer is still a chance to learn.</li>
      <li>9 or 10 right earns 3 stars, 7–8 earns 2, and 5–6 earns 1. The best result for each skill is kept.</li>
      <li>English questions have a 🔊 button that reads them aloud, which helps younger children.</li></ul>
      <h2>Privacy</h2>
      <p>Céim has no accounts, no ads, no analytics and no tracking. We don't collect any personal information.
      Stars are stored only in this browser on this device, and you can clear them on the <a href="#/progress">My stars</a> page.
      The site loads its fonts from Google Fonts, which receives your device's IP address as with any website.</p>
      <h2>Please note</h2>
      <p>Céim is an independent project and isn't connected with the Department of Education or the NCCA.
      It's practice, not a test, and it's no substitute for your child's teacher.</p>
      <h2>Contact</h2>
      <p>Spotted a mistake, or have an idea for a new skill? Email <a href="mailto:${CONTACT}">${CONTACT}</a>.</p>
    </div>`;
  }

  CEIM.current = () => round && round.q;   // read-only, used by automated tests

  // ---------- router ----------
  function route() {
    if (canSpeak) speechSynthesis.cancel();
    const h = location.hash.replace(/^#\/?/, "").split("?")[0].split("/");
    if (h[0] === "class") classPage(h[1], h[2]);
    else if (h[0] === "practice") practice(h[1]);
    else if (h[0] === "progress") progressPage();
    else if (h[0] === "about") about();
    else home();
    document.querySelectorAll(".topnav a").forEach((a) => a.classList.toggle("on", a.getAttribute("href") === "#/" + (h[0] || "")));
    window.scrollTo(0, 0);
    app.focus({ preventScroll: true });
  }
  window.addEventListener("hashchange", route);
  route();

  // Offline support
  try {
    if ("serviceWorker" in navigator && /^https?:$/.test(location.protocol)) {
      window.addEventListener("load", () => navigator.serviceWorker.register("sw.js").catch(() => {}));
    }
  } catch (e) {}
})();
