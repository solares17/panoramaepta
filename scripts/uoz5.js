const screen = document.getElementById('screen');
const inputs = document.querySelectorAll('input, select');

// Константы из методички
const F_GUN_0 = 475; // Свободная частота ГУН (кГц)
let current_f_gun = F_GUN_0;
let is_locked = false;

// Состояние кнопок
let selected_C = 'C1'; 
let selected_R = 'R1';

document.querySelectorAll('.cap').forEach(btn => {
    btn.onclick = () => {
        document.querySelectorAll('.cap').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        selected_C = btn.dataset.cap;
        update();
    };
});

document.querySelectorAll('.res').forEach(btn => {
    btn.onclick = () => {
        document.querySelectorAll('.res').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        selected_R = btn.dataset.res;
        update();
    };
});

function update() {
    const fc = parseFloat(document.getElementById('fc').value);
    const uc = parseFloat(document.getElementById('uc').value);
    const un = parseFloat(document.getElementById('un').value);
    const gain = parseFloat(document.getElementById('gain').value);
    const mode = document.getElementById('mode').value;
    const lpf = document.getElementById('lpf_en').checked;
    const pif = document.getElementById('pif_en').checked;

    // Расчет базовых полос (упрощенная модель по методичке)
    // Полоса удержания зависит от усиления K
    let delta_f_hold = 20 * gain; 
    // Полоса захвата сужается при включении ФНЧ
    let delta_f_capture = delta_f_hold * 0.6;

    if (lpf) {
        // C1 (22нФ) сужает полосу сильнее чем C2 (2нФ)
        delta_f_capture *= (selected_C === 'C1' ? 0.3 : 0.7);
    }
    if (pif) {
        // ПИФ дает полосу захвата шире чем обычный ФНЧ
        delta_f_capture *= 1.4;
    }
    
    // Влияние шума: шум сужает полосу захвата
    delta_f_capture /= (1 + un * 0.5);

    // Логика захвата
    const diff = Math.abs(fc - current_f_gun);
    
    if (!is_locked) {
        if (diff < delta_f_capture / 2) is_locked = true;
    } else {
        if (diff > delta_f_hold / 2) is_locked = false;
    }

    current_f_gun = is_locked ? fc : F_GUN_0;

    // Вывод на экран согласно ТЗ
    let output = "";
    switch(mode) {
        case "1":
            output = `СИГНАЛ: Fc = ${fc} кГц, Uc = ${uc} В`;
            break;
        case "2":
            output = `ГУН: Свободная частота Fг = ${F_GUN_0} кГц\nТЕКУЩАЯ: ${current_f_gun.toFixed(2)} кГц`;
            break;
        case "3":
        case "4":
            output = `Fc = ${fc} кГц | Fг = ${current_f_gun.toFixed(2)} кГц\nСТАТУС: ${is_locked ? "ЗАХВАТ" : "БИЕНИЯ"}`;
            break;
        case "5":
            const ratio = (fc / current_f_gun).toFixed(4);
            output = `Uc = ${uc} В | Uш = ${un} В\nFc = ${fc} кГц | Fc/Fг = ${ratio}`;
            break;
    }

    screen.innerText = output;
}

inputs.forEach(i => i.oninput = update);
update();
