const ErrorResponse = require("../utils/ErrorResponse");
const asyncHandler = require("../middleware/asyncHandler");
const { findByDateAndCountRange } = require("../services/Records");

const getFilteredRecords = asyncHandler(async (req, res, next) => {
  const filteredRecords = await findByDateAndCountRange(req.body);

  if (filteredRecords.length < 1) {
    return next(new ErrorResponse("Not found", 404));
  }

  const records = filteredRecords.map((record) => ({
    key: record.key,
    createdAt: record.createdAt,
    totalCount: record.total_count.sum,
  }));

  const responsePayload = {
    code: 0,
    msg: "success",
    records,
  };

  res.status(200).json(responsePayload);
});

module.exports = {
  getFilteredRecords,
};
