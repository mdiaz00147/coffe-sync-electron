const { exec } = require("child_process");

exports.create = async (req, res) => {
  const pathName = req.body["path"];

  let command = `ssh root@104.207.133.53 ls -ahl ${pathName}`;

  const call = await exec(command);

  call.stdout.once("data", async (data) => {
    console.log(`stdout: ${data}`);
    let result = await data.split("\n").filter((x, i) => i > 2).filter((e) => e);
    
    result = result.map((e) => {
      let arr = e.split(" ").filter((e) => e);
      console.log("DEGUB::", arr);

      return {
        name: arr[arr.length - 1],
        size: arr[4]
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
