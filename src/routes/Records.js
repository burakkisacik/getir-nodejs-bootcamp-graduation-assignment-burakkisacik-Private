const express = require("express");

const validate = require("../middleware/validate");

const schemas = require("../validations/Records");

const { getFilteredRecords } = require("../controller/Records");

const router = express.Router();

router
  .route("/")
  .post(validate(schemas.getFilteredRecordsValidation), getFilteredRecords);

module.exports = router;
