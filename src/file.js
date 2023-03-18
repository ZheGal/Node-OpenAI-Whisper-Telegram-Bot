import axios from 'axios';
import fs from 'fs';
import uuid from 'uuid-random';
import { join } from 'path';

const fileService = (link) => {
  const ext = link.split('.').pop();
  const dir = join(process.cwd(), 'tmp');
  const path = `${dir}/${uuid()}.${ext}`;
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }

  const saveFile = async () => {
    const writeStream = fs.createWriteStream(path);
    const { data } = await axios.get(link, {
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

  const removeFile = async () => {
    try {
      fs.unlinkSync(path);
    } catch (e) {}
  };

  return { saveFile, removeFile };
};

export { fileService };
