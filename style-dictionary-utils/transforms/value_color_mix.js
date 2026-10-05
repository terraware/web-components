module.exports = {
  name: 'value/color-mix',
  type: 'value',
  transitive: true,
  filter: function (prop) {
    return typeof prop.value === 'string' && /(^|[^.\w])mix\(/.test(prop.value);
  },
  transform: function (prop) {
    return prop.value.replace(/(^|[^.\w])mix\(/g, '$1color.mix(');
  },
};