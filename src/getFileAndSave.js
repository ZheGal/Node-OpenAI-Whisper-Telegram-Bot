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

  const { data } = await axios.get(url, {
    responseType: 'stream',
  });
  await data.pipe(fs.createWriteStream(path));
  return path;
};
