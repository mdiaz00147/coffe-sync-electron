const { exec, spawn } = require("child_process");

exports.create = async (req, res) => {
  const fileName = req.body["fileName"];
  console.log("DEBUG::", fileName);
  let command = `rsync -azP root@104.207.133.53:/home/${fileName} /Users/mariodiaz/Development/electron/coffe-sync/downloads`;

  const call = await exec(command);

  call.stdout.once("data", (data) => {
    console.log(`stdout: ${data}`);
    return res.send({ data: "data", status: 200 });
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
};
