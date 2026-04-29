// =======================
// УОС-01 Эмулятор (JS)
// =======================

// --- элементы ---
const fc = document.getElementById("fc");
const fg = document.getElementById("fg");
const uc = document.getElementById("uc");
const modeSelect = document.getElementById("mode");
const screen = document.getElementById("screen");

let detector = 1;

// =======================
// ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ
// =======================

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

// =======================
// ВЫБОР ДЕТЕКТОРА
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

function update() {

  let f_c = +fc.value;
  let f_g = +fg.value;
  let U_c = +uc.value;
  const mode = +modeSelect.value;

  // --- защита от NaN ---
  if (isNaN(f_c)) f_c = 250;
  if (isNaN(f_g)) f_g = 500;
  if (isNaN(U_c)) U_c = 0;

  // --- ограничения ---
  f_c = clamp(f_c, 250, 6500);
  f_g = clamp(f_g, 500, 6500);
  U_c = clamp(U_c, 0, 0.35);

  // --- округление ---
  f_c = Math.round(f_c);
  f_g = Math.round(f_g);
  U_c = +U_c.toFixed(2);

  // --- возвращаем в input ---
  fc.value = f_c;
  fg.value = f_g;
  uc.value = U_c;

  // --- вычисления ---
  const f_if1 = f_g - f_c;
  const f_if2 = f_c - f_g;
  const f_if_abs = Math.abs(f_if1);

  // --- временная модель детекторов ---
  let U_if, U_out;

  if (detector === 1) {
    U_if = U_c * 0.8;
    U_out = U_c * 0.6;
  }
  if (detector === 2) {
    U_if = U_c * 0.5;
    U_out = U_c * 0.4;
  }
  if (detector === 3) {
    U_if = U_c * 0.3;
    U_out = U_c * 0.2;
  }

  // --- отрисовка ---
  render(mode, f_if1, f_if2, f_if_abs, U_if, U_out);
}

// =======================
// ОТРИСОВКА ЭКРАНА
// =======================

function render(mode, f_if1, f_if2, f_if_abs, U_if, U_out) {

  let html = `<b>Детектор:</b> ${detector}<br><br>`;

  if (mode === 1) {
    html += `fп.ч = fг – fс = ${f_if1.toFixed(1)} кГц<br>`;
    html += `Uсигнала выходного = ${U_out.toFixed(3)} В`;
  }

  if (mode === 2) {
    html += `fп.ч = fг – fс = ${f_if1.toFixed(1)} кГц<br>`;
    html += `Uп.ч = ${U_if.toFixed(3)} В`;
  }

  if (mode === 3) {
    html += `fп.ч1 = fг – fс = ${f_if1.toFixed(1)} кГц<br>`;
    html += `fп.ч2 = fс – fг = ${f_if2.toFixed(1)} кГц<br>`;
    html += `Uп.ч = ${U_if.toFixed(3)} В`;
  }

  if (mode === 4) {
    html += `Uп.ч = ${U_if.toFixed(3)} В<br>`;
    html += `Доп. параметр: ...`;
  }

  if (mode === 5) {
    html += `Uп.ч = ${U_if.toFixed(3)} В<br>`;
    html += `Доп. параметр: ...`;
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

// фиксация при потере фокуса
[fc, fg, uc].forEach(el => {
  el.addEventListener("blur", update);
});

// =======================
// СТАРТ
// =======================

update();
