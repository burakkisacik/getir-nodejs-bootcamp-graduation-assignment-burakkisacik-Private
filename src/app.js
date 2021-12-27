const express = require("express");

// Routes
const { RecordRoute } = require("./routes");

const app = express();

app.use(express.json());

// Mount Routes
app.use("/api/v1/records", RecordRoute);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});