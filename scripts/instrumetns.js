// Твои данные по оборудованию
const equipmentData = [
    {
        title: "Рупорные антенны",
        img: "/panoramaepta/images/rupor1.jpg", // Замени на свой путь
        desc: "Стенд включает две рупорные антенны, аттенюатор и индикатор напряжённости поля. Применяется для анализа диаграмм направленности и затухания сигнала в пространстве."
    },
    {
        title: "Параболические антенны",
        img: "/panoramaepta/images/parab1.jpg", // Замени на свой путь
        desc: "Зеркально-параболические антенны для исследования характеристик направленности, измерения коэффициента усиления и изучения влияния электромагнитных полей."
    }
    // Сюда можно добавить еще оборудование
];

const galleryContainer = document.getElementById("equipmentGallery");
const modal = document.getElementById("equipModal");
const modalImg = document.getElementById("modalImg");
const modalTitle = document.getElementById("modalTitle");
const modalDesc = document.getElementById("modalDesc");
const closeModal = document.getElementById("closeModal");

// 1. Генерируем карточки галереи
if (galleryContainer) {
    equipmentData.forEach(item => {
        const card = document.createElement("div");
        card.classList.add("gallery-item");
        
        // Карточка состоит только из картинки и затемненного заголовка снизу
        card.innerHTML = `
            <img src="${item.img}" alt="${item.title}">
            <div class="gallery-item-title">${item.title}</div>
        `;

        // 2. Логика клика: заполняем модалку данными и показываем её
        card.addEventListener("click", () => {
            modalImg.src = item.img;
            modalTitle.textContent = item.title;
            modalDesc.textContent = item.desc;
            
            modal.classList.add("active"); // Показываем окно
        });

        galleryContainer.appendChild(card);
    });
}

// 3. Логика закрытия модального окна
// При клике на крестик
closeModal.addEventListener("click", () => {
    modal.classList.remove("active");
});

// При клике на темный фон вокруг окна
modal.addEventListener("click", (event) => {
    if (event.target === modal) {
        modal.classList.remove("active");
    }
});
