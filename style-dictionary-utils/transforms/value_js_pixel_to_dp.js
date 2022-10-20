module.exports = {
  name: 'value/js_pixel_to_dp',
  type: 'value',
  matcher: function (prop) {
    return prop.filePath.endsWith('typography.json') | prop.filePath.endsWith('size.json')
  },
  transformer: function (prop) {
    let value = prop.value;
    if (prop.value.endsWith('px')) {
      value = parseInt(value.replace('px',''));
    }
    return value;
  }
}
