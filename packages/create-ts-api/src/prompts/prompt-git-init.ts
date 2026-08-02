import { confirm, isCancel, cancel } from '@clack/prompts';

export async function promptGitInit(): Promise<boolean> {
  const willUseGit = await confirm({
    message: 'Initialize a new Git repository?',
    initialValue: true,
  });

  if (isCancel(willUseGit)) {
    cancel('Operation cancelled.');
    process.exit(0);
  }

  return willUseGit;
}
