const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const path = require("path");
const cors = require("cors");
const history = require("connect-history-api-fallback");
const cookieParser = require("cookie-parser");
const userRouter = require("./routers/userRouter");
const personRouter = require("./routers/personRouter");
const foodRouter = require("./routers/foodRouter");
const houseRouter = require("./routers/houseRouter");
const waterRouter = require("./routers/waterRouter");
const supplyRouter = require("./routers/supplyRouter");
const loginRouter = require("./routers/loginRouter");
const registerRouter = require("./routers/registerRouter");

const config = require("./config");

// Variables
const port = process.env.PORT || 3000;
const app = express();

/*mongoose.connect(config).catch(function(err) {
    if (err) {
        console.error(`Failed to connect to MongoDB with URI: ${mongoURI}`);
        console.error(err.stack);
        process.exit(1);
    }
    console.log(`Connected to MongoDB with URI: ${mongoURI}`);
});
*/

// Parse requests of content-type 'application/json'
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
// HTTP request logger
app.use(morgan("dev"));
// Enable cross-origin resource sharing for frontend must be registered before api
app.options("*", cors());
app.use(cors());

// Connect to database
mongoose.connect(config.database, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB Atlas");
});

mongoose.connection.on("error", (err) => {
  console.error(`MongoDB Atlas connection error: ${err}`);
});

// Import routes
app.get("/api", function (req, res) {
  res.json({ message: "Welcome to your DIT342 backend ExpressJS project!" });
});

app.use("/persons", personRouter);
app.use("/house", houseRouter);
app.use("/water", waterRouter);
app.use("/supplies", supplyRouter);


app.use("/v1/register", registerRouter);
app.use("/v1/login", loginRouter);
app.use("/v1/profile", userRouter);
app.use("/v1/profile/:userid/food", foodRouter);

/* New endpoint structure, replace old when you are making changes to your entity.

app.use(${version}/profile/:userid/people, personRouter);
app.use(${version}/profile/:userid/water, waterRouter);
app.use(${version}/profile/:userid/supplies, supplyRouter);*/

// Catch all non-error handler for api (i.e., 404 Not Found)
app.use("/api/*", function (req, res) {
  res.status(404).json({ message: "Not Found" });
});

// Configuration for serving frontend in production mode
// Support Vuejs HTML 5 history mode
app.use(history());
// Serve static assets
var root = path.normalize(__dirname + "/..");
var client = path.join(root, "client", "dist");
app.use(express.static(client));

// Error handler (i.e., when exception is thrown) must be registered last
var env = app.get("env");
// eslint-disable-next-line no-unused-vars
app.use(function (err, req, res, next) {
  console.error(err.stack);
  var err_res = {
    message: err.message,
    error: {},
  };
  if (env === "development") {
    // Return sensitive stack trace only in dev mode
    err_res["error"] = err.stack;
  }
  res.status(err.status || 500);
  res.json(err_res);
});

app.listen(port, function (err) {
  if (err) throw err;
  console.log(`Express server listening on port ${port}, in ${env} mode`);
  console.log(`Backend: http://localhost:${port}/api/`);
  console.log(`Frontend (production): http://localhost:${port}/`);
});

module.exports = app;
