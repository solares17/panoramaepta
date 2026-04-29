const fc = document.getElementById("fc");
const fg = document.getElementById("fg");
const uc = document.getElementById("uc");
const screen = document.getElementById("screen");

let detector = 1;

// выбор детектора
document.querySelectorAll(".det").forEach(btn => {
  btn.onclick = () => {
    document.querySelectorAll(".det").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    detector = btn.dataset.det;
    update();
  };
});

function update() {
  const f_c = +fc.value;
  const f_g = +fg.value;
  const U_c = +uc.value;

  const f_if = Math.abs(f_g - f_c);

  let U_if, U_out;

  if (detector == 1) {
    U_if = U_c * 0.8;
    U_out = U_c * 0.6;
  }
  if (detector == 2) {
    U_if = U_c * 0.5;
    U_out = U_c * 0.4;
  }
  if (detector == 3) {
    U_if = U_c * 0.3;
    U_out = U_c * 0.2;
  }

  screen.innerHTML = `
    Детектор: ${detector}<br><br>
    fп.ч = ${f_if.toFixed(1)} кГц<br>
    Uп.ч = ${U_if.toFixed(3)} В<br>
    Uвых = ${U_out.toFixed(3)} В
  `;
}

// события
fc.oninput = update;
fg.oninput = update;
uc.oninput = update;

update();
