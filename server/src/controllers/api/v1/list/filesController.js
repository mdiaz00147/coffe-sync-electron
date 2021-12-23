const { exec } = require("child_process");

exports.create = async (req, res) => {
  const pathName = req.body["path"];
  const hostIP = req.body["host"];
  const hostPort = req.body["port"];
  const hostUsername = req.body["username"];

  let command = `ssh -p${hostPort} ${hostUsername}@${hostIP} ls -as1 --block-size=1 ${pathName}`;

  const call = await exec(command);

  call.stdout.once("data", async (data) => {
    console.log(`stdout: ${data}`);
    let result = await data
      .split("\n")
      .filter((x, i) => i > 2)
      .filter((e) => e);

      // console.log("DEGUB::", result);
    result = result.map((e) => {
      let arr = e.split(" ").filter((e) => e);
      console.log("DEGUB::", arr);

      return {
        name: arr[arr.length - 1],
        size: arr[0]
      };
    });

    return res.status(200).send({ data: result, status: 200 });
  });

  call.stderr.once("data", (data) => {
    console.log(`stderr: ${data}`);
    return res.status(500).send({ data: data, status: 500 });
  });

  call.once("error", (error) => {
    console.log(`error: ${error.message}`);
  });

  call.once("close", (code) => {
    console.log(`child process exited with code ${code}`);
  });
};
