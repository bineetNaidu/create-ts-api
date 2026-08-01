# Standalone Apollo GraphQL API (TypeScript)

This GraphQL API starter was bootstrapped with [`create-ts-api`](https://github.com/bineetNaidu/create-ts-api).

It features a lightweight, standalone Apollo Server setup powered by **TypeGraphQL**, **Vitest**, **`tsx`**, and a type-safe custom error handling layer.

---

## 📁 Project Architecture

```text
src/
├── config/                  # Zod-validated environment configuration
├── lib/
│   └── errors/              # Custom GraphQLError classes (ValidationError, NotFoundError, etc.)
├── modules/                 # Modular GraphQL feature domains
│   └── Hello/               # Example GraphQL resolver & test suite
├── types/                   # TypeScript global type definitions & extensions
├── server.ts                # Standalone Apollo Server bootstrap & graceful shutdown
└── test/                    # In-memory Apollo test client utilities
```

---

## 🚀 Available Scripts

In the project directory, you can run:

### `npm run dev`

Runs the API in development mode using `tsx watch` for instant hot reloading without manual rebuilds.
By default, the server runs at [http://localhost:8080](http://localhost:8080) (or the port specified in `.env`).

### `npm test`

Runs unit and integration tests once using **Vitest**.

### `npm run test:watch`

Launches the Vitest test runner in interactive watch mode.

### `npm run build`

Compiles TypeScript code into the production-ready `dist/` directory.

### `npm start`

Executes the compiled JavaScript code from `dist/server.js` in production mode.

---

## 🛡️ Built-in Custom Error Handling

The template includes predefined custom `GraphQLError` classes located in `src/lib/errors/`:

- `ValidationError`: For input argument validation failures (`BAD_USER_INPUT` / status `400`).
- `NotFoundError`: For missing entities or resources (`NOT_FOUND` / status `404`).
- `UnauthorizedError`: For missing/invalid authentication (`UNAUTHORIZED` / status `401`).
- `ForbiddenError`: For insufficient permissions (`FORBIDDEN` / status `403`).

### Example Usage in Resolvers:

```ts
import { ValidationError } from '@/lib/errors/ValidationError.js';

@Resolver()
export class UserResolver {
  @Query(() => User)
  async user(@Arg("id") id: string) {
    if (!id) {
      throw new ValidationError("User ID is required");
    }
    // ...
  }
}
```

---

## ⚙️ Environment Variables

Copy `.env.example` to `.env` to configure your environment:

```env
PORT=8080
NODE_ENV=development
```
