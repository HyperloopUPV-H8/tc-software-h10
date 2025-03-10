# Data Packets

The websocket connection is on address `ws://localhost:6789`

**The orders are:**

- precharge
- discharge
- start levitation
- stop levitation
- start motor
- stop motor

The order of orders is:

precharge > start levitation > start motor > stop motor > stop levitation > discharge

### Data packet

```json
{
    "id": "data",
    "data": {
        "elevation": number,
        "velocity": number,
        "voltage": number,
        "current": number
    }
}
```

### Info packet

```json
{
    "id": "info",
    "severity": "<info|warn|fault>",
    "data": "message text"
}
```

### Order packet

```json
{
    "id": "<order_name>"
}
