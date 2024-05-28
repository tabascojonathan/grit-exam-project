const auth = function isAuthenticated(req, res, next) {
    if (req.session.authenticated && req.session.username) {
      req.isAuthenticated = true;
      console.log('User is authenticated')
    } else {
      req.isAuthenticated = false;
      console.log('User is not authenticated')
    }
    next();
}
module.exports = auth;