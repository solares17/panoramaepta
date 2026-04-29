const fc = document.getElementById("fc");
const fg = document.getElementById("fg");
const uc = document.getElementById("uc");
const modeSelect = document.getElementById("mode");
const screen = document.getElementById("screen");
const modes = {
  1: { show: ["f_if", "U_out"], formula: "fп.ч = fг – fс" },
  2: { show: ["f_if", "U_if"], formula: "fп.ч = fг – fс" },
  3: { show: ["f_if1", "f_if2", "U_if"], formula: "fп.ч = fг – fс / fс – fг" },
  4: { show: ["U_if"] },
  5: { show: ["U_if"] }
};

function getDetector() {
  return document.querySelector('input[name="detector"]:checked').value;
};
function update() {
  const f_c = +fc.value;
  const f_g = +fg.value;
  const U_c = +uc.value;
  const detector = getDetector();
  const f_if1 = f_g - f_c;
  const f_if2 = f_c - f_g;

  // пока временная модель амплитуды
  const U_if = (U_c * 0.8).toFixed(3);
  const U_out = (U_c * 0.6).toFixed(3);

  document.getElementById("fc_val").innerText = f_c + " кГц";
  document.getElementById("fg_val").innerText = f_g + " кГц";
  document.getElementById("uc_val").innerText = U_c + " В";

  render(modeSelect.value, f_if1, f_if2, U_if, U_out,detetor);
}



function render(mode, f_if1, f_if2, U_if, U_out,detector) {
  let html = "";
  
  if (mode == 1) {
    html += `fп.ч = fг – fс = ${f_if1} кГц<br>`;
    html += `Uсигнала выходного = ${U_out} В`;
  }

  if (mode == 2) {
    html += `fп.ч = fг – fс = ${f_if1} кГц<br>`;
    html += `Uп.ч = ${U_if} В`;
  }

  if (mode == 3) {
    html += `fп.ч1 = fг – fс = ${f_if1} кГц<br>`;
    html += `fп.ч2 = fс – fг = ${f_if2} кГц<br>`;
    html += `Uп.ч = ${U_if} В`;
  }

  if (mode == 4) {
    html += `Uп.ч = ${U_if} В`;
  }

  if (mode == 5) {
    html += `Uп.ч = ${U_if} В`;
  }
  let U_if, U_out;

  if (detector == 1) {
    U_if = (U_c * 0.8).toFixed(3);
    U_out = (U_c * 0.6).toFixed(3);
  }

  if (detector == 2) {
    U_if = (U_c * 0.5).toFixed(3);
    U_out = (U_c * 0.4).toFixed(3);
  }

  if (detector == 3) {
    U_if = (U_c * 0.3).toFixed(3);
    U_out = (U_c * 0.2).toFixed(3);
  }


  screen.innerHTML = html;
  html += `Детектор: ${detector}<br><br>`;
}



fc.oninput = update;
fg.oninput = update;
uc.oninput = update;
modeSelect.onchange = update;

update();
