// =======================
// ЭЛЕМЕНТЫ
// =======================

const fc = document.getElementById("fc");
const fg = document.getElementById("fg");
const uc = document.getElementById("uc");
const modeSelect = document.getElementById("mode");
const screen = document.getElementById("screen");

// Fm у тебя нет в HTML — добавим программно
let fm = 1000;

// =======================
// СОСТОЯНИЕ
// =======================

let detector = 1;
let loads = new Set(["R1", "C1"]); // дефолт

// =======================
// ДАННЫЕ
// =======================

const data = {

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

  4: {
    det1: {
      C1: [
        { fm: 1000, Uac: 0.165 },
        { fm: 5000, Uac: 0.161 },
        { fm: 10000, Uac: 0.150 },
        { fm: 15000, Uac: 0.128 }
      ]
    },
    det3: [
      { fm: 1000, Uac: 0.047 },
      { fm: 5000, Uac: 0.049 },
      { fm: 10000, Uac: 0.050 },
      { fm: 15000, Uac: 0.043 }
    ]
  },

  5: {
    det1: [
      { uc: 0.25, Uac: 0.000 },
      { uc: 0.5, Uac: 0.023 },
      { uc: 0.75, Uac: 0.056 },
      { uc: 1.0, Uac: 0.129 },
      { uc: 1.5, Uac: 0.219 },
      { uc: 2.0, Uac: 0.302 }
    ]
  }
};

// =======================
// ИНТЕРПОЛЯЦИЯ
// =======================

function interp(table, x, key) {
  const arr = [...table].sort((a,b)=>a[key]-b[key]);

  for (let i=0;i<arr.length-1;i++) {
    if (x >= arr[i][key] && x <= arr[i+1][key]) {
      const x1 = arr[i][key];
      const x2 = arr[i+1][key];
      const y1 = arr[i].Udc ?? arr[i].Uac;
      const y2 = arr[i+1].Udc ?? arr[i+1].Uac;

      return y1 + (x - x1) * (y2 - y1) / (x2 - x1);
    }
  }

  return arr[0].Udc ?? arr[0].Uac;
}

// =======================
// НАГРУЗКА
// =======================

function getLoadKey() {
  const key = [...loads].sort().join("");
  return key || "R1C1";
}

// =======================
// РАСЧЁТ
// =======================

function calculate() {
    const mode = +modeSelect.value;
    const Uc = +uc.value;
    let load = getLoadKey(); // Получаем строку типа "C1R1"

    // Привязываем fm к значению из инпута частоты fc для 4 задания
    fm = +fc.value;

    try {
        // --- ЗАДАНИЕ 1 ---
        if (mode === 1) {
            // Если в данных нет такой комбинации нагрузок, откатываемся к базовой R1C1
            const currentData = data[1].det1[load] || data[1].det1["R1C1"];
            const type = Uc <= 0.4 ? "weak" : "strong";
            return interp(currentData[type], Uc, "uc");
        }

        // --- ЗАДАНИЕ 2 ---
        if (mode === 2) {
            // Детектор 2 также зависит от нагрузки
            const currentData = data[2].det2[load] || data[2].det2["R1C1"];
            return interp(currentData, Uc, "uc");
        }

        // --- ЗАДАНИЕ 3 ---
        if (mode === 3) {
            // Детектор 3 не зависит от нагрузки в твоем объекте data
            return interp(data[3].det3, Uc, "uc");
        }

        // --- ЗАДАНИЕ 4 ---
        if (mode === 4) {
            // Зависимость от частоты fm
            if (detector === 3) {
                return interp(data[4].det3, fm, "fm");
            }
            // Для остальных детекторов в задании 4 используем таблицу det1.C1
            return interp(data[4].det1.C1, fm, "fm");
        }

        // --- ЗАДАНИЕ 5 ---
        if (mode === 5) {
            // Зависимость переменной составляющей Uac от Uc
            return interp(data[5].det1, Uc, "uc");
        }

    } catch (error) {
        console.warn("Ошибка при расчете. Проверьте наличие данных для режима:", mode, load);
        return 0;
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
// ОБНОВЛЕНИЕ
// =======================

function update() {

  const Uc = +uc.value;
  const value = calculate();

  let html = `<b>Детектор:</b> ${detector}<br>`;
  html += `<b>Нагрузка:</b> ${[...loads].join("+")}<br><br>`;

  if (modeSelect.value <= 3) {
    html += `Uc = ${Uc.toFixed(3)} В<br>`;
    html += `U= = ${value.toFixed(3)} В`;
  } else {
    html += `Uc = ${Uc.toFixed(3)} В<br>`;
    html += `U~ = ${value.toFixed(3)} В`;
  }

  screen.innerHTML = html;
}

// =======================
// СОБЫТИЯ
// =======================

uc.oninput = update;
modeSelect.onchange = update;

// =======================
// СТАРТ
// =======================

update();
