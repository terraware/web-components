module.exports = {
  name: 'value/gradient',
  type: 'value',
  transitive: true,
  matcher: function (prop) {
    return prop.filePath.endsWith('gradient.json');
  },
  transformer: function (prop) {
    //console.log(prop);
    let value = prop.value;
    if (prop.original && prop.original.value.startsWith('linear-gradient')) {
      console.log('entra');
      const expression = `{${value.path}}`;
      var re = new RegExp(expression, 'g');
      value = prop.original.value.replace(re, prop.value.value);
      console.log(value);
    }
    return value;
  },
};
