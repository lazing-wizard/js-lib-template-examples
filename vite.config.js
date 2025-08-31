//

import { defineConfig } from 'vite';

import generateExamplesPage from './scripts/generate-examples-page.js';

import fs from 'fs';
import path from 'path';

const project = JSON.parse(fs.readFileSync('./package.json', 'utf-8'));

const short_name = project.name;
const full_name = project.description;
const lib_author = project.author;

const lib_es = project.module? path.basename(project.module) : `${project.name}.js`;
const lib_cjs = project.main? path.basename(project.main) : `${project.name}.cjs`;
const lib_umd = project.unpkg? path.basename(project.unpkg)
    : project.jsdelivr? path.basename(project.jsdelivr)
    : `${project.name}.umd.js`;

export default defineConfig({
  root: '.',
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'terser',
    terserOptions: {
      format: {
        comments: false,
        beautify: false,
      },
      mangle: true,
      compress: {
        drop_console: true,
        drop_debugger: true,
        passes: 3,
      }
    },
    lib: {
      entry: 'source/index.js',
      name: full_name,
      formats: ['es', 'cjs', 'umd'],
      fileName: (format) =>
        format === 'es' ? lib_es : format === 'cjs'? lib_cjs : lib_umd,
    },
    rollupOptions: {
      external: [],
    },
  },
  server: {
    port: 8080,
    open: '/dist/index.html',
  },
  preview: {
    port: 4173,
    open: '/index.html',
  },
  plugins: [
    generateExamplesPage({
      lib_full_name : full_name,
      lib_short_name : short_name,
      lib_author: lib_author,
      lib_es: lib_es,
      lib_cjs: lib_cjs,
      lib_umd: lib_umd,
    })
  ],
});
