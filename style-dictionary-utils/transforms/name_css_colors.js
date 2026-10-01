module.exports = {
  name: 'name/css_colors',
  type: 'name',
  filter: function (prop) {
    return prop.filePath.endsWith('colors.json');
  },
  transform: function (prop) {
    const tokens = prop.name.split(' ');
    const nameToken = tokens[tokens.length - 1];
    return nameToken.replace('[$', '').replace(']', '');
  },
};
