import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm'],
  target: 'node20',
  clean: true,
  minify: true,
  sourcemap: false,
  shims: true,
  banner: {
    js: '#!/usr/bin/env node',
  },
});
