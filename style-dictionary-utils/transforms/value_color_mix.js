module.exports = {
  name: 'value/color-mix',
  type: 'value',
  transitive: true,
  matcher: function (prop) {
    return typeof prop.value === 'string' && /(^|[^.\w])mix\(/.test(prop.value);
  },
  transformer: function (prop) {
    return prop.value.replace(/(^|[^.\w])mix\(/g, '$1color.mix(');
  },
};