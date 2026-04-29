let signalOn = false;
let currentLoad = "R1";

// кнопка сигнала
document.getElementById("toggleSignal").onclick = function () {
    signalOn = !signalOn;
    this.classList.toggle("active");
    this.textContent = signalOn ? "Выключить" : "Включить";
    calculate();
};

// выбор нагрузки
function setLoad(load) {
    currentLoad = load;

    ["R1","R2","C1","C2"].forEach(id=>{
        document.getElementById(id).classList.remove("active");
    });

    document.getElementById(load).classList.add("active");
    calculate();
}

// обработка изменений
document.querySelectorAll("input, select").forEach(el=>{
    el.addEventListener("input", calculate);
});

function calculate() {

    let freq = parseFloat(document.getElementById("freq").value);
    let amp = parseFloat(document.getElementById("amp").value);
    let detector = document.getElementById("detector").value;
    let task = document.getElementById("task").value;

    if (!signalOn) {
        update(0,0);
        return;
    }

    // коэффициенты
    let kDet = {
        diode: 0.8,
        sync: 1.0,
        env: 0.9
    }[detector];

    let kLoad = {
        R1: 1.0,
        R2: 0.7,
        C1: 1.2,
        C2: 0.9
    }[currentLoad];

    let base = amp * 1000 * kDet * kLoad;

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
