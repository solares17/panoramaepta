const list = document.querySelector(".equipment-list");

equipment.forEach(eq => {
    const card = document.createElement("div");
    card.classList.add("equipment-card");

    card.innerHTML = `
        <div class="card-header">
            <img src="${eq.img}" class="equip-img">
            <div class="equip-info">
                <h3>${eq.title}</h3>
                <p>${eq.desc}</p>
            </div>
        </div>

        <div class="card-details">
            <ul>
                ${eq.labs.map(l =>
                    `<li><a href="${l.url}" target="_blank">${l.name}</a></li>`
                ).join("")}
            </ul>
        </div>
    `;

    // При клике — раскрытие/сворачивание
    card.addEventListener("click", () => {
        card.classList.toggle("active");
    });

    list.appendChild(card);
});
