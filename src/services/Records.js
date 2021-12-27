const Records = require("../models/Records");

const findByDateAndCountRange = ({
  startDate,
  endDate,
  minCount,
  maxCount,
}) => {
  return Records.aggregate([
    {
      $match: {
        createdAt: { $gte: new Date(startDate), $lte: new Date(endDate) },
      },
    },
    {
      $project: {
        key: "$key",
        createdAt: "$createdAt",
        total_count: {
          $reduce: {
            input: "$counts",
            initialValue: { sum: 0 },
            in: {
              sum: { $add: ["$$value.sum", "$$this"] },
            },
          },
        },
      },
    },
    {
      $match: { "total_count.sum": { $gt: minCount, $lt: maxCount } },
    },
  ]);
};

module.exports = {
  findByDateAndCountRange,
};
