const express = require("express");
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

// Mount Routes
app.use("/api/v1/records", RecordRoute);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
