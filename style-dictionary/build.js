function build(source, destination) {
  const sd = require('style-dictionary');
  const StyleDictionary = sd.extend({
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

  StyleDictionary.registerTransform(require('../style-dictionary-utils/transforms/name_css_composite.js'));
  StyleDictionary.registerTransform(require('../style-dictionary-utils/transforms/value_gradient.js'));
  StyleDictionary.registerTransform(require('../style-dictionary-utils/transforms/value_shadow.js'));
  StyleDictionary.registerTransform(require('../style-dictionary-utils/transforms/value_color_mix.js'));

  // Same output as the built-in scss/variables format, but prefixed with a
  // `@use "sass:color"` rule so the generated color.mix() calls resolve.
  StyleDictionary.registerFormat({
    name: 'scss/variables-with-color-module',
    formatter: function ({ dictionary, options }) {
      return (
        '@use "sass:color";\n' +
        sd.formatHelpers.formattedVariables({
          format: 'sass',
          dictionary,
          outputReferences: options.outputReferences,
        }) +
        '\n'
      );
    },
  });

  StyleDictionary.buildAllPlatforms();
}

build(['./json//**/*.json'], 'terraware.scss');
