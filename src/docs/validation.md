# Request & Schema Validation

MicroJet is built hand-in-hand with **Pydantic v2**, the fastest data validation library for Python. Schema validation is compiled on application startup to ensure minimal latency during requests.

---

## Validating Body Payloads

Simply declare a subclass of `pydantic.BaseModel` and use it as a type hint in your route arguments:

```python
from pydantic import BaseModel, EmailStr
from microjet import MicroJet

app = MicroJet()

class UserRegister(BaseModel):
    username: str
    email: EmailStr
    age: int

@app.post("/api/register")
async def register_user(payload: UserRegister):
    # Payload is guaranteed to be validated here
    return {"registered": payload.username}
```

---

## Query Parameters

Query parameters are defined as standard function arguments. You can assign default values or use Pydantic fields to validate them:

```python
@app.get("/items")
async def list_items(
    limit: int = 10,
    search: str = ""
):
    return {"limit": limit, "search": search}
```

---

## Automatic Error Responses

When validation fails, MicroJet returns a structured, RFC-compliant JSON response with a `422 Unprocessable Entity` status code:

```json
{
  "error": "validation_failed",
  "detail": [
    {
      "loc": ["body", "email"],
      "msg": "value is not a valid email address",
      "type": "value_error.email"
    }
  ]
}
```
