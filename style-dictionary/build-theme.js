function build(source, destination) {
  const StyleDictionary = require('style-dictionary').extend({
    source,
    platforms: {
      js: {
        transformGroup: 'js',
        buildPath: '../src/style-dictionary-dist/',
        files: [
          {
            format: 'twJsModule',
            destination,
          },
        ],
      },
    },
  });

  StyleDictionary.registerFormat({
    name: 'twJsModule',
    formatter: function({dictionary}) {
      const theme = {
        palette: {}, // for colors
        terraware: {}, // for all terraware styles (usage is TBD)
      };
      dictionary.allTokens.map(token => {
        const { name, value } = token;
        const tokenName = name.replace(/^Tw/, '');
        let tokenValue = value.value || value;

        if (typeof(value) === 'string' && value.match(/^\d+$/)) {
          tokenValue = parseInt(value, 10);
        }

        theme.terraware[tokenName] = tokenValue;
        if (tokenName.toLowerCase().startsWith('clr')) {
          theme.palette[tokenName] = tokenValue;
        }
      });
      return 'type ThemeDictionary = {\n' +
        '  [key: string]: any;\n' +
        '};\n\n' +
        'const TerrawareTheme: ThemeDictionary = ' +
        JSON.stringify(theme, null, 2) +
        ';\n\n' +
        'export default TerrawareTheme;\n';
    }
  });

  StyleDictionary.buildAllPlatforms();
}

build(['./json/**/*.json'], 'TerrawareTheme.ts');
