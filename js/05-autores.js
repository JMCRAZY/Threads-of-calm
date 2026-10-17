/* ==========================================
   Autores y pintores
   ========================================== */

const aimg = (a) =>
  a.portrait
    ? `<img src="${a.portrait}" alt="Retrato de ${esc(a.name)}" onerror="this.style.display='none'">`
    : "";
function showAuthor(n) {
  const a = authors.find((x) => x.name === n);
  openV(
    `<div class="vp alive"><span class="ph s">${seal(a.name, "big")}</span>${aimg(a)}</div><div class="vt"><div class="by">${seal(a.name, "big")}<span>${a.dates} · ${a.genre}<b style="font:600 1.5rem var(--serif)">${esc(a.name)}</b></span></div><p class="q">${esc(a.bio)}</p>
 <dl><dt>Bibliografía</dt><dd>${esc(a.works)}</dd><dt>Temas</dt><dd>${esc(a.themes)}</dd><dt>Estilo</dt><dd>${esc(a.style)}</dd></dl>
 <div class="mh"><h3>Obras relacionadas con la salud mental</h3><ul>${a.rel.map((r) => `<li><button type="button" class="relb" data-bk="${books.findIndex((b) => b.t === r[0] && b.a === a.name)}">${esc(r[0])} →</button><br>${esc(r[1])}</li>`).join("")}</ul>
 <h3>Su experiencia con la salud mental</h3><p>${esc(a.mh)}</p><p class="note">Los datos son históricos y, muchas veces, retrospectivos: no son un diagnóstico. Algunas obras tratan temas dolorosos; léelas con calma. Si algo te pesa, el botón «Necesito ayuda» siempre está disponible.</p></div></div>`,
    false,
    true,
  );
  document.querySelectorAll("#vbox .relb").forEach(
    (b) =>
      (b.onclick = () => {
        const i = +b.dataset.bk;
        if (i >= 0) openBook(i);
      }),
  );
}
function bindAu(r) {
  r.querySelectorAll("[data-au]").forEach((b) => (b.onclick = () => showAuthor(b.dataset.au)));
}
function renderAuthors() {
  const q = $("#authorSearch").value.toLowerCase().trim(),
    g = $("#authorFilter").value;
  $("#authorGrid").innerHTML =
    authors
      .filter((a) => (g === "Todos" || a.genre === g) && a.name.toLowerCase().includes(q))
      .map(
        (a) =>
          `<button class="au" data-au="${esc(a.name)}"><span class="ava" style="animation-delay:-${(a.name.length % 7) * 0.8}s"><span class="ph s">${seal(a.name, "big")}</span>${aimg(a)}</span><h3>${esc(a.name)}</h3><span style="font-size:.85rem;color:var(--mute)">${a.dates}</span><span class="chip">${a.genre}</span><p>${esc(a.bio)}</p><span class="chip" style="background:var(--soft);color:var(--violet)">Ver bibliografía y salud mental →</span></button>`,
      )
      .join("") || '<p class="lead">No se encontraron autores.</p>';
  bindAu($("#authorGrid"));
}
function renderPainters() {
  $("#painterGrid").innerHTML = painters
    .map(
      (p) =>
        `<div class="au pn">${seal(p[0], "big")}<h3>${esc(p[0])}</h3><span style="font-size:.85rem;color:var(--mute)">${p[1]}</span><span class="chip">${p[2]}</span><p>${esc(p[3])}</p></div>`,
    )
    .join("");
}
$("#authorSearch").oninput = renderAuthors;
$("#authorFilter").onchange = renderAuthors;
