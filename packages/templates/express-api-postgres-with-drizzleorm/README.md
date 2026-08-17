# Express v5 + PostgreSQL (Drizzle ORM) REST API Starter (TypeScript)

This Express v5 + PostgreSQL REST API starter was bootstrapped with [`create-ts-api`](https://github.com/bineetNaidu/create-ts-api).

It features a clean **Layered Architecture** with the **Repository Pattern**, **Express v5**, **Drizzle ORM**, **Drizzle Kit**, **Pino & pino-http** structured logging, **express-rate-limit** security, **Vitest**, multi-stage **Docker**, and a global error handling middleware intercepting native PostgreSQL error codes.

---

## 📁 Project Architecture

```text
├── Dockerfile               # Multi-stage production Docker containerization
├── .dockerignore            # Docker build ignore patterns
├── docker-compose.yml       # Local development PostgreSQL service
├── drizzle.config.js        # Drizzle Kit configuration
├── drizzle/                 # Drizzle SQL migration files
└── src/
    ├── config/              # Zod-validated environment configuration (DATABASE_URL, PORT, etc.)
    ├── controllers/         # Express HTTP controllers (TweetController, HealthController)
    ├── db/                  # Drizzle ORM schema table definitions & connection client
    │   ├── schema.ts
    │   └── index.ts
    ├── lib/
    │   ├── errors/          # Domain BaseAppError hierarchy (BadRequest, Conflict, NotFound, etc.)
    │   └── logger.ts        # Centralized Pino structured logger
    ├── middleware/          # Schema validation, rate limiting & global error handling
    ├── repositories/        # Repository Layer (TweetRepository abstracting Drizzle queries)
    ├── routes/              # Express Router factories (health.routes.ts, tweet.routes.ts)
    ├── schemas/             # Zod validation schemas (tweet.schema.ts)
    ├── services/            # Pure business logic services (TweetService with constructor DI)
    ├── types/               # Shared TypeScript interface definitions (tweet.type.ts)
    ├── test/                # Isolated PostgreSQL test database setup & Vitest Supertest suite
    ├── app.ts               # Express v5 application factory & middleware composition
    └── server.ts            # Server bootstrap & graceful process shutdown
```

---

## 🚀 Available Scripts

In the project directory, you can run:

### `npm run dev`

Runs the API in development mode using `tsx watch` for instant hot reloading without manual rebuilds.

### `npm test`

Runs unit & integration tests using **Vitest** against an ephemeral PostgreSQL container powered by **Testcontainers**.

### `npm run test:watch`

Launches Vitest in interactive watch mode.

### `npm run db:generate`

Generates SQL migration files into the `drizzle/` folder based on `src/db/schema.ts`.

### `npm run db:migrate`

Executes pending SQL migrations against the target PostgreSQL database.

### `npm run build`

Compiles TypeScript code into the production-ready `dist/` directory.

### `npm start`

Executes the compiled JavaScript code from `dist/server.js`.

---

## 🐳 Docker & Containerization

### Development Database

Spin up a local development PostgreSQL database (`create_ts_api_express_api_psql_demo`) with Docker Compose:

```bash
docker compose up -d
```

- **Development DB**: `postgres://postgres:postgres@localhost:5432/create_ts_api_express_api_psql_demo`

### Production Docker Image

Build and run the multi-stage production Docker image:

```bash
docker build -t express-api-postgres-with-drizzleorm .
docker run -p 8080:8080 -e DATABASE_URL=postgres://user:pass@host:5432/db express-api-postgres-with-drizzleorm
```

---

## 🛡️ Built-in Security & Domain Error Handling

- **Pino Structured Logging**: Low-overhead structured logging via `pino` and `pino-http`, with formatted pretty output in development, sensitive header/password redaction, and structured JSON in production.
- **Rate Limiting**: Integrated `express-rate-limit` middleware protecting endpoints against brute-force and DoS attacks with standard `RateLimit-*` headers.
- **PostgreSQL Error Interception**: Global Express middleware that intercepts native PostgreSQL error codes (`23505` unique violation, `22P02` invalid UUID format) and converts them into domain errors:
  - `BadRequestError` (`BAD_REQUEST` - 400)
  - `UnauthorizedError` (`UNAUTHORIZED` - 401)
  - `ForbiddenError` (`FORBIDDEN` - 403)
  - `NotFoundError` (`NOT_FOUND` - 404)
  - `ConflictError` (`CONFLICT` - 409)
  - `ValidationError` (`VALIDATION_ERROR` - 422)

---

## ⚙️ Environment Variables

Copy `.env.example` to `.env`:

```env
PORT=8080
NODE_ENV=development
DATABASE_URL=postgres://postgres:postgres@localhost:5432/create_ts_api_express_api_psql_demo
```
