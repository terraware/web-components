function build(source, destination) {
  const StyleDictionary = require('style-dictionary').extend({
    source: source,
    platforms: {
      scss: {
        transformGroup: 'scss',
        transforms: ['name/css_composite', 'value/gradient'],
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

  StyleDictionary.registerTransform(require('./transforms/name_css_composite.js'));
  StyleDictionary.registerTransform(require('./transforms/value_gradient.js'));

  StyleDictionary.buildAllPlatforms();
}

build(['./json/system/**/*.json', './json/button/**/*.json'], 'button_variables.scss');
build(['./json/system/**/*.json', './json/navbar/**/*.json'], 'navbar_variables.scss');
build(['./json/system/**/*.json', './json/textfield/**/*.json'], 'textfield_variables.scss');
build(['./json/system/**/*.json', './json/progressCircle/**/*.json'], 'progressCircle_variables.scss');
build(['./json/system/**/*.json', './json/dialogBox/**/*.json'], 'dialogBox_variables.scss');
