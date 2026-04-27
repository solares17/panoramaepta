const power = document.getElementById("power");
const freq = document.getElementById("freq");

const freqDisplay = document.querySelector(".freq-display");
const fieldDisplay = document.querySelector(".field-display");

let attenuator = 0;

document.querySelectorAll(".attenuator button").forEach(btn => {
  btn.onclick = () => {
    attenuator = parseInt(btn.dataset.db);
    update();
  };
});

function calculateField(freq, att) {
  let base = freq * 20;
  let loss = att * 1.5;
  return base - loss;
}

function update() {
  if (!power.checked) {
    fieldDisplay.innerText = "OFF";
    return;
  }

  let f = parseFloat(freq.value);

  freqDisplay.innerText = f.toFixed(2) + " ГГц";

  let field = calculateField(f, attenuator);

  // добавим "реализм"
  field += (Math.random() - 0.5) * 5;

  fieldDisplay.innerText = field.toFixed(1);
}

freq.oninput = update;
power.onchange = update;
