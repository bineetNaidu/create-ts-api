import { confirm, isCancel, cancel } from '@clack/prompts';

export async function promptInstallDependencies(): Promise<boolean> {
  const shouldInstall = await confirm({
    message: 'Install project dependencies now?',
    initialValue: true,
  });

  if (isCancel(shouldInstall)) {
    cancel('Operation cancelled.');
    process.exit(0);
  }

  return shouldInstall;
}
