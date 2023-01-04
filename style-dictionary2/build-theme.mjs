import hexRgb from 'hex-rgb';
import sd from 'style-dictionary';

function build(source, destination) {
  const StyleDictionary = sd.extend({
    source,
    platforms: {
      js: {
        transformGroup: 'js',
        buildPath: '../src/style-dictionary-dist2/',
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

const TerrawareTheme2: ThemeDictionary = <TERRAWARE_PALETTE>

export default TerrawareTheme2;`;

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
        let tokenValue = value.value || value;

        if (typeof tokenValue.replace === 'function') {
          tokenValue = tokenValue.replace(/rgba\((#[0-9|a-f|A-F]+),\s*(\d*\.?\d*)\)/g, (match, hex, opacity) => {
            return hexRgb(hex, {alpha: parseFloat(opacity), format: 'css'});
          });
        }

        if (typeof(value) === 'string' && value.match(/^\d+$/)) {
          tokenValue = parseInt(value, 10);
        }

        if (name.toLowerCase().startsWith('twclr')) {
          theme.palette[name] = tokenValue;
        }
      });
      return paletteDefinition(Object.keys(theme.palette)) +
        '\n\n' +
        paletteTheme(theme);
    }
  });

  StyleDictionary.buildAllPlatforms();
}

build(['./json/**/*.json'], 'TerrawareTheme2.ts');
