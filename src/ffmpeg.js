const ffmpeg = async (path) => {
  const ffmpeg = new Ffmpeg('./audio.mp3');
  ffmpeg
    .audioChannels(1)
    .audioBitrate(16)
    .output(path)
    .on('end', () => {
      console.log(path);
    })
    .run();
  return new Promise((resolve, reject) => {
    ffmpeg.on('end', () => {
      resolve(path);
    });
    ffmpeg.on('error', (err) => {
      reject(err);
    });
  });
};

export { ffmpeg };
