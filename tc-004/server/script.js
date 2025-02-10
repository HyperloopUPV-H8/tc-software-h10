const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 3000;

// Use JSON middleware and CORS for cross-origin requests
app.use(express.json());
app.use(cors());

// Store the current hyperloop data in memory
let hyperloopData = {
        elevation: 0,
        velocity: 0,
        voltage: 0,
        current: 0,
        age: 0,
};

// Keep track of connected SSE clients
let clients = [];

// Function to send an SSE event to all connected clients
function sendEventToAllClients(data) {
        clients.forEach((client) => {
                client.res.write(`data: ${JSON.stringify(data)}\n\n`);
        });
}

// SSE endpoint: clients connect here to receive data updates
app.get("/api/stream", (req, res) => {
        // Set headers for SSE
        res.set({
                "Content-Type": "text/event-stream",
                "Cache-Control": "no-cache",
                Connection: "keep-alive",
        });
        res.flushHeaders(); // immediately send headers

        // Send a comment to keep the connection alive
        res.write(":\n\n");

        // Create a new client object with a unique id
        const clientId = Date.now();
        const newClient = { id: clientId, res };
        clients.push(newClient);

        console.log(
                `Client connected: ${clientId}. Total clients: ${clients.length}`
        );

        // Remove client when connection closes
        req.on("close", () => {
                console.log(`Client disconnected: ${clientId}`);
                clients = clients.filter((client) => client.id !== clientId);
        });
});

// GET endpoint (optional fallback) to retrieve current data
app.get("/api/data", (req, res) => {
        res.json(hyperloopData);
});

// POST endpoint to update hyperloop data and push new data to SSE clients
app.post("/api/data", (req, res) => {
        const { elevation, velocity, voltage, current, age } = req.body;

        // Update values only if provided
        if (elevation) hyperloopData.elevation = elevation;
        if (velocity) hyperloopData.velocity = velocity;
        if (voltage) hyperloopData.voltage = voltage;
        if (current) hyperloopData.current = current;
        if (age) hyperloopData.age = age;

        console.log("Received new hyperloop data:", hyperloopData);

        // Send the new data to all connected clients
        sendEventToAllClients(hyperloopData);

        res.json({ success: true, data: hyperloopData });
});

app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
});
