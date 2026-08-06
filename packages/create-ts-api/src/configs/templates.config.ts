import type { TemplateOption } from '@/types/index.js';

export const TEMPLATE_OPTIONS: TemplateOption[] = [
  {
    label: '🌐 REST API — Express Standard',
    value: 'express-api',
    hint: 'Express, Zod validation, Vitest, Layered N-Tier Architecture',
  },
  {
    label: '🍃 REST API — Express + MongoDB (Mongoose)',
    value: 'express-api-mongodb',
    hint: 'Express, Mongoose, Zod, Vitest, In-Memory MongoDB tests',
  },
  {
    label: '🌧️ REST API — Express + PostgreSQL (Drizzle ORM)',
    value: 'express-api-postgres-with-drizzleorm',
    hint: 'Express, Drizzle ORM, Drizzle Kit, Zod, Vitest, Docker',
  },
  {
    label: '📐 GraphQL API — Apollo Server Standard',
    value: 'gql',
    hint: 'Apollo Server, TypeGraphQL, tsx, Vitest integration tests',
  },
  {
    label: '🍃 GraphQL API — Apollo Server + MongoDB (Typegoose)',
    value: 'gql-mongo',
    hint: 'Apollo Server, TypeGraphQL, Typegoose, Mongoose, In-Memory DB for tests',
  },
  {
    label: '🐘 GraphQL API — Apollo Server + PostgreSQL (TypeORM)',
    value: 'graphql-postgres-typeorm',
    hint: 'Apollo Server, TypeGraphQL, TypeORM, PostgreSQL, Docker setup',
  },
];
