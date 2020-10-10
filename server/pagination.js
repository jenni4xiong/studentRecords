const e = require("express");

const paginatedResults = (model) => {
  return async (req, res, next) => {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const sortBy = req.query.sortBy;
    const order = req.query.order

    const startIndex = (page - 1) * limit;

    console.log('LIMIT', limit)
    if (sortBy) {
      console.log('sortBy', sortBy)
      res.paginatedResults = await model.find().sort({ [sortBy]: parseInt(order) }).limit(limit).skip(startIndex).exec()
    } else {
      res.paginatedResults = await model.find().limit(limit).skip(startIndex).exec()
    }

    res.totalCount = await model.countDocuments().exec();
    next();
  }
}

module.exports = paginatedResults