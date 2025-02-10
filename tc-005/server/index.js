const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 3000;

// Middleware to parse JSON and allow CORS (for cross-origin requests)
app.use(express.json());
app.use(cors());

// In-memory storage for hyperloop sensor data
let hyperloopData = {
    elevation: 0,
    velocity: 0,
    voltage: 0,
    current: 0,
};

// Keep track of connected SSE clients
let clients = [];

// Function to push the latest data to all SSE-connected clients
function sendEventToAllClients(data) {
    clients.forEach((client) => {
        client.res.write(`data: ${JSON.stringify(data)}\n\n`);
    });
}

// SSE endpoint: clients connect here to receive sensor data updates
app.get("/api/stream", (req, res) => {
    res.set({
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
    });
    res.flushHeaders(); // Immediately send headers

    // Send a keep-alive comment
    res.write(":\n\n");

    const clientId = Date.now();
    const newClient = { id: clientId, res };
    clients.push(newClient);
    console.log(
        `Client connected: ${clientId}. Total clients: ${clients.length}`,
    );

    // When the client disconnects, remove them from the list
    req.on("close", () => {
        console.log(`Client disconnected: ${clientId}`);
        clients = clients.filter((client) => client.id !== clientId);
    });
});

// GET endpoint (optional) to return the current sensor data
app.get("/api/data", (req, res) => {
    res.json(hyperloopData);
});

// POST endpoint to update sensor data and push it to all connected SSE clients
app.post("/api/data", (req, res) => {
    const { elevation, velocity, voltage, current } = req.body;

    if (elevation !== undefined) hyperloopData.elevation = elevation;
    if (velocity !== undefined) hyperloopData.velocity = velocity;
    if (voltage !== undefined) hyperloopData.voltage = voltage;
    if (current !== undefined) hyperloopData.current = current;

    console.log("Received new hyperloop data:", hyperloopData);
    sendEventToAllClients(hyperloopData);
    res.json({ success: true, data: hyperloopData });
});

// NEW: POST endpoint to receive control commands from the control panel
app.post("/api/command", (req, res) => {
    const { command } = req.body;
    console.log("Received command:", command);
    // Here you could add logic to adjust the vehicle's state or trigger actions.
    // For now, we simply acknowledge the command.
    res.json({ success: true, command });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
