const User = require('../models/user.model');
const catchAsync = require('../utils/catchAsync');
const appError = require('../utils/appError');

const getUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.query.userId);
  if (!user) {
    return next(new appError('could not find the user with given id', 404));
  }
  res.status(200).json({ status: 'success', user });
});

module.exports = { getUser };
