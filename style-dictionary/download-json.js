const fs = require('fs');
const https = require('https');
const zeroHeightFiles = require('./zero-height-files.json');

// loop through zeroheight files and write them to destination
const promises = [];

zeroHeightFiles.forEach(file => {

const promise = new Promise((resolve, reject) => {

    https.get(file.url,(res) => {
      const path = `${__dirname}/${file.output}`;
      const chunks = [];
      res.on('data', (chunk) => chunks.push(chunk));

      res.on('end', () => {
        const json = Buffer.concat(chunks).toString('utf8').replace(/\.value\}/g, '}');
        fs.writeFileSync(path, json);
        console.log(`Download ${file.url} to ${file.output} completed.`);
        resolve(true);
      });

      res.on('error', () => {
        reject(new Error(`Failed downloading ${file.url} to ${file.output}`));
      });

    });

  });

  promises.push(promise);
});

// Wait for downloads to complete
return Promise.all(promises)
  .then(() => {
    process.stdout.write('Done downloading all!');
  })
  .catch((err) => {
    process.stderr.write(err);
  });
