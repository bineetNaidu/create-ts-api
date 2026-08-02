import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

/**
 * Ensures a .gitignore file exists at projectPath, appending default entries
 * or creating a fresh file without duplicating existing rules.
 */
export async function ensureGitignore(projectPath: string) {
  const gitignorePath = path.join(projectPath, '.gitignore');

  const defaultEntries = [
    // Dependency & Package Manager Directories
    'node_modules/',
    'jspm_packages/',
    'web_modules/',

    // Build & Output Directories
    'dist/',
    'build/',
    'out/',
    '.next/',
    '.nuxt/',
    '.svelte-kit/',
    '.turbo/',

    // Environment & Secret Files
    '.env',
    '.env.local',
    '.env.*.local',
    '*.pem',

    // Logs & Debug Output
    '*.log',
    'npm-debug.log*',
    'yarn-debug.log*',
    'yarn-error.log*',
    'pnpm-debug.log*',

    // Testing & Coverage
    'coverage/',
    '.nyc_output/',
    '.playwright/',

    // Editor & System Files
    '.DS_Store',
    'Thumbs.db',
    '.idea/',
    '*.suo',
    '*.ntvs*',
    '*.njsproj',
    '*.sln',
  ];

  let existingContent = '';

  try {
    // Read current .gitignore if it exists
    existingContent = await readFile(gitignorePath, 'utf8');
  } catch (error) {
    if ((error as any).code !== 'ENOENT') {
      throw error; // Rethrow actual filesystem errors (e.g. permissions)
    }
  }

  // Split existing file into individual lines (trimmed) for checking duplicates
  const existingLines = existingContent.split(/\r?\n/).map((line) => line.trim());

  // Filter out default entries that are already present in the file
  const newEntries = defaultEntries.filter((entry) => !existingLines.includes(entry));

  // If all default entries already exist, no changes needed
  if (newEntries.length === 0) {
    return;
  }

  // Format content: add a newline prefix if appending to non-empty content
  let updateContent = newEntries.join('\n') + '\n';

  if (existingContent.length > 0) {
    const needsLeadingNewline = !existingContent.endsWith('\n');
    updateContent = (needsLeadingNewline ? '\n' : '') + '# Added by build script\n' + updateContent;
  }

  // Write fresh file or append new entries
  await writeFile(gitignorePath, existingContent + updateContent, 'utf8');
}
