# Contributing to create-ts-api

First off, thank you for considering contributing to `create-ts-api`! It's contributions like yours that make this project a great tool for the TypeScript ecosystem.

---

## 🛠️ Local Development Setup

`create-ts-api` is structured as a monorepo using **NPM Workspaces**.

### Prerequisites

- **Node.js**: `v20.0.0` or higher
- **NPM**: `v10.0.0` or higher
- **Docker** (optional, for testing PostgreSQL template databases locally)

### 1. Clone the repository

```bash
git clone https://github.com/bineetNaidu/create-ts-api.git
cd create-ts-api
```

### 2. Install workspace dependencies

```bash
npm install
```

### 3. Build & Test the CLI locally

Navigate to `packages/create-ts-api` and run `tsx` or `tsup`:

```bash
cd packages/create-ts-api

# Run CLI interactively in watch/dev mode
npx tsx src/index.ts

# Build CLI package executable
npm run build
```

---

## 🧪 Testing & Code Quality Standard

We enforce strict formatting and linting rules across all packages and starter templates using **OXC tooling** (`oxfmt` & `oxlint`).

Before submitting a PR, verify that all checks pass:

```bash
# Run oxlint across all workspaces
npm run lint

# Check code formatting with oxfmt
npm run fmt:check

# Run Vitest test suites across templates
npm test
```

> [!TIP]
> Husky pre-commit hooks automatically run `oxfmt` and `oxlint` checks on staged files during `git commit`.

---

## 🌿 Branching & Commit Guidelines

- **Branch Naming**: Use descriptive prefixes: `feat/`, `fix/`, `docs/`, `refactor/`.
- **Commit Messages**: Follow [Conventional Commits](https://www.conventionalcommits.org/):
  - `feat(cli): add support for custom template flags`
  - `fix(template-express-api): resolve path resolution error`
  - `docs(readme): update quickstart guide`

---

## 🔀 Submitting a Pull Request

1. Fork the repository and create your feature branch from `release/v2`.
2. Make your changes and write unit/integration tests where applicable.
3. Ensure `npm run lint` and `npm test` pass with 0 errors.
4. Push to your fork and submit a Pull Request targeting the `release/v2` branch.
5. Provide a clear PR description detailing the problem solved and test evidence.

---

## 📜 Code of Conduct

Please note that this project is released with a [Contributor Code of Conduct](CODE_OF_CONDUCT.md). By participating in this project, you agree to abide by its terms.
