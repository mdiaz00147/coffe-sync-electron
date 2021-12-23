const { exec } = require("child_process");
const axios = require("axios");

exports.create = async (req, res) => {
  const fileName = req.body["fileName"];
  const pathName = req.body["path"];
  const hostIP = req.body["host"];
  const hostPort = req.body["port"];
  const hostUsername = req.body["username"];

  let command = `rsync -e 'ssh -p${hostPort}' -azP --stats ${hostUsername}@${hostIP}:${pathName}/${fileName} /Users/$(whoami)/Downloads`;

  const call = await exec(command);

  call.stdout.on("data", async (data) => {
    let result = data.split(" ");
    result = result.filter((e) => e);
    result =
      (result.length >= 1 &&
        ((parseFloat(result[1].replace("%", "")) >= 100 && 100) ||
          parseFloat(result[1].replace("%", "")))) ||
      0;
    console.log(`stdout: ${result}`);

    try {
      let response = await axios({
        method: "PUT",
        url: "https://coffesync-76027-default-rtdb.firebaseio.com/users.json",
        data: {
          2: {
            progress: result
          }
        }
      });
    } catch (error) {
      console.log(error);
    }
    // return res.status(200).send({ data: data, status: 200 });
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
