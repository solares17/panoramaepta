const manualsList = document.querySelector(".manuals-list");

if (manualsList) { // Проверка, существует ли контейнер на странице
    manuals.forEach(manual => {
        const card = document.createElement("div");
        card.classList.add("manual-card", "equipment-card"); // Добавляем equipment-card, чтобы подтянулись твои базовые стили (если они есть)

        card.innerHTML = `
            <div class="card-header">
                <div class="equip-info">
                    <h3>${manual.title}</h3>
                </div>
            </div>

            <!-- Этот блок будет скрыт по умолчанию и показан при классе .active -->
            <div class="card-details">
                <p style="margin-bottom: 15px;">${manual.text}</p>
                <a href="${manual.downloadUrl}" download target="_blank" style="display: inline-block; padding: 10px 15px; background: #007bff; color: #fff; text-decoration: none; border-radius: 5px;">
                    Скачать методичку
                </a>
            </div>
        `;

        // Логика раскрытия карточки по клику
        card.addEventListener("click", function(event) {
            // Предотвращаем сворачивание карточки, если пользователь кликнул именно по кнопке "Скачать"
            if(event.target.tagName === 'A') return; 
            
            card.classList.toggle("active");
        });

        manualsList.appendChild(card);
    });
}
