/* ==========================================
   Pétalos, visores y ayuda con respiración
   ========================================== */

/* Pétalos cayendo sobre la pintura */
function petals() {
  const c = $("#petals"),
    x = c.getContext("2d");
  let W, H;
  const rs = () => {
    W = c.width = innerWidth;
    H = c.height = innerHeight;
  };
  rs();
  addEventListener("resize", rs);
  const mk = (i) => ({
      x: Math.random() * W,
      y: i ? Math.random() * H : -20,
      r: 4 + Math.random() * 6,
      s: 0.4 + Math.random() * 0.9,
      sw: Math.random() * 6.28,
      a: Math.random() * 6.28,
      v: 0.01 + Math.random() * 0.02,
    }),
    P = Array.from({ length: 26 }, () => mk(true));
  if (matchMedia("(prefers-reduced-motion:reduce)").matches) return;
  (function f() {
    x.clearRect(0, 0, W, H);
    P.forEach((p) => {
      p.y += p.s;
      p.sw += p.v;
      p.x += Math.sin(p.sw) * 0.8 + 0.2;
      p.a += 0.02;
      if (p.y > H + 20 || p.x > W + 30) {
        Object.assign(p, mk(false));
        p.x = Math.random() * W;
      }
      x.save();
      x.translate(p.x, p.y);
      x.rotate(p.a);
      x.fillStyle = "rgba(197,141,157,.6)";
      x.beginPath();
      x.ellipse(0, 0, p.r, p.r * 0.6, 0, 0, 6.28);
      x.fill();
      x.fillStyle = "rgba(255,232,238,.7)";
      x.beginPath();
      x.ellipse(-p.r * 0.2, -p.r * 0.1, p.r * 0.5, p.r * 0.3, 0, 0, 6.28);
      x.fill();
      x.restore();
    });
    requestAnimationFrame(f);
  })();
}

/* Cerrar visores */
document.addEventListener("click", (e) => {
  if (e.target.closest("[data-close]")) e.target.closest("dialog").close();
  else if (e.target.classList.contains("vwrap")) e.target.closest("dialog").close();
});

/* Ayuda con respiración guiada */
let bi;
const ph = ["Inhala", "Sostén", "Exhala", "Sostén"];
$("#helpBtn").onclick = () => {
  $("#helpD").showModal();
  let k = 0;
  $("#orbTxt").textContent = "Inhala";
  bi = setInterval(() => {
    k = (k + 1) % 4;
    $("#orbTxt").textContent = ph[k];
  }, 2500);
};
$("#helpD").addEventListener("close", () => clearInterval(bi));
$("#toGuide").onclick = () => {
  $("#helpD").close();
  $("#guia").scrollIntoView();
};
