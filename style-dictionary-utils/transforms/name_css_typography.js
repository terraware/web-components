module.exports = {
  name: 'name/css_typography',
  type: 'name',
  matcher: function (prop) {
    return prop.filePath.endsWith('typography.json')
  },
  transformer: function (prop) {
    const attribute = prop.path[2];
    const tokens = prop.path[1].split(' ');
    const nameToken = tokens[tokens.length - 1] + '-' + attribute;
    return nameToken.replace('[$', '').replace(']', '');
  }
}