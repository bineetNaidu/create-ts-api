import { text, isCancel, cancel } from '@clack/prompts';
import { existsSync, readdirSync } from 'node:fs';
import path from 'node:path';

export async function promptProjectName(): Promise<string> {
  const projectName = await text({
    message: 'What is the name of your API project?',
    placeholder: 'my-ts-api',
    defaultValue: 'my-ts-api',
    validate(value) {
      const trimmed = value!.trim();
      if (!/^([a-z0-9-_]+)$/i.test(trimmed)) {
        return 'Project name must contain only letters, numbers, hyphens, and underscores.';
      }
      const targetDir = path.join(process.cwd(), trimmed);
      if (existsSync(targetDir) && readdirSync(targetDir).length > 0) {
        return `Target directory "${trimmed}" already exists and is not empty.`;
      }
    },
  });

  if (isCancel(projectName)) {
    cancel('Operation cancelled.');
    process.exit(0);
  }

  return (projectName as string).trim();
}
