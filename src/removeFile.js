import fs from 'fs';

export const removeFile = (filePath) => {
  try {
    fs.unlinkSync(filePath);
  } catch (e) {}
};
