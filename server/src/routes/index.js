// controllers
const downloadsFilesController = require("../controllers/api/v1/downloads/filesController");
const filesController = require("../controllers/api/v1/filesController");
const foldersController = require("../controllers/api/v1/foldersController");

exports.routes = (app) => {
  // V1 routes
  app.route("/api/v1/folders/:folderName").get(foldersController.show);

  app.route("/api/v1/files").get(filesController.index);

  app.route("/api/v1/downloads/files").post(downloadsFilesController.create);
};
