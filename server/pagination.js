const e = require("express");

const paginatedResults = (model) => {
  return async (req, res, next) => {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const sortOrder = req.query.sortOrder;
    const order = req.query.order

    const startIndex = (page - 1) * limit;

    if (sortOrder) {
      if (order === '1') res.paginatedResults = await model.find().sort({ [sortOrder]: 1 }).limit(limit).skip(startIndex).exec()
      else res.paginatedResults = await model.find().sort({ [sortOrder]: -1 }).limit(limit).skip(startIndex).exec()
    } else res.paginatedResults = await model.find().limit(limit).skip(startIndex).exec()
    res.totalCount = await model.countDocuments().exec();
    next();
  }
}

module.exports = paginatedResults