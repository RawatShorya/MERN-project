//For Removing Errors regarding catch and async, genrally happens when a parameter is a must and isn't passed.
module.exports = (theFunc) => (req, res, next) => {
  Promise.resolve(theFunc(req, res, next)).catch(next);
};
