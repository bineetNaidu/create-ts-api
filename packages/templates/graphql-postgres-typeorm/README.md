# Standalone Apollo GraphQL + PostgreSQL (TypeORM) API (TypeScript)

This GraphQL + PostgreSQL (TypeORM) starter was bootstrapped with [`create-ts-api`](https://github.com/bineetNaidu/create-ts-api).

It features a lightweight, standalone Apollo Server setup powered by **TypeGraphQL**, **TypeORM**, **PostgreSQL**, **Vitest**, **`tsx`**, and a type-safe PostgreSQL error handling layer.

---

## 📁 Project Architecture

```text
src/
├── config/                  # Zod-validated environment configuration (DATABASE_URL, PORT, etc.)
├── lib/
│   ├── db/                  # TypeORM DataSource & PostgreSQL connection helpers
│   └── errors/              # Custom GraphQLError & CatchPostgresErrors middleware
├── modules/                 # Modular domain features
│   ├── Hello/               # Basic hello resolver
│   └── Tweet/               # TypeORM entity, TypeGraphQL resolver, and Vitest test suite
├── types/                   # Global TypeScript types
├── test/                    # Isolated test database setup & Vitest Apollo utilities
└── server.ts                # Server bootstrap & graceful shutdown
```

---

## 🚀 Available Scripts

In the project directory, you can run:

### `npm run dev`

Runs the API in development mode using `tsx watch` for instant hot reloading without manual rebuilds.

### `npm test`

Runs unit & integration tests using **Vitest** against an isolated PostgreSQL test database (`ts_api_test`).

### `npm run test:watch`

Launches Vitest in interactive watch mode.

### `npm run build`

Compiles TypeScript code into the production-ready `dist/` directory.

### `npm start`

Executes the compiled JavaScript code from `dist/server.js`.

---

## 🐳 Docker Compose & Dual Databases

Spin up both local development (`create_ts_api_gql_psql_demo`) and test (`create_ts_api_gql_psql_demo_test`) PostgreSQL databases with a single command:

```bash
docker compose up -d
```

- **Development DB**: `postgres://postgres:postgres@localhost:5432/create_ts_api_gql_psql_demo`
- **Test DB**: `postgres://postgres:postgres@localhost:5432/create_ts_api_gql_psql_demo_test`

---

## 🛡️ Built-in Error Handling & PostgreSQL Normalization

The template includes predefined custom GraphQL error classes and `handlePostgresError` in `src/lib/errors/`:

- `DatabaseError` & `handlePostgresError`: Converts PostgreSQL error codes (`23505` duplicate key, `23503` foreign key violation, `22P02` invalid UUID format) into clean user-facing GraphQL errors.
- `CatchPostgresErrors`: Global TypeGraphQL middleware that automatically wraps all resolver queries/mutations.
- `ValidationError`: For input argument validation failures.
- `NotFoundError`: For missing resources.

---

## ⚙️ Environment Variables

Copy `.env.example` to `.env`:

```env
PORT=8080
NODE_ENV=development
DATABASE_URL=postgres://postgres:postgres@localhost:5432/create_ts_api_gql_psql_demo
```
