const { exec, spawn } = require("child_process");

exports.update = (req, res) => {
  const channelID = req.body["channelID"];
  let vb = (req.body["vb"] && req.body["vb"]) || "500k";
  let ab = (req.body["ab"] && req.body["ab"]) || "500k";

  let command = `ssh -i priv.txt -p 10259 mariod@0.tcp.ngrok.io "pkill ffmpeg; /usr/local/bin/ffmpeg -i http://line.myott-ma.com:80/MDgs5sXioAybK56/pGZQuzLXkgrQqAN/${channelID} -vcodec libx264 -vb ${vb} -acodec aac -ab ${ab} -ar 48000 -ac 2 -f flv -muxdelay 0.1 rtmp://localhost/live/STREAM_NAME"`;

  const call = exec(command);

  call.stdout.on("data", (data) => {
    console.log(`stdout: ${data}`);
  });

  call.stderr.on("data", (data) => {
    console.log(`stderr: ${data}`);
  });

  call.on("error", (error) => {
    console.log(`error: ${error.message}`);
  });

  call.on("close", (code) => {
    console.log(`child process exited with code ${code}`);
  });
  res.send({ m: call });
};
