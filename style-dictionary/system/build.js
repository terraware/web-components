const StyleDictionary = require('style-dictionary').extend({
  "source": ["./**/*.json"],
  "platforms": {
    "scss": {
      "transformGroup": "scss",
      "transforms": ["name/css_colors", "name/css_size", "name/css_typography"],
      "buildPath": "../../style-dictionary-dist/",
      "files": [{
        "format": "scss/variables",
        "destination": "system_variables.scss",
      }]
    },
    "js": {
      "transformGroup": "js",
      "transforms": ["value/js_pixel_to_dp", "name/js_colors", "name/js_size", "name/js_typography"],
      "buildPath": "../../style-dictionary-dist/",
      "files": [{
        "format": "javascript/module-flat",
        "destination": "system_variables.js"
      }]
    }
  }
});

StyleDictionary.registerTransform(require('../transforms/name_js_colors.js'));
StyleDictionary.registerTransform(require('../transforms/name_js_typography.js'));
StyleDictionary.registerTransform(require('../transforms/value_js_pixel_to_dp.js'));
StyleDictionary.registerTransform(require('../transforms/name_js_size.js'));
StyleDictionary.registerTransform(require('../transforms/name_css_colors.js'));
StyleDictionary.registerTransform(require('../transforms/name_css_typography.js'));
StyleDictionary.registerTransform(require('../transforms/name_css_size.js'));

StyleDictionary.buildAllPlatforms();