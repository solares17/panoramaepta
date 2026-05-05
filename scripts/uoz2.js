// =======================
// УОС-02 ПОЛНАЯ МОДЕЛЬ
// =======================

const fc = document.getElementById("fc");
const fg = document.getElementById("fg");
const uc = document.getElementById("uc");
const fm = document.getElementById("fm");
const modeSelect = document.getElementById("mode");
const screen = document.getElementById("screen");

let detector = 1;
let loads = new Set();

// =======================
// ДАННЫЕ (НОРМАЛИЗОВАНЫ)
// =======================

const data = {

  // ===== ЗАДАНИЕ 1 =====
  1: {
    det1: {
      R1C1: {
        weak: [
          { uc: 0.1, Udc: 0.000 },
          { uc: 0.2, Udc: 0.009 },
          { uc: 0.25, Udc: 0.034 },
          { uc: 0.3, Udc: 0.058 },
          { uc: 0.4, Udc: 0.117 }
        ],
        strong: [
          { uc: 0.5, Udc: 0.170 },
          { uc: 0.75, Udc: 0.395 },
          { uc: 1.0, Udc: 0.747 },
          { uc: 1.25, Udc: 0.966 },
          { uc: 1.5, Udc: 1.215 },
          { uc: 2.0, Udc: 1.682 }
        ]
      },
      R2C1: {
        weak: [
          { uc: 0.1, Udc: 0.000 },
          { uc: 0.2, Udc: 0.009 },
          { uc: 0.25, Udc: 0.024 },
          { uc: 0.3, Udc: 0.048 },
          { uc: 0.4, Udc: 0.102 }
        ],
        strong: [
          { uc: 0.5, Udc: 0.156 },
          { uc: 0.75, Udc: 0.366 },
          { uc: 1.0, Udc: 0.615 },
          { uc: 1.25, Udc: 0.844 },
          { uc: 1.5, Udc: 1.056 },
          { uc: 2.0, Udc: 1.552 }
        ]
      }
    }
  },

  // ===== ЗАДАНИЕ 2 =====
  2: {
    det2: {
      R1C1: [
        { uc: 0.02, Udc: 1.977 },
        { uc: 0.05, Udc: 2.439 },
        { uc: 0.1, Udc: 2.441 },
        { uc: 0.15, Udc: 2.421 },
        { uc: 0.2, Udc: 2.426 },
        { uc: 0.3, Udc: 2.412 }
      ],
      R2C1: [
        { uc: 0.02, Udc: 1.768 },
        { uc: 0.05, Udc: 1.909 },
        { uc: 0.1, Udc: 1.923 },
        { uc: 0.15, Udc: 1.914 },
        { uc: 0.2, Udc: 1.914 },
        { uc: 0.3, Udc: 1.928 }
      ]
    }
  },

  // ===== ЗАДАНИЕ 3 =====
  3: {
    det3: [
      { uc: 0.012, Udc: 0.004 },
      { uc: 0.03, Udc: 0.019 },
      { uc: 0.073, Udc: 0.039 },
      { uc: 0.114, Udc: 0.053 },
      { uc: 0.137, Udc: 0.063 },
      { uc: 0.18, Udc: 0.078 }
    ]
  },

  // ===== ЗАДАНИЕ 4 =====
  4: {
    det1: {
      C1: [
        { fm: 1000, Uac: 0.165 },
        { fm: 5000, Uac: 0.161 },
        { fm: 10000, Uac: 0.150 },
        { fm: 15000, Uac: 0.128 }
      ],
      C2: [
        { fm: 1000, Uac: 0.165 },
        { fm: 5000, Uac: 0.171 },
        { fm: 10000, Uac: 0.175 },
        { fm: 15000, Uac: 0.185 }
      ],
      C1C2: [
        { fm: 1000, Uac: 0.166 },
        { fm: 5000, Uac: 0.158 },
        { fm: 10000, Uac: 0.140 },
        { fm: 15000, Uac: 0.114 }
      ]
    },
    det2: {
      C1: [
        { fm: 1000, Uac: 0.000 },
        { fm: 5000, Uac: 0.000 },
        { fm: 10000, Uac: 0.138 },
        { fm: 15000, Uac: 0.266 }
      ]
    },
    det3: [
      { fm: 1000, Uac: 0.047 },
      { fm: 5000, Uac: 0.049 },
      { fm: 10000, Uac: 0.050 },
      { fm: 15000, Uac: 0.043 }
    ]
  },

  // ===== ЗАДАНИЕ 5 =====
  5: {
    det1: [
      { uc: 0.25, Uac: 0.000 },
      { uc: 0.5, Uac: 0.023 },
      { uc: 0.75, Uac: 0.056 },
      { uc: 1.0, Uac: 0.129 },
      { uc: 1.5, Uac: 0.219 },
      { uc: 2.0, Uac: 0.302 }
    ],
    det2: [
      { uc: 0.005, Uac: 0.128 },
      { uc: 0.01, Uac: 0.137 },
      { uc: 0.015, Uac: 0.156 },
      { uc: 0.024, Uac: 0.150 },
      { uc: 0.04, Uac: 0.068 }
    ],
    det3: [
      { uc: 0.01, Uac: 0.000 },
      { uc: 0.03, Uac: 0.000 },
      { uc: 0.069, Uac: 0.003 },
      { uc: 0.076, Uac: 0.010 },
      { uc: 0.091, Uac: 0.025 },
      { uc: 0.1, Uac: 0.035 }
    ]
  }
};

// =======================
// ИНТЕРПОЛЯЦИЯ
// =======================

function interp(table, x, key) {
  const sorted = [...table].sort((a,b)=>a[key]-b[key]);

  for (let i=0;i<sorted.length-1;i++) {
    if (x >= sorted[i][key] && x <= sorted[i+1][key]) {
      const x1 = sorted[i][key];
      const x2 = sorted[i+1][key];
      const y1 = sorted[i].Udc ?? sorted[i].Uac;
      const y2 = sorted[i+1].Udc ?? sorted[i+1].Uac;

      return y1 + (x - x1) * (y2 - y1) / (x2 - x1);
    }
  }

  return sorted[0].Udc ?? sorted[0].Uac;
}

// =======================
// ВЫБОР НАГРУЗКИ
// =======================

function getLoadKey() {
  const arr = [...loads].sort().join("");
  return arr || "R1C1";
}

// =======================
// РАСЧЁТ
// =======================

function calculate(mode, detector, uc, fm) {

  const load = getLoadKey();

  // Задание 1
  if (mode === 1) {
    const type = uc <= 0.4 ? "weak" : "strong";
    return interp(data[1].det1[load][type], uc, "uc");
  }

  // Задание 2
  if (mode === 2) {
    return interp(data[2].det2[load], uc, "uc");
  }

  // Задание 3
  if (mode === 3) {
    return interp(data[3].det3, uc, "uc");
  }

  // Задание 4
  if (mode === 4) {
    if (detector === 3) return interp(data[4].det3, fm, "fm");
    return interp(data[4]["det"+detector][load], fm, "fm");
  }

  // Задание 5
  if (mode === 5) {
    return interp(data[5]["det"+detector], uc, "uc");
  }

  return 0;
}

// =======================
// UI
// =======================

document.querySelectorAll(".det").forEach(btn=>{
  btn.onclick = ()=>{
    document.querySelectorAll(".det").forEach(b=>b.classList.remove("active"));
    btn.classList.add("active");
    detector = +btn.dataset.det;
    update();
  };
});

document.querySelectorAll(".load").forEach(btn=>{
  btn.onclick = ()=>{
    const val = btn.dataset.load;
    if (loads.has(val)) {
      loads.delete(val);
      btn.classList.remove("active");
    } else {
      loads.add(val);
      btn.classList.add("active");
    }
    update();
  };
});

// =======================
// UPDATE
// =======================

function update() {

  const Uc = +uc.value;
  const Fm = +fm.value;
  const mode = +modeSelect.value;

  const value = calculate(mode, detector, Uc, Fm);

  let html = `<b>Детектор:</b> ${detector}<br>`;
  html += `<b>Нагрузка:</b> ${[...loads].join("+") || "R1C1"}<br><br>`;

  if (mode <= 3) {
    html += `Uc = ${Uc.toFixed(3)} В<br>`;
    html += `U= = ${value.toFixed(3)} В`;
  } else {
    html += `Uc = ${Uc.toFixed(3)} В<br>`;
    html += `Fm = ${Fm} Гц<br>`;
    html += `U~ = ${value.toFixed(3)} В`;

    if (mode === 5 && Uc > 0) {
      const k = value / (0.3 * Uc);
      html += `<br><br>k = ${k.toFixed(2)}`;
    }
  }

  screen.innerHTML = html;
}

// =======================
// СТАРТ
// =======================

fc.oninput = update;
fg.oninput = update;
uc.oninput = update;
fm.oninput = update;
modeSelect.onchange = update;

update();
