# Routing & Path Traversals

MicroJet uses an optimized, cache-aligned **Radix Tree** structure for path resolution. Instead of checking every route sequentially with regular expressions, it traverses a prefix tree of paths, resolving routes in $O(k)$ time.

---

## Basic Routing

To declare routes, use the standard `@app.route` decorators or register sub-routers:

```python
from microjet import MicroJet

app = MicroJet()

@app.get("/api/v1/health")
async def health_check():
    return {"status": "healthy"}
```

---

## Path Parameters

Declare path variables with bracket notation. MicroJet automatically validates parameters against standard Python type hints:

```python
@app.get("/users/{user_id:int}")
async def get_user(user_id: int):
    return {"user_id": user_id, "scope": "standard"}
```

Supported types include:
- `int` (parses integer parameters)
- `str` (parses plain string parameters)
- `uuid` (parses standard UUID formats)

---

## Nested Routers

For larger microservices, structure your code with modular `Router` objects:

```python
from microjet import Router

# Define user routes
user_router = Router(prefix="/users")

@user_router.get("/{user_id:int}/profile")
async def get_profile(user_id: int):
    return {"user_id": user_id, "avatar": "default.png"}

# Include into main app
app.include_router(user_router)
```
