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

  const PALETTE_TYPE_DEFINITION = `import { PaletteOptions } from '@mui/material/styles/createPalette';

declare module '@mui/material/styles/createPalette' {
  export interface Palette {
<TERRAWARE_PALETTE_TYPE_DEFINITION>
  }

  export interface PaletteOptions {
<TERRAWARE_PALETTE_TYPE_DEFINITION>
  }
}`;

const TERRAWARE_PALETTE = `type ThemeDictionary = {
  [key: string]: any;
};

const TerrawareTheme: ThemeDictionary = <TERRAWARE_PALETTE>

export default TerrawareTheme;`;

  const paletteDefinition = (paletteTokenNames) => {
    const terrawarePaletteDefinition =  paletteTokenNames.map(tokenName => `    ${tokenName}?: React.CSSProperties['color'];`)
      .join('\n');
    return PALETTE_TYPE_DEFINITION.replaceAll('<TERRAWARE_PALETTE_TYPE_DEFINITION>', terrawarePaletteDefinition);
  };

  const paletteTheme = (paletteThemeObject) => {
    return TERRAWARE_PALETTE.replace('<TERRAWARE_PALETTE>', JSON.stringify(paletteThemeObject, null, 2));
  };

  StyleDictionary.registerFormat({
    name: 'twJsModule',
    formatter: function({dictionary}) {
      const theme = {
        palette: {}, // for colors
      };
      dictionary.allTokens.map(token => {
        const { name, value } = token;
        const tokenName = name.replace(/^Tw/, '');
        let tokenValue = value.value || value;

        if (typeof(value) === 'string' && value.match(/^\d+$/)) {
          tokenValue = parseInt(value, 10);
        }

        if (tokenName.toLowerCase().startsWith('clr')) {
          theme.palette[tokenName] = tokenValue;
        }
      });
      return paletteDefinition(Object.keys(theme.palette)) +
        '\n\n' +
        paletteTheme(theme);
    }
  });

  StyleDictionary.buildAllPlatforms();
}

build(['./json/**/*.json'], 'TerrawareTheme.ts');
