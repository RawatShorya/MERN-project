const ErrorHander = require("../utils/errorhander");

//For Showing if a particular thing isn't present
module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  //Wrong Mongodb Id error
  if (err.name == "CastError") {
    const message = `Resource Not Found. Invalid: ${err.path}`;
    err = new ErrorHander(message, 400);
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};
