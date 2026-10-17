/* ==========================================
   Datos: poemas
   ========================================== */

/* Poemas con tarjeta que gira */
const PT =
  '<ellipse cx="50" cy="40" rx="8" ry="5" fill="#f3b8c8" transform="rotate(30 50 40)"/><ellipse cx="255" cy="85" rx="7" ry="4.5" fill="#f3b8c8"/><ellipse cx="40" cy="205" rx="7" ry="4" fill="#f3b8c8" transform="rotate(-20 40 205)"/>';
const fl = (x, y) =>
  `<g transform="translate(${x} ${y})">${[0, 72, 144, 216, 288].map((a) => `<ellipse cy="-12" rx="8" ry="13" fill="#f3b8c8" transform="rotate(${a})"/>`).join("")}<circle r="4" fill="#b8a47c"/></g>`;
const ILL = {
  ventana:
    '<rect x="70" y="50" width="160" height="190" rx="6" fill="#f8f6f2" stroke="#302a40" stroke-width="6"/><path d="M150 50v190M70 145h160" stroke="#302a40" stroke-width="5"/><circle cx="190" cy="100" r="22" fill="#b8a47c" opacity=".8"/><path d="M80 240Q120 190 160 215T222 200V240Z" fill="#718d7e" opacity=".5"/>',
  paraguas:
    '<path d="M50 150Q150 20 250 150Q215 128 200 150Q175 126 150 150Q125 126 100 150Q85 128 50 150Z" fill="#c58d9d"/><path d="M150 150V240Q150 262 130 258" stroke="#302a40" stroke-width="6" fill="none" stroke-linecap="round"/><path d="M150 40V28" stroke="#302a40" stroke-width="5"/>',
  hilos:
    [0, 1, 2, 3, 4, 5]
      .map(
        (i) =>
          `<path d="M${60 + i * 36} 40V250" stroke="${["#7768a6", "#c58d9d", "#718d7e", "#8495ad", "#b8a47c", "#7768a6"][i]}" stroke-width="10" stroke-linecap="round"/>`,
      )
      .join("") +
    '<path d="M40 150Q120 100 170 150T270 150" stroke="#302a40" stroke-width="5" fill="none"/><circle cx="270" cy="150" r="7" fill="#b8a47c"/>',
  orilla:
    '<circle cx="210" cy="90" r="34" fill="#f3d9a8"/><path d="M0 170Q60 150 120 170T240 170T300 170V300H0Z" fill="#8495ad" opacity=".75"/><path d="M0 205Q70 185 130 205T260 205T300 200V300H0Z" fill="#7768a6" opacity=".6"/><path d="M0 245Q80 225 150 245T300 240V300H0Z" fill="#302a40" opacity=".55"/>',
  flor:
    '<path d="M20 250Q120 190 170 120T270 50" stroke="#5a4a3e" stroke-width="8" fill="none" stroke-linecap="round"/>' +
    [
      [120, 190],
      [170, 120],
      [225, 80],
      [85, 215],
      [250, 55],
    ]
      .map((p) => fl(p[0], p[1]))
      .join(""),
  aliento:
    '<path d="M40 150Q90 90 140 140T240 120" stroke="#8495ad" stroke-width="10" fill="none" stroke-linecap="round" opacity=".85"/><path d="M60 190Q120 140 170 180T260 170" stroke="#7768a6" stroke-width="8" fill="none" stroke-linecap="round" opacity=".75"/><path d="M80 230Q130 190 180 220T250 215" stroke="#c58d9d" stroke-width="6" fill="none" stroke-linecap="round" opacity=".75"/>',
  luna: '<circle cx="150" cy="105" r="55" fill="#f3e6c4"/><path d="M0 230L80 150 140 215 210 140 300 230V300H0Z" fill="#7768a6" opacity=".7"/><path d="M0 262L70 205 130 255 200 195 300 262V300H0Z" fill="#302a40" opacity=".7"/>',
  puente:
    '<path d="M0 240H300" stroke="#8495ad" stroke-width="40" opacity=".5"/><path d="M0 232Q150 70 300 232" stroke="#b8433a" stroke-width="14" fill="none"/><rect x="40" y="180" width="6" height="44" fill="#b8433a"/><rect x="254" y="180" width="6" height="44" fill="#b8433a"/><circle cx="215" cy="70" r="26" fill="#f3d9a8"/>',
  farol:
    '<circle cx="150" cy="130" r="90" fill="#f2b872" opacity=".2"/><rect x="110" y="70" width="80" height="120" rx="30" fill="#f2b872"/><rect x="125" y="55" width="50" height="16" fill="#302a40"/><rect x="125" y="190" width="50" height="14" fill="#302a40"/><path d="M150 36V55" stroke="#302a40" stroke-width="4"/><path d="M130 80Q150 120 130 180M170 80Q150 120 170 180" stroke="#c58d9d" stroke-width="3" fill="none"/>',
  taza: '<path d="M90 130h110v40Q200 220 145 220T90 170Z" fill="#f8f6f2" stroke="#302a40" stroke-width="6"/><path d="M200 140Q235 140 232 168T198 190" stroke="#302a40" stroke-width="6" fill="none"/><path d="M125 110Q115 90 130 75T125 45M165 110Q155 90 170 75T165 45" stroke="#8495ad" stroke-width="5" fill="none" stroke-linecap="round"/><ellipse cx="145" cy="232" rx="70" ry="8" fill="#302a40" opacity=".15"/>',
  koi: '<path d="M60 150Q110 80 170 130T250 110Q230 160 170 175T60 150Z" fill="#e8997a"/><path d="M250 110L282 88 272 132Z" fill="#e8997a" opacity=".85"/><circle cx="90" cy="145" r="5" fill="#302a40"/><circle cx="70" cy="235" r="32" fill="none" stroke="#8495ad" stroke-width="3" opacity=".7"/><circle cx="70" cy="235" r="15" fill="none" stroke="#8495ad" stroke-width="3" opacity=".7"/>',
  camino:
    '<path d="M0 250Q80 160 150 200T300 170V300H0Z" fill="#718d7e" opacity=".55"/><path d="M150 292Q60 232 160 192T150 122T180 62" stroke="#b8a47c" stroke-width="22" fill="none" stroke-linecap="round" opacity=".85"/><circle cx="224" cy="62" r="22" fill="#f3b8c8"/>',
};
const poems = [
  [
    "Hoy no resolví la vida.<br>Solo abrí la ventana,<br>y por ahora, eso basta.",
    "Ventana",
    "ventana",
    "Una ventana abierta: el primer gesto de aire.",
    "#ece7f3",
    "#f6dfe6",
  ],
  [
    "Aprendí a cargar el silencio<br>como se carga un paraguas:<br>sin esperar que llueva.",
    "Paraguas",
    "paraguas",
    "Un paraguas abierto que solo guarda pétalos.",
    "#e3ebe3",
    "#ece7f3",
  ],
  [
    "Hay hilos que se rompen.<br>Otros solo esperan<br>otra mano que los anude.",
    "Hilos",
    "hilos",
    "Hilos de colores y una mano que teje.",
    "#ece7f3",
    "#e3ebe3",
  ],
  [
    "Si hoy fue pesado,<br>déjalo en la orilla;<br>el mar sabe volver sin ti.",
    "Orilla",
    "orilla",
    "El mar guarda lo que le confías.",
    "#f6dfe6",
    "#dfe6f0",
  ],
  [
    "Florece lo que no te mira.<br>También tú,<br>aunque nadie lo vea.",
    "Flor",
    "flor",
    "Una rama de cerezo que florece sola.",
    "#f6e8ee",
    "#ece7f3",
  ],
  [
    "Respirar es una forma breve<br>de decir:<br>sigo aquí.",
    "Aliento",
    "aliento",
    "El aire dibuja cintas de colores.",
    "#e6eef4",
    "#ece7f3",
  ],
  [
    "La noche no es tu enemiga.<br>Es solo el cuarto<br>donde la luna te espera.",
    "Luna",
    "luna",
    "Una luna grande sobre montañas dormidas.",
    "#3a3560",
    "#7768a6",
  ],
  [
    "No tienes que cruzar hoy.<br>Basta con saber<br>que el puente existe.",
    "Puente",
    "puente",
    "Un puente rojo sobre el agua tranquila.",
    "#dfe6f0",
    "#f6e8ee",
  ],
  [
    "Una luz pequeña<br>también alumbra el camino<br>si caminas despacio.",
    "Farol",
    "farol",
    "Un farol de papel que ilumina lo cercano.",
    "#40355e",
    "#302a40",
  ],
  [
    "Tomé té con mi tristeza.<br>No hablamos mucho,<br>pero ninguna se fue.",
    "Té",
    "taza",
    "Una taza humeante: compañía sin prisa.",
    "#f3ece0",
    "#f6dfe6",
  ],
  [
    "Quédate quieto un momento:<br>el agua también se aclara<br>cuando dejas de moverla.",
    "Estanque",
    "koi",
    "Un pez koi y círculos que se calman.",
    "#dfe9ee",
    "#e3ebe3",
  ],
  [
    "Un paso. Luego otro.<br>No importa lo lento:<br>el camino no tiene prisa.",
    "Camino",
    "camino",
    "Un sendero que sube sin apuro.",
    "#f3ece0",
    "#e3ebe3",
  ],
];
