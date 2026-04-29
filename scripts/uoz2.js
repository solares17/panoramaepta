let signalOn = false;

// кнопка сигнала
document.getElementById("toggleSignal").onclick = function () {
    signalOn = !signalOn;
    this.classList.toggle("active");
    this.textContent = signalOn ? "Выключить" : "Включить";
    calculate();
};

// слушатели
document.querySelectorAll("input, select").forEach(el=>{
    el.addEventListener("input", calculate);
});

// расчёт
function calculate() {

    let freq = parseFloat(document.getElementById("freq").value);
    let sigAmp = parseFloat(document.getElementById("sigAmp").value);
    let hetAmp = parseFloat(document.getElementById("amp").value);
    let detector = document.getElementById("detector").value;
    let task = document.getElementById("task").value;

    if (!signalOn) {
        update(0,0);
        return;
    }

    // детектор
    let kDet = {
        diode: 0.8,
        sync: 1.0,
        env: 0.9
    }[detector];

    // нагрузка (множественная!)
    let kLoad = 1;

    if (document.getElementById("R1").checked) kLoad *= 1.0;
    if (document.getElementById("R2").checked) kLoad *= 0.7;
    if (document.getElementById("C1").checked) kLoad *= 1.2;
    if (document.getElementById("C2").checked) kLoad *= 0.9;

    // базовый уровень
    let base = sigAmp * hetAmp * 1000 * kDet * kLoad;

    let U = 0;
    let Uc = 0;

    if (task === "1" || task === "2" || task === "3") {
        U = base * (freq / 10000);
        Uc = base * 0.5;
    }

    update(U, Uc);
}

// вывод
function update(U, Uc) {
    document.getElementById("U").textContent = Math.round(U);
    document.getElementById("Uc").textContent = Math.round(Uc);
}
