import type { TemplateOption } from '@/types/index.js';

export const TEMPLATE_OPTIONS: TemplateOption[] = [
  {
    label: '⚡ Express REST API',
    value: 'express-api',
    hint: 'Express v5, Zod, Vitest, Layered N-Tier Architecture',
  },
  {
    label: '🍃 Express REST API + MongoDB',
    value: 'express-api-mongodb',
    hint: 'Express v5, Mongoose, Zod, Vitest, In-Memory Mongo tests',
  },
  {
    label: '🐘 Express REST API + PostgreSQL',
    value: 'express-api-postgres-with-drizzleorm',
    hint: 'Express v5, Drizzle ORM, Drizzle Kit, Zod, Vitest',
  },
  {
    label: '🚀 GraphQL API',
    value: 'gql',
    hint: 'Apollo Server v5, TypeGraphQL, tsx, Vitest',
  },
  {
    label: '🍃 GraphQL API + MongoDB',
    value: 'gql-mongo',
    hint: 'Apollo Server v5, TypeGraphQL, Typegoose, Mongoose',
  },
  {
    label: '🐘 GraphQL API + PostgreSQL',
    value: 'graphql-postgres-typeorm',
    hint: 'Apollo Server v5, TypeGraphQL, TypeORM, PostgreSQL',
  },
];
