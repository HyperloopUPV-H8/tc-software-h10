import asyncio
import json
import random
import websockets

# Global flag for simulation
simulation_running = False
connected_clients = set()

async def send_simulation_state():
    """Broadcast simulation state to all clients."""
    if connected_clients:
        message = json.dumps({
            "type": "simulation",
            "statusCode": 200,
            "ok": True,
            "message": "Current simulation state",
            "isSimulationRunning": simulation_running
        })
        await asyncio.gather(*(client.send(message) for client in connected_clients))

async def broadcast(message):
    """Safely send a message to all connected clients."""
    for client in list(connected_clients):
        try:
            await client.send(message)
        except:
            pass

async def handle_client(websocket):
    """Handles communication with a single client."""
    global simulation_running
    connected_clients.add(websocket)  # Track connected clients
    print(f"New client connected ({len(connected_clients)} total).")

    # Send initial state
    await send_simulation_state()

    try:
        # Send initial state
        await send_simulation_state()

        while True:
            try:
                msg = await asyncio.wait_for(websocket.recv(), timeout=0.1)
                command = json.loads(msg).get("command")

                if command == "start":
                    simulation_running = True
                    print("Simulation started")
                    await send_simulation_state()

                elif command == "stop":
                    simulation_running = False
                    print("Simulation stopped")
                    await send_simulation_state()

                elif command == "error":
                    await websocket.send(json.dumps({
                        "type": "error",
                        "statusCode": 500,
                        "ok": False,
                        "error": "Error happened!"
                    }))
                    print("Error on server")

                else:
                    await websocket.send(json.dumps({
                        "type": "message",
                        "statusCode": 200,
                        "ok": True,
                        "message": "Command received"
                    }))

            except asyncio.TimeoutError:
                pass  # No message received, continue loop
            except websockets.exceptions.ConnectionClosed:
                connected_clients.remove(websocket)  # Ensure client is removed
            except Exception as e:
                print("Error processing message:", e)

    except websockets.exceptions.ConnectionClosed:
        print("Client disconnected")
        connected_clients.remove(websocket)  # Ensure client is removed
    except Exception as e:
        print("Error processing message:", e)

async def telemetry_loop():
    """Continuously sends telemetry data to all connected clients if simulation is running."""
    while True:
        if simulation_running and connected_clients:
            telemetry = json.dumps({
                "type": "telemetry",
                "ok": True,
                "statusCode": 200,
                "elevation": round(random.uniform(0, 30), 2),
                "velocity": round(random.uniform(0, 30), 2),
                "voltage": round(random.uniform(0, 400), 2),
                "current": round(random.uniform(0, 100), 2)
            })
            await broadcast(telemetry)  # Use safe broadcast function

        await asyncio.sleep(0.1)  # Control update rate



async def main():
    """Main function to run the WebSocket server."""
    async with websockets.serve(handle_client, "localhost", 6789):
        print("WebSocket server started on ws://localhost:6789")
        await telemetry_loop()  # Run telemetry updates forever

if __name__ == "__main__":
    asyncio.run(main())
