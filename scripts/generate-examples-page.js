//

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __dirname = fileURLToPath(new URL('.', import.meta.url));
import chokidar from 'chokidar';

function processPreviewExamples(src, dest) {
  if (!fs.existsSync(src)) return;
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      processPreviewExamples(srcPath, destPath);
    } else {
      if (entry.name.endsWith('.html')) {
        const page = fs
          .readFileSync(srcPath, 'utf8')
          .replace('../../dist/', `/`);
        fs.writeFileSync(destPath, page);
      } else {
        fs.copyFileSync(srcPath, destPath);
      }
    }
  }
}

export default function generateExamplesPage(options = {}) {
  const root_dir = path.join(__dirname, '..');
  const template_path = path.join(__dirname, 'examples.template.html');
  const examples_dir = path.join(root_dir, 'examples');
  const dist_dir = path.join(root_dir, 'dist');
  const page_filename = 'index.html';
  const page_path = path.join(dist_dir, page_filename);
  function createExamplesPage(mode) {
    const examples = fs
      .readdirSync(examples_dir, { withFileTypes: true })
      .filter((dirent) => dirent.isDirectory())
      .filter((dirent) => {
        return fs.existsSync(path.join(examples_dir, dirent.name, 'index.html'));
      })
      .map((dirent) => `'${dirent.name}'`);
    const page = fs
      .readFileSync(template_path, 'utf8')
      .replaceAll(`'%%EXAMPLES_LIST%%'`, `[${examples}]`)
      .replaceAll(`%%NODE_ENV%%`, mode)
      .replaceAll(`%%LIBRARY_FULL_NAME%%`, options.lib_full_name)
      .replaceAll(`%%LIBRARY_SHORT_NAME%%`, options.lib_short_name)
      .replaceAll(`%%LIBRARY_AUTHOR%%`, options.lib_author)
      .replaceAll(`%%LIBRARY_ES%%`, options.lib_es)
      .replaceAll(`%%LIBRARY_CJS%%`, options.lib_cjs)
      .replaceAll(`%%LIBRARY_UMD%%`, options.lib_umd);
    fs.mkdirSync(dist_dir, { recursive: true });
    fs.writeFileSync(page_path, page);
    console.log(`Generated examples html page ${page_filename}`);
  }

  let watcher;
  let config;
  let mode;
  return {
    name: 'generate-examples-page',
    configResolved(resolvedConfig) {
      config = resolvedConfig;
      mode = config.isProduction? config.command === 'serve'? 'preview' : 'build' : 'development';
      if (mode === 'preview') {
        createExamplesPage(mode);
        processPreviewExamples(examples_dir, path.join(dist_dir, 'examples'));
      }
    },
    configureServer(server) {
      createExamplesPage(mode);
      if (mode !== 'development') {
        return;
      }
      watcher = chokidar
        .watch([examples_dir, template_path], { ignoreInitial: true })
        .on('all', () => {
          createExamplesPage(mode);
          server.ws.send({ type: 'full-reload' });
        });
      server.httpServer.on('close', () => {
        if (watcher) {
          watcher.close();
          watcher = null;
        }
      });
    }
  };
}
