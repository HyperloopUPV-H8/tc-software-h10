// --- SSE: Receive new data packets ---

// Connect to the SSE stream from the backend
const eventSource = new EventSource("http://localhost:3000/api/stream");

// When a new message arrives, update the display
eventSource.onmessage = function (event) {
        const data = JSON.parse(event.data);
        updateDisplay(data);
};

// Update the display elements with the new data
function updateDisplay(data) {
        document.getElementById("elevationVal").textContent = data.elevation;

        // Display velocity
        document.getElementById("velocityVal").textContent = data.velocity;
        document.getElementById(
                "speedbox-score"
        ).style.transform = `rotate(${normalizeSpeed(data.velocity)}deg)`;
        document.getElementById("speed__value").textContent = data.velocity;

        document.getElementById("voltageVal").textContent = data.voltage;
        document.getElementById("currentVal").textContent = data.current;
        document.getElementById("currentAge").textContent = data.age;
}

// --- Random Data Generator Section ---

// Utility function to get a random number in [min, max)
function getRandomInRange(min, max) {
        return Math.random() * (max - min) + min;
}

function normalizeSpeed(value) {
        return (value / 300) * 180 - 45;
}

// Variable to hold the interval ID for the random data generator
let randomGeneratorInterval = null;

// Sends a random data packet to the backend via POST
async function sendRandomData() {
        const payload = {
                elevation: parseFloat(getRandomInRange(0, 100).toFixed(2)), // 0 to 100 m
                velocity: parseFloat(getRandomInRange(0, 300).toFixed(2)), // 0 to 300 km/h
                voltage: parseFloat(getRandomInRange(0, 600).toFixed(2)), // 0 to 600 V
                current: parseFloat(getRandomInRange(0, 100).toFixed(2)), // 0 to 100 A
                age: parseInt(getRandomInRange(10, 100)),
        };

        try {
                await fetch("http://localhost:3000/api/data", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(payload),
                });
        } catch (error) {
                console.error("Error sending random data:", error);
        }
}

// Start sending random data every 100ms
function startRandomGenerator() {
        if (!randomGeneratorInterval) {
                randomGeneratorInterval = setInterval(sendRandomData, 100);
        }
}

// Stop sending random data
function stopRandomGenerator() {
        if (randomGeneratorInterval) {
                clearInterval(randomGeneratorInterval);
                randomGeneratorInterval = null;
        }
}

// --- Toggle Button for Random Data Generator ---
const toggleBtn = document.getElementById("toggleGeneratorBtn");
toggleBtn.addEventListener("click", () => {
        if (randomGeneratorInterval) {
                stopRandomGenerator();
                toggleBtn.textContent = "Start Random Generator";
        } else {
                startRandomGenerator();
                toggleBtn.textContent = "Stop Random Generator";
        }
});
