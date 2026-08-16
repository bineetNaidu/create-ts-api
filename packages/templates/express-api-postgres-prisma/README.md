# Express v5 + PostgreSQL (Prisma ORM) REST API Starter (TypeScript)

This Express v5 + PostgreSQL REST API starter was bootstrapped with [`create-ts-api`](https://github.com/bineetNaidu/create-ts-api).

It features a clean **Layered Architecture** with the **Repository Pattern**, **Express v5**, **Prisma ORM (v7)**, **Vitest**, and a global error handling middleware intercepting native PostgreSQL error codes.

---

## 📁 Project Architecture

```text
prisma/
├── schema.prisma            # Prisma ORM declarative database schema & models
prisma.config.ts             # Prisma v7 configuration (datasource settings)
src/
├── config/                  # Zod-validated environment configuration (DATABASE_URL, PORT, etc.)
├── controllers/             # Express HTTP controllers (TweetController, HealthController)
├── db/                      # Database connectivity layer
│   └── index.ts             # PrismaClient instantiation with pg.Pool and @prisma/adapter-pg
├── lib/
│   └── errors/              # Domain BaseAppError hierarchy (BadRequest, Conflict, NotFound, etc.)
├── middleware/              # Zod schema validation & global error handler middleware
├── repositories/            # Repository Layer (TweetRepository abstracting Prisma queries)
├── routes/                  # Express Router factories (health.routes.ts, tweet.routes.ts)
├── schemas/                 # Zod validation schemas (tweet.schema.ts)
├── services/                # Pure business logic services (TweetService with constructor DI)
├── types/                   # Shared TypeScript interface definitions (tweet.type.ts)
├── test/                    # Isolated PostgreSQL test database setup & Vitest Supertest suite
├── app.ts                   # Express v5 application factory & middleware composition
└── server.ts                # Server bootstrap & graceful process shutdown
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

## 🐳 Docker Compose

Spin up a local development PostgreSQL database (`create_ts_api_express_api_psql_demo`) with a single command:

```bash
docker compose up -d
```

- **Development DB**: `postgres://postgres:postgres@localhost:5432/create_ts_api_express_api_psql_demo`

---

## 🛡️ Built-in Domain Error Handling & PostgreSQL Interceptors

The template implements a structured `BaseAppError` hierarchy in `src/lib/errors/`:

- `errorHandler`: Global Express middleware that intercepts native PostgreSQL / Prisma error codes and converts them into `ConflictError` / `BadRequestError` without manual repository `try/catch` boilerplate.
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
