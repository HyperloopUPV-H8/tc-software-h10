document.addEventListener("DOMContentLoaded", () => {
    const chartLimit = 20; // Maximum number of data points to display

    // --- Chart Setup ---
    function createChart(canvasId, label, borderColor) {
        const ctx = document.getElementById(canvasId).getContext("2d");
        return new Chart(ctx, {
            type: "line",
            data: {
                labels: [],
                datasets: [
                    {
                        label: label,
                        data: [],
                        borderColor: borderColor,
                        fill: false,
                    },
                ],
            },
            options: {
                responsive: true,
                animation: false,
                scales: {
                    x: {
                        display: true,
                        title: { display: true, text: "Time" },
                    },
                    y: { display: true, title: { display: true, text: label } },
                },
            },
        });
    }

    const elevationChart = createChart(
        "elevationChart",
        "Elevation (m)",
        "rgba(255, 99, 132, 1)",
    );
    const velocityChart = createChart(
        "velocityChart",
        "Velocity (km/h)",
        "rgba(54, 162, 235, 1)",
    );
    const voltageChart = createChart(
        "voltageChart",
        "Voltage (V)",
        "rgba(255, 206, 86, 1)",
    );
    const currentChart = createChart(
        "currentChart",
        "Current (A)",
        "rgba(75, 192, 192, 1)",
    );

    function updateChart(chart, newValue) {
        const now = new Date().toLocaleTimeString();
        if (chart.data.labels.length >= chartLimit) {
            chart.data.labels.shift();
            chart.data.datasets[0].data.shift();
        }
        chart.data.labels.push(now);
        chart.data.datasets[0].data.push(newValue);
        chart.update();
    }

    // --- Sensor Data Updates ---
    // Expects sensorData: { elevation, velocity, voltage, current }
    function updateSensorData(sensorData) {
        updateChart(elevationChart, sensorData.elevation);
        updateChart(velocityChart, sensorData.velocity);
        updateChart(voltageChart, sensorData.voltage);
        updateChart(currentChart, sensorData.current);
    }

    // --- Message Logging ---
    function logMessage(message, severity) {
        const logContainer = document.querySelector(".message-log");
        const timestamp = new Date().toLocaleTimeString();
        const newMessage = document.createElement("p");
        newMessage.textContent = `[${timestamp}] ${message}`;
        newMessage.classList.add("msg-" + severity);
        logContainer.appendChild(newMessage);
        logContainer.scrollTop = logContainer.scrollHeight;
    }

    // --- WebSocket Connection ---
    const ws = new WebSocket("ws://localhost:6789");

    ws.onopen = () => {
        console.log("WebSocket connection established");
        logMessage("WebSocket connection established", "info");
    };

    ws.onmessage = (event) => {
        const msg = JSON.parse(event.data);
        if (msg.id === "data" && msg.data) {
            // Data packet: update sensor values (display & charts)
            updateSensorData(msg.data);
        } else if (msg.id === "info") {
            // Info packet: log message with severity.
            if (msg.data && msg.data.trim() !== "") {
                logMessage(`INFO: ${msg.data}`, msg.severity);
            }
        } else {
            console.warn("Received unknown message type:", msg);
        }
    };

    ws.onerror = (error) => {
        console.error("WebSocket error:", error);
    };

    ws.onclose = () => {
        console.log("WebSocket connection closed");
        logMessage("WebSocket connection closed", "warn");
    };

    // --- Orders Section ---
    function sendOrder(orderName) {
        const orderMsg = { id: orderName };
        ws.send(JSON.stringify(orderMsg));
        logMessage(`Order sent: ${orderName}`, "info");
    }

    document
        .getElementById("btnPrecharge")
        .addEventListener("click", () => sendOrder("precharge"));
    document
        .getElementById("btnDischarge")
        .addEventListener("click", () => sendOrder("discharge"));
    document
        .getElementById("btnStartLevitation")
        .addEventListener("click", () => sendOrder("start levitation"));
    document
        .getElementById("btnStopLevitation")
        .addEventListener("click", () => sendOrder("stop levitation"));
    document
        .getElementById("btnStartMotor")
        .addEventListener("click", () => sendOrder("start motor"));
    document
        .getElementById("btnStopMotor")
        .addEventListener("click", () => sendOrder("stop motor"));
});
