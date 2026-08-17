# Express v5 REST API Starter (TypeScript)

This Express v5 REST API starter was bootstrapped with [`create-ts-api`](https://github.com/bineetNaidu/create-ts-api).

It features a clean **Layered N-Tier Architecture** combined with **Dependency Injection (Constructor Injection)**, **Express v5**, **Pino & pino-http** structured logging, **express-rate-limit** security, **Zod**, **Vitest**, multi-stage **Docker**, and a type-safe Domain Error hierarchy (`BaseAppError`).

---

## 📁 Project Architecture

```text
├── Dockerfile               # Multi-stage production Docker containerization
├── .dockerignore            # Docker build ignore patterns
└── src/
    ├── config/              # Zod-validated environment configuration (PORT, NODE_ENV, etc.)
    ├── controllers/         # Express HTTP controllers (extracts req, calls service, returns res)
    ├── lib/
    │   ├── errors/          # Domain BaseAppError hierarchy (BadRequest, Conflict, NotFound, etc.)
    │   └── logger.ts        # Centralized Pino structured logger
    ├── middleware/          # Schema validation, rate limiting & global error handling
    ├── routes/              # Express Router factories (health.routes.ts, user.routes.ts)
    ├── schemas/             # Zod validation schemas (user.schema.ts)
    ├── services/            # Pure business logic services (decoupled from Express req/res)
    ├── types/               # Shared TypeScript interfaces & types
    ├── test/                # Vitest + Supertest integration test suite
    ├── app.ts               # Express v5 application factory & middleware composition
    └── server.ts            # Server bootstrap & graceful shutdown
```

---

## 🚀 Available Scripts

In the project directory, you can run:

### `npm run dev`

Runs the API in development mode using `tsx watch` for instant hot reloading without manual rebuilds.

### `npm test`

Runs unit & integration tests using **Vitest** and **Supertest**.

### `npm run test:watch`

Launches Vitest in interactive watch mode.

### `npm run build`

Compiles TypeScript code into the production-ready `dist/` directory.

### `npm start`

Executes the compiled JavaScript code from `dist/server.js`.

---

## 🐳 Docker & Containerization

Build and run the multi-stage production Docker image:

```bash
docker build -t express-api .
docker run -p 8080:8080 express-api
```

---

## 🛡️ Built-in Security & Domain Error Handling

- **Pino Structured Logging**: Low-overhead structured logging via `pino` and `pino-http`, with formatted pretty output in development, sensitive header/password redaction, and structured JSON in production.
- **Rate Limiting**: Integrated `express-rate-limit` middleware protecting endpoints against brute-force and DoS attacks with standard `RateLimit-*` headers.
- **Domain Error Handling**: The template implements a structured `BaseAppError` hierarchy in `src/lib/errors/`:
  - `BadRequestError` (`BAD_REQUEST` - 400)
  - `UnauthorizedError` (`UNAUTHORIZED` - 401)
  - `ForbiddenError` (`FORBIDDEN` - 403)
  - `NotFoundError` (`NOT_FOUND` - 404)
  - `ConflictError` (`CONFLICT` - 409)
  - `ValidationError` (`VALIDATION_ERROR` - 422)
  - `InternalError` (`INTERNAL_ERROR` - 500)

### Example Usage in Services:

```ts
import { NotFoundError, ConflictError } from '@/lib/errors/index.js';

export class UserService {
  public async getUser(id: string) {
    const user = await this.findUser(id);
    if (!user) {
      throw new NotFoundError(`User with id "${id}" does not exist`);
    }
    return user;
  }
}
```

---

## ⚙️ Environment Variables

Copy `.env.example` to `.env`:

```env
PORT=8080
NODE_ENV=development
```
