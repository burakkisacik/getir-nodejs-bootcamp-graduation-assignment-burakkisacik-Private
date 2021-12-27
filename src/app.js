const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");
const cors = require("cors");
const colors = require("colors");

const ErrorResponse = require("./utils/ErrorResponse");
const errorHandler = require("./middleware/error");

const config = require("./config");
const loaders = require("./loaders");

config();
loaders();

// Routes
const { RecordRoute } = require("./routes");

const app = express();

app.use(express.json());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Sanitize data
app.use(mongoSanitize());

// Set security headers
app.use(helmet());

// Prevent XSS attacks
app.use(xss());

// Prevent parameter pollution
app.use(hpp());

// Enable CORS
/* 
  For further front end development the cors config should be as follows
*/
app.use(
  cors({
    methods: "*",
    origin: "*",
  })
);

// Mount Routes
app.use("/api/v1/records", RecordRoute);

// Unhandled routes
app.use("*", (req, res, next) => {
  next(
    new ErrorResponse(
      `Endpoint not found : ${req.method} ${req.originalUrl}`,
      404
    )
  );
});

app.use(errorHandler);

module.exports = app;
