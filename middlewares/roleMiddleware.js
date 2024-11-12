const roleCheck =
  (...roles) =>
  (req, res, next) => {
    console.log(req.user, roles); // Log user details for debugging
    if (!req.user) {
      return res.status(401).json({ message: 'User not authenticated' });
    }
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Access denied' });
    }

    next();
  };

module.exports = roleCheck;
