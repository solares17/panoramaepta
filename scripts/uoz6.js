document.addEventListener('DOMContentLoaded', () => {
  // Инициализация элементов УОС-06
  const screen06 = document.getElementById('screen_06');
  const modeSelect06 = document.getElementById('mode_06');
  const ucInput06 = document.getElementById('uc_06');
  const gGenCheckbox06 = document.getElementById('g_gen_06');
  const porogSelect06 = document.getElementById('porog_06');
  const fnchSelect06 = document.getElementById('fnch_06');
  const kButtons06 = document.querySelectorAll('.det-k-06');

  // Если элемента нет на странице, прерываем выполнение (защита от ошибок)
  if (!screen06) return;

  let currentK06 = 1; // По умолчанию выбрано К1

  // Обработчик кнопок усиления (К1, К2, К3)
  kButtons06.forEach(btn => {
    btn.addEventListener('click', (e) => {
      // Убираем класс active у всех кнопок К в УОС-06
      kButtons06.forEach(b => b.classList.remove('active'));
      // Добавляем нажатой
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

  // Основная функция расчета и отрисовки экрана
  function updateScreen06() {
    const mode = modeSelect06.value;
    const uc = parseFloat(ucInput06.value) || 0;
    const gGen = gGenCheckbox06.checked;
    const porog = parseInt(porogSelect06.value);
    
    // Эмуляция физики тракта
    const baseAmp = 50; // Базовый коэффициент
    let u_pch = (uc * baseAmp) / 1000; // В Вольтах
    
    // Эмуляция работы АРУ (Сжатие амплитуды зависит от Порога и Усиления)
    if (mode !== '1') { // В 1 задании АРУ разомкнута (по методичке)
      let threshold = 0; 
      if (porog === 1) threshold = 1.0; 
      if (porog === 2) threshold = 2.5; 
      
      if (u_pch > threshold) {
        // Формула компрессии (чем больше К, тем сильнее работает АРУ)
        let compressionFactor = 1 + (currentK06 * 0.8 * (u_pch - threshold));
        u_pch = threshold + (u_pch - threshold) / compressionFactor;
      }
    }

    // Если включен генератор прямоугольных импульсов
    let modLabel = gGen ? ' (АМ вкл)' : '';
    
    // Форматирование для вывода
    let u_pch_str = u_pch.toFixed(3);
    let uc_str = uc.toFixed(1);
    
    let html = '';

    // Логика вывода на экран в зависимости от задания
    switch (mode) {
      case '1':
        // Задание 1: Uпч, Uc
        html = `
          <div style="color:#fff; margin-bottom:5px;">Задание 1 (АРУ разомкнута)</div>
          <div>Uпч = ${u_pch_str} В ${modLabel}</div>
          <div>Uc  = ${uc_str} мВ</div>
        `;
        break;
      case '2':
        // Задание 2: Uc, Uпч
        html = `
          <div style="color:#fff; margin-bottom:5px;">Задание 2</div>
          <div>Uc  = ${uc_str} мВ</div>
          <div>Uпч = ${u_pch_str} В ${modLabel}</div>
        `;
        break;
      case '3':
        // Задание 3: Uc, Uпч
        html = `
          <div style="color:#fff; margin-bottom:5px;">Задание 3</div>
          <div>Uc  = ${uc_str} мВ</div>
          <div>Uпч = ${u_pch_str} В ${modLabel}</div>
        `;
        break;
      case '4':
        // Задание 4: Uc, Uпч, Uш, Fc, Fc/Fг
        let ush = (Math.random() * 0.05 + 0.02).toFixed(3); // Рандомный шум
        let fc = 520; // Несущая (кГц)
        let fg = 40;  // Частота генератора импульсов (Гц)
        let fcfg = (fc * 1000 / fg).toFixed(0); // Отношение частот

        html = `
          <div style="color:#fff; margin-bottom:5px;">Задание 4 (Динамика)</div>
          <div>Uc    = ${uc_str} мВ</div>
          <div>Uпч   = ${u_pch_str} В ${modLabel}</div>
          <div>Uш    = ${ush} В</div>
          <div>Fc    = ${fc} кГц</div>
          <div>Fc/Fг = ${fcfg}</div>
        `;
        break;
    }

    screen06.innerHTML = html;
  }

  // Запуск отрисовки при загрузке страницы
  updateScreen06();
});
