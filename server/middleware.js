const paginatedResults = (model) => {
  return async (req, res, next) => {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const sortOrder = req.query.sortOrder;

    const startIndex = (page - 1) * limit;
    const endIndex = (page) * limit;

    // const results = {}

    // if (startIndex > 0) {
    //   results.previous = {
    //     page: page - 1,
    //     limit: limit
    //   }
    // }

    // if (endIndex < await model.countDocuments().exec()) {
    //   results.next = {
    //     page: page + 1,
    //     limit: limit
    //   }
    // }

    if (sortOrder) {
      res.paginatedResults = await model.find().sort({ [sortOrder]: 1 }).limit(limit).skip(startIndex).exec()
    } else {
      res.paginatedResults = await model.find().limit(limit).skip(startIndex).exec()
    }
    res.totalCount = await model.count().exec();
    next();
  }
}

module.exports = { paginatedResults }