//

const short_name = 'example_lib'
const full_name = 'Example Library'

import { defineConfig } from 'vite';

import generateExamplesPage from './scripts/generate-examples-page.js';

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
        `${short_name}.${format === 'es' ? '' : format === 'cjs'? 'c' : 'umd.'}js`,
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
    })
  ],
});
