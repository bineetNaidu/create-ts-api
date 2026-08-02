import path from 'node:path';
import { existsSync } from 'node:fs';
import { cp as copy, readFile, writeFile } from 'node:fs/promises';
import type { ScaffoldOptions } from '@/types/index.js';

/**
 * Copies starter template files and updates generated package.json fields.
 */
export async function scaffoldProject({
  projectName,
  projectDescription,
  projectPath,
  templatePath,
}: ScaffoldOptions): Promise<void> {
  // 1. Copy template files to destination
  await copy(templatePath, projectPath, { recursive: true });

  // 2. Update package.json name & description
  const pkgJsonPath = path.join(projectPath, 'package.json');
  const pkgJsonPathExist = existsSync(pkgJsonPath);

  if (pkgJsonPathExist) {
    const content = await readFile(pkgJsonPath, 'utf8');
    const pkgJson = JSON.parse(content);

    pkgJson.name = projectName;
    pkgJson.description = projectDescription;

    await writeFile(pkgJsonPath, JSON.stringify(pkgJson, null, 2), 'utf8');
  }
}
