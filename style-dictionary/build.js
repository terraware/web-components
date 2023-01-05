function build(source, destination) {
  const StyleDictionary = require('style-dictionary').extend({
    source: source,
    platforms: {
      scss: {
        transformGroup: 'scss',
        transforms: ['name/css_composite', 'value/gradient', 'value/shadow'],
        buildPath: '../src/style-dictionary-dist/',
        files: [
          {
            format: 'scss/variables',
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

  StyleDictionary.buildAllPlatforms();
}

build(['./json//**/*.json'], 'terraware.scss');
