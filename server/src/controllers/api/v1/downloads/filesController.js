const { exec } = require("child_process");
// const { ipcMain } = require("electron");
// console.log(app);

// setInterval(() => {
//   ipcMain.send("download-status", "33333");
// }, 3000);

exports.create = async (req, res) => {
  const fileName = req.body["fileName"];
  const pathName = req.body["path"];
  const hostIP = req.body["host"];
  const hostPort = req.body["port"];
  const hostUsername = req.body["username"];

  let command = `rsync -e 'ssh -p${hostPort}' -azP ${hostUsername}@${hostIP}:${pathName}/${fileName} /Users/$(whoami)/Downloads`;

  const call = await exec(command);

  call.stdout.on("data", (data) => {
    console.log(`stdout: ${data}`);
    // return res.status(200).send({ data: data, status: 200 });
    // ipcMain.send("download-status", data);
  });

  call.stderr.once("data", (data) => {
    console.log(`stderr: ${data}`);
    // return res.status(500).send({ data: data, status: 500 });
  });

  call.once("error", (error) => {
    console.log(`error: ${error.message}`);
  });

  call.once("close", (code) => {
    console.log(`child process exited with code ${code}`);
  });
  return res.status(200).send({ data: "started", status: 200 });
};
