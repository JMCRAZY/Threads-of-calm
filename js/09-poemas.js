/* ==========================================
   Poemas con tarjeta que gira
   ========================================== */

function renderPoems() {
  $("#pgrid").innerHTML = poems
    .map(
      (p, i) =>
        `<button class="pc" type="button" style="animation-delay:-${i * 0.9}s" aria-pressed="false" aria-label="Poema ${esc(p[1])}. Toca para dar la vuelta a la tarjeta y ver su ilustración"><span class="pin"><span class="pf"><span class="seal" aria-hidden="true">詩</span><span class="pt">${esc(p[1])}</span><span class="ptxt">${p[0]}</span><span class="ph2">Toca para ver su ilustración ↻</span></span><span class="pb"><svg viewBox="0 0 300 300" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><defs><linearGradient id="pg${i}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${p[4]}"/><stop offset="1" stop-color="${p[5]}"/></linearGradient></defs><rect width="300" height="300" fill="url(#pg${i})"/>${ILL[p[2]]}${PT}</svg><span class="cap"><b>${esc(p[1])}</b>${esc(p[3])}</span></span></span></button>`,
    )
    .join("");
  document.querySelectorAll(".pc").forEach(
    (b) =>
      (b.onclick = () => {
        const f = b.classList.toggle("flip");
        b.setAttribute("aria-pressed", f);
      }),
  );
}
