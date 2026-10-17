/* Acompañante emocional con IA (se conecta a la función /api/chat; la clave nunca está aquí) */
(function () {
  /* Líneas de ayuda que se muestran en una crisis. AGREGUEN aquí solo servicios verificados. */
  var RESOURCES = [{ label: "Emergencias (El Salvador)", tel: "911" }];
  var CRISIS_RE = /suicid|quitarme la vida|quitar la vida|quitarse la vida|matarme|me quiero morir|quiero morir|quiero morirme|no quiero vivir|no quiero seguir viviendo|ya no quiero estar aqui|acabar con mi vida|acabar con todo|terminar con mi vida|hacerme dano|lastimarme|cortarme|autolesion|desaparecer para siempre|mejor sin mi|no vale la pena vivir|ahorcarme|sobredosis/;
  var CRISIS_TXT = "Siento mucho que estés pasando por esto, y me alegra que lo hayas escrito. No tienes que cargarlo tú solo/a. Lo más importante ahora es tu seguridad: si estás en peligro o piensas en hacerte daño, llama ahora al 911 (emergencias en El Salvador) o ve con alguien de confianza que pueda acompañarte hoy. Si puedes, aléjate de cualquier cosa con la que podrías lastimarte y quédate cerca de otra persona. Soy una IA y no puedo darte la ayuda que necesitas en este momento, pero una persona sí puede. ¿Hay alguien cerca a quien puedas avisar ahora?";
  var HELLO = "Hola, soy el acompañante de Threads of Calm. Soy una IA: puedo escucharte y proponerte ejercicios de calma, pero no soy psicólogo ni reemplazo a un profesional. ¿Cómo te sientes hoy?";
  var FAIL = "Ahora mismo no puedo responder. Mientras tanto, prueba esto: inhala por la nariz contando 4 y exhala despacio contando 6, unas cuantas veces. También puedes abrir la ayuda del sitio con el botón de abajo.";
  var norm = function (s) { return s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""); };
  var hist = [], busy = false; /* la conversación solo vive en esta página: no se guarda en el navegador */

  function el(t, c, x) { var e = document.createElement(t); if (c) e.className = c; if (x) e.textContent = x; return e; }

  var btn = el("button"); btn.id = "asstBtn"; btn.type = "button";
  btn.setAttribute("aria-expanded", "false"); btn.setAttribute("aria-controls", "asstP");
  btn.innerHTML = "💬 <span>Hablar con el acompañante</span>"; btn.setAttribute("aria-label", "Hablar con el acompañante");
  var p = el("section"); p.id = "asstP"; p.hidden = true; p.setAttribute("role", "dialog"); p.setAttribute("aria-label", "Acompañante con inteligencia artificial");

  var head = el("div", "a-h"); head.appendChild(el("strong", "", "Acompañante"));
  var hb = el("div"); var clear = el("button", "", "Borrar"); clear.type = "button"; clear.title = "Borrar la conversación";
  var close = el("button", "", "Cerrar"); close.type = "button"; hb.appendChild(clear); hb.appendChild(document.createTextNode(" ")); hb.appendChild(close); head.appendChild(hb);

  var note = el("div", "a-note");
  note.innerHTML = "<strong>Soy una IA, no una psicóloga.</strong> Puedo equivocarme. En una emergencia llama al <strong>911</strong>. <button type='button' class='a-link' style='all:unset;color:var(--violet);font-weight:600;cursor:pointer;text-decoration:underline'>Más info</button><div class='a-more' hidden>Lo que escribas se envía a un servicio de IA externo (Google) para generar la respuesta, y su política puede conservarlo. No escribas tu nombre completo, dirección, escuela ni teléfono. Este sitio no guarda tu conversación. No reemplaza la atención de un profesional.</div>";
  var more = note.querySelector(".a-more"), lnk = note.querySelector(".a-link");
  lnk.onclick = function () { more.hidden = !more.hidden; lnk.textContent = more.hidden ? "Más info" : "Menos info"; };

  var log = el("div", "a-log"); log.setAttribute("role", "log"); log.setAttribute("aria-live", "polite");
  var chips = el("div", "a-chips");
  ["Estoy estresado/a por un examen", "Me siento solo/a", "No puedo dormir", "Estoy muy ansioso/a"].forEach(function (t) {
    var b = el("button", "", t); b.type = "button"; b.onclick = function () { send(t); }; chips.appendChild(b);
  });
  var crisisBox = el("div", "a-crisis"); crisisBox.hidden = true; crisisBox.setAttribute("role", "alert");
  var form = el("form", "a-f"); var ta = el("textarea"); ta.rows = 1; ta.maxLength = 600; ta.placeholder = "Escribe aquí…"; ta.setAttribute("aria-label", "Tu mensaje");
  var sb = el("button", "", "Enviar"); sb.type = "submit"; form.appendChild(ta); form.appendChild(sb);
  [head, note, log, chips, crisisBox, form].forEach(function (n) { p.appendChild(n); });
  document.body.appendChild(btn); document.body.appendChild(p);

  function add(cls, text) { var m = el("div", "a-m " + cls, text); log.appendChild(m); log.scrollTop = log.scrollHeight; return m; }
  function showCrisis() {
    crisisBox.innerHTML = ""; crisisBox.appendChild(el("div", "", "Si estás en peligro o piensas en hacerte daño, pide ayuda ahora:"));
    RESOURCES.forEach(function (r) { var a = el("a", "tel", "Llamar al " + r.tel + " · " + r.label); a.href = "tel:" + r.tel; crisisBox.appendChild(a); });
    var h = document.getElementById("helpD");
    if (h && h.showModal) { var b = el("button", "", "Abrir ayuda del sitio"); b.type = "button"; b.onclick = function () { h.showModal(); }; crisisBox.appendChild(b); }
    crisisBox.hidden = false;
  }
  function reset() { hist = []; log.innerHTML = ""; crisisBox.hidden = true; chips.hidden = false; add("bot", HELLO); }

  function send(text) {
    text = (text || "").trim(); if (!text || busy) return;
    chips.hidden = true; add("me", text); ta.value = ""; hist.push({ role: "user", text: text });
    if (CRISIS_RE.test(norm(text))) { add("bot", CRISIS_TXT); hist.push({ role: "model", text: CRISIS_TXT }); showCrisis(); return; } /* respuesta inmediata, sin red */
    busy = true; sb.disabled = true; var dots = add("bot dots", "Escribiendo…");
    fetch("/api/chat", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ messages: hist.slice(-10) }) })
      .then(function (r) { return r.json().catch(function () { return {}; }).then(function (d) { return { ok: r.ok, d: d }; }); })
      .then(function (x) {
        dots.remove();
        if (x.ok && x.d.reply) { add("bot", x.d.reply); hist.push({ role: "model", text: x.d.reply }); if (x.d.crisis) showCrisis(); }
        else { add("bot", x.d && x.d.error === "busy" ? "Hay mucha gente conversando ahora mismo. " + FAIL : FAIL); hist.pop(); }
      })
      .catch(function () { dots.remove(); add("bot", FAIL); hist.pop(); })
      .then(function () { busy = false; sb.disabled = false; ta.focus(); });
  }
  form.onsubmit = function (e) { e.preventDefault(); send(ta.value); };
  ta.onkeydown = function (e) { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(ta.value); } };
  function open(v) { p.hidden = !v; btn.setAttribute("aria-expanded", String(v)); if (v) { if (!log.children.length) add("bot", HELLO); ta.focus(); } else btn.focus(); }
  btn.onclick = function () { open(p.hidden); };
  close.onclick = function () { open(false); };
  clear.onclick = reset;
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && !p.hidden && !(document.getElementById("helpD") || {}).open) open(false); });
})();
