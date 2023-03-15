import axios from 'axios';
import uuid from 'uuid-random';
import fs from 'fs';

export const getFileAndSave = async (url) => {
  const ext = url.split('.').pop();
  const dir = './tmp';
  const path = `${dir}/${uuid()}.${ext}`;
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }

  const writeStream = fs.createWriteStream(path);
  const { data } = await axios.get(url, {
    responseType: 'stream',
  });
  data.pipe(writeStream);
  
  return new Promise((resolve, reject) => {
    writeStream.on('finish', () => {
      resolve(path);
    });

    writeStream.on('error', (err) => {
      reject(err);
    });
  });
};
