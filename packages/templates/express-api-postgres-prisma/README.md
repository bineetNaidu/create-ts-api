# Express v5 + PostgreSQL (Prisma ORM) REST API Starter (TypeScript)

This Express v5 + PostgreSQL REST API starter was bootstrapped with [`create-ts-api`](https://github.com/bineetNaidu/create-ts-api).

It features a clean **Layered Architecture** with the **Repository Pattern**, **Express v5**, **Prisma ORM (v7)**, **Pino & pino-http** structured logging, **express-rate-limit** security, **Vitest**, multi-stage **Docker**, and a global error handling middleware intercepting Prisma ORM exception codes.

---

## 📁 Project Architecture

```text
├── Dockerfile               # Multi-stage production Docker containerization
├── .dockerignore            # Docker build ignore patterns
├── docker-compose.yml       # Local development PostgreSQL service
├── prisma/
│   └── schema.prisma        # Prisma ORM declarative database schema & models
├── prisma.config.ts         # Prisma v7 configuration (datasource settings)
└── src/
    ├── config/              # Zod-validated environment configuration (DATABASE_URL, PORT, etc.)
    ├── controllers/         # Express HTTP controllers (TweetController, HealthController)
    ├── db/                  # Database connectivity layer (PrismaClient with @prisma/adapter-pg)
    ├── lib/
    │   ├── errors/          # Domain BaseAppError hierarchy (BadRequest, Conflict, NotFound, etc.)
    │   └── logger.ts        # Centralized Pino structured logger
    ├── middleware/          # Schema validation, rate limiting & global error handling
    ├── repositories/        # Repository Layer (TweetRepository abstracting Prisma queries)
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

Runs unit & integration tests using **Vitest** against an ephemeral PostgreSQL container powered by **Testcontainers**. The test suite automatically pushes the Prisma schema to the isolated test database before running.

### `npm run test:watch`

Launches Vitest in interactive watch mode.

### `npm run db:generate`

Generates the Prisma Client inside `node_modules/@prisma/client` based on your `prisma/schema.prisma` definitions.

### `npm run db:push`

Pushes the state of your Prisma schema to your target database, ensuring the schema matches the code. Great for rapid prototyping and development.

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
docker build -t express-api-postgres-prisma .
docker run -p 8080:8080 -e DATABASE_URL=postgres://user:pass@host:5432/db express-api-postgres-prisma
```

---

## 🛡️ Built-in Security & Error Handling

- **Pino Structured Logging**: Low-overhead structured logging via `pino` and `pino-http`, with formatted pretty output in development and JSON in production.
- **Rate Limiting**: Integrated `express-rate-limit` middleware protecting against brute-force and DoS attacks with standard `RateLimit-*` headers.
- **Domain Error Handling**: Global Express middleware that intercepts domain `BaseAppError` and Prisma ORM errors (`P2002` Unique Constraint, `P2025` Not Found, `P2003` Foreign Key, `P2023` Type Mismatch) without repository `try/catch` boilerplate:
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
