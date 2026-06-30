# Quick Start Guide

Welcome to **MicroJet**! This guide will help you install the framework, write your first high-performance asynchronous API, and run it with the MicroJet compiler.

---

## Installation

MicroJet is distributed as a lightweight, native package via PyPI. Ensure you have Python 3.10 or higher installed:

```bash
pip install microjet
```

To enable fast pre-compilation features with maximum efficiency, you can also install the optional binary compiler extensions:

```bash
pip install microjet[compiler]
```

---

## Your First MicroJet Application

Create a file named `main.py` and write your first MicroJet application. Unlike other frameworks, MicroJet compiles validation decorators directly into bytecode checks for extreme speed.

```python
from typing import Optional
from pydantic import BaseModel, Field
from microjet import MicroJet, Router

# Initialize the core application
app = MicroJet(title="Flight Operations API")
router = Router()

# Define Pydantic request body schemas
class FlightBooking(BaseModel):
    flight_id: str = Field(..., pattern=r"^[A-Z]{2}-\d{3}$")
    passenger_name: str
    seats: int = Field(..., gt=0, le=4)

# Create an asynchronous, validated endpoint
@router.post("/api/bookings")
async def create_booking(booking: FlightBooking):
    return {
        "status": "success",
        "booking_id": "BK-2049",
        "details": {
            "flight_id": booking.flight_id,
            "passenger": booking.passenger_name,
            "seats_reserved": booking.seats,
            "allocated_zone": "A"
        }
    }

# Register the router to our application
app.include_router(router)
```

---

## Running the Application

MicroJet includes an optimized ASGI-compatible CLI tool to boot up server workers instantly:

```bash
# Run with auto-reload for development
microjet dev main:app --port 3000

# Run optimized production workers
microjet run main:app --host 0.0.0.0 --port 3000 --workers 4
```

Now, navigate to `http://localhost:3000/api/bookings` or interact with the virtual terminal in the playground above to simulate live requests!

---

## Why MicroJet?

1. **Bytecode Validation Compilation**: Standard FastAPI translates Pydantic schemas dynamically on every single call. MicroJet compiles schemas directly into flat, memory-aligned bytecode validation instructions.
2. **O(k) Radix Tree Router**: Paths are resolved in uniform logarithmic time matching key length, entirely bypassing iterative regex array traversal.
3. **Zero Heap Allocations**: Reuses connection streams and worker buffers to achieve sub-millisecond response averages.
