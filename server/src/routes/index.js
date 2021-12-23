// controllers
const downloadsFilesController = require("../controllers/api/v1/downloads/filesController");
const listFilesController = require("../controllers/api/v1/list/filesController");
const testsExecController = require("../controllers/api/v1/tests/testsExecController");

exports.routes = (app) => {
  // V1 routes
  app.route("/api/v1/list/files").post(listFilesController.create);

  app.route("/api/v1/downloads/files").post(downloadsFilesController.create);

  app.route("/api/v1/tests/exec").post(testsExecController.create);
};
