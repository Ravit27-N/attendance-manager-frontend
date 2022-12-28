const Chart = require("../models/Chart");

exports.getdatetoday = async (req, res, next) => {
  try {
    const [data, _] = await Chart.count_year_dapartment_today();

    res.status(200).json({ message:"success", data });

  } catch (error) {
    next(error);
  }
};

