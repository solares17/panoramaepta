
fetch("..pages/header.html")
    .then(resp => resp.text())
    .then(data => document.getElementById("include-header").innerHTML = data);

// Подключение footer
fetch("..pages/footer.html")
    .then(resp => resp.text())
    .then(data => document.getElementById("include-footer").innerHTML = data);
