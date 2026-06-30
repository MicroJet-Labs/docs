# Introduction to MicroJet

MicroJet is a modern, high-performance, asynchronous web API framework written in Python. It is designed from the ground up to achieve maximum developer productivity while maintaining execution speeds comparable to compiled languages.

---

## Core Philosophy

Traditional Python frameworks like FastAPI, Flask, and Django are highly versatile but introduce considerable routing and validation overhead. MicroJet solves this with three core design pillars:

1. **Static Validation Trees**: By analyzing Pydantic models at startup, MicroJet generates optimized validation functions directly in bytecode, bypassing runtime parsing logic.
2. **Minimal Memory Allocations**: Reuses memory buffers for incoming headers and body payloads to avoid garbage collection spikes.
3. **ASGI-First Execution**: Fully asynchronous, compliant with ASGI v3.0, and compatible with high-performance event loops like `uvloop`.

---

## Features At A Glance

- **Lightning Fast**: Sub-millisecond response times under peak concurrency.
- **Strictly Typed**: Native Pydantic v2 and Python type hinting integration.
- **Radix-Based Router**: Path parameter extraction is handled in $O(k)$ where $k$ is path depth.
- **Embedded Sandbox**: Comes with full dev-mode tooling and interactive playgrounds.
