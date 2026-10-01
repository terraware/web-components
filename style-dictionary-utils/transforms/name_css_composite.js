module.exports = {
  name: 'name/css_composite',
  type: 'name',
  filter: function (prop) {
    return prop.filePath.endsWith('composite.json');
  },
  transform: function (prop) {
    const attribute = prop.path[1];
    const tokens = prop.path[0];
    if (attribute === 'value') {
      return tokens;
    } else {
      const nameToken = tokens + '-' + attribute;
      return nameToken;
    }
  },
};
