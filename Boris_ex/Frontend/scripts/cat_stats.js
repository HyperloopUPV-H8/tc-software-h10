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

document.getElementById("petCat").addEventListener("click", () => {
    sendOrder("pet");
});
document.getElementById("hugCat").addEventListener("click", () => {
    sendOrder("hug");
});
document.getElementById("feedCat").addEventListener("click", () => {
    sendOrder("feed");
});
document.getElementById("birthCat").addEventListener("click", () => {
    sendOrder("birth");
});

ws = new WebSocket("ws://localhost:6789");
function sendOrder(order) {
    msg = { id: order };
    ws.send(JSON.stringify(msg));
}
