const { findByDateAndCountRange } = require("../services/Records");

const getFilteredRecords = async (req, res) => {
  try {
    const filteredRecords = await findByDateAndCountRange(req.body);

    res.status(200).send(filteredRecords);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  getFilteredRecords,
};
