const express = require("express");

const app = express();

app.use(express.json());

app.get("/api/v1/records", (req, res) => {
  res.status(200).send("hello");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
