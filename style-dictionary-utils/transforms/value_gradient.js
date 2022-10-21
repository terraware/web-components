module.exports = {
  name: 'value/gradient',
  type: 'value',
  transitive: true,
  matcher: function (prop) {
    return prop.filePath.endsWith('gradient.json');
  },
  transformer: function (prop) {
    let value = prop.value;
    if (prop.original && prop.original.value.startsWith('linear-gradient')) {
      const expression = `{${value.path}}`;
      var re = new RegExp(expression, 'g');
      value = prop.original.value.replace(re, prop.value.value);
    }
    return value;
  },
};
