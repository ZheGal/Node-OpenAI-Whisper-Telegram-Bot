import { fileService } from "./file.js";
import { telegraf } from "./telegraf.js";
import { whisper } from "./whisper.js";

const audioCommand = (bot) => {
  const getFileAndSave = async (link) => {
    const file = fileService(link);
    const saved = await file.saveFile();
    return { file, saved };
  };

  bot.on('audio', async (ctx) => {
    const audio = ctx.update.message.audio;
    const file = await bot.telegram.getFileLink(audio.file_id);
    const downloaded = await getFileAndSave(file.href);

    const Whisper = whisper(downloaded.saved);
    const message = await ctx.reply('File uploaded. Sending to Open AI');
    const upload = await Whisper.sendFile();

    if (!upload) {
        ctx.reply('Oh-oh! An error occurred while sending the file to OpenAI!');
    };
    if (upload) {
        bot.telegram.deleteMessage(
            message.chat.id,
            message.message_id
        );
        const Telegraf = telegraf(upload);
        const link = await Telegraf.newPage();
        ctx.reply(`${upload.text.substr(0,50)}...\n\n${link}`);
    }
    downloaded.file.removeFile()
  });
};

export { audioCommand };
