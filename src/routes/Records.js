const express = require("express");

const { getFilteredRecords } = require("../controller/Records");

const router = express.Router();

router.route("/").post(getFilteredRecords);

module.exports = router;
