const container = document.querySelector('.cards');

equipment.forEach(eq => {
    const card = document.createElement('div');
    card.classList.add('card');

    card.innerHTML = `
        <div class="card-header">
            <img src="${eq.img}" class="card-img">
            <div class="card-info">
                <h3>${eq.title}</h3>
                <p>${eq.desc}</p>
            </div>
        </div>

        <div class="card-body">
            <ul>
                ${eq.labs.map(lab =>
                    `<li><a href="${lab.url}">${lab.name}</a></li>`
                ).join("")}
            </ul>
        </div>
    `;

    // скрыть body изначально
    const body = card.querySelector('.card-body');
    body.style.display = "none";

    // обработчик клика по карточке
    card.addEventListener('click', () => {
        body.style.display = body.style.display === "none" ? "block" : "none";
    });

    container.appendChild(card);
});
