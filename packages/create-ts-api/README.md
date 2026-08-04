<div align="center">
  <h1>create-ts-api</h1>
  <p><b>Interactive CLI tool to instantly bootstrap production-ready TypeScript Node.js APIs.</b></p>

  <p>
    <a href="https://www.npmjs.com/package/create-ts-api"><img src="https://img.shields.io/npm/v/create-ts-api.svg?color=blue&style=flat-square" alt="npm version"></a>
    <a href="https://www.npmjs.com/package/create-ts-api"><img src="https://img.shields.io/npm/dm/create-ts-api.svg?color=blue&style=flat-square" alt="npm downloads"></a>
    <a href="https://node.js.org"><img src="https://img.shields.io/node/v/create-ts-api.svg?style=flat-square" alt="node version"></a>
    <a href="https://github.com/bineetNaidu/create-ts-api"><img src="https://img.shields.io/npm/l/create-ts-api.svg?color=green&style=flat-square" alt="license"></a>
  </p>

<sub>Built with ❤️ for TypeScript developers by <a href="https://x.com/nobineetnaidu">Bineet Naidu</a></sub>
</div>

---

## ⚡ Quick Start

To start the interactive CLI prompt:

```bash
npx create-ts-api
```

---

## 📋 Interactive Setup Workflow

When you run `npx create-ts-api`, the CLI walks you through an interactive sequence powered by `@clack/prompts`:

1. **Project Name**: Choose your project folder name (validates directory existence and character formatting).
2. **Project Description**: Set a custom description for your generated `package.json`.
3. **Template Architecture Selection**: Pick your target API architecture from 6 modern starter options.
4. **Git Initialization**: Choose whether to initialize a new Git repository.
5. **Dependency Installation**: Choose whether to automatically install dependencies using your active package manager (`npm`, `pnpm`, `yarn`, or `bun`).

---

## 🛠️ Starter Templates

`create-ts-api` comes with 6 starter templates:

### ⚡ REST API Templates (Express v5)

- **`Express REST API`** (`express-api`): Express v5 REST API featuring a Layered N-Tier Architecture (Controllers, Services, Repositories), Constructor Dependency Injection, Zod validation, `BaseAppError` domain error hierarchy, and Vitest unit & integration tests.
- **`Express REST API + MongoDB`** (`express-api-mongodb`): Express v5 + Mongoose v8 REST API with a Tweet CRUD domain, Docker Compose setup, and in-memory MongoDB (`mongodb-memory-server`) Vitest integration test suite.
- **`Express REST API + PostgreSQL`** (`express-api-postgres-with-drizzleorm`): Express v5 + PostgreSQL (Drizzle ORM & Drizzle Kit) REST API with Docker Compose, dual DB setup (dev & test), and global PostgreSQL native error interceptors.

### 🚀 GraphQL API Templates (Apollo Server v5)

- **`GraphQL API`** (`gql`): Standalone Apollo Server v5 + TypeGraphQL v2 GraphQL API with `tsx` hot reloading and Vitest integration tests.
- **`GraphQL API + MongoDB`** (`gql-mongo`): Apollo Server v5 + TypeGraphQL + Typegoose v12 + Mongoose v8 with global `CatchMongoErrors` middleware and in-memory test runner.
- **`GraphQL API + PostgreSQL`** (`graphql-postgres-typeorm`): Apollo Server v5 + TypeGraphQL + TypeORM v0.3+ + PostgreSQL with Docker Compose dual DBs and `CatchPostgresErrors` global error interceptor.

---

## 💻 Package Manager Auto-Detection

The CLI automatically detects which package manager invoked the process (`npm`, `pnpm`, `yarn`, or `bun`) via environment context and system availability, installing dependencies and outputting matching next-step commands automatically.

---

## 🤝 Contributing

Contributions are welcome! Check out our [Contributing Guide](https://github.com/bineetNaidu/create-ts-api/blob/release/v2/CONTRIBUTING.md) to get started.

Please adhere to our [Code of Conduct](https://github.com/bineetNaidu/create-ts-api/blob/release/v2/CODE_OF_CONDUCT.md).

---

## 👤 Author

- **Bineet Naidu** - [@nobineetnaidu](https://x.com/nobineetnaidu) • [GitHub](https://github.com/bineetNaidu)

---

## 📄 License

This project is licensed under the [MIT License](https://github.com/bineetNaidu/create-ts-api).
