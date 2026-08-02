import { execSync } from 'node:child_process';
import type { PackageManager } from '@/types/index.js';

/**
 * Detects user's active package manager (pnpm, yarn, bun, or fallback npm).
 */
export function detectPackageManager(): PackageManager {
  const userAgent = process.env.npm_config_user_agent || '';
  if (userAgent.startsWith('pnpm')) return 'pnpm';
  if (userAgent.startsWith('yarn')) return 'yarn';
  if (userAgent.startsWith('bun')) return 'bun';

  try {
    execSync('pnpm --version', { stdio: 'ignore' });
    return 'pnpm';
  } catch {
    try {
      execSync('yarn --version', { stdio: 'ignore' });
      return 'yarn';
    } catch {
      try {
        execSync('bun --version', { stdio: 'ignore' });
        return 'bun';
      } catch {
        return 'npm';
      }
    }
  }
}
