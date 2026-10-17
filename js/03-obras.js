/* ==========================================
   Obras: galería, carrusel y visor
   ========================================== */

const ST = {
  g(k, d) {
    try {
      const v = JSON.parse(localStorage.getItem(k));
      return v == null ? d : v;
    } catch (e) {
      return d;
    }
  },
  s(k, v) {
    try {
      localStorage.setItem(k, JSON.stringify(v));
    } catch (e) {}
  },
};
const EM = [
  "Calma",
  "Tristeza",
  "Esperanza",
  "Miedo",
  "Nostalgia",
  "Gratitud",
  "Ternura",
  "Inquietud",
];
const ini = (a) => (a === "Anónimo" ? "✿" : a.replace(/^Seudónimo: /, "")[0].toUpperCase());
const seal = (a, c = "") => `<span class="seal ${c}" aria-hidden="true">${esc(ini(a))}</span>`;
const FB =
  "if(this.dataset.fb&&this.src!==this.dataset.fb){this.src=this.dataset.fb}else{this.style.display='none'}";
const PAL = ["#7768a6", "#c58d9d", "#718d7e", "#8495ad", "#b8a47c", "#302a40"];
const art = (id) => {
  const p = (k) => PAL[(id * 3 + k) % 6];
  return `<svg viewBox="0 0 300 400" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><defs><linearGradient id="a${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${p(0)}" stop-opacity=".35"/><stop offset="1" stop-color="#f8f6f2"/></linearGradient></defs><rect width="300" height="400" fill="url(#a${id})"/><circle cx="${90 + ((id * 37) % 140)}" cy="120" r="46" fill="${p(1)}" opacity=".7"/><path d="M0 300Q80 240 150 290T300 270V400H0Z" fill="${p(2)}" opacity=".55"/><path d="M0 340Q90 300 170 335T300 320V400H0Z" fill="${p(3)}" opacity=".6"/></svg>`;
};
const pic = (w) =>
  `<span class="pa">${art(w.id)}</span><img data-id="${w.id}" ${w.img ? `src="${w.img}"` : 'style="display:none"'} ${w.fb ? `data-fb="${w.fb}"` : ""} alt="${esc(w.t)}" loading="lazy" referrerpolicy="no-referrer" onerror="${FB}">`;
const big = (u) => u.replace(/\/\d+px-/, "/960px-");
const EN = {
  "La noche estrellada": "The Starry Night",
  "La gran ola de Kanagawa": "The Great Wave off Kanagawa",
  Nenúfares: "Water Lilies",
  "El caminante sobre el mar de nubes": "Wanderer above the Sea of Fog",
  "Noche estrellada sobre el Ródano": "Starry Night Over the Rhône",
  "El regreso del hijo pródigo": "The Return of the Prodigal Son (Rembrandt)",
  "Retrato del doctor Gachet": "Portrait of Dr. Gachet",
  "La habitación de Van Gogh en Arlés": "Bedroom in Arles",
  "Melencolia I": "Melencolia I",
  "La niña enferma": "The Sick Child",
  "El grito": "The Scream",
  "Autorretrato con la oreja vendada": "Self-Portrait with Bandaged Ear",
  "El sueño de la razón produce monstruos": "The Sleep of Reason Produces Monsters",
  "La pesadilla (Füssli)": "The Nightmare (Fuseli)",
  "Monje junto al mar": "The Monk by the Sea",
  "Composición VII": "Composition VII",
  "La persistencia de la memoria": "The Persistence of Memory",
  "La joven de la perla": "Girl with a Pearl Earring",
  "El beso (Klimt)": "The Kiss (Klimt)",
  "Impresión, sol naciente": "Impression, Sunrise",
  "Almendro en flor": "Almond Blossoms",
  "Terraza de café por la noche": "Café Terrace at Night",
  "Los girasoles (Van Gogh)": "Sunflowers (series of paintings by Van Gogh)",
  "Campo de trigo con cuervos": "Wheatfield with Crows",
  "Las dos Fridas": "The Two Fridas",
  "La columna rota": "The Broken Column",
  "El nacimiento de Venus": "The Birth of Venus (Botticelli)",
  "Viento sur, cielo claro": "Fine Wind, Clear Morning",
  "Lluvia repentina sobre el puente Shin-Ōhashi": "Sudden Shower over Shin-Ōhashi bridge and Atake",
  "Un domingo por la tarde en la isla de la Grande Jatte":
    "A Sunday Afternoon on the Island of La Grande Jatte",
  "Mujer con sombrilla": "Woman with a Parasol – Madame Monet and Her Son",
};
async function thumb(q, en) {
  const T = async (u, f) => {
    try {
      const r = await fetch(u);
      return r.ok ? f(await r.json()) : null;
    } catch (e) {
      return null;
    }
  };
  const s = (j) => j.thumbnail && j.thumbnail.source,
    p = (j) => {
      const x = j.pages && j.pages[0] && j.pages[0].thumbnail;
      return x && (x.url.startsWith("//") ? "https:" + x.url : x.url);
    },
    e = encodeURIComponent,
    n = en || q;
  return (
    (await T("https://es.wikipedia.org/api/rest_v1/page/summary/" + e(q), s)) ||
    (await T("https://en.wikipedia.org/api/rest_v1/page/summary/" + e(n), s)) ||
    (await T("https://es.wikipedia.org/w/rest.php/v1/search/title?limit=1&q=" + e(q), p)) ||
    (await T("https://en.wikipedia.org/w/rest.php/v1/search/title?limit=1&q=" + e(n), p))
  );
}
function setImg(w, u) {
  w.fb = u;
  w.img = big(u);
  document.querySelectorAll(`img[data-id="${w.id}"]`).forEach((i) => {
    i.dataset.fb = u;
    i.style.display = "block";
    i.src = w.img;
  });
}
let rt;
const later = () => {
  clearTimeout(rt);
  rt = setTimeout(() => {
    renderAuthors();
    renderPainters();
  }, 400);
};
function loadThumbs() {
  works.forEach((w) => {
    if (w.wiki)
      thumb(w.wiki, EN[w.wiki]).then((u) => {
        if (u) setImg(w, u);
      });
  });
  authors.forEach((a) =>
    thumb(a.wiki, a.name).then((u) => {
      if (u) {
        a.portrait = u;
        later();
      }
    }),
  );
}

function openV(html, one, tall) {
  $("#vbox").className = "vbox" + (one ? " one" : "") + (tall ? " tall" : "");
  $("#vbox").innerHTML = `<button class="x" data-close aria-label="Cerrar">✕</button>${html}`;
  if (!$("#viewer").open) $("#viewer").showModal();
  $("#viewer").scrollTop = 0;
}
function viewWork(i) {
  const w = works[i];
  openV(
    `<div class="vp">${pic(w)}</div><div class="vt"><span class="eyebrow">${esc(w.k)} · ${esc(w.y)}</span><h2>${esc(w.t)}</h2><p class="q">“${esc(w.q)}”</p><div class="by">${seal(w.a, "big")}<span>Obra de<b>${esc(w.a)}</b></span></div>
 <dl><dt>Qué significa</dt><dd>${esc(w.m)}</dd>${w.c ? `<dt>Sobre el artista</dt><dd>${esc(w.c)}</dd>` : ""}</dl>
 <div class="feel"><h3>¿Qué sentiste al verla?</h3><p class="note">No hay respuestas correctas. Elige lo que más se parezca y, si quieres, escríbelo.</p><div class="emos">${EM.map((e) => `<button type="button" class="emo" data-e="${e}">${e}</button>`).join("")}</div><textarea id="fTxt" rows="3" maxlength="300" placeholder="¿Qué te transmitió esta obra?"></textarea><button class="b" id="fSave" type="button">Guardar lo que sentí</button><div id="fList" aria-live="polite"></div></div>
 <button class="b alt" onclick="goWork(${i})" type="button">Ver en la galería ↓</button></div>`,
    false,
    true,
  );
  bindFeel(w);
}
function bindFeel(w) {
  let emo = null;
  const box = $("#vbox"),
    key = "r:" + w.t;
  box.querySelectorAll(".emo").forEach(
    (b) =>
      (b.onclick = () => {
        emo = emo === b.dataset.e ? null : b.dataset.e;
        box.querySelectorAll(".emo").forEach((x) => x.classList.toggle("on", x.dataset.e === emo));
      }),
  );
  const list = () => {
    const r = ST.g(key, []);
    $("#fList").innerHTML = r.length
      ? `<h4>Lo que han sentido otras personas (${r.length})</h4>` +
        r
          .slice()
          .reverse()
          .map(
            (x) =>
              `<div class="rf"><b>${esc(x.emo || "—")}</b> ${esc(x.txt)}<small>${esc(x.who)}</small></div>`,
          )
          .join("")
      : '<p class="note">Aún no hay sentires guardados aquí. Puedes ser la primera persona.</p>';
  };
  $("#fSave").onclick = () => {
    const txt = $("#fTxt").value.trim();
    if (!emo && !txt) return;
    const r = ST.g(key, []);
    r.push({ emo, txt, who: prof ? prof.name : "Anónimo", ts: Date.now() });
    ST.s(key, r);
    $("#fTxt").value = "";
    emo = null;
    box.querySelectorAll(".emo").forEach((x) => x.classList.remove("on"));
    list();
    stats();
  };
  list();
}
function goWork(i) {
  $("#viewer").close();
  if ($("#workSearch").value) {
    $("#workSearch").value = "";
    renderGallery();
  }
  const el = document.querySelector(`#gallery [data-i="${i}"]`);
  el.scrollIntoView({ behavior: "smooth", block: "center" });
  el.classList.add("flash");
  setTimeout(() => el.classList.remove("flash"), 1900);
}
function stats() {
  let n = 0;
  try {
    Object.keys(localStorage).forEach((k) => {
      if (k.startsWith("r:")) n += ST.g(k, []).length;
    });
  } catch (e) {}
  $("#stats").textContent = n
    ? `Sentires guardados en este dispositivo: ${n}. Gracias por participar.`
    : "Aún no has dejado ningún sentir. Abre una obra y cuéntanos qué te transmitió.";
}

function renderGallery() {
  const wq = $("#workSearch").value.toLowerCase().trim();
  $("#gallery").innerHTML = works
    .map((w, i) =>
      !wq || (w.t + " " + w.a + " " + w.k).toLowerCase().includes(wq)
        ? `<button class="card-art" data-i="${i}" data-w="${i}"><span class="pic">${pic(w)}</span><span class="plaque"><h3>${esc(w.t)}</h3><span class="q">“${esc(w.q)}”</span><span class="by">${seal(w.a)}<span>${esc(w.a)}<br>${esc(w.k)}</span></span></span></button>`
        : "",
    )
    .join("");
  if (!$("#gallery").innerHTML.trim())
    $("#gallery").innerHTML = '<p class="note">No encontré obras con esa búsqueda.</p>';
  document
    .querySelectorAll("#gallery [data-w]")
    .forEach((b) => (b.onclick = () => viewWork(+b.dataset.w)));
}
$("#workSearch").oninput = renderGallery;
function renderWorks() {
  $("#stage").innerHTML = works
    .slice(0, 3)
    .map(
      (w, i) => `<button class="fl" data-w="${i}" aria-label="Ver ${esc(w.t)}">${pic(w)}</button>`,
    )
    .join("");
  renderGallery();
  document
    .querySelectorAll("#stage [data-w],#gallery [data-w]")
    .forEach((b) => (b.onclick = () => viewWork(+b.dataset.w)));
  renderTrack();
}
const tr = $("#track");
let t0;
function renderTrack() {
  tr.innerHTML = works
    .map(
      (w, i) =>
        `<button class="slide" data-w="${i}"><span class="pic">${pic(w)}</span><span class="plaque"><h3>${esc(w.t)}</h3><span class="q">“${esc(w.q)}”</span><span class="by">${seal(w.a)}<span>${esc(w.a)} · ${esc(w.k)}</span></span></span></button>`,
    )
    .join("");
  tr.querySelectorAll("[data-w]").forEach((b) => (b.onclick = () => viewWork(+b.dataset.w)));
  mark();
}
function mark() {
  const r = tr.getBoundingClientRect(),
    c = r.left + r.width / 2;
  let best,
    bd = 1e9;
  [...tr.children].forEach((s) => {
    const b = s.getBoundingClientRect(),
      d = Math.abs(b.left + b.width / 2 - c);
    if (d < bd) {
      bd = d;
      best = s;
    }
  });
  [...tr.children].forEach((s) => s.classList.toggle("center", s === best));
}
tr.addEventListener("scroll", () => {
  cancelAnimationFrame(t0);
  t0 = requestAnimationFrame(mark);
});
const step = (d) =>
  tr.scrollBy({ left: d * (tr.children[0].offsetWidth + 30), behavior: "smooth" });
$("#prev").onclick = () => step(-1);
$("#next").onclick = () => step(1);
let auto = setInterval(() => {
  tr.scrollLeft + tr.clientWidth >= tr.scrollWidth - 4
    ? tr.scrollTo({ left: 0, behavior: "smooth" })
    : step(1);
}, 5200);
["pointerenter", "touchstart"].forEach((e) =>
  tr.addEventListener(e, () => clearInterval(auto), { passive: true }),
);

$("#aSign").onchange = (e) => ($("#aNameBox").hidden = e.target.value === "anon");
$("#artForm").onsubmit = (e) => {
  e.preventDefault();
  const f = $("#aImg").files[0];
  if (!f) return;
  const sg = $("#aSign").value,
    n = $("#aName").value.trim();
  if (sg !== "anon" && !n) {
    $("#aName").focus();
    return;
  }
  const r = new FileReader();
  r.onload = () => {
    works.unshift({
      id: ++wid,
      t: $("#aTitle").value,
      q: $("#aPhrase").value,
      a: sg === "anon" ? "Anónimo" : n,
      y: "Comunidad",
      k: sg === "alias" ? "Seudónimo · Comunidad" : "Comunidad",
      m: "Obra compartida por la comunidad de Threads of Calm.",
      c: "",
      img: r.result,
    });
    renderWorks();
    e.target.reset();
    $("#aNameBox").hidden = false;
    $("#galeria").scrollIntoView();
  };
  r.readAsDataURL(f);
};
