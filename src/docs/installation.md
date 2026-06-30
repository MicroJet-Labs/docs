# Installation Guide

Setting up MicroJet is quick and easy. This guide covers basic installation, compiling with binary extensions, and setting up your development environment.

---

## Prerequisites

- **Python**: v3.10, v3.11, or v3.12 (standard CPython or PyPy).
- **Operating System**: Linux, macOS, or Windows (WSL2 recommended for optimal socket performance).

---

## Basic Installation

Install the core framework from PyPI:

```bash
pip install microjet
```

To verify the installation was successful, run the CLI helper:

```bash
microjet --version
```

---

## Advanced Installation (Binary Compiler)

For extreme performance, you can compile request paths and schema validations directly to C-extensions on your machine using the optional compilation compiler:

```bash
pip install microjet[compiler]
```

This installs:
- `uvloop` (for ultra-fast event loops on UNIX)
- `orjson` (for high-speed JSON serialization)
- `pydantic-core` native wrappers

---

## Docker Deployment

To build a production-ready container, use this optimized multi-stage `Dockerfile`:

```dockerfile
FROM python:3.11-slim as builder

WORKDIR /app
RUN pip install --no-cache-dir microjet[compiler]

COPY . /app
CMD ["microjet", "run", "main:app", "--host", "0.0.0.0", "--port", "3000"]
```
