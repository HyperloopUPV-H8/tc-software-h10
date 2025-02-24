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

app.get("/api/stream", (req, res) => {
    res.set({
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
    });
    res.flushHeaders();
    res.write(":\n\n");

    flag = true;
    const clientId = 0;
    while (flag) {
        clientId = int(Math.random() * 1000000);
        const newClient = { id: clientId, res };
        if (clients.includes(newClient)) {
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
        catData.petted += req.body.petted;
    } else if (req.headers["cat-hugged"]) {
        catData.hugged += req.body.hugged;
    } else if (req.headers["cat-fed"]) {
        catData.fed += req.body.fed;
    } else if (req.headers["cat-born"]) {
        catData.born += req.body.born;
    }
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