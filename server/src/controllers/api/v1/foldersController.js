const { exec, spawn } = require("child_process");

exports.show = async (req, res) => {
  let folderName = req.params.folderName;

  let command = `ssh root@104.207.133.53 ls /home/${folderName}`;

  const call = await exec(command);

  call.stdout.once("data", async (data) => {
    console.log(`stdout: ${data}`);
    let result = await data.split("\n");
    result = result.filter((e) => e);
    result = result.map((x) => {
      return { name: x, calories: 300 };
    });
    return res.status(200).send({ data: result, status: 200 });
  });

  call.stderr.once("data", (data) => {
    console.log(`stderr: ${data}`);
    return res.status(500).send({ data: data, status: 500 });
  });

  call.on("error", (error) => {
    console.log(`error: ${error.message}`);
  });

  call.on("close", (code) => {
    console.log(`child process exited with code ${code}`);
  });
};
