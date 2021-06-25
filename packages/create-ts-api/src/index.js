#!/usr/bin/env node

const commander = require('commander');
const chalk = require('chalk');
const execSync = require('child_process').execSync;
const packageJson = require('../package.json');
const fs = require('fs-extra');
const path = require('path');

let projectName;

const program = new commander.Command(packageJson.name)
  .version(packageJson.version)
  .arguments('<project-directory>')
  .usage(`${chalk.green('<project-directory>')}`)
  .action((name) => {
    projectName = name;
  })
  .option('--mongodb', 'a api template w/ mongodb')
  .option('--psql', 'a api template w/ postgresql')
  .option('--gql', 'a GraphQL api template')
  .option('--gql-pg', 'a GraphQL api + PostgreSQL template')
  .parse(process.argv);

if (typeof projectName === 'undefined') {
  console.error('Please specify the project directory:');
  console.log(
    `  ${chalk.cyan(program.name())} ${chalk.green('<project-directory>')}`
  );
  console.log();
  console.log('For example:');
  console.log(
    `  ${chalk.cyan(program.name())} ${chalk.green('my-typescript-api')}`
  );
  process.exit(1);
}

const projectDestination = path.join(process.cwd(), projectName);

if (fs.existsSync(projectDestination)) {
  console.log(`The directory ${chalk.green(projectName)} already exists.`);
  process.exit(1);
}

const checkTemplateOptions = () => {
  const options = program.opts();
  let template = 'templates/main';

  if (options.mongodb) {
    template = 'templates/mongo';
    console.log(
      chalk.blue(`>> ${projectName} is using our RestAPI + mongodb template`)
    );
  }

  if (options.psql) {
    template = 'templates/psql';
    console.log(
      chalk.blue(`>> ${projectName} is using our RestAPI + PostgreSQL template`)
    );
  }

  if (options.gql) {
    template = 'templates/gql';
    console.log(chalk.blue(`>> ${projectName} is using our GraphQL template`));
  }

  if (options.gqlPg) {
    template = 'templates/gql-psql';
    console.log(
      chalk.blue(`>> ${projectName} is using our GraphQL + PostgreSQL template`)
    );
  }

  return template;
};

fs.copySync(path.join(__dirname, '..', checkTemplateOptions()), projectName);

function shouldUseYarn() {
  try {
    execSync('yarn --version', { stdio: 'ignore' });
    return true;
  } catch (e) {
    return false;
  }
}

process.chdir(projectDestination);

fs.writeFileSync(
  '.gitignore',
  `node_modules
dist
.env
database.sqlite`
);

if (shouldUseYarn()) {
  execSync('yarn install', { stdio: [0, 1, 2] });
} else {
  execSync('npm install', { stdio: [0, 1, 2] });
}
