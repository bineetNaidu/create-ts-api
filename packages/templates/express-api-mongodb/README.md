# Express v5 + MongoDB (Mongoose) REST API Starter (TypeScript)

This Express v5 + MongoDB REST API starter was bootstrapped with [`create-ts-api`](https://github.com/bineetNaidu/create-ts-api).

It features a clean **Layered Architecture** with the **Repository Pattern**, **Express v5**, **Mongoose v8**, **Zod**, **Vitest**, **`mongodb-memory-server`**, and a type-safe Domain Error hierarchy (`BaseAppError`).

---

## 📁 Project Architecture

```text
src/
├── config/                  # Zod-validated environment configuration (MONGO_URI, PORT, etc.)
├── controllers/             # Express HTTP controllers (TweetController, HealthController)
├── lib/
│   ├── db/                  # Mongoose connection & disconnection helpers
│   └── errors/              # Domain BaseAppError hierarchy + handleMongoError normalizer
├── middleware/              # Zod schema validation & global error handler middleware
├── models/                  # Mongoose schemas & models (tweet.model.ts)
├── repositories/            # Repository Layer (TweetRepository abstracting Mongoose queries)
├── routes/                  # Express Router factories (health.routes.ts, tweet.routes.ts)
├── schemas/                 # Zod validation schemas (tweet.schema.ts)
├── services/                # Pure business logic services (TweetService with constructor DI)
├── types/                   # Shared TypeScript interface definitions (tweet.type.ts)
├── test/                    # In-memory MongoDB + Supertest integration test suite
├── app.ts                   # Express v5 application factory & middleware composition
└── server.ts                # Server bootstrap with Mongoose connect & graceful shutdown
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

## 🐳 Docker Compose (Local Database)

Spin up a local MongoDB container with a single command:

```bash
docker compose up -d
```

This starts MongoDB 8.3 on port `27017` with a persistent volume (`mongo_data`).

---

## 🛡️ Built-in Domain Error Handling & MongoDB Normalization

The template implements a structured `BaseAppError` hierarchy in `src/lib/errors/`:

- `handleMongoError`: Automatically catches Mongoose `ValidationError`, `CastError` (invalid ObjectId format), and duplicate key error `11000`, transforming them into `ValidationError` / `ConflictError` / `BadRequestError`.
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
MONGO_URI=mongodb://localhost:27017/create_ts_api_express_mongo_demo
```
