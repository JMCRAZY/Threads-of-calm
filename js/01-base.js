/* ==========================================
   Utilidades, fondo floral y pantalla de entrada
   ========================================== */

const $ = (s) => document.querySelector(s);
const esc = (t) =>
  String(t).replace(
    /[&<>"']/g,
    (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c],
  );

/* Fondo floral oriental con la paleta */
(function () {
  const f = (x, y, s, p) =>
    `<g transform='translate(${x} ${y}) scale(${s})'>${[0, 72, 144, 216, 288].map((a) => `<ellipse cy='-13' rx='7' ry='13' fill='${p}' transform='rotate(${a})'/>`).join("")}<circle r='3.5' fill='#b8a47c'/></g>`;
  const s = `<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><g opacity='.45'><path d='M-5 170Q50 130 100 165T205 170' stroke='#b8a47c' stroke-width='1.5' fill='none'/>${f(56, 56, 1.2, "#c58d9d")}${f(150, 138, 0.9, "#7768a6")}${f(160, 34, 0.55, "#8495ad")}${f(30, 150, 0.6, "#718d7e")}</g></svg>`;
  document.documentElement.style.setProperty(
    "--bgpat",
    `url("data:image/svg+xml,${encodeURIComponent(s).replace(/'/g, "%27")}")`,
  );
})();

$("#brandLogo").src = $("#splash img").src;
/* Entrada */
let entered = false;
const enter = () => {
  if (entered) return;
  entered = true;
  enterApp();
};
$("#enter").onclick = enter;
setTimeout(enter, 6000);
