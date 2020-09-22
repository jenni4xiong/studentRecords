const paginatedResults = (model) => {
  console.log('hitting paginated results')
  return async (req, res, next) => {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);

    const startIndex = (page - 1) * limit;
    const endIndex = (page) * limit;

    const results = {}

    if (startIndex > 0) {
      results.previous = {
        page: page - 1,
        limit: limit
      }
    }
    if (endIndex < await model.countDocuments().exec()) {
      results.next = {
        page: page + 1,
        limit: limit
      }
    }
    results.results = await model.find().limit(limit).skip(startIndex).exec()
    res.paginatedResults = results;
    next();
  }
}

module.exports = { paginatedResults }