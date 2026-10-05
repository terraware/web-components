import StyleDictionary from 'style-dictionary';
import { formattedVariables } from 'style-dictionary/utils';

import nameCssComposite from '../style-dictionary-utils/transforms/name_css_composite.js';
import valueColorMix from '../style-dictionary-utils/transforms/value_color_mix.js';
import valueGradient from '../style-dictionary-utils/transforms/value_gradient.js';
import valueShadow from '../style-dictionary-utils/transforms/value_shadow.js';

const build = async (source, destination) => {
  const sd = new StyleDictionary({
    source: source,
    platforms: {
      scss: {
        transformGroup: 'scss',
        transforms: ['name/css_composite', 'value/gradient', 'value/shadow', 'value/color-mix'],
        buildPath: '../src/style-dictionary-dist/',
        files: [
          {
            format: 'scss/variables-with-color-module',
            destination: destination,
            options: {
              showFileHeader: false, // this is needed so we can generate output without dirtying git tree if there are no changes
            },
          },
        ],
      },
    },
  });

  sd.registerTransform(nameCssComposite);
  sd.registerTransform(valueGradient);
  sd.registerTransform(valueShadow);
  sd.registerTransform(valueColorMix);

  // Same output as the built-in scss/variables format, but prefixed with a
  // `@use "sass:color"` rule so the generated color.mix() calls resolve.
  sd.registerFormat({
    name: 'scss/variables-with-color-module',
    format: ({ dictionary, options }) => {
      return (
        '@use "sass:color";\n' +
        formattedVariables({
          format: 'sass',
          dictionary,
          outputReferences: options.outputReferences,
        }) +
        '\n'
      );
    },
  });

  await sd.buildAllPlatforms();
};

await build(['./json//**/*.json'], 'terraware.scss');
