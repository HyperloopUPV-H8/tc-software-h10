import asyncio
import json
import websockets
import random

# Global flag for simulation
simulation_running = False

async def send_data(websocket):
    global simulation_running
    print("New client connected. Simulation is OFF by default.")
    while True:
        # Check for incoming command messages (non-blocking)
        try:
            msg = await asyncio.wait_for(websocket.recv(), timeout=0.1)
            try:
                command = json.loads(msg)
                if command.get("command") == "start":
                    simulation_running = True
                    print("Simulation started")
                elif command.get("command") == "stop":
                    simulation_running = False
                    print("Simulation stopped")
            except Exception as e:
                print("Error processing message:", e)
        except asyncio.TimeoutError:
            # No message received; continue
            pass

        # If simulation is running, generate and send random data packet.
        if simulation_running:
            data = {
                "id": "packet",  # Packet id remains constant.
                "elevation": round(random.uniform(0, 30), 2),
                "velocity": round(random.uniform(0, 30), 2),
                "voltage": round(random.uniform(0, 400), 2),
                "current": round(random.uniform(0, 100), 2),
            }
            await websocket.send(json.dumps(data))
            await asyncio.sleep(0.025)
            data = {
                "id": "info",  # Packet id remains constant.
                "severity": "safe",
                "data": "test"
            }
            await asyncio.sleep(0.025)
            data = {
                "id": "info",  # Packet id remains constant.
                "severity": "warn",
                "data": "test"
            }
            await asyncio.sleep(0.025)
            data = {
                "id": "info",  # Packet id remains constant.
                "severity": "fault",
                "data": "test"
            }
        await asyncio.sleep(0.025)  # Adjust update frequency as needed

async def main():
    async with websockets.serve(send_data, "localhost", 6789):
        print("WebSocket server started on ws://localhost:6789")
        await asyncio.Future()  # Run forever

if __name__ == "__main__":
    asyncio.run(main())
