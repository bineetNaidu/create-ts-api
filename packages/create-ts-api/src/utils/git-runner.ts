import { simpleGit } from 'simple-git';

/**
 * Initializes a clean Git repository in the generated project directory.
 */
export async function initializeGitRepository(projectPath: string): Promise<void> {
  const git = simpleGit({ baseDir: projectPath });
  await git.init();
  await git.add('.');
  await git.commit('🎉 Initialized from create-ts-api');
}
