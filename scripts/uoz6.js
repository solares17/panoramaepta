document.addEventListener('DOMContentLoaded', () => {
  const screen06 = document.getElementById('screen_06');
  const modeSelect06 = document.getElementById('mode_06');
  const ucInput06 = document.getElementById('uc_06');
  const gGenCheckbox06 = document.getElementById('g_gen_06');
  const porogSelect06 = document.getElementById('porog_06');
  const fnchSelect06 = document.getElementById('fnch_06');
  const kButtons06 = document.querySelectorAll('.det-k-06');

  if (!screen06) return;

  let currentK06 = 1;

  // ==========================================================
  // БАЗА ДАННЫХ СТЕНДА (С учетом ограничений Uпч < 0.166 В)
  // Все значения Uc переведены в милливольты (мВ)
  // ==========================================================
  const uos06_data = {
    // ЗАДАНИЕ 1: Разомкнутая петля
    task1: [
      { uc: 0,     upch: 0.000 },
      { uc: 21.4,  upch: 0.145 },
      { uc: 87.0,  upch: 0.617 },
      { uc: 142.6, upch: 0.968 },
      { uc: 209.8, upch: 1.497 },
      { uc: 249.6, upch: 1.718 },
      { uc: 300.0, upch: 1.920 },
      { uc: 322.9, upch: 2.060 } 
    ],

    // ЗАДАНИЕ 2: Простая АРУ (Порог U0 = 0)
    task2: {
      k1: [
        { uc: 0, upch: 0.000 }, { uc: 30, upch: 0.161 }, { uc: 80, upch: 0.165 },
        { uc: 100, upch: 0.167 }, { uc: 150, upch: 0.170 }, { uc: 200, upch: 0.172 }, 
        { uc: 300, upch: 0.174 }, { uc: 322.9, upch: 0.175 }
      ],
      k2: [
        { uc: 0, upch: 0.000 }, { uc: 30, upch: 0.083 }, { uc: 80, upch: 0.085 },
        { uc: 150, upch: 0.087 }, { uc: 300, upch: 0.090 }, { uc: 322.9, upch: 0.091 }
      ],
      k3: [
        { uc: 0, upch: 0.000 }, { uc: 10, upch: 0.039 }, { uc: 50, upch: 0.041 },
        { uc: 200, upch: 0.042 }, { uc: 300, upch: 0.043 }, { uc: 322.9, upch: 0.043 }
      ]
    },

    // ЗАДАНИЕ 3: АРУ с задержкой (Прогноз с ограничением Uпч < 0.166 В)
    task3: {
      porog_U1: {
        k1: [ { uc: 0, upch: 0 }, { uc: 15, upch: 0.100 }, { uc: 50, upch: 0.145 }, { uc: 100, upch: 0.155 }, { uc: 322.9, upch: 0.162 } ],
        k2: [ { uc: 0, upch: 0 }, { uc: 15, upch: 0.100 }, { uc: 50, upch: 0.082 }, { uc: 100, upch: 0.085 }, { uc: 322.9, upch: 0.089 } ],
        k3: [ { uc: 0, upch: 0 }, { uc: 15, upch: 0.039 }, { uc: 50, upch: 0.040 }, { uc: 100, upch: 0.041 }, { uc: 322.9, upch: 0.042 } ]
      },
      porog_U2: {
        k1: [ { uc: 0, upch: 0 }, { uc: 25, upch: 0.160 }, { uc: 100, upch: 0.163 }, { uc: 200, upch: 0.165 }, { uc: 322.9, upch: 0.166 } ],
        k2: [ { uc: 0, upch: 0 }, { uc: 25, upch: 0.083 }, { uc: 100, upch: 0.086 }, { uc: 200, upch: 0.088 }, { uc: 322.9, upch: 0.090 } ],
        k3: [ { uc: 0, upch: 0 }, { uc: 25, upch: 0.040 }, { uc: 100, upch: 0.041 }, { uc: 200, upch: 0.042 }, { uc: 322.9, upch: 0.043 } ]
      }
    },

    // ЗАДАНИЕ 4: Переходная характеристика (Up для внешнего осциллографа при Uc = 50 мВ)
    task4: {
      fnch1: {
        k1: { upch: 0.164, up: 1.25 },
        k2: { upch: 0.084, up: 2.10 },
        k3: { upch: 0.041, up: 3.45 }
      },
      fnch2: {
        k1: { upch: 0.164, up: 1.21 },
        k2: { upch: 0.084, up: 2.05 },
        k3: { upch: 0.041, up: 3.40 }
      }
    }
  };

  // Функция линейной интерполяции
  function getInterpolatedUpch(targetUc, dataset) {
    if (targetUc <= dataset[0].uc) return dataset[0].upch;
    if (targetUc >= dataset[dataset.length - 1].uc) return dataset[dataset.length - 1].upch;
    
    for (let i = 0; i < dataset.length - 1; i++) {
      if (targetUc >= dataset[i].uc && targetUc <= dataset[i+1].uc) {
        let dx = dataset[i+1].uc - dataset[i].uc;
        let dy = dataset[i+1].upch - dataset[i].upch;
        return dataset[i].upch + (targetUc - dataset[i].uc) * (dy / dx);
      }
    }
    return 0;
  }

  // Обработчик кнопок усиления (К1, К2, К3)
  kButtons06.forEach(btn => {
    btn.addEventListener('click', (e) => {
      kButtons06.forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      currentK06 = parseInt(e.target.getAttribute('data-k'));
      updateScreen06();
    });
  });

  // Привязка событий на изменение инпутов
  [modeSelect06, ucInput06, gGenCheckbox06, porogSelect06, fnchSelect06].forEach(el => {
    el.addEventListener('input', updateScreen06);
    el.addEventListener('change', updateScreen06);
  });

  // Основная функция отрисовки
  function updateScreen06() {
    const mode = modeSelect06.value;
    // Ограничиваем Uc максимумом 322.9 мВ
    let uc = parseFloat(ucInput06.value) || 0;
    if (uc > 322.9) uc = 322.9; 

    const gGen = gGenCheckbox06.checked;
    const porog = parseInt(porogSelect06.value);
    const fnch = parseInt(fnchSelect06.value);
    
    let u_pch = 0;
    let kKey = 'k' + currentK06; 

    if (mode === '1') {
      u_pch = getInterpolatedUpch(uc, uos06_data.task1);
    } 
    else if (mode === '2') {
      u_pch = getInterpolatedUpch(uc, uos06_data.task2[kKey]);
    } 
    else if (mode === '3') {
      if (porog === 0) {
        u_pch = getInterpolatedUpch(uc, uos06_data.task2[kKey]);
      } else {
        let porogKey = porog === 1 ? 'porog_U1' : 'porog_U2';
        u_pch = getInterpolatedUpch(uc, uos06_data.task3[porogKey][kKey]);
      }
    }

    let modLabel = gGen ? ' (АМ)' : '';
    let html = '';

    if (mode === '1' || mode === '2' || mode === '3') {
      let title = '';
      if (mode === '1') title = 'Зад. 1: АЧХ без АРУ';
      if (mode === '2') title = 'Зад. 2: Простая АРУ';
      if (mode === '3') title = 'Зад. 3: АРУ с задержкой';
      
      html = `
        <div style="color:#fff; margin-bottom:5px;">${title}</div>
        <div>Uпч = ${u_pch.toFixed(3)} В ${modLabel}</div>
        <div>Uc  = ${uc.toFixed(1)} мВ</div>
      `;
    } 
    else if (mode === '4') {
      // Для 4 задания фиксируем Uc = 50 мВ для корректного отображения параметров (по методичке)
      let displayUc = 50.0;
      let fnchKey = fnch === 1 ? 'fnch1' : 'fnch2';
      let data = uos06_data.task4[fnchKey][kKey];

      html = `
        <div style="color:#fff; margin-bottom:5px;">Зад. 4: Переходная характеристика</div>
        <div>Uc  = ${displayUc.toFixed(1)} мВ</div>
        <div>Uпч = ${data.upch.toFixed(3)} В ${modLabel}</div>
        <div>Up  = ${data.up.toFixed(2)} В</div>
        <div style="font-size: 0.75em; margin-top:10px; color:#aaa;">
          * Осциллограмма Up зарисовывается на внешнем осциллографе
        </div>
      `;
    }

    screen06.innerHTML = html;
  }

  updateScreen06();
});
