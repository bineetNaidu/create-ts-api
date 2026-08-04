# Standalone Apollo GraphQL + MongoDB API (TypeScript)

This GraphQL + MongoDB starter was bootstrapped with [`create-ts-api`](https://github.com/bineetNaidu/create-ts-api).

It features a lightweight, standalone Apollo Server setup powered by **TypeGraphQL**, **Typegoose**, **Mongoose**, **Vitest**, **`mongodb-memory-server`**, **`tsx`**, and a type-safe MongoDB error handling layer.

---

## 📁 Project Architecture

```text
src/
├── config/                  # Zod-validated environment configuration (MONGO_URI, PORT, etc.)
├── lib/
│   ├── db/                  # Mongoose connection & disconnection helpers
│   └── errors/              # Custom GraphQLError & DatabaseError handler
├── modules/                 # Modular domain features
│   ├── Hello/               # Basic hello resolver
│   └── Tweet/               # Typegoose model, TypeGraphQL resolver, and Vitest test suite
├── types/                   # Global TypeScript types
├── test/                    # In-memory MongoDB + Apollo Server test utilities
└── server.ts                # Server bootstrap & graceful shutdown
```

---

## 🚀 Available Scripts

In the project directory, you can run:

### `npm run dev`

Runs the API in development mode using `tsx watch` for instant hot reloading without manual rebuilds.

### `npm test`

Runs unit & integration tests using **Vitest** and an in-memory MongoDB instance (**`mongodb-memory-server`**).

### `npm run test:watch`

Launches Vitest in interactive watch mode.

### `npm run build`

Compiles TypeScript code into the production-ready `dist/` directory.

### `npm start`

Executes the compiled JavaScript code from `dist/server.js`.

---

## 🛡️ Built-in Error Handling & MongoDB Normalization

The template includes predefined custom GraphQL error classes and `handleMongoError` in `src/lib/errors/`:

- `DatabaseError` & `handleMongoError`: Converts MongoDB CastErrors (invalid ID), Duplicate Key errors (code 11000), and validation errors into clean user-facing GraphQL errors.
- `ValidationError`: For input argument validation failures.
- `NotFoundError`: For missing resources.

---

## 🐳 Docker Compose (Local Database)

Spin up a local MongoDB database container with a single command:

```bash
docker compose up -d
```

This starts MongoDB on port `27017` with a persistent volume (`mongo_data`).

---

## ⚙️ Environment Variables

Copy `.env.example` to `.env`:

```env
PORT=8080
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/create_ts_api_gql_mongo_demo
```
