function errorHandler(error, _req, res, _next) {
  console.log(error);
  res.send({ error: "something went wrong" });
}

module.exports = errorHandler;
