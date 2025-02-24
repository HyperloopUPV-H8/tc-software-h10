document.addEventListener("DOMContentLoaded", () => {
    const chartLimit = 20; // Maximum number of data points to display

    // Helper: Create a Chart.js line chart.
    function createChart(canvasId, label, borderColor) {
        const ctx = document.getElementById(canvasId).getContext("2d");
        return new Chart(ctx, {
            type: "line",
            data: {
                labels: [], // Time labels
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
                    y: {
                        display: true,
                        title: { display: true, text: label },
                    },
                },
            },
        });
    }

    // Create charts for each sensor value.
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

    // Function to update a chart with a new data point.
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

    // Establish an SSE connection to receive sensor data.
    const eventSource = new EventSource("http://localhost:3000/api/stream");
    eventSource.onmessage = (event) => {
        const data = JSON.parse(event.data);
        updateSensorData(data);
        updateChart(elevationChart, data.elevation);
        updateChart(velocityChart, data.velocity);
        updateChart(voltageChart, data.voltage);
        updateChart(currentChart, data.current);
    };

    // Update numeric sensor display.
    function updateSensorData(data) {
        document.getElementById("elevationVal").textContent = data.elevation;
        document.getElementById("velocityVal").textContent = data.velocity;
        document.getElementById("voltageVal").textContent = data.voltage;
        document.getElementById("currentVal").textContent = data.current;
    }
});
