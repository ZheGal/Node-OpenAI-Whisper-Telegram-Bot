const startCommand = (bot) => {
  bot.start((ctx) => {
    ctx.reply('Hello! Send me an audio file!');
  });
};

export { startCommand };
