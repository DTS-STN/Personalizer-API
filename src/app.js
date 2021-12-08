const express = require("express");
const helmet = require("helmet");
const httpStatus = require("http-status");

require("dotenv/config");
const personalizaion = require("./routes/v1/personalization_route");
const { errorConverter, errorHandler } = require("./middlewares/error");
const ApiError = require("./utils/ApiError");

const app = express();

app.get("/", (req, res) => {
  res.json({
    status: "server is up",
  });
});

// set security HTTP headers
app.use(helmet());

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// actual business endpoints
app.use("/api/v1", personalizaion);

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, "Not found"));
});

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

module.exports = app;
