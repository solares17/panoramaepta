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

const data = { /* ВСТАВЬ СЮДА СВОЙ ОБЪЕКТ ИЗ ПРОШЛОГО СООБЩЕНИЯ */ };

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

  fc.value = Math.round(f_c);
  fg.value = Math.round(f_g);
  uc.value = U_c.toFixed(3);

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
