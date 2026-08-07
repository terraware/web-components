import { babel } from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import nodeResolve from '@rollup/plugin-node-resolve';
import { cpSync, mkdirSync, readdirSync } from 'node:fs';
import { createRequire } from 'node:module';
import path from 'node:path';

const require = createRequire(import.meta.url);

const SOURCE_DIR = 'src';
const OUTPUT_DIR = 'dist';
const SOURCE_EXTENSIONS = ['.ts', '.tsx'];

/*
 * Dependencies that are bundled into the output rather than left external.
 *
 * We publish native ES modules, where the default import of a CommonJS module is defined to be
 * the whole `module.exports` object. Packages compiled from TypeScript or Babel instead export
 * their default as `exports.default` next to an `__esModule` flag, and rely on a compiler-emitted
 * helper to unwrap it. Rollup only emits that helper for modules it actually bundles -- an
 * external import is passed through verbatim -- so these have to be inlined for the interop to
 * be handled for us. See the comment in components/PhotosCarousel.
 */
const BUNDLED_DEPENDENCIES = new Set(['react-multi-carousel']);

/* Rollup writes preserved node_modules output under a `node_modules` directory, which npm strips
 * when packing. Redirect it somewhere that survives publication. */
const VENDOR_DIR = '_vendor';

const isStyleSheet = (id) => /\.(css|scss)$/.test(id);

/* Entry points are passed to Rollup as `src/...` paths, so they look like bare specifiers too. */
const isLocalModule = (id) =>
  id.startsWith('.') || path.isAbsolute(id) || id.startsWith(`${SOURCE_DIR}/`) || id.startsWith(`${SOURCE_DIR}\\`);

const packageNameOf = (id) => (id.startsWith('@') ? id.split('/').slice(0, 2).join('/') : id.split('/')[0]);

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
  external: (id) => {
    if (isLocalModule(id)) {
      return false;
    }
    // Checked before the bundling decision so that a bundled package's style sheet stays external.
    if (isStyleSheet(id)) {
      return true;
    }

    return !BUNDLED_DEPENDENCIES.has(packageNameOf(id));
  },
  output: {
    dir: OUTPUT_DIR,
    format: 'es',
    preserveModules: true,
    preserveModulesRoot: SOURCE_DIR,
    entryFileNames: (chunk) => `${chunk.name.replace(/^node_modules[/\\]/, `${VENDOR_DIR}/`)}.js`,
  },
  plugins: [
    externalStyleSheets(),
    nodeResolve({ extensions: SOURCE_EXTENSIONS.concat('.mjs', '.js', '.json') }),
    commonjs(),
    babel({
      babelHelpers: 'bundled',
      extensions: SOURCE_EXTENSIONS,
      configFile: require.resolve('./babel.config.dist.json'),
      babelrc: false,
    }),
    copyAssets(),
  ],
};
