module.exports = {
  name: 'name/css_typography',
  type: 'name',
  filter: function (prop) {
    return prop.filePath.endsWith('typography.json');
  },
  transform: function (prop) {
    const attribute = prop.path[2];
    const tokens = prop.path[1].split(' ');
    const nameToken = tokens[tokens.length - 1] + '-' + attribute;
    return nameToken.replace('[$', '').replace(']', '');
  },
};
