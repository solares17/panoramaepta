document.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelectorAll(".card");

    cards.forEach(card => {
        const header = card.querySelector(".card-header");
        const body = card.querySelector(".card-body");

        header.addEventListener("click", () => {
            const isOpen = body.style.display === "block";

            // Закрыть все другие
            document.querySelectorAll(".card-body").forEach(b => b.style.display = "none");

            // Открыть текущую, если была закрыта
            if (!isOpen) {
                body.style.display = "block";
            }
        });
    });
});
