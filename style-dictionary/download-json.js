const fs = require('fs');
const https = require('https');
const zeroHeightFiles = require('./zero-height-files.json');
  
// loop through zeroheight files and write them to destination 
const promises = [];

zeroHeightFiles.forEach(file => {

  const promise = new Promise((resolve, reject) => { 

    https.get(file.url,(res) => {
      // Image will be stored at this path
      const path = `${__dirname}/${file.output}`;
      const filePath = fs.createWriteStream(path);
      res.pipe(filePath);

      filePath.on('finish',() => {
        filePath.close();
        console.log(`Download ${file.url} to ${file.output} completed.`); 
        resolve(true);
      });

      filePath.on('error', () => {
        reject(new Error(`Failed downloading ${file.url} to ${file.output}`));
      });

    });

  });

  promises.push(promise);
});

// Wait for downloads to complete
return Promise.all(promises)
  .then(() => {
    console.log('Done downloading all!');
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
