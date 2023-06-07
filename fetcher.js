const fs = require('fs');
const request = require('request');

const url = process.argv[2];
const localPath = process.argv[3];

const fetcher = (url, localPath) => {
  request(url, (error, response, body) => {
    if (error) {
      console.error('Something went wrong while downloading file:', error);
      return;
    }

    if (response.statusCode !== 200) {
      console.error('Something went wrong while downloading file. Status code:', response.statusCode);
      return;
    }

    fs.writeFile(localPath, body, (err) => {
      if (err) {
        console.error('Unable to write file:', err);
      } else {
        console.log(`Downloaded and saved ${body.length} bytes to ${localPath}.`);
      }
    });
  });
};

fetcher(url, localPath);
