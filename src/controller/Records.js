const ErrorResponse = require("../scripts/utils/ErrorResponse");
const asyncHandler = require("../middleware/asyncHandler");
const { findByDateAndCountRange } = require("../services/Records");
const logger = require("../scripts/logger/winston");

/* 
  @desc    Filter records by date and count range
  @route   POST /api/v1/records
  @access  public
*/
const getFilteredRecords = asyncHandler(async (req, res, next) => {
  const filteredRecords = await findByDateAndCountRange(req.body);

  if (filteredRecords.length < 1) {
    return next(new ErrorResponse("Not found", 404));
  }

  logger.log({
    level: "info",
    endpoint: `${req.method} ${req.originalUrl}`,
    recordsIDs: filteredRecords.map((record) => record._id),
  });

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
