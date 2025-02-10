const eventSource = new EventSource("http://localhost:3000/api/stream");

// When a new message arrives, update the display
eventSource.onmessage = function (event) {
    const data = JSON.parse(event.data);
    updateDisplay(data);
};

// Update the display elements with the new data
function updateDisplay(data) {
    document.getElementById("elevationVal").textContent = data.elevation;
    document.getElementById("velocityVal").textContent = data.velocity;
    document.getElementById("voltageVal").textContent = data.voltage;
    document.getElementById("currentVal").textContent = data.current;
}
// --- Random Data Generator Section ---

// Utility function to get a random number in [min, max)
function getRandomInRange(min, max) {
    return Math.random() * (max - min) + min;
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
        randomGeneratorInterval = setInterval(sendRandomData, 200);
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
const elevationBtn = document.getElementById("btn1");
const velocityBtn = document.getElementById("btn2");
const voltageBtn = document.getElementById("btn3");
const currentBtn = document.getElementById("btn4");

elevationBtn.addEventListener("click", () => {
    if (randomGeneratorInterval) {
        stopRandomGenerator();
        elevationBtn.textContent = "Start Elevation";
    } else {
        startRandomGenerator();
        elevationBtn.textContent = "Stop Elevation";
    }
});
velocityBtn.addEventListener("click", () => {
    if (randomGeneratorInterval) {
        stopRandomGenerator();
        velocityBtn.textContent = "Start Velocity";
    } else {
        startRandomGenerator();
        velocityBtn.textContent = "Stop Velocity";
    }
});
voltageBtn.addEventListener("click", () => {
    if (randomGeneratorInterval) {
        stopRandomGenerator();
        voltageBtn.textContent = "Start Voltage";
    } else {
        startRandomGenerator();
        voltageBtn.textContent = "Stop Voltage";
    }
});
currentBtn.addEventListener("click", () => {
    if (randomGeneratorInterval) {
        stopRandomGenerator();
        currentBtn.textContent = "Start Current";
    } else {
        startRandomGenerator();
        currentBtn.textContent = "Stop Current";
    }
});