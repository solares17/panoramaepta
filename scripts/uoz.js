const fc = document.getElementById("fc");
const fg = document.getElementById("fg");
const uc = document.getElementById("uc");
const modeSelect = document.getElementById("mode");
const screen = document.getElementById("screen");

let detector = 1;

// 🔘 выбор детектора
document.querySelectorAll(".det").forEach(btn => {
  btn.onclick = () => {
    document.querySelectorAll(".det").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    detector = +btn.dataset.det;
    update();
  };
});

// 🔄 основная функция
function update() {
  const f_c = +fc.value;
  const f_g = +fg.value;
  const U_c = +uc.value;
  const mode = +modeSelect.value;

  const f_if1 = f_g - f_c;
  const f_if2 = f_c - f_g;

  // пока заглушка под детекторы
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

  render(mode, f_if1, f_if2, U_if, U_out);
}

// 🖥️ отображение (вот тут вся логика работ)
function render(mode, f_if1, f_if2, U_if, U_out) {

  let html = `Детектор: ${detector}<br><br>`;

  switch (mode) {

    case 1:
      html += `fп.ч = fг – fс = ${f_if1.toFixed(1)} кГц<br>`;
      html += `Uсигнала выходного = ${U_out.toFixed(3)} В`;
      break;

    case 2:
      html += `fп.ч = fг – fс = ${f_if1.toFixed(1)} кГц<br>`;
      html += `Uп.ч = ${U_if.toFixed(3)} В`;
      break;

    case 3:
      html += `fп.ч1 = fг – fс = ${f_if1.toFixed(1)} кГц<br>`;
      html += `fп.ч2 = fс – fг = ${f_if2.toFixed(1)} кГц<br>`;
      html += `Uп.ч = ${U_if.toFixed(3)} В`;
      break;

    case 4:
      html += `Uп.ч = ${U_if.toFixed(3)} В<br>`;
      html += `(доп. логика будет позже)`;
      break;

    case 5:
      html += `Uп.ч = ${U_if.toFixed(3)} В<br>`;
      html += `(доп. логика будет позже)`;
      break;
  }

  screen.innerHTML = html;
}

// 🎛️ события
fc.oninput = update;
fg.oninput = update;
uc.oninput = update;
modeSelect.onchange = update;

// старт
update();
