const { exec } = require("child_process");

exports.create = async (req, res) => {
  let command = `date`;

  const call = await exec(command);

  call.stdout.once("data", async (data) => {
    return res.status(200).send({ data: data, status: 200 });
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
