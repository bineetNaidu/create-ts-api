<div align="center">
  <h1>create-ts-api</h1>
  <p><b>Monorepo for create-ts-api CLI & enterprise-grade Node.js TypeScript API templates.</b></p>

  <p>
    <a href="https://www.npmjs.com/package/create-ts-api"><img src="https://img.shields.io/npm/v/create-ts-api.svg?color=blue&style=flat-square" alt="npm version"></a>
    <a href="https://www.npmjs.com/package/create-ts-api"><img src="https://img.shields.io/npm/dm/create-ts-api.svg?color=blue&style=flat-square" alt="npm downloads"></a>
    <a href="https://node.js.org"><img src="https://img.shields.io/node/v/create-ts-api.svg?style=flat-square" alt="node version"></a>
    <a href="https://github.com/bineetNaidu/create-ts-api"><img src="https://img.shields.io/npm/l/create-ts-api.svg?color=green&style=flat-square" alt="license"></a>
  </p>

<sub>Maintained with ❤️ by <a href="https://x.com/nobineetnaidu">Bineet Naidu</a></sub>
</div>

---

## 🚀 Quick Start

To bootstrap a new TypeScript API project in your terminal:

```bash
npx create-ts-api
```

---

## 📁 Repository Monorepo Structure

This repository is managed as an **NPM Workspaces** monorepo containing the CLI tool package and starter templates:

```text
create-ts-api/
├── packages/
│   ├── create-ts-api/                       # Official CLI tool package (published to npm)
│   └── templates/                           # Production-ready starter templates
│       ├── express-api/                     # Express v5 REST API (Layered Architecture, BaseAppError)
│       ├── express-api-mongodb/             # Express v5 + Mongoose v8 REST API (In-Memory Mongo tests)
│       ├── express-api-postgres-with-drizzleorm/ # Express v5 + PostgreSQL (Drizzle ORM & Drizzle Kit)
│       ├── gql/                             # Apollo Server v5 + TypeGraphQL v2 GraphQL API
│       ├── gql-mongo/                       # Apollo Server v5 + TypeGraphQL + Typegoose v12 + Mongoose v8
│       └── graphql-postgres-typeorm/        # Apollo Server v5 + TypeGraphQL + TypeORM v0.3+ + PostgreSQL
```

---

## 🛠️ Monorepo Development Scripts

Run these scripts from the repository root:

```bash
# Run oxlint linting across all packages and templates
npm run lint

# Auto-fix lint errors
npm run lint:fix

# Check formatting across all files with oxfmt
npm run fmt:check

# Format all files with oxfmt (2 spaces, single quotes)
npm run fmt

# Run Vitest test suites across all templates
npm test
```

---

## 🤝 Contributing

Contributions are always welcome! Check out our [Contributing Guide](CONTRIBUTING.md) to get started with local monorepo setup.

Please adhere to our [Code of Conduct](CODE_OF_CONDUCT.md).

---

## 👤 Author

- **Bineet Naidu** - [@nobineetnaidu](https://x.com/nobineetnaidu) • [GitHub](https://github.com/bineetNaidu)

---

## 📄 License

This project is licensed under the [MIT License](https://github.com/bineetNaidu/create-ts-api).
