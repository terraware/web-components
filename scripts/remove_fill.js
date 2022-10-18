/**
 * Use this script to remove fill from an asset.
 * Output will be saved under /assets in this repo.
 *
 * Usage:
 *   node remove_fill <path-to-new-asset-file>
 * Example:
 *   node remove_fill /tmp/asset.svg  
 */

const fs = require('fs');

try {
  const input = process.argv[2];

  if (fs.existsSync(input)) {
    const rsp = require('remove-svg-properties');
    const options = {
      src: input,
      out: `${__dirname}/../assets/`,
      properties: ['fill'],
    };

    console.log('Removing fill from assets', options);

    rsp.remove(options);
  } else {
    console.error(`Invalid input file: ${input}`); 
  }
} catch(e) {
  console.error(e);
}
