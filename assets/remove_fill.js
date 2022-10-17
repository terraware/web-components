const rsp = require('remove-svg-properties');

const options = {
  src: `${__dirname}/*.svg`,
  out: `${__dirname}/`,
  properties: ['fill'],
};

console.log('Removing fill from assets', options);

rsp.remove(options);
