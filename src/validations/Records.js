const Joi = require("joi").extend(require("@joi/date"));

const getFilteredRecordsValidation = Joi.object({
  startDate: Joi.date().utc().format(["YYYY-MM-DD"]).required(),
  endDate: Joi.date().utc().format(["YYYY-MM-DD"]).required(),
  minCount: Joi.number().integer().min(0).required(),
  maxCount: Joi.number().integer().min(0).required(),
});

module.exports = {
  getFilteredRecordsValidation,
};
