import axios from 'axios';
import FormData from 'form-data';
import fs from 'fs';

const whisper = (path) => {
    const fileStream = fs.createReadStream(path);
    const token = process.env.OPENAI_TOKEN;

    const sendFile = async () => {
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
            console.log(e);
          return false;
        }
    }

    return { sendFile };
}

export { whisper };