document.addEventListener("DOMContentLoaded", () => {
    // Utility function: returns a random number between min and max
    function getRandomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    // Interval ID to control the generator
    let packetIntervalID = null;

    // Sends a random data packet to the backend with specified ranges:
    // Elevation: 0–30, Velocity: 0–30, Voltage: 0–400, Current: 0–100.
    async function sendRandomData() {
        const payload = {
            elevation: parseFloat(getRandomInRange(0, 30).toFixed(2)),
            velocity: parseFloat(getRandomInRange(0, 30).toFixed(2)),
            voltage: parseFloat(getRandomInRange(0, 400).toFixed(2)),
            current: parseFloat(getRandomInRange(0, 100).toFixed(2)),
        };

        try {
            await fetch("http://localhost:3000/api/data", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });
            // No UI update here—the SSE on the control page will handle new data.
        } catch (error) {
            console.error("Error sending random data:", error);
        }
    }

    // Start sending random data every 100ms
    function startPacketGeneration() {
        if (!packetIntervalID) {
            packetIntervalID = setInterval(sendRandomData, 100);
        }
    }

    // Stop sending random data
    function stopPacketGeneration() {
        if (packetIntervalID) {
            clearInterval(packetIntervalID);
            packetIntervalID = null;
        }
    }

    // Toggle button functionality
    const toggleBtn = document.getElementById("togglePacketBtn");
    toggleBtn.addEventListener("click", () => {
        if (packetIntervalID) {
            stopPacketGeneration();
            toggleBtn.textContent = "Start Packet Generation";
        } else {
            startPacketGeneration();
            toggleBtn.textContent = "Stop Packet Generation";
        }
    });
});
