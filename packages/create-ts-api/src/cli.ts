import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { existsSync } from 'node:fs';
import { promisify } from 'node:util';
import { exec } from 'node:child_process';
import { intro, outro, spinner } from '@clack/prompts';
import color from 'picocolors';

import { promptProjectName } from '@/prompts/prompt-project-name.js';
import { promptProjectDescription } from '@/prompts/prompt-project-description.js';
import { promptTemplateSelection } from '@/prompts/prompt-template-selection.js';
import { promptGitInit } from '@/prompts/prompt-git-init.js';
import { promptInstallDependencies } from '@/prompts/prompt-install-dependencies.js';
import { detectPackageManager } from '@/utils/package-manager.js';
import { scaffoldProject } from '@/utils/scaffold-project.js';
import { ensureGitignore } from '@/utils/ensure-gitignore.js';
import { initializeGitRepository } from '@/utils/git-runner.js';

const execAsync = promisify(exec);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Main CLI Prompt Orchestrator
 */
export async function runCli(): Promise<void> {
  console.clear();
  intro(color.bgCyan(color.black(' create-ts-api v2.0.0-alpha.1 ')));

  // 1. Interactive Prompts
  const projectName = await promptProjectName();
  const projectDescription = await promptProjectDescription();
  const template = await promptTemplateSelection();
  const willUseGit = await promptGitInit();
  const shouldInstall = await promptInstallDependencies();

  const progressSpinner = spinner();
  const projectPath = path.join(process.cwd(), projectName);

  // Resolves template path seamlessly both locally in monorepo and when published
  const prodTemplatePath = path.join(__dirname, '..', 'templates', template);
  const devTemplatePath = path.join(__dirname, '../../templates', template);
  const templatePath = existsSync(prodTemplatePath) ? prodTemplatePath : devTemplatePath;

  // Step A: Scaffold template files
  try {
    progressSpinner.start('Scaffolding API project files...');
    await scaffoldProject({ projectName, projectDescription, projectPath, templatePath });
    await ensureGitignore(projectPath);
    progressSpinner.stop('Scaffolded API project files successfully.');
  } catch (error) {
    progressSpinner.stop('Failed to scaffold project files.');
    console.error(error);
    process.exit(1);
  }

  // Step B: Install dependencies
  const packageManager = detectPackageManager();
  if (shouldInstall) {
    progressSpinner.start(`Installing dependencies with ${packageManager}...`);
    try {
      await execAsync(`${packageManager} install`, { cwd: projectPath });
      progressSpinner.stop(`Installed dependencies with ${packageManager}.`);
    } catch {
      progressSpinner.stop(
        `Failed to install dependencies with ${packageManager}. Run "${packageManager} install" manually.`,
      );
    }
  }

  // Step C: Initialize Git repository
  if (willUseGit) {
    progressSpinner.start('Initializing Git repository...');
    try {
      await initializeGitRepository(projectPath);
      progressSpinner.stop('Initialized Git repository successfully.');
    } catch {
      progressSpinner.stop('Failed to initialize Git repository.');
    }
  }

  // Final Outro Instructions
  outro(color.green('🎉 Your new API project is ready!'));
  console.log(`\nNext steps:`);
  console.log(`  ${color.cyan(`cd ${projectName}`)}`);
  if (!shouldInstall) {
    console.log(`  ${color.cyan(`${packageManager} install`)}`);
  }
  console.log(`  ${color.cyan(`${packageManager} run dev`)}\n`);
}
