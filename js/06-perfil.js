/* ==========================================
   Perfil y avatar
   ========================================== */

/* Perfil y avatar anime (estilo shōjo) */
const SK = ["#fde8dc", "#f7d2b8", "#e0aa84", "#9a6444"],
  HC = [
    "#1f1a2b",
    "#5a3d3a",
    "#a5714a",
    "#7768a6",
    "#c58d9d",
    "#8495ad",
    "#b8a47c",
    "#e8e0d4",
    "#9b3a4a",
    "#2c3e5c",
  ],
  EC = ["#7768a6", "#718d7e", "#c58d9d", "#8495ad", "#6b4a3a", "#b8a47c", "#9b3a4a"],
  OC = ["#302a40", "#7768a6", "#c58d9d", "#718d7e", "#8495ad", "#b8a47c"];
const DEF = {
    gen: "chica",
    sk: 0,
    hc: 0,
    ec: 0,
    oc: 0,
    hair: "larga",
    out: "marinero",
    acc: "flor",
    mood: "dulce",
  },
  DEFB = { hair: "lado", out: "gakuran", acc: "ninguno", mood: "dulce", hc: 0 },
  DEFG = { hair: "larga", out: "marinero", acc: "flor", mood: "dulce" };
let gi = 0;
function anime(o0) {
  const o = { ...DEF, ...o0 },
    M = { long: "larga", short: "corto", bun: "moño", none: "ninguno" },
    hair = M[o.hair] || o.hair,
    acc = M[o.acc] || o.acc,
    S = SK[o.sk],
    H = HC[o.hc],
    E = EC[o.ec],
    O = OC[o.oc],
    g = "ig" + ++gi;
  const eye = (x) =>
    o.mood === "feliz"
      ? `<path d="M${x - 13} 110Q${x} 92 ${x + 13} 110" stroke="#1d1a2b" stroke-width="4" fill="none" stroke-linecap="round"/>`
      : `<ellipse cx="${x}" cy="107" rx="12.5" ry="16" fill="#fff"/><ellipse cx="${x}" cy="109" rx="10.5" ry="14" fill="url(#${g})"/><ellipse cx="${x}" cy="110" rx="5" ry="8" fill="#1d1a2b"/><ellipse cx="${x - 4}" cy="102" rx="4" ry="4.6" fill="#fff"/><circle cx="${x + 4}" cy="114" r="2" fill="#fff"/><path d="M${x - 14} 101Q${x} 87 ${x + 14} 101" stroke="#1d1a2b" stroke-width="3.4" fill="none" stroke-linecap="round"/>`;
  const bang = `<path d="M52 102Q46 50 100 46Q154 50 148 102Q146 76 124 66Q112 90 100 70Q88 90 76 66Q54 76 52 102Z" fill="${H}"/>`;
  const hb =
    {
      larga: `<path d="M50 100Q40 40 100 34Q160 40 150 100L158 190 140 180 120 192 100 182 80 192 60 180 42 190Z" fill="${H}"/>`,
      coleta: `<path d="M52 100Q44 44 100 38Q156 44 148 100L146 118Q100 110 54 118Z" fill="${H}"/><path d="M146 70Q196 80 182 156Q176 120 148 112Z" fill="${H}"/><circle cx="148" cy="72" r="4" fill="#c58d9d"/>`,
      corto: `<path d="M50 104Q42 44 100 38Q158 44 150 104L148 140Q126 152 100 142Q74 152 52 140Z" fill="${H}"/>`,
      moño: `<circle cx="100" cy="28" r="18" fill="${H}"/><path d="M52 100Q44 46 100 42Q156 46 148 100L142 120Q100 112 58 120Z" fill="${H}"/>`,
      pinchos: `<path d="M52 96Q46 46 100 42Q154 46 148 96L146 110Q100 100 54 110Z" fill="${H}"/>`,
    }[hair] || "";
  const hf =
    hair === "corto"
      ? `<path d="M52 100Q50 50 100 46Q150 50 148 100L148 84Q100 70 52 84Z" fill="${H}"/>`
      : hair === "pinchos"
        ? `<path d="M50 98L58 54 72 78 82 46 96 76 110 42 122 74 138 50 142 80 150 98Q146 78 126 70Q112 92 100 74Q88 92 74 72Q56 78 50 98Z" fill="${H}"/>`
        : bang;
  const body =
    {
      marinero: `<path d="M44 200Q48 160 100 152Q152 160 156 200Z" fill="#fffdf9"/><path d="M62 166Q100 150 138 166L126 200H74Z" fill="${O}"/><path d="M88 154L100 178 112 154Z" fill="${S}"/><path d="M100 180l-15-9 3 17zM100 180l15-9-3 17z" fill="#c58d9d"/>`,
      blazer: `<path d="M44 200Q48 160 100 152Q152 160 156 200Z" fill="${O}"/><path d="M89 154L100 182 111 154Z" fill="#fffdf9"/><path d="M100 166l-5 8 5 26 5-26z" fill="#c58d9d"/>`,
      kimono: `<path d="M44 200Q48 160 100 152Q152 160 156 200Z" fill="${O}"/><path d="M82 153L100 192 118 153 112 152 100 178 88 152Z" fill="#fffdf9"/><rect x="44" y="188" width="112" height="12" fill="#b8a47c"/>`,
    }[o.out] || "";
  const ac =
    {
      flor: `<g transform="translate(138 58) scale(.95)">${[0, 72, 144, 216, 288].map((a) => `<ellipse cy="-9" rx="5" ry="9" fill="#f3b8c8" transform="rotate(${a})"/>`).join("")}<circle r="3" fill="#b8a47c"/></g>`,
      lazo: `<path d="M134 54l-18 8 8 12zM134 54l18 8-8 12z" fill="#c58d9d"/><circle cx="134" cy="60" r="4" fill="#7768a6"/>`,
      ninguno: "",
    }[acc] || "";
  return `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Avatar anime"><defs><linearGradient id="${g}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${E}"/><stop offset="1" stop-color="${E}" stop-opacity=".55"/></linearGradient><linearGradient id="${g}b" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ece7f3"/><stop offset="1" stop-color="#f6dfe6"/></linearGradient></defs><rect width="200" height="200" fill="url(#${g}b)"/><ellipse cx="22" cy="40" rx="6" ry="4" fill="#f3b8c8" opacity=".7" transform="rotate(30 22 40)"/><ellipse cx="176" cy="30" rx="5" ry="3.4" fill="#f3b8c8" opacity=".7"/><ellipse cx="168" cy="120" rx="5" ry="3.4" fill="#f3b8c8" opacity=".6" transform="rotate(-30 168 120)"/>${hb}${body}<rect x="90" y="140" width="20" height="26" fill="${S}"/><path d="M53 96Q51 58 100 56Q149 58 147 96Q146 128 120 148Q100 160 80 148Q54 128 53 96Z" fill="${S}"/>${eye(78)}${eye(122)}<path d="M66 92Q78 86 90 91M110 91Q122 86 134 92" stroke="#3a3045" stroke-width="2" fill="none" opacity=".6" stroke-linecap="round"/><path d="M99 124q-2 3 1 3" stroke="#c7928a" stroke-width="1.5" fill="none"/><ellipse cx="68" cy="128" rx="9" ry="5" fill="#f08a9c" opacity=".38"/><ellipse cx="132" cy="128" rx="9" ry="5" fill="#f08a9c" opacity=".38"/>${o.mood === "feliz" ? '<path d="M90 134Q100 150 110 134Z" fill="#b8545f"/>' : '<path d="M92 136Q100 143 108 136" stroke="#8a4f5c" stroke-width="2.2" fill="none" stroke-linecap="round"/>'}${hf}${ac}</svg>`;
}
const BH = ["lado", "erizado", "desordenado", "largo", "corto"],
  BO = ["gakuran", "blazer", "capucha", "capa"],
  BA = ["ninguno", "gafas", "audifonos", "pendiente", "parche"];
function animeBoy(o0) {
  const o = { ...DEF, ...o0 },
    S = SK[o.sk] || SK[0],
    H = HC[o.hc] || HC[0],
    E = EC[o.ec] || EC[0],
    O = OC[o.oc] || OC[0],
    g = "ib" + ++gi,
    D = "#1d1a2b";
  const hair = BH.includes(o.hair) ? o.hair : "lado",
    out = BO.includes(o.out) ? o.out : "gakuran",
    acc = BA.includes(o.acc) ? o.acc : "ninguno",
    mood = ["dulce", "serio", "feliz"].includes(o.mood) ? o.mood : "dulce";
  const eye = (x) => {
    if (mood === "feliz")
      return `<path d="M${x - 12} 109Q${x} 95 ${x + 12} 109" stroke="${D}" stroke-width="4" fill="none" stroke-linecap="round"/>`;
    const base = `<ellipse cx="${x}" cy="108" rx="12" ry="11" fill="#fff"/><ellipse cx="${x}" cy="109" rx="8.5" ry="10" fill="url(#${g})"/><ellipse cx="${x}" cy="109" rx="4" ry="6.2" fill="${D}"/><circle cx="${x - 3}" cy="104" r="2.8" fill="#fff"/><circle cx="${x + 3}" cy="113" r="1.5" fill="#fff"/>`;
    if (mood === "serio") {
      const yl = x < 100 ? 100 : 106,
        yr = x < 100 ? 106 : 100;
      return (
        base +
        `<path d="M${x - 15} 90L${x + 15} 90L${x + 15} ${yr}L${x - 15} ${yl}Z" fill="${S}"/><path d="M${x - 14} ${yl}L${x + 14} ${yr}" stroke="${D}" stroke-width="3.6" stroke-linecap="round"/>`
      );
    }
    return (
      base +
      `<path d="M${x - 13} 102Q${x} 94 ${x + 13} 102" stroke="${D}" stroke-width="3.6" fill="none" stroke-linecap="round"/>`
    );
  };
  const brows =
    mood === "serio"
      ? `<path d="M63 91L92 98M108 98L137 91" stroke="${H}" stroke-width="4" stroke-linecap="round" fill="none"/>`
      : `<path d="M65 93Q78 87 91 92M109 92Q122 87 135 93" stroke="${H}" stroke-width="3.6" stroke-linecap="round" fill="none"/>`;
  const mouth =
    mood === "feliz"
      ? '<path d="M89 135Q100 151 111 135Z" fill="#b8545f"/>'
      : mood === "serio"
        ? `<path d="M92 140H108" stroke="#8a4f5c" stroke-width="2.4" stroke-linecap="round"/>`
        : `<path d="M92 138Q100 143 108 138" stroke="#8a4f5c" stroke-width="2.4" fill="none" stroke-linecap="round"/>`;
  const hb =
    {
      largo: `<path d="M48 104Q36 44 100 32Q164 44 152 104L162 178Q130 168 100 176Q70 168 38 178Z" fill="${H}"/>`,
    }[hair] || "";
  const strands = `<path d="M49 100Q44 122 50 146Q60 126 62 98Z" fill="${H}"/><path d="M151 100Q156 122 150 146Q140 126 138 98Z" fill="${H}"/>`;
  const bangs = `<path d="M48 102Q40 44 100 36Q160 44 152 102Q150 86 142 76Q128 90 112 80Q108 100 106 118Q100 92 94 118Q92 100 88 80Q72 90 58 76Q50 88 48 102Z" fill="${H}"/>`;
  const hf = {
    lado: bangs + strands,
    largo: bangs + strands,
    erizado: `<path d="M48 102Q40 52 56 46L60 22 76 40 88 12 100 38 114 10 124 40 142 20 144 46Q160 52 152 102Q150 84 140 78Q122 90 100 74Q78 90 60 78Q50 88 48 102Z" fill="${H}"/>`,
    desordenado: `<path d="M48 104Q38 48 70 38L66 24 88 36 100 18 112 36 134 24 130 38Q162 48 152 104Q150 86 138 80L126 98 116 76 104 100 94 74 82 98 70 78Q54 88 48 104Z" fill="${H}"/>`,
    corto: `<path d="M49 100Q44 44 100 38Q156 44 151 100Q148 80 130 72Q100 84 70 72Q52 80 49 100Z" fill="${H}"/>`,
  }[hair];
  const base = "M26 200Q32 158 100 150Q168 158 174 200Z";
  const body = {
    gakuran: `<path d="${base}" fill="${O}"/><path d="M80 150L88 168 100 160 112 168 120 150 112 146 100 152 88 146Z" fill="${O}" stroke="#b8a47c" stroke-width="2"/><path d="M100 164V200" stroke="#0005" stroke-width="2"/><circle cx="106" cy="178" r="3" fill="#b8a47c"/><circle cx="106" cy="190" r="3" fill="#b8a47c"/>`,
    blazer: `<path d="${base}" fill="${O}"/><path d="M88 152L100 182 112 152Z" fill="#fffdf9"/><path d="M100 166l-5 8 5 26 5-26z" fill="#c58d9d"/><path d="M88 152L76 192M112 152L124 192" stroke="#0005" stroke-width="2.4" fill="none"/>`,
    capucha: `<path d="${base}" fill="${O}"/><path d="M64 160Q100 136 136 160L128 180Q100 190 72 180Z" fill="${O}" stroke="#fff4" stroke-width="3"/><path d="M92 178V198M108 178V198" stroke="#fffdf9" stroke-width="2.6" stroke-linecap="round"/><circle cx="92" cy="199" r="2.4" fill="#fffdf9"/><circle cx="108" cy="199" r="2.4" fill="#fffdf9"/>`,
    capa: `<path d="${base}" fill="${O}"/><path d="M68 160L76 136 92 150 88 172Z M132 160L124 136 108 150 112 172Z" fill="${O}" stroke="#b8a47c" stroke-width="2"/><path d="M88 152L100 176 112 152Z" fill="${D}"/><circle cx="100" cy="184" r="4.5" fill="#b8a47c"/><path d="M100 188V200" stroke="#0005" stroke-width="2"/>`,
  }[out];
  const ac = {
    ninguno: "",
    gafas: `<g fill="#ffffff22" stroke="#302a40" stroke-width="3"><rect x="62" y="95" width="30" height="25" rx="8"/><rect x="108" y="95" width="30" height="25" rx="8"/><path d="M92 105Q100 101 108 105M62 103L51 99M138 103L149 99" fill="none"/></g>`,
    audifonos: `<path d="M46 108Q40 28 100 28Q160 28 154 108" stroke="#302a40" stroke-width="6" fill="none" stroke-linecap="round"/><rect x="38" y="98" width="14" height="28" rx="6" fill="#c58d9d" stroke="#302a40" stroke-width="2.4"/><rect x="148" y="98" width="14" height="28" rx="6" fill="#c58d9d" stroke="#302a40" stroke-width="2.4"/>`,
    pendiente: `<circle cx="52" cy="114" r="3.4" fill="#b8a47c"/><path d="M52 117V126" stroke="#b8a47c" stroke-width="1.8"/><circle cx="52" cy="128" r="2.6" fill="#b8a47c"/>`,
    parche: `<g transform="rotate(-20 126 131)"><rect x="114" y="126" width="24" height="9" rx="3" fill="#f3d9a8" stroke="#b8a47c" stroke-width="1"/><rect x="123" y="126" width="6" height="9" fill="#e8c78c"/></g>`,
  }[acc];
  const bg = `<ellipse cx="22" cy="40" rx="6" ry="4" fill="#f3b8c8" opacity=".6" transform="rotate(30 22 40)"/><ellipse cx="176" cy="30" rx="5" ry="3.4" fill="#f3b8c8" opacity=".6"/><ellipse cx="168" cy="120" rx="5" ry="3.4" fill="#f3b8c8" opacity=".5" transform="rotate(-30 168 120)"/>`;
  return `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Avatar anime"><defs><linearGradient id="${g}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${E}"/><stop offset="1" stop-color="${E}" stop-opacity=".55"/></linearGradient><linearGradient id="${g}b" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#d9d2ea"/><stop offset="1" stop-color="#dfe9e3"/></linearGradient></defs><rect width="200" height="200" fill="url(#${g}b)"/>${bg}${hb}<rect x="88" y="138" width="24" height="28" fill="${S}"/><path d="M88 147Q100 157 112 147V138H88Z" fill="#00000024"/>${body}<ellipse cx="52" cy="104" rx="5" ry="9" fill="${S}"/><ellipse cx="148" cy="104" rx="5" ry="9" fill="${S}"/><path d="M53 92Q51 56 100 54Q149 56 147 92Q146 122 126 144Q100 160 74 144Q54 122 53 92Z" fill="${S}"/>${eye(78)}${eye(122)}${brows}<path d="M100 121q-2 4 2 4" stroke="#c7928a" stroke-width="1.6" fill="none"/>${mouth}${hf}${ac}</svg>`;
}
const CHAR = { chico: "images/personaje-chico.jpg", chica: "images/personaje-chica.jpg" };
document.querySelectorAll(".reg-pick img").forEach((i) => (i.src = CHAR[i.dataset.g]));
let regG = null;
document.querySelectorAll(".reg-pick button").forEach(
  (b) =>
    (b.onclick = () => {
      regG = b.dataset.g;
      document.querySelectorAll(".reg-pick button").forEach((x) => {
        const on = x === b;
        x.classList.toggle("on", on);
        x.setAttribute("aria-checked", on);
      });
      $("#rErr").textContent = "";
    }),
);
$("#rEye").onclick = () => {
  const t = $("#rPass").type === "password" ? "text" : "password";
  $("#rPass").type = t;
  $("#rPass2").type = t;
};
async function hashPw(p, salt) {
  const d = salt + ":" + p;
  try {
    const b = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(d));
    return [...new Uint8Array(b)].map((x) => x.toString(16).padStart(2, "0")).join("");
  } catch (e) {
    let h = 5381;
    for (const c of d) h = ((h << 5) + h + c.charCodeAt(0)) >>> 0;
    return "x" + h.toString(16);
  }
}
$("#regForm").onsubmit = async (e) => {
  e.preventDefault();
  const n = $("#rName").value.trim(),
    p = $("#rPass").value,
    p2 = $("#rPass2").value,
    er = $("#rErr");
  if (!regG) {
    er.textContent = "Elige tu personaje: chico o chica.";
    return;
  }
  if (!n) {
    er.textContent = "Escribe tu nombre.";
    $("#rName").focus();
    return;
  }
  if (p.length < 4) {
    er.textContent = "La contraseña debe tener al menos 4 caracteres.";
    $("#rPass").focus();
    return;
  }
  if (p !== p2) {
    er.textContent = "Las contraseñas no coinciden.";
    $("#rPass2").focus();
    return;
  }
  const salt = Math.random().toString(36).slice(2),
    hash = await hashPw(p, salt);
  prof = {
    name: n,
    email: "",
    mode: "char",
    gender: regG,
    av: { ...DEF, ...(regG === "chico" ? DEFB : {}), gen: regG },
    photo: null,
    pw: { salt, hash },
    created: Date.now(),
  };
  writeProf(prof);
  loadProfile();
  $("#regForm").reset();
  regG = null;
  document.querySelectorAll(".reg-pick button").forEach((x) => {
    x.classList.remove("on");
    x.setAttribute("aria-checked", "false");
  });
  unlock();
  goGallery();
};
const avHTML = (p) =>
  p.mode === "char"
    ? `<img src="${CHAR[p.gender] || CHAR.chica}" alt="Mi personaje">`
    : p.mode === "photo" && p.photo
      ? `<img src="${p.photo}" alt="Mi foto">`
      : p.av && p.av.gen === "chico"
        ? animeBoy(p.av)
        : anime(p.av);
const PK = "toc_prof";
function readProf() {
  let p = ST.g(PK, null);
  if (p && p.name) return p;
  try {
    p = JSON.parse(sessionStorage.getItem(PK));
  } catch (e) {
    p = null;
  }
  if (p && p.name) return p;
  try {
    const m = document.cookie.match(/(?:^|; )toc_prof=([^;]*)/);
    p = m ? JSON.parse(decodeURIComponent(m[1])) : null;
  } catch (e) {
    p = null;
  }
  return p && p.name ? p : null;
}
function writeProf(p) {
  ST.s(PK, p);
  try {
    sessionStorage.setItem(PK, JSON.stringify(p));
  } catch (e) {}
  try {
    document.cookie =
      "toc_prof=" +
      encodeURIComponent(JSON.stringify({ ...p, photo: null, pw: null })) +
      ";max-age=31536000;path=/;SameSite=Lax";
  } catch (e) {}
}
function clearProf() {
  try {
    localStorage.removeItem(PK);
  } catch (e) {}
  try {
    sessionStorage.removeItem(PK);
  } catch (e) {}
  try {
    document.cookie = "toc_prof=;max-age=0;path=/";
  } catch (e) {}
}
let prof = readProf(),
  dr,
  ctx = "dlg";
$("#enter").textContent = prof ? "Entrar a la galería" : "Crear mi perfil";
function loadProfile() {
  $("#profBtn").innerHTML = prof
    ? `<span class="mini">${avHTML(prof)}</span>${esc(prof.name)}`
    : '<span style="padding:6px 8px 6px 12px">Crear perfil</span>';
}
const sw = (k, arr) =>
  arr
    .map(
      (c, i) =>
        `<button type="button" class="sw${dr.av[k] === i ? " on" : ""}" data-k="${k}" data-v="${i}" style="background:${c}" aria-label="${k} ${i + 1}"></button>`,
    )
    .join("");
const sg = (k, opts) =>
  opts
    .map(
      (o) =>
        `<button type="button" class="${dr.av[k] === o[0] ? "on" : ""}" data-k="${k}" data-v="${o[0]}">${o[1]}</button>`,
    )
    .join("");
function renderAv() {
  $("#avPrev").innerHTML = avHTML(dr);
  document
    .querySelectorAll(".seg[data-top] button")
    .forEach((b) => b.classList.toggle("on", b.dataset.m === dr.mode));
  $("#photoCtl").hidden = dr.mode !== "photo";
  $("#animeCtl").hidden = dr.mode !== "anime";
  $("#charCtl").hidden = dr.mode !== "char";
  document
    .querySelectorAll("#charCtl [data-cg]")
    .forEach((b) => b.classList.toggle("on", b.dataset.cg === (dr.gender || "chica")));
  $("#animeCtl").innerHTML = animeCtlHTML();
}
function animeCtlHTML() {
  const b = dr.av.gen === "chico";
  const top = `<label>Personaje</label><div class="seg">${sg("gen", [
    ["chica", "Chica"],
    ["chico", "Chico"],
  ])}</div>`;
  if (b)
    return (
      top +
      `<label>Peinado</label><div class="seg">${sg("hair", [
        ["lado", "Flequillo largo"],
        ["erizado", "Erizado"],
        ["desordenado", "Desordenado"],
        ["largo", "Largo"],
        ["corto", "Corto"],
      ])}</div><label>Color de cabello</label><div class="sws">${sw("hc", HC)}</div><label>Ojos</label><div class="sws">${sw("ec", EC)}</div><label>Mirada</label><div class="seg">${sg(
        "mood",
        [
          ["dulce", "Tranquilo"],
          ["serio", "Serio"],
          ["feliz", "Feliz"],
        ],
      )}</div><label>Uniforme</label><div class="seg">${sg("out", [
        ["gakuran", "Gakuran"],
        ["blazer", "Blazer"],
        ["capucha", "Capucha"],
        ["capa", "Capa"],
      ])}</div><div class="sws">${sw("oc", OC)}</div><label>Piel</label><div class="sws">${sw("sk", SK)}</div><label>Accesorio</label><div class="seg">${sg(
        "acc",
        [
          ["ninguno", "Ninguno"],
          ["gafas", "Gafas"],
          ["audifonos", "Audífonos"],
          ["pendiente", "Pendiente"],
          ["parche", "Curita"],
        ],
      )}</div>`
    );
  return (
    top +
    `<label>Peinado</label><div class="seg">${sg("hair", [
      ["larga", "Larga y lisa"],
      ["coleta", "Coleta"],
      ["corto", "Corto"],
      ["moño", "Moño"],
      ["pinchos", "Erizado"],
    ])}</div><label>Color de cabello</label><div class="sws">${sw("hc", HC)}</div><label>Ojos</label><div class="sws">${sw("ec", EC)}</div><label>Mirada</label><div class="seg">${sg(
      "mood",
      [
        ["dulce", "Dulce"],
        ["feliz", "Feliz"],
      ],
    )}</div><label>Uniforme</label><div class="seg">${sg("out", [
      ["marinero", "Marinero"],
      ["blazer", "Blazer"],
      ["kimono", "Kimono"],
    ])}</div><div class="sws">${sw("oc", OC)}</div><label>Piel</label><div class="sws">${sw("sk", SK)}</div><label>Accesorio</label><div class="seg">${sg(
      "acc",
      [
        ["flor", "Flor de cerezo"],
        ["lazo", "Lazo"],
        ["ninguno", "Ninguno"],
      ],
    )}</div>`
  );
}
function openEditor() {
  dr = prof
    ? JSON.parse(JSON.stringify(prof))
    : { name: "", email: "", mode: "anime", av: { ...DEF }, photo: null };
  dr.av = { ...DEF, ...dr.av };
  ["hair", "acc"].forEach(
    (k) =>
      (dr.av[k] =
        { long: "larga", short: "corto", bun: "moño", none: "ninguno" }[dr.av[k]] || dr.av[k]),
  );
  dr.mode = "char";
  dr.gender = dr.gender || dr.av.gen || "chica";
  $("#pName").value = dr.name;
  $("#pMail").value = dr.email;
  $("#pErr").textContent = "";
  renderAv();
}
function openProfile() {
  ctx = "dlg";
  $("#profSlot").appendChild($("#editor"));
  $("#pDel").hidden = !prof;
  $("#pSkip").hidden = true;
  $("#pSave").textContent = "Guardar perfil";
  openEditor();
  $("#profD").showModal();
}
const unlock = () => {
  document.body.classList.remove("locked");
  $("#onb").hidden = true;
};
const goGallery = () => setTimeout(() => $("#galeria").scrollIntoView({ behavior: "smooth" }), 450);
function enterApp() {
  $("#splash").classList.add("hide");
  if (prof) {
    unlock();
    goGallery();
  } else {
    $("#onb").hidden = false;
  }
}
$("#pSkip").onclick = unlock;
$("#charCtl").onclick = (e) => {
  const b = e.target.closest("[data-cg]");
  if (!b) return;
  dr.gender = b.dataset.cg;
  renderAv();
};
$("#profBtn").onclick = openProfile;
$("#animeCtl").onclick = (e) => {
  const b = e.target.closest("[data-k]");
  if (!b) return;
  const k = b.dataset.k,
    v = /^\d+$/.test(b.dataset.v) ? +b.dataset.v : b.dataset.v;
  dr.av[k] = v;
  if (k === "gen") Object.assign(dr.av, v === "chico" ? DEFB : DEFG);
  renderAv();
};
document.querySelectorAll(".seg[data-top] button").forEach(
  (b) =>
    (b.onclick = () => {
      dr.mode = b.dataset.m;
      renderAv();
    }),
);
$("#pPhoto").onchange = (e) => {
  const f = e.target.files[0];
  if (!f) return;
  const r = new FileReader();
  r.onload = () => {
    const im = new Image();
    im.onload = () => {
      const c = document.createElement("canvas");
      c.width = c.height = 192;
      const s = Math.min(im.width, im.height);
      c.getContext("2d").drawImage(
        im,
        (im.width - s) / 2,
        (im.height - s) / 2,
        s,
        s,
        0,
        0,
        192,
        192,
      );
      dr.photo = c.toDataURL("image/jpeg", 0.85);
      dr.mode = "photo";
      renderAv();
    };
    im.src = r.result;
  };
  r.readAsDataURL(f);
};
$("#pSave").onclick = () => {
  const n = $("#pName").value.trim(),
    m = $("#pMail").value.trim();
  if (!n) {
    $("#pErr").textContent = "Escribe tu nombre o apodo.";
    return;
  }
  if (m && !/^\S+@\S+\.\S+$/.test(m)) {
    $("#pErr").textContent = "Escribe un correo válido.";
    return;
  }
  dr.name = n;
  dr.email = m;
  prof = dr;
  writeProf(prof);
  loadProfile();
  if (ctx === "onb") {
    unlock();
    goGallery();
  } else $("#profD").close();
};
$("#pDel").onclick = async () => {
  if (prof && prof.pw) {
    const p = prompt("Escribe tu contraseña para borrar el perfil:");
    if (p === null) return;
    if ((await hashPw(p, prof.pw.salt)) !== prof.pw.hash) {
      alert("Contraseña incorrecta.");
      return;
    }
  }
  clearProf();
  prof = null;
  loadProfile();
  $("#profD").close();
  document.body.classList.add("locked");
  $("#onb").hidden = false;
};
document.querySelectorAll("[data-prof]").forEach(
  (b) =>
    (b.onclick = (e) => {
      e.preventDefault();
      openProfile();
    }),
);
