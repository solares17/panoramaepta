// =======================
// УОС-01 Эмулятор (финал)
// =======================

// --- UI ---
const fc = document.getElementById("fc");
const fg = document.getElementById("fg");
const uc = document.getElementById("uc");
const modeSelect = document.getElementById("mode");
const screen = document.getElementById("screen");

let detector = 1;

// =======================
// ДАННЫЕ (твои)
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

2: {
  det1: [
    { fc:500, df:468, uc:0.027, U_if:0.839 },
    { fc:1000, df:468, uc:0.027, U_if:0.005 },
    { fc:1500, df:468, uc:0.027, U_if:0.575 },
    { fc:2000, df:468, uc:0.027, U_if:0.039 },
    { fc:2500, df:468, uc:0.027, U_if:1.224 }
  ],

  det2: [
    { fc:500, df:468, uc:0.027, U_if:1.020 },
    { fc:1000, df:468, uc:0.027, U_if:0.005 },
    { fc:1500, df:468, uc:0.027, U_if:1.224 },
    { fc:2000, df:468, uc:0.027, U_if:0.966 },
    { fc:2500, df:468, uc:0.027, U_if:1.084 }
  ],

  det3: [
    { fc:500, df:468, uc:0.027, U_if:0.884 },
    { fc:1000, df:468, uc:0.027, U_if:1.002 },
    { fc:1500, df:468, uc:0.027, U_if:0.006 },
    { fc:2000, df:468, uc:0.027, U_if:0.003 },
    { fc:2500, df:468, uc:0.027, U_if:0.183 }
  ]
},

3: {
  det1: [
    { fc:535, fg:1000, channel:"main", U_if:1.127 },
    { fc:1465, fg:1000, channel:"mirror", U_if:0.406 }
  ],
  det2: [
    { fc:535, fg:1000, channel:"main", U_if:0.934 },
    { fc:1465, fg:1000, channel:"mirror", U_if:0.602 }
  ],
  det3: [
    { fc:535, fg:1000, channel:"main", U_if:0.730 },
    { fc:1465, fg:1000, channel:"mirror", U_if:0.29 }
  ]
},

4: {
  det1: [
    { fc:500, fg:1000, uc:0.027, channel:"main", U_if:0.002 },
    { fc:1500, fg:1000, uc:0.027, channel:"p1", U_if:0.001 },
    { fc:2000, fg:1000, uc:0.027, channel:"p2", U_if:0.002 },
    { fc:2500, fg:1000, uc:0.027, channel:"p3", U_if:0.003 },
    { fc:3000, fg:1000, uc:0.027, channel:"p4", U_if:0.004 }
  ],

  det2: [ /* аналогично */ ],
  det3: [ /* аналогично */ ]
},

5: {
  det1: [
    { fc:1035, fg:1500, uc:0.03, channel:"main", U_if:0.002 },
    { fc:465, fg:1500, uc:0.03, channel:"straight", U_if:0.017 }
  ],

  det2: [
    { fc:1035, fg:1500, uc:0.03, channel:"main", U_if:0.002 },
    { fc:465, fg:1500, uc:0.03, channel:"straight", U_if:0.003 }
  ],

  det3: [
    { fc:1035, fg:1500, uc:0.03, channel:"main", U_if:0.002 },
    { fc:465, fg:1500, uc:0.03, channel:"straight", U_if:0.002 }
  ]
}

};

// =======================
// УТИЛИТЫ
// =======================

function clamp(v, min, max) {
  return Math.min(Math.max(v, min), max);
}

// линейная интерполяция
function lerp(x1, y1, x2, y2, x) {
  if (x2 === x1) return y1;
  return y1 + (x - x1) * (y2 - y1) / (x2 - x1);
}

// =======================
// ЗАДАНИЕ 1 (по Uc)
// =======================

function getTask1(table, uc) {
  const sorted = [...table].sort((a,b)=>a.uc-b.uc);

  for (let i=0; i<sorted.length-1; i++) {
    if (uc >= sorted[i].uc && uc <= sorted[i+1].uc) {
      return lerp(
        sorted[i].uc, sorted[i].U_if,
        sorted[i+1].uc, sorted[i+1].U_if,
        uc
      );
    }
  }

  return sorted[0].U_if;
}

// =======================
// ЗАДАНИЕ 2 (по fc)
// =======================

function getTask2(table, fc) {
  const sorted = [...table].sort((a,b)=>a.fc-b.fc);

  for (let i=0; i<sorted.length-1; i++) {
    if (fc >= sorted[i].fc && fc <= sorted[i+1].fc) {
      return lerp(
        sorted[i].fc, sorted[i].U_if,
        sorted[i+1].fc, sorted[i+1].U_if,
        fc
      );
    }
  }

  return sorted[0].U_if;
}

// =======================
// ЗАДАНИЯ 3–5 (дискрет)
// =======================

function getDiscrete(table, fc, fg) {

  let closest = table[0];
  let min = Infinity;

  table.forEach(row => {
    let diff = 0;

    if (row.fc) diff += Math.abs(row.fc - fc);
    if (row.fg) diff += Math.abs(row.fg - fg);

    if (diff < min) {
      min = diff;
      closest = row;
    }
  });

  return closest.U_if;
}

// =======================
// ГЛАВНАЯ ФУНКЦИЯ
// =======================

function getUif(mode, detector, fc, fg, uc) {

  const table = data[mode]?.["det"+detector];
  if (!table) return 0;

  if (mode === 1) return getTask1(table, uc);
  if (mode === 2) return getTask2(table, fc);

  return getDiscrete(table, fc, fg);
}

// =======================
// UI ДЕТЕКТОРЫ
// =======================

document.querySelectorAll(".det").forEach(btn => {
  btn.onclick = () => {
    document.querySelectorAll(".det").forEach(b=>b.classList.remove("active"));
    btn.classList.add("active");
    detector = +btn.dataset.det;
    update();
  };
});

// =======================
// ОБНОВЛЕНИЕ
// =======================

function update() {

  let f_c = clamp(+fc.value || 250, 250, 6500);
  let f_g = clamp(+fg.value || 500, 500, 6500);
  let U_c = clamp(+uc.value || 0, 0, 0.35);
  const mode = +modeSelect.value;

  

  const f_if = f_g - f_c;

  const U_if = getUif(mode, detector, f_c, f_g, U_c);

  render(mode, f_c, f_g, f_if, U_c, U_if);
}

// =======================
// ВЫВОД
// =======================

function render(mode, f_c, f_g, f_if, U_c, U_if) {

  let html = `<b>Детектор:</b> ${detector}<br><br>`;

  if (mode <= 3) {
    html += `fс = ${f_c} кГц<br>`;
    html += `fп.ч = ${f_if.toFixed(1)} кГц<br><br>`;
  } else {
    html += `fг = ${f_g} кГц<br>`;
    html += `fс = ${f_c} кГц<br><br>`;
  }

  html += `Uс = ${U_c.toFixed(3)} В<br>`;
  html += `Uп.ч = ${U_if.toFixed(3)} В`;

  // коэффициент преобразования (задание 2)
  if (mode === 2 && U_c > 0) {
    const K = U_if / U_c;
    html += `<br><br>Kпр = ${K.toFixed(2)}`;
  }

  screen.innerHTML = html;
}

// =======================
// СОБЫТИЯ
// =======================

fc.oninput = update;
fg.oninput = update;
uc.oninput = update;
modeSelect.onchange = update;

// =======================
// СТАРТ
// =======================

update();
