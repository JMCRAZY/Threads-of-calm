/* ==========================================
   Telar, moderación y guía de bienestar
   ========================================== */

/* Telar, moderación y guía de bienestar (originales) */
/* ---------- Telar y moderación ---------- */
const palette = ["#7a6fb0", "#6f9a8d", "#d98fa0", "#f0c987", "#9db8d9", "#b7a3d6", "#e8997a"];
$("#colors").innerHTML = palette
  .map(
    (c, i) =>
      `<label><input type="radio" name="col" value="${c}" ${i === 0 ? "checked" : ""} aria-label="Color ${i + 1}"><span style="background:${c}"></span></label>`,
  )
  .join("");
let threads = [
  { c: "#7a6fb0", m: "Te extraño cada día, pero hoy sonreí al recordarte.", ok: true },
  { c: "#6f9a8d", m: "No estás solo. Aquí hay muchos hilos contigo.", ok: true },
  { c: "#d98fa0", m: "Papá, tu risa sigue en mi casa.", ok: true },
  { c: "#f0c987", m: "Un paso a la vez también es avanzar.", ok: true },
  { c: "#9db8d9", m: "Gracias por dejarme llorar sin prisa.", ok: true },
];
function renderLoom() {
  $("#loom").innerHTML = threads
    .map((t, i) =>
      t.ok === true
        ? `<button class="thread" data-i="${i}" style="background-color:${t.c}" aria-label="Leer hilo ${i + 1}"></button>`
        : "",
    )
    .join("");
  $("#loom")
    .querySelectorAll(".thread")
    .forEach(
      (b) =>
        (b.onclick = () => {
          const t = threads[b.dataset.i];
          $("#readout").innerHTML =
            `<span class="dot" style="background:${t.c}"></span>${esc(t.m)}`;
        }),
    );
}
function renderMod() {
  const p = threads.map((t, i) => ({ t, i })).filter((x) => x.t.ok === "pending");
  $("#modList").innerHTML = p.length
    ? p
        .map(
          (x) =>
            `<div class="mod-item"><span><span class="dot" style="background:${x.t.c}"></span>${esc(x.t.m)}</span><span><button data-a="y" data-i="${x.i}">Aprobar</button> <button class="alt" data-a="n" data-i="${x.i}">Rechazar</button></span></div>`,
        )
        .join("")
    : '<p class="ui" style="margin:0;color:var(--mute)">No hay mensajes pendientes.</p>';
  $("#modList")
    .querySelectorAll("button")
    .forEach(
      (b) =>
        (b.onclick = () => {
          threads[b.dataset.i].ok = b.dataset.a === "y" ? true : false;
          renderLoom();
          renderMod();
        }),
    );
}
$("#threadForm").onsubmit = (e) => {
  e.preventDefault();
  threads.push({
    c: document.querySelector("input[name=col]:checked").value,
    m: $("#tMsg").value.trim(),
    ok: "pending",
  });
  e.target.reset();
  $("#tOk").hidden = false;
  renderMod();
};

/* ---------- Guía de bienestar (PHQ-9 y GAD-7) ---------- */
const phq = [
  "Poco interés o placer en hacer las cosas",
  "Sentirse desanimado/a, deprimido/a o sin esperanza",
  "Dificultad para dormir o dormir demasiado",
  "Sentirse cansado/a o con poca energía",
  "Poco apetito o comer en exceso",
  "Sentirse mal consigo mismo/a, o que es un fracaso o ha decepcionado a su familia",
  "Dificultad para concentrarse (por ejemplo, al leer o ver televisión)",
  "Moverse o hablar tan despacio que otros lo notan, o estar muy inquieto/a",
  "Pensamientos de que estaría mejor muerto/a o de hacerse daño de alguna forma",
];
const gad = [
  "Sentirse nervioso/a, ansioso/a o muy alterado/a",
  "No poder dejar de preocuparse o controlar la preocupación",
  "Preocuparse demasiado por diferentes cosas",
  "Dificultad para relajarse",
  "Estar tan inquieto/a que es difícil quedarse quieto/a",
  "Molestarse o ponerse irritable fácilmente",
  "Sentir miedo, como si algo terrible pudiera pasar",
];
const ch = ["Nunca", "Varios días", "Más de la mitad de los días", "Casi todos los días"];
function qHTML(arr, pre) {
  return arr
    .map(
      (q, i) =>
        `<div class="q-item"><p>${esc(q)}</p><div class="opts">${ch.map((c, v) => `<label><input type="radio" name="${pre}${i}" value="${v}" ${v === 0 ? "required" : ""}> ${c}</label>`).join("")}</div></div>`,
    )
    .join("");
}
$("#qs").innerHTML =
  '<h3 style="margin:14px 0 0">Ánimo</h3>' +
  qHTML(phq, "p") +
  '<h3 style="margin:18px 0 0">Ansiedad</h3>' +
  qHTML(gad, "g");
function sum(pre, n) {
  let s = 0;
  for (let i = 0; i < n; i++) s += +document.querySelector(`input[name=${pre}${i}]:checked`).value;
  return s;
}
$("#guideForm").onsubmit = (e) => {
  e.preventDefault();
  const P = sum("p", 9),
    G = sum("g", 7),
    risk = +document.querySelector("input[name=p8]:checked").value > 0;
  const mood = P >= 10,
    anx = G >= 10;
  let h =
    '<div class="card result"><h3 style="margin-top:0">Gracias por tomarte este momento</h3><p>Sentir lo que sientes es humano, y no tienes que atravesarlo solo/a. Este resultado no es un diagnóstico: solo te ayuda a ver qué apoyos podrían servirte ahora.</p>';
  if (risk)
    h +=
      '<div class="urgent"><strong>Si tienes pensamientos de hacerte daño o de morir, busca ayuda ahora.</strong> Llama a los servicios de emergencia de tu localidad o a una línea de crisis, o acércate a alguien de confianza para que te acompañe. Mereces apoyo.</div>';
  h += '<h3>Apoyos para ti</h3><ul class="support">';
  h +=
    '<li><span class="tag">Duelo</span> Grupos de apoyo en duelo y talleres de arteterapia. Hablar de quien ya no está también es una forma de cuidarte.</li>';
  if (anx)
    h +=
      '<li><span class="tag">Ansiedad</span> Psicología o psiquiatría; mientras tanto, prueba respiraciones lentas y pausas de descanso.</li>';
  if (mood || risk)
    h +=
      '<li><span class="tag">Ánimo bajo</span> Una consulta con un profesional de salud mental; cuéntale a una persona cercana cómo te has sentido.</li>';
  if (!anx && !mood && !risk)
    h +=
      '<li><span class="tag">Bienestar</span> Seguir expresándote con el arte, caminar y conversar con personas de confianza.</li>';
  h +=
    '</ul><p class="ui" style="font-size:.88rem;color:var(--mute)">El directorio con teléfonos y servicios de tu comunidad se completará con la información validada por profesionales.</p>';
  h +=
    '<hr style="border:0;border-top:1px solid var(--line);margin:14px 0"><p class="ui" style="font-weight:600;margin:0">Seguimiento voluntario</p><p style="margin:4px 0 8px;font-size:.95rem">Si quieres, deja un contacto para recibir información de servicios y talleres después de la feria.</p><form id="followForm"><input type="email" id="fMail" placeholder="correo@ejemplo.com" aria-label="Correo de contacto" style="max-width:320px"> <button type="submit">Quiero recibir información</button></form><p id="fOk" class="ui" style="color:var(--sage)" hidden>Gracias. Te escribiremos solo sobre servicios y talleres.</p></div>';
  $("#guideResult").innerHTML = h;
  $("#followForm").onsubmit = (ev) => {
    ev.preventDefault();
    $("#fOk").hidden = false;
  };
  $("#guideResult").scrollIntoView();
};

$("#surveyForm").onsubmit = (e) => {
  e.preventDefault();
  e.target.reset();
  $("#sOk").hidden = false;
};
$("#moodSelect").onchange = () => {
  const v = $("#moodSelect").value,
    styles = {
      calma: [
        "radial-gradient(circle at 25% 40%,#b8c4d4 0 15%,transparent 16%),radial-gradient(circle at 65% 55%,#718f83 0 24%,transparent 25%),linear-gradient(135deg,#e9e5f1,#d8d2e8)",
        "Una composición suave para respirar un momento.",
      ],
      esperanza: [
        "radial-gradient(circle at 72% 28%,#e4d1a7 0 15%,transparent 16%),radial-gradient(circle at 35% 65%,#718f83 0 23%,transparent 24%),linear-gradient(120deg,#e7e3f0,#d4e0d7)",
        "Una luz pequeña también puede abrir camino.",
      ],
      nostalgia: [
        "radial-gradient(circle at 30% 35%,#b99a9b 0 20%,transparent 21%),radial-gradient(circle at 70% 65%,#77758b 0 25%,transparent 26%),linear-gradient(120deg,#e8ddd4,#d8d2e8)",
        "Hay recuerdos que se quedan con nosotros de otra forma.",
      ],
      fuerza: [
        "radial-gradient(circle at 25% 65%,#c49c70 0 18%,transparent 19%),radial-gradient(circle at 70% 35%,#59677b 0 25%,transparent 26%),linear-gradient(120deg,#d8d2e8,#dce8e0)",
        "La fuerza también puede ser silenciosa.",
      ],
    };
  $("#creationCanvas").style.background = styles[v][0];
  $("#moodText").textContent = styles[v][1];
};

// Código QR: se crea solo en una URL http(s). Un archivo abierto como file:// no es accesible desde otros teléfonos.
(function setupShareQR() {
  const target = document.getElementById("qrCanvas");
  const status = document.getElementById("qrStatus");
  const shareBtn = document.getElementById("shareAppBtn");
  const isWeb = location.protocol === "https:" || location.protocol === "http:";
  shareBtn?.addEventListener("click", async () => {
    const url = location.href;
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(url);
        shareBtn.textContent = "Enlace copiado";
      } else {
        window.prompt("Copia este enlace:", url);
      }
    } catch (e) {
      window.prompt("Copia este enlace:", url);
    }
  });
  if (!isWeb) {
    if (status)
      status.textContent =
        "Versión abierta como archivo local. El QR no se genera todavía porque un teléfono externo no puede acceder a esta ruta. Publica la app para obtener una URL pública.";
    return;
  }
  const makeQR = () => {
    if (typeof QRCode === "undefined") {
      if (status)
        status.textContent =
          "No se pudo cargar el generador de QR. Comprueba la conexión a internet y recarga la página.";
      return;
    }
    target.innerHTML = "";
    new QRCode(target, {
      text: location.href.split("#")[0],
      width: 180,
      height: 180,
      colorDark: "#302a40",
      colorLight: "#ffffff",
      correctLevel: QRCode.CorrectLevel.M,
    });
    if (status)
      status.textContent =
        "Este QR abre la dirección actual de la aplicación. Si cambias el dominio al publicar, vuelve a generar o actualizar el código.";
  };
  if (typeof QRCode !== "undefined") makeQR();
  else {
    const s = document.createElement("script");
    s.src = "https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js";
    s.onload = makeQR;
    s.onerror = () => {
      if (status)
        status.textContent = "No se pudo cargar la biblioteca QR. Se necesita conexión a internet.";
    };
    document.head.appendChild(s);
  }
})();

renderWorks();
renderAuthors();
renderPainters();
renderBooks();
renderPoems();
renderLoom();
renderMod();
loadProfile();
stats();
loadThumbs();
petals();
