import { Telegraf } from 'telegraf';
import { startCommand } from './start.js';
import { audioCommand } from './audio.js';
import * as dotenv from 'dotenv';
dotenv.config();

const app = () => {
  const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);
  startCommand(bot);
  audioCommand(bot);

  bot.launch();
};

app();
