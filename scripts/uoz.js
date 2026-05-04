// =======================
// УОС-01 Эмулятор (с таблицами)
// =======================

// --- элементы ---
const fc = document.getElementById("fc");
const fg = document.getElementById("fg");
const uc = document.getElementById("uc");
const modeSelect = document.getElementById("mode");
const screen = document.getElementById("screen");

let detector = 1;

// =======================
// ДАННЫЕ (исправленные)
// =======================

const data = {

1: {
  det1: [
    { fc:1000, fg:1468, uc:0.15, U_if:1.965 },
    { fc:1000, fg:1468, uc:0.14, U_if:1.999 },
    { fc:1000, fg:1468, uc:0.13, U_if:2.012 },
    { fc:1000, fg:1468, uc:0.12, U_if:2.019 },
    { fc:1000, fg:1468, uc:0.11, U_if:2.030 },
    { fc:1000, fg:1468, uc:0.10, U_if:2.019 },
    { fc:1000, fg:1468, uc:0.09, U_if:1.955 },
    { fc:1000, fg:1468, uc:0.08, U_if:1.826 },
    { fc:1000, fg:1468, uc:0.07, U_if:1.708 },
    { fc:1000, fg:1468, uc:0.06, U_if:1.600 },
    { fc:1000, fg:1468, uc:0.05, U_if:1.439 },
    { fc:1000, fg:1468, uc:0.04, U_if:1.224 },
    { fc:1000, fg:1468, uc:0.03, U_if:1.009 }
  ],
  det2: [
    { fc:1000, fg:1468, uc:0.15, U_if:1.729 },
    { fc:1000, fg:1468, uc:0.14, U_if:1.708 },
    { fc:1000, fg:1468, uc:0.13, U_if:1.697 },
    { fc:1000, fg:1468, uc:0.12, U_if:1.686 },
    { fc:1000, fg:1468, uc:0.11, U_if:1.675 },
    { fc:1000, fg:1468, uc:0.10, U_if:1.665 },
    { fc:1000, fg:1468, uc:0.09, U_if:1.654 },
    { fc:1000, fg:1468, uc:0.08, U_if:1.654 },
    { fc:1000, fg:1468, uc:0.07, U_if:1.643 },
    { fc:1000, fg:1468, uc:0.06, U_if:1.611 },
    { fc:1000, fg:1468, uc:0.05, U_if:1.568 },
    { fc:1000, fg:1468, uc:0.04, U_if:1.353 },
    { fc:1000, fg:1468, uc:0.03, U_if:1.246 }
  ],
  det3: [
    { fc:1000, fg:1468, uc:0.15, U_if:3.480 },
    { fc:1000, fg:1468, uc:0.14, U_if:3.405 },
    { fc:1000, fg:1468, uc:0.13, U_if:3.211 },
    { fc:1000, fg:1468, uc:0.12, U_if:3.104 },
    { fc:1000, fg:1468, uc:0.11, U_if:2.868 },
    { fc:1000, fg:1468, uc:0.10, U_if:2.696 },
    { fc:1000, fg:1468, uc:0.09, U_if:2.535 },
    { fc:1000, fg:1468, uc:0.08, U_if:2.288 },
    { fc:1000, fg:1468, uc:0.07, U_if:2.030 },
    { fc:1000, fg:1468, uc:0.06, U_if:1.804 },
    { fc:1000, fg:1468, uc:0.05, U_if:1.523 },
    { fc:1000, fg:1468, uc:0.04, U_if:1.095 },
    { fc:1000, fg:1468, uc:0.03, U_if:0.851 }
  ]
},

// остальные задания оставляем как есть, но фиксируем channel строкой
3: {
  det1: [
    { fc:535, fg:1000, channel:"main", U_if:1.127 },
    { fc:1465, fg:1000, channel:"mirror", U_if:0.406 }
  ]
}

// (остальные можно оставить — добавим обработку ниже)

};

// =======================
// ПОИСК ЗНАЧЕНИЯ
// =======================

function findValue(mode, detector, fc, fg, uc) {

  const table = data[mode]?.["det" + detector];
  if (!table) return 0;

  let closest = table[0];
  let minDiff = Infinity;

  table.forEach(row => {
    let diff = 0;

    if (row.fc !== undefined) diff += Math.abs(row.fc - fc);
    if (row.fg !== undefined) diff += Math.abs(row.fg - fg);
    if (row.uc !== undefined) diff += Math.abs(row.uc - uc);

    if (diff < minDiff) {
      minDiff = diff;
      closest = row;
    }
  });

  return closest.U_if;
}

// =======================
// ДЕТЕКТОРЫ UI
// =======================

document.querySelectorAll(".det").forEach(btn => {
  btn.onclick = () => {
    document.querySelectorAll(".det").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    detector = +btn.dataset.det;
    update();
  };
});

// =======================
// ОСНОВНАЯ ЛОГИКА
// =======================

function clamp(v, min, max) {
  return Math.min(Math.max(v, min), max);
}

function update() {

  let f_c = clamp(+fc.value || 250, 250, 6500);
  let f_g = clamp(+fg.value || 500, 500, 6500);
  let U_c = clamp(+uc.value || 0, 0, 0.35);
  const mode = +modeSelect.value;

  fc.value = Math.round(f_c);
  fg.value = Math.round(f_g);
  uc.value = U_c.toFixed(2);

  const f_if = f_g - f_c;

  const U_if = findValue(mode, detector, f_c, f_g, U_c);

  render(mode, f_c, f_g, f_if, U_c, U_if);
}

// =======================
// ОТРИСОВКА
// =======================

function render(mode, f_c, f_g, f_if, U_c, U_if) {

  let html = `<b>Детектор:</b> ${detector}<br><br>`;

  if (mode <= 3) {
    html += `fс = ${f_c} кГц<br>`;
    html += `fп.ч = ${f_if.toFixed(1)} кГц<br><br>`;
  }

  if (mode >= 4) {
    html += `fг = ${f_g} кГц<br>`;
    html += `fс = ${f_c} кГц<br><br>`;
  }

  html += `Uс = ${U_c.toFixed(2)} В<br>`;
  html += `Uп.ч = ${U_if.toFixed(3)} В`;

  screen.innerHTML = html;
}

// =======================
// СОБЫТИЯ
// =======================

fc.oninput = update;
fg.oninput = update;
uc.oninput = update;
modeSelect.onchange = update;

update();
