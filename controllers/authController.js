const crypto = require('crypto');
const { JWT_EXPIRES_IN, JWT_SECRET } = require('../config/config');
const User = require('./../models/user.model');
const appError = require('../utils/appError');
const jwt = require('jsonwebtoken');
const catchAsync = require('./../utils/catchAsync');

const signToken = (id) => {
  return jwt.sign({ id }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN
  });
};

const createSendToken = (user, statusCode, req, res) => {
  const token = signToken(user._id);

  user.password = undefined;
  res.status(statusCode).json({
    status: 'success',
    token,
    user
  });
};

exports.signUp = catchAsync(async (req, res, next) => {
  if (!req.body.nickName || !req.body.password) {
    return next(new appError('Please pass nick name and password', 400));
  }
  const isNickNameTaken = await User.findOne({
    nickName: req.body.nickName
  });
  if (isNickNameTaken) {
    return next(
      new appError('Nick name already taken,Please choose somthing else', 400)
    );
  }
  const newUser = await User.create({
    nickName: req.body.nickName,
    password: req.body.password
  });
  createSendToken(newUser, 201, req, res);
});

exports.login = catchAsync(async (req, res, next) => {
  const { nickName, password } = req.body;

  if (!nickName || !password) {
    return next(new appError('please provide email and password', 400));
  }

  const user = await User.findOne({ nickName }).select('+password');

  console.log('user:', user);

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new appError('incorrect email or password', 401));
  }

  createSendToken(user, 200, req, res);
});
