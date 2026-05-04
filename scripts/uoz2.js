// =======================
// УОС-02 базовая модель
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
// ДЕТЕКТОРЫ
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
// НАГРУЗКА (multi-select)
// =======================

document.querySelectorAll(".load").forEach(btn => {
  btn.onclick = () => {
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
// ЗАГЛУШКА МОДЕЛИ
// =======================

function calculate(mode, detector, loads, uc, fm) {

  // пока просто имитация
  let Udc = uc * 0.6;
  let Uac = uc * 0.3;

  // влияние детектора
  if (detector === 2) {
    Udc *= 0.8;
    Uac *= 0.7;
  }

  if (detector === 3) {
    Udc *= 1.2;
    Uac *= 1.1;
  }

  // влияние нагрузки
  if (loads.has("R1")) Udc *= 1.1;
  if (loads.has("R2")) Udc *= 0.9;
  if (loads.has("C1")) Uac *= 0.7;
  if (loads.has("C2")) Uac *= 1.2;

  return { Udc, Uac };
}

// =======================
// ОБНОВЛЕНИЕ
// =======================

function update() {

  const f_c = +fc.value;
  const f_g = +fg.value;
  const U_c = +uc.value;
  const Fm = +fm.value;
  const mode = +modeSelect.value;

  const res = calculate(mode, detector, loads, U_c, Fm);

  render(mode, f_c, f_g, U_c, Fm, res);
}

// =======================
// ВЫВОД
// =======================

function render(mode, fc, fg, uc, fm, res) {

  let html = `<b>Детектор:</b> ${detector}<br>`;
  html += `<b>Нагрузка:</b> ${[...loads].join(", ") || "нет"}<br><br>`;

  if (mode <= 3) {
    html += `Uc = ${uc.toFixed(3)} В<br>`;
    html += `U (пост.) = ${res.Udc.toFixed(3)} В`;
  } else {
    html += `Uc = ${uc.toFixed(3)} В<br>`;
    html += `Fm = ${fm} кГц<br>`;
    html += `U~ = ${res.Uac.toFixed(3)} В`;
  }

  screen.innerHTML = html;
}

// =======================
// СОБЫТИЯ
// =======================

fc.oninput = update;
fg.oninput = update;
uc.oninput = update;
fm.oninput = update;
modeSelect.onchange = update;

// =======================
// СТАРТ
// =======================

update();
