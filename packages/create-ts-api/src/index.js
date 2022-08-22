#!/usr/bin/env node

import chalk from 'chalk';
import { execSync } from 'child_process';
import fs from 'fs-extra';
import path from 'path';
import inquirer from 'inquirer';
import simpleGit from 'simple-git';

inquirer
  .prompt([
    {
      name: 'projectName',
      message: 'Name your API project?',
      default: 'api',
    },
    {
      name: 'projectDescription',
      message: 'Describe your API project?',
      default: 'A description of your API project',
    },
    {
      name: 'willUseGit',
      message: 'Do you want to use Git?',
      type: 'confirm',
      default: true,
    },
    {
      name: 'template',
      message: 'Which API templates would you like to use?',
      type: 'list',
      choices: [
        {
          name: 'Main',
          value: 'templates/main',
          checked: true,
        },
        {
          name: 'Main + MongoDb',
          value: 'templates/mongo',
        },
        {
          name: 'Main + PostgreSQL',
          value: 'templates/psql',
        },
        {
          name: 'GraphQL',
          value: 'templates/gql',
        },
        {
          name: 'GraphQL + PostgreSQL',
          value: 'templates/gql-psql',
        },
        {
          name: 'GraphQL + MongoDb',
          value: 'templates/gql-mongo',
        },
      ],
    },
  ])
  .then((answers) => {
    createApp(
      answers.projectName,
      answers.projectDescription,
      answers.template,
      answers.willUseGit
    ).catch((error) => {
      console.log(chalk.red(error.message));
    });
  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
      console.error(chalk.red('Error: ' + error.message));
    } else {
      // Something else went wrong
      console.log(chalk.red(error.message));
    }
  });

function shouldUseYarn() {
  try {
    execSync('yarn --version', { stdio: 'ignore' });
    return true;
  } catch (e) {
    return false;
  }
}

async function createApp(
  projectName,
  projectDescription,
  template,
  willUseGit
) {
  const projectDestination = path.join(process.cwd(), projectName);

  if (fs.existsSync(projectDestination)) {
    console.log(
      chalk.red(`?? The directory ${chalk.green(projectName)} already exists.`)
    );
    process.exit(1);
  }
  console.log();
  console.log(
    `${chalk.green('🚀 Welcome to the')} ${chalk.blue(
      'create-ts-api'
    )} ${chalk.green('CLI')}`
  );
  console.log(`${chalk.green('🎉 This will create a new API project')}`);
  console.log(`${chalk.green('✨ in the current directory')}`);
  console.log(`${chalk.green('❇️  with the name')} ${chalk.blue(projectName)}`);
  console.log(
    `${chalk.green('🔥 using the')} ${chalk.blue(template)} ${chalk.green(
      'template'
    )}`
  );
  console.log();

  fs.mkdirsSync(projectDestination);

  fs.copySync(path.join(__dirname, '..', template), projectName);

  const packageJson = JSON.parse(
    fs.readFileSync(path.join(projectName, 'package.json'))
  );
  packageJson.name = projectName;
  packageJson.description = projectDescription;
  packageJson.author = '<Your Name>';
  fs.writeFileSync(
    path.join(projectName, 'package.json'),
    JSON.stringify(packageJson, null, 2)
  );

  process.chdir(projectDestination);
  console.log(`${chalk.green('🍺  Installing dependencies')}`);

  if (shouldUseYarn()) {
    execSync('yarn install', { stdio: [0, 1, 2] });
  } else {
    execSync('npm install', { stdio: [0, 1, 2] });
  }

  if (willUseGit) {
    const git = simpleGit({
      baseDir: process.chdir(projectDestination),
      binary: 'git',
      maxConcurrentProcesses: 6,
    });
    // create a .gitignore file and add node_modules to it
    fs.writeFileSync(
      path.join(projectDestination, '.gitignore'),
      `
dist
build
node_modules
.env
			`
    );

    console.log();
    console.log(chalk.green('🔄 Initializing git...'));
    await git.init();
    await git.add('.');
    await git.commit(':tada: bootstrapped from create-ts-api');
    console.log(chalk.green('✅ Initialized git!'));
  }

  const runCmd = shouldUseYarn() ? 'yarn dev:ts' : 'npm run dev:ts';

  console.log('');
  console.log(`${chalk.green('🎉 Your new API project is ready!')}`);
  console.log(
    `${chalk.green('🔥 Run')} ${chalk.blue(runCmd)} ${chalk.green(
      'in the'
    )} ${chalk.bgBlue(projectName)} ${chalk.green('directory')}`
  );
  console.log(`${chalk.green('📖 Check the README for available commands')}`);
  console.log(`${chalk.green('🚀 Happy Coding')}`);
  console.log();
}
