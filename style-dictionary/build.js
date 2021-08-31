function build(source, destination) {
  const StyleDictionary = require('style-dictionary').extend({
    source: source,
    platforms: {
      scss: {
        transformGroup: 'scss',
        transforms: ['name/css_colors', 'name/css_size', 'name/css_composite', 'name/css_typography'],
        buildPath: '../style-dictionary-dist/',
        files: [
          {
            format: 'scss/variables',
            destination: destination,
          },
        ],
      },
    },
  });

  StyleDictionary.registerTransform(require('./transforms/name_css_colors.js'));
  StyleDictionary.registerTransform(require('./transforms/name_css_composite.js'));
  StyleDictionary.registerTransform(require('./transforms/name_css_typography.js'));
  StyleDictionary.registerTransform(require('./transforms/name_css_size.js'));

  StyleDictionary.buildAllPlatforms();
}

build(['./json/system/**/*.json', './json/button/**/*.json'], 'button_variables.scss');
build(['./json/system/**/*.json', './json/navbar/**/*.json'], 'navbar_variables.scss');
