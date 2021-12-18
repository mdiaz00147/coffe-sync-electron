// controllers
const walletsController = require("../controllers/channels/switchController");

exports.routes = (app) => {
  // V1 routes
  app.route("/switch").put(walletsController.update);

};
