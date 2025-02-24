const eventSource = new EventSource("http://localhost:3000/api/stream");

eventSource.onmessage = function (event) {
    const data = JSON.parse(event.data);
    updateDisplay(data);
};

function updateDisplay(data) {
    document.getElementById("catsPetted").textContent = data.petted;
    document.getElementById("catsHugged").textContent = data.hugged;
    document.getElementById("catsFed").textContent = data.fed;
    document.getElementById("catsBorn").textContent = data.born;
}

function getRandomInRange(min, max) {
    return Math.random() * (max - min) + min;
}

