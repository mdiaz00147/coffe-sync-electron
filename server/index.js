let express = require("express");
const cors = require("cors");

const { routes } = require("./src/routes");

let app = express();

app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true
  })
);

// app routes
routes(app);

let server = app.listen(3020, function () {
  let host = server.address().address;
  let port = server.address().port;
  console.log("App Listening at http://%s:%s", host, port);
});
