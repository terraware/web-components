import { babel } from '@rollup/plugin-babel';
import nodeResolve from '@rollup/plugin-node-resolve';
import { cpSync, mkdirSync, readdirSync } from 'node:fs';
import { createRequire } from 'node:module';
import path from 'node:path';

const require = createRequire(import.meta.url);

const SOURCE_DIR = 'src';
const OUTPUT_DIR = 'dist';
const SOURCE_EXTENSIONS = ['.ts', '.tsx'];

const isStyleSheet = (id) => /\.(css|scss)$/.test(id);

/* Entry points are passed to Rollup as `src/...` paths, so they look like bare specifiers too. */
const isLocalModule = (id) =>
  id.startsWith('.') || path.isAbsolute(id) || id.startsWith(`${SOURCE_DIR}/`) || id.startsWith(`${SOURCE_DIR}\\`);

/*
 * Style sheets are copied to dist as-is and compiled by the consuming application, so the import
 * has to survive into the output untouched instead of being resolved and inlined here.
 */
const externalStyleSheets = () => ({
  name: 'external-style-sheets',
  resolveId: (source) =>
    isStyleSheet(source) ? { id: source, external: source.startsWith('.') ? 'relative' : true } : null,
});

/*
 * Babel only handles the TypeScript and JSX sources; everything else in src (style sheets, fonts,
 * generated design tokens) is copied over verbatim, the way `babel --copy-files` used to.
 */
const copyNonSourceFiles = (from, to) => {
  for (const entry of readdirSync(from, { withFileTypes: true })) {
    const source = path.join(from, entry.name);
    const destination = path.join(to, entry.name);

    if (entry.isDirectory()) {
      if (entry.name !== 'stories') {
        copyNonSourceFiles(source, destination);
      }
    } else if (!SOURCE_EXTENSIONS.includes(path.extname(entry.name))) {
      mkdirSync(path.dirname(destination), { recursive: true });
      cpSync(source, destination);
    }
  }
};

const copyAssets = () => ({
  name: 'copy-assets',
  closeBundle: () => copyNonSourceFiles(SOURCE_DIR, OUTPUT_DIR),
});

/*
 * Every module is its own entry point so the published layout mirrors src and consumers can keep
 * deep-importing individual components. Tests and stories are left out; they were previously
 * compiled into the package even though no declarations were generated for them.
 */
const collectEntryPoints = (directory, entryPoints = []) => {
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const source = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      if (entry.name !== 'stories') {
        collectEntryPoints(source, entryPoints);
      }
    } else if (
      SOURCE_EXTENSIONS.includes(path.extname(entry.name)) &&
      !entry.name.endsWith('.d.ts') &&
      !/\.(test|stories)\.tsx?$/.test(entry.name)
    ) {
      entryPoints.push(source);
    }
  }

  return entryPoints;
};

export default {
  input: collectEntryPoints(SOURCE_DIR),
  external: (id) => isStyleSheet(id) || !isLocalModule(id),
  output: {
    dir: OUTPUT_DIR,
    format: 'es',
    preserveModules: true,
    preserveModulesRoot: SOURCE_DIR,
    entryFileNames: '[name].js',
  },
  plugins: [
    externalStyleSheets(),
    nodeResolve({ extensions: SOURCE_EXTENSIONS.concat('.mjs', '.js', '.json') }),
    babel({
      babelHelpers: 'bundled',
      extensions: SOURCE_EXTENSIONS,
      configFile: require.resolve('./babel.config.dist.json'),
      babelrc: false,
    }),
    copyAssets(),
  ],
};
