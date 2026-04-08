fetch("/panoramaepta/pages/header.html")
    .then(r => r.text())
    .then(html => document.getElementById("include-header").innerHTML = html);

// ЗАГРУЗКА ФУТЕРА
fetch("/panoramaepta/pages/footer.html")
    .then(r => r.text())
    .then(html => document.getElementById("include-footer").innerHTML = html);
