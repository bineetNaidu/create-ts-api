import { text, isCancel, cancel } from '@clack/prompts';

export async function promptProjectDescription(): Promise<string> {
  const description = await text({
    message: 'Provide a short description for your API:',
    placeholder: 'Production-ready TypeScript API bootstrapped with create-ts-api',
    defaultValue: 'Production-ready TypeScript API bootstrapped with create-ts-api',
  });

  if (isCancel(description)) {
    cancel('Operation cancelled.');
    process.exit(0);
  }

  return (description as string).trim();
}
