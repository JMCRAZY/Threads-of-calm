/* ==========================================
   Obras de los autores (libros)
   ========================================== */

/* Obras de los autores */
const books = authors.flatMap((a, ai) => a.rel.map((r) => ({ t: r[0], n: r[1], a: a.name, ai })));
const COV = [
  ["#302a40", "#7768a6"],
  ["#40355e", "#c58d9d"],
  ["#27403a", "#718d7e"],
  ["#2f3b55", "#8495ad"],
  ["#4a3d2c", "#b8a47c"],
];
const cv = (b) => `style="--c1:${COV[b.ai % 5][0]};--c2:${COV[b.ai % 5][1]}"`;
$("#bookFilter").innerHTML =
  '<option value="Todos">Todos los autores</option>' +
  authors.map((a) => `<option>${esc(a.name)}</option>`).join("");
function renderBooks() {
  const f = $("#bookFilter").value;
  $("#bookGrid").innerHTML = books
    .map((b, i) =>
      f === "Todos" || b.a === f
        ? `<button class="bk" data-b="${i}" ${cv(b)}><span class="bt">${esc(b.t)}</span><span class="ba">${esc(b.a)}</span></button>`
        : "",
    )
    .join("");
}
$("#bookFilter").onchange = renderBooks;
$("#bookGrid").onclick = (e) => {
  const b = e.target.closest(".bk");
  if (b) openBook(+b.dataset.b);
};
const cleanT = (t) => t.replace(/\s*\(\d{4}\)\s*/g, " ").trim();
async function jget(u) {
  try {
    const r = await fetch(u);
    return r.ok ? await r.json() : null;
  } catch (e) {
    return null;
  }
}
const coverP = {};
function getCover(i) {
  if (coverP[i]) return coverP[i];
  const b = books[i],
    t = cleanT(b.t),
    e = encodeURIComponent;
  return (coverP[i] = (async () => {
    let u = null;
    const pick = (j) => {
      const d = j && j.docs && j.docs.find((x) => x.cover_i);
      return d ? "https://covers.openlibrary.org/b/id/" + d.cover_i + "-L.jpg" : null;
    };
    u = pick(
      await jget(
        "https://openlibrary.org/search.json?limit=6&fields=cover_i,title&title=" +
          e(t) +
          "&author=" +
          e(b.a),
      ),
    );
    if (!u)
      u = pick(
        await jget(
          "https://openlibrary.org/search.json?limit=6&fields=cover_i,title&q=" + e(t + " " + b.a),
        ),
      );
    if (!u) {
      for (const L of ["es", "en"]) {
        const j = await jget("https://" + L + ".wikipedia.org/api/rest_v1/page/summary/" + e(t));
        if (j && j.type === "standard" && j.thumbnail) {
          u = j.thumbnail.source;
          break;
        }
      }
    }
    return u;
  })());
}
function showCover(i) {
  getCover(i).then((u) => {
    const im = document.querySelector("#vbox .cover-img");
    if (!u || !im || im.dataset.b !== String(i)) return;
    im.onload = () => {
      im.style.display = "block";
      const g = document.querySelector("#vbox .bk.big");
      if (g) g.style.display = "none";
    };
    im.src = u;
  });
}
function openBook(i) {
  const b = books[i],
    a = authors[b.ai];
  openV(
    `<div class="vp"><div class="bk big" ${cv(b)}><span class="bt">${esc(b.t)}</span><span class="ba">${esc(b.a)}</span></div><img class="cover-img" data-b="${i}" alt="Portada de ${esc(b.t)}" style="display:none" referrerpolicy="no-referrer"></div><div class="vt"><span class="eyebrow">Obra · ${esc(a.genre)}</span><h2>${esc(b.t)}</h2><div class="by">${seal(a.name, "big")}<span>De<b>${esc(a.name)}</b></span></div><dl><dt>De qué trata y por qué importa</dt><dd>${esc(b.n)}</dd><dt>Contexto del autor</dt><dd>${esc(a.mh)}</dd></dl><p class="note">Datos históricos y retrospectivos; no son un diagnóstico. Algunas obras tratan temas dolorosos: léelas con calma.</p><div style="display:flex;gap:8px;flex-wrap:wrap"><button class="b" type="button" data-au="${esc(a.name)}">Ver perfil del autor</button><a class="b alt" target="_blank" rel="noopener" href="https://es.wikipedia.org/w/index.php?search=${encodeURIComponent(b.t + " " + a.name)}">Buscar información</a></div></div>`,
    false,
    true,
  );
  bindAu($("#vbox"));
  showCover(i);
}
function goBook(i) {
  $("#viewer").close();
  $("#bookFilter").value = "Todos";
  renderBooks();
  const el = document.querySelector(`#bookGrid [data-b="${i}"]`);
  el.scrollIntoView({ behavior: "smooth", block: "center" });
  el.classList.add("flash");
  setTimeout(() => el.classList.remove("flash"), 2000);
}
