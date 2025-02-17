document.addEventListener("DOMContentLoaded", () => {
    // Open a WebSocket connection to the Python server.
    const ws = new WebSocket("ws://localhost:6789");

    ws.onopen = () => {
        console.log("WebSocket connection established");
    };

    ws.onerror = (error) => {
        console.error("WebSocket error:", error);
    };

    ws.onclose = () => {
        console.log("WebSocket connection closed");
    };

    // Track simulation state locally.
    let simulationActive = false;

    // Get the toggle button.
    const toggleBtn = document.getElementById("togglePacketBtn");

    // When the button is clicked, send the appropriate command via WebSocket.
    toggleBtn.addEventListener("click", () => {
        if (!simulationActive) {
            // Send a "start" command.
            ws.send(JSON.stringify({ command: "start" }));
            simulationActive = true;
            toggleBtn.textContent = "Stop Packet Generation";
            console.log("Sent start command to server");
        } else {
            // Send a "stop" command.
            ws.send(JSON.stringify({ command: "stop" }));
            simulationActive = false;
            toggleBtn.textContent = "Start Packet Generation";
            console.log("Sent stop command to server");
        }
    });
});
