const manuals = [
    {
        title: "Методическое пособие: Рупорные антенны",
        img: "/panoramaepta/images/rupor1.jpg",
        text: "В данной методичке описаны основные принципы работы рупорных антенн, порядок выполнения лабораторных работ и контрольные вопросы для подготовки.",
        downloadUrl: "/panoramaepta/data/uos1.docx" // Укажи правильный путь к файлу
    },
    {
        title: "Методическое пособие: Параболические антенны",
        img: "/panoramaepta/images/rupor1.jpg",
        text: "Подробное руководство по изучению зеркально-параболических антенн. Включает теоретическую базу, формулы для расчета и практические задания.",
        downloadUrl: "/panoramaepta/data/uos2.docx" // Укажи правильный путь к файлу
    },
  {
        title: "Методическое пособие: Параболические антенны",
      img: "/panoramaepta/images/rupor1.jpg",
        text: "Подробное руководство по изучению зеркально-параболических антенн. Включает теоретическую базу, формулы для расчета и практические задания.",
        downloadUrl: "/panoramaepta/data/uos4.docx" // Укажи правильный путь к файлу
    },
  {
        title: "Методическое пособие: Параболические антенны",
      img: "/panoramaepta/images/rupor1.jpg",
        text: "Подробное руководство по изучению зеркально-параболических антенн. Включает теоретическую базу, формулы для расчета и практические задания.",
        downloadUrl: "/panoramaepta/data/uos3.docx" // Укажи правильный путь к файлу
    },
];

const manualsList = document.querySelector(".manuals-list");

if (manualsList) {
    manuals.forEach(manual => {
        const card = document.createElement("div");
        card.classList.add("manual-card");

        // Обрати внимание на тег <img> и класс .download-btn
        card.innerHTML = `
            <div class="card-header">
                <img src="${manual.img}" class="equip-img" alt="${manual.title}">
                <div class="equip-info">
                    <h3>${manual.title}</h3>
                </div>
            </div>

            <div class="card-details">
                <p>${manual.text}</p>
                <a href="${manual.downloadUrl}" download target="_blank" class="download-btn">
                    Скачать PDF методичку
                </a>
            </div>
        `;

        card.addEventListener("click", function(event) {
            if(event.target.tagName === 'A') return; 
            card.classList.toggle("active");
        });

        manualsList.appendChild(card);
    });
}
