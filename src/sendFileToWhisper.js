import axios from 'axios';
import FormData from 'form-data';
import fs from 'fs';
import { join } from 'path';
import { removeFile } from './removeFile.js';

export const sendFileToWhisper = async (filePath) => {
  const fullFilePath = join(process.cwd(), filePath);
  const fileStream = fs.createReadStream(fullFilePath);
  const token = process.env.OPENAI_TOKEN;

  const formData = new FormData();
  formData.append('file', fileStream);
  formData.append('model', 'whisper-1');

  try {
    const { data } = await axios.post(
      'https://api.openai.com/v1/audio/transcriptions',
      formData,
      {
        headers: {
          ...formData.getHeaders(),
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  } catch (e) {
    removeFile(fullFilePath);
  }
};
