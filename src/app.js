import { Telegraf } from 'telegraf';
import * as dotenv from 'dotenv';
import { getFileAndSave } from './getFileAndSave.js';
import { sendFileToWhisper } from './sendFileToWhisper.js';
import { sendDataToTelegraf } from './sendDataToTelegraf.js';
import { removeFile } from './removeFile.js';
import { join } from 'path';
dotenv.config();

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);
bot.on('audio', async (ctx) => {
  const audio = ctx.update.message.audio;
  const file = await bot.telegram.getFileLink(audio.file_id);
  const downloaded = await getFileAndSave(file.href);
  const transcripted = await sendFileToWhisper(downloaded);

  if (transcripted) {
    const telegrafLink = await sendDataToTelegraf(transcripted);
    ctx.reply(telegrafLink);

    const fullFilePath = join(process.cwd(), downloaded);
    removeFile(fullFilePath);
  }
});

bot.launch();
