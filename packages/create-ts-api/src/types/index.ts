export type PackageManager = 'npm' | 'pnpm' | 'yarn' | 'bun';

export type TemplateId =
  | 'express-api'
  | 'express-api-mongodb'
  | 'express-api-postgres-with-drizzleorm'
  | 'gql'
  | 'gql-mongo'
  | 'graphql-postgres-typeorm';

export interface TemplateOption {
  label: string;
  value: TemplateId;
  hint: string;
}

export interface UserAnswers {
  projectName: string;
  projectDescription: string;
  template: TemplateId;
  willUseGit: boolean;
  shouldInstallDependencies: boolean;
}

export interface ScaffoldOptions {
  projectName: string;
  projectDescription: string;
  projectPath: string;
  templatePath: string;
}
