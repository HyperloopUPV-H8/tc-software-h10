const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

// Use JSON middleware and CORS for cross-origin requests
app.use(express.json());
app.use(cors());

// Store the current data in memory
let catData = {
    petted: 0,
    hugged: 0,
    fed: 0,
    born: 0
};

let clients = [];

function sendEventToAllClients(data) {
    clients.forEach((client) => {
        client.res.write(`data: ${JSON.stringify(data)}\n\n`);
    });
}

// Add a route to handle requests to the root URL
app.get("/", (req, res) => {
    res.send("Welcome to the Cat Interaction API!");
});

app.get("/api/stream", (req, res) => {
    res.set({
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
    });
    res.flushHeaders();
    res.write(":\n\n");

    let flag = true;
    let clientId;
    while (flag) {
        clientId = Math.floor(Math.random() * 1000000);
        const newClient = { id: clientId, res };
        if (clients.some(client => client.id === clientId)) {
            flag = true;
        } else {
            clients.push(newClient);
            flag = false;
        }
    }
    console.log(
        `Client connected: ${clientId}. Total clients: ${clients.length}`,
    );

    req.on("close", () => {
        console.log(`Client disconnected: ${clientId}`);
        clients = clients.filter((client) => client.id !== clientId);
    });
});

app.get("/api/data", (req, res) => {
    if (req.headers["cat-petted"]) {
        catData.petted += parseInt(req.headers["cat-petted"], 10);
    } else if (req.headers["cat-hugged"]) {
        catData.hugged += parseInt(req.headers["cat-hugged"], 10);
    } else if (req.headers["cat-fed"]) {
        catData.fed += parseInt(req.headers["cat-fed"], 10);
    } else if (req.headers["cat-born"]) {
        catData.born += parseInt(req.headers["cat-born"], 10);
    }
    res.json(catData);
});

app.post("/api/data", (req, res) => {
    const { petted, hugged, fed, born } = req.body;

    if (petted !== undefined) catData.petted = petted;
    if (hugged !== undefined) catData.hugged = hugged;
    if (fed !== undefined) catData.fed = fed;
    if (born !== undefined) catData.born = born;

    sendEventToAllClients(catData);
    res.json(catData);
});

app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`);
});