import { createPage } from 'telegraph-wrapper';
import axios from 'axios';

const telegraf = (data) => {
  const getToken = async () => {
    const url =
      'https://api.telegra.ph/createAccount?short_name=Sandbox&author_name=Anonymous';
    const { data } = await axios.get(url);
    if (data.ok) {
      return data.result.access_token;
    }
    return false;
  };

  const newPage = async () => {
    const page = await createPage({
      access_token: await getToken(),
      title: Date.now(),
      content: [{ tag: 'p', children: [data.text] }],
      author_name: 'Unknown',
      return_content: true,
    });

    return page.url;
  };

  return { newPage };
};

export { telegraf };
