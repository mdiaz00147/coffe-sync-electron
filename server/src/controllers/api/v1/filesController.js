const { exec, spawn } = require("child_process");

exports.index = async (req, res) => {
  let command = `ssh root@104.207.133.53 ls /home`;

  const call = await exec(command);

  call.stdout.on("data", async (data) => {
    console.log(`stdout: ${data}`);
    let result = await data.split("\n");
    // console.log("DEGUB::", result);
    result = result.filter((e) => e);
    result = result.map((x) => {
      return { name: x, calories: 300 };
    });
    return res.send({ data: result, status: 200 });
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
