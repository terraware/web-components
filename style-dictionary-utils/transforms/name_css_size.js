module.exports = {
  name: 'name/css_size',
  type: 'name',
  matcher: function (prop) {
    return prop.filePath.endsWith('size.json')
  },
  transformer: function (prop) {
    const tokens = prop.path[1].split(' ');
    const nameToken = tokens[tokens.length - 1];
    return nameToken.replace('[$', '').replace(']', '');
  }
}