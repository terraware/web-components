function buildMobile(source, destination) {
  const StyleDictionary = require('style-dictionary').extend({
    source: source,
    platforms: {
      rn: {
        transformGroup: 'react-native',
        // transforms: [],
        // TODO: determine if any transforms are needed
        buildPath: '../style-dictionary-dist/mobile/',
        files: [
          {
            destination: destination,
            format: 'javascript/es6',
          },
        ],
      },
    },
  });

  StyleDictionary.buildAllPlatforms();
}

function buildWeb(source, destination) {
  const StyleDictionary = require('style-dictionary').extend({
    source: source,
    platforms: {
      scss: {
        transformGroup: 'scss',
        transforms: ['name/css_composite', 'value/gradient', 'value/shadow'],
        buildPath: '../style-dictionary-dist/web/',
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
  StyleDictionary.registerTransform(require('./transforms/value_shadow.js'));

  StyleDictionary.buildAllPlatforms();
}

// build mobile
buildMobile(['./json/**/*.json'], 'style-variables.js');

// build web
buildWeb(['./json/system/**/*.json', './json/button/**/*.json'], 'button_variables.scss');
buildWeb(['./json/system/**/*.json', './json/navbar/**/*.json'], 'navbar_variables.scss');
buildWeb(['./json/system/**/*.json', './json/textfield/**/*.json'], 'textfield_variables.scss');
buildWeb(['./json/system/**/*.json', './json/progressCircle/**/*.json'], 'progressCircle_variables.scss');
buildWeb(['./json/system/**/*.json', './json/dialogBox/**/*.json'], 'dialogBox_variables.scss');
