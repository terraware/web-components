module.exports = {
  name: 'name/js_size',
  type: 'name',
  filter: function (prop) {
    return prop.filePath.endsWith('size.json');
  },
  transform: function (prop) {
    const tokens = prop.path[1].split(' ');
    const nameToken = tokens[tokens.length - 1];
    return nameToken.replace('[$', '').replace(']', '').split('-').join('_').toUpperCase();
  },
};
