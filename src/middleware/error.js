const logger = require("../scripts/logger/winston");

const errorHandler = (err, req, res, next) => {
  console.log(err.stack.red);

  logger.log({
    level: "error",
    endpoint: `${req.method} ${req.originalUrl}`,
    statusCode: err.statusCode,
    error: err.message,
  });

  res.status(err.statusCode || 500).json({
    code: 1,
    msg: err.message || "Internal server error",
  });
};

module.exports = errorHandler;
