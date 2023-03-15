import { createPage } from 'telegraph-wrapper';
import axios from 'axios';

const getTelegraphToken = async () => {
  const url =
    'https://api.telegra.ph/createAccount?short_name=Sandbox&author_name=Anonymous';
  const { data } = await axios.get(url);
  if (data.ok) {
    return data.result.access_token;
  }
  return false;
};

export const sendDataToTelegraf = async (data) => {
  const page = await createPage({
    access_token: await getTelegraphToken(),
    title: Date.now(),
    content: [{ tag: 'p', children: [ data.text ] }],
    author_name: 'Unknown',
    return_content: true,
  });

  return page.url;
};
