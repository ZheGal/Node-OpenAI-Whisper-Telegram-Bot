import { Telegraf } from 'telegraf';
import * as dotenv from 'dotenv';
import { getFileAndSave } from './getFileAndSave.js';
dotenv.config();

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);
bot.on('audio', async (ctx) => {
  const audio = ctx.update.message.audio;
  const file = await bot.telegram.getFileLink(audio.file_id);

  const downloaded = await getFileAndSave(file.href);
});

bot.launch();
