const express = require('express');
const path = require('path'); // Importar módulo path
const app = express();
const cors = require("cors");
//settings
app.set('port',process.env.PORT || 3000);

//middlwwares
app.use(express.json());
app.use(cors());

// Store the current hyperloop data in memory
let hyperloopData = {
    elevation: 0,
    velocity: 0,
    voltage: 0,
    current: 0,
}

//Keep track od the current clients 
let clients =[];

function sendEventsToAll(data){
clients.forEach((client)=>{
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
        `Client connected: ${clientId}. Total clients: ${clients.length}`,
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
    const { elevation, velocity, voltage, current } = req.body;

    // Update values only if provided
    if (elevation !== undefined) hyperloopData.elevation = elevation;
    if (velocity !== undefined) hyperloopData.velocity = velocity;
    if (voltage !== undefined) hyperloopData.voltage = voltage;
    if (current !== undefined) hyperloopData.current = current;

    console.log("Received new hyperloop data:", hyperloopData);

    // Send the new data to all connected clients
    sendEventsToAll(hyperloopData);

    res.json({ success: true, data: hyperloopData });
});

//static files
app.use(express.static(path.join(__dirname,'public')));
//rutas



/*app.get('/data/:id', (req, res) => {
    const { id } = req.params;
    res.json({ message: `Datos del recurso ${id}` });
  });*/


// Iniciar el sever

app.listen(app.get('port'), () => {
    console.log(`Servidor ejecutándose en http://localhost:${app.get('port')}`);
});

