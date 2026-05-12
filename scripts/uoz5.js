const uos05Data = {
  task1_ACHH: [
    { fc: 410, U: 0.097 },
    { fc: 457, U: 0.292 },
    { fc: 463, U: 0.302 }, 
    { fc: 465, U: 0.90 },
    { fc: 506, U: 0.124 }
  ],
  f_g0: 458.1,
  task3_NoFilter: {
    K1: { f_z_low: 450, f_z_high: 469, f_u_low: 448, f_u_high: 461 },
    K2: { f_z_low: 449, f_z_high: 461, f_u_low: 451, f_u_high: 459 } 
  },
  task4_Filters: {
    LPF_K1_C1: { f_z_low: 454, f_z_high: 464, f_u_low: 452, f_u_high: 454 },
    LPF_K1_C2: { f_z_low: 450, f_z_high: 468, f_u_low: 452, f_u_high: 454 },
    LPF_K2_C1: { f_z_low: 453, f_z_high: 461, f_u_low: 453, f_u_high: 454 },
    LPF_K2_C2: { f_z_low: 447, f_z_high: 461, f_u_low: 453, f_u_high: 454 },
    
    PIF_K1_C1R1: { f_z_low: 460, f_z_high: 490, f_u_low: 445, f_u_high: 505 },
    PIF_K1_C1R2: { f_z_low: 465, f_z_high: 485, f_u_low: 445, f_u_high: 505 },
    PIF_K2_C1R1: { f_z_low: 465, f_z_high: 485, f_u_low: 455, f_u_high: 495 },
    PIF_K2_C1R2: { f_z_low: 468, f_z_high: 482, f_u_low: 455, f_u_high: 495 }
  },
  task5_Noise: {
    LPF_K1_C1: [
      { Ush: 0.0, f_z_low: 470, f_z_high: 480, f_u_low: 445, f_u_high: 505 },
      { Ush: 0.2, f_z_low: 471, f_z_high: 479, f_u_low: 446, f_u_high: 504 },
      { Ush: 0.4, f_z_low: 472, f_z_high: 478, f_u_low: 448, f_u_high: 502 },
      { Ush: 0.6, f_z_low: 473, f_z_high: 477, f_u_low: 450, f_u_high: 500 },
      { Ush: 0.8, f_z_low: 474, f_z_high: 476, f_u_low: 455, f_u_high: 495 },
      { Ush: 1.0, f_z_low: 475, f_z_high: 475, f_u_low: 460, f_u_high: 490 }
    ]
  }
};


let is_locked = false;
let selected_C = 'C1'; 
let selected_R = 'R1';

const screen = document.getElementById('screen');
const inputs = document.querySelectorAll('input, select');

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

function getU_Sigma(fc) {
    const data = uos05Data.task1_ACHH;
    if (fc <= data[0].fc) return data[0].U;
    if (fc >= data[data.length-1].fc) return data[data.length-1].U;
    
    for (let i = 0; i < data.length - 1; i++) {
        if (fc >= data[i].fc && fc <= data[i+1].fc) {
            let ratio = (fc - data[i].fc) / (data[i+1].fc - data[i].fc);
            return data[i].U + ratio * (data[i+1].U - data[i].U);
        }
    }
    return 0;
}

function update() {
    const fc = parseFloat(document.getElementById('fc').value);
    const uc = parseFloat(document.getElementById('uc').value);
    
    const un_input = document.getElementById('un');
    const un = un_input ? parseFloat(un_input.value) : 0;
    
    const gain_val = document.getElementById('gain').value;
    const gain = (gain_val === "1.5" || gain_val === "K1") ? "K1" : "K2";
    
    const mode = document.getElementById('mode').value;
    const lpf = document.getElementById('lpf_en') && document.getElementById('lpf_en').checked;
    const pif = document.getElementById('pif_en') && document.getElementById('pif_en').checked;
  
    let limits = uos05Data.task3_NoFilter[gain]; 

    if (mode === "5") {
        let noiseData = uos05Data.task5_Noise.LPF_K1_C1; 
        
        limits = noiseData.reduce((prev, curr) => Math.abs(curr.Ush - un) < Math.abs(prev.Ush - un) ? curr : prev);
    } else if (pif) {
        let key = `PIF_${gain}_${selected_C}${selected_R}`;
        if (uos05Data.task4_Filters[key]) limits = uos05Data.task4_Filters[key];
    } else if (lpf) {
        let key = `LPF_${gain}_${selected_C}`;
        if (uos05Data.task4_Filters[key]) limits = uos05Data.task4_Filters[key];
    }
  
    if (!is_locked) {
        if (fc >= limits.f_z_low && fc <= limits.f_z_high) is_locked = true;
    } else {
        if (fc < limits.f_u_low || fc > limits.f_u_high) is_locked = false;
    }

    let display_f_gun = is_locked ? fc : uos05Data.f_g0;

    let output = "";
    switch(mode) {
        case "1":
            let u_sigma = getU_Sigma(fc).toFixed(3);
            output = `ЗАДАНИЕ 1: АЧХ\nFc = ${fc} кГц\nUΣ = ${u_sigma} В`;
            break;
        case "2":
            output = `ЗАДАНИЕ 2: ГУН\nFг = ${uos05Data.f_g0} кГц`;
            break;
        case "3":
        case "4":
            output = `Fc = ${fc} кГц\nFг = ${display_f_gun} кГц`;
            break;
        case "5":
            let ratio = (fc / display_f_gun).toFixed(3);
            output = `Uc = ${uc} В | Uш = ${un} В\nFc = ${fc} кГц | Fc/Fг = ${ratio}`;
            break;
    }

    screen.innerText = output;
}

inputs.forEach(i => i.oninput = update);
inputs.forEach(i => i.onchange = update);

update();
