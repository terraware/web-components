const tinycolor = require('tinycolor2');

module.exports = {
  name: 'value/shadow',
  type: 'value',
  transitive: true,
  matcher: function (prop) {
    return prop.filePath.endsWith('shadow.json');
  },
  transformer: function (prop) {
    const { x, y, blur, spread, color, opacity } = prop.value;

    // convert hex code to rgba string
    const shadowColor = tinycolor(color.value ?? color);
    shadowColor.setAlpha(opacity.value ?? opacity);
    shadowColor.toRgbString();

    return `${x.value ?? x} ${y.value ?? y} ${blur.value ?? blur} ${spread.value ?? spread} ${shadowColor}`;
  },
};
