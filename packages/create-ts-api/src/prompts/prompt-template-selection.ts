import { select, isCancel, cancel } from '@clack/prompts';
import { TEMPLATE_OPTIONS } from '@/configs/templates.config.js';
import type { TemplateId } from '@/types/index.js';

export async function promptTemplateSelection(): Promise<TemplateId> {
  const selectedTemplate = await select({
    message: 'Select a starter template architecture:',
    options: TEMPLATE_OPTIONS,
  });

  if (isCancel(selectedTemplate)) {
    cancel('Operation cancelled.');
    process.exit(0);
  }

  return selectedTemplate satisfies TemplateId;
}
