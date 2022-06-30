const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

const HttpError = require('../models/http-error');
const User = require('../models/user');

const getUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find({}, '-password');
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not find users.',
      500
    );
    return next(error);
  }
  res.json({ users: users.map((user) => user.toObject({ getters: true })) });
};

const signup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    return next(
      new HttpError(`Invalid inputs passed, please check your data.`, 422)
    );
  }

  const { name, email, password } = req.body;

  let alreadySignedUp;
  try {
    alreadySignedUp = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not sign up.',
      500
    );
    return next(error);
  }

  if (alreadySignedUp) {
    const error = new HttpError(
      'User already exists, please login instead.',
      422
    );
    return next(error);
  }

  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 11);
  } catch (err) {
    const error = new HttpError('Something went wrong, could not sign up.', 500);
    return next(error);
  }

  const createdUser = new User({
    name: name,
    email: email,
    image: req.file.path,
    password: hashedPassword,
    places: [],
  });

  try {
    await createdUser.save();
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not sign up.',
      500
    );
    return next(error);
  }

  res.status(201).json({ user: createdUser.toObject({ getters: true }) });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  let alreadySignedUp;
  try {
    alreadySignedUp = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError('Something went wrong, could not log in.', 500);
    return next(error);
  }

  if (!alreadySignedUp) {
    const error = new HttpError('Invalid credentials, could not log in.', 401);
    return next(error);
  }

  let isValidPassword;
  try {
    isValidPassword = await bcrypt.compare(password, alreadySignedUp.password);
  } catch (err) {
    const error = new HttpError('Something went wrong, could not log in.', 500);
    return next(error);
  }

  if (!isValidPassword) {
    const error = new HttpError('Invalid credentials, could not log in.', 401);
    return next(error);
  }

  res.json({
    message: 'Logged in',
    user: alreadySignedUp.toObject({ getters: true }),
  });
};

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
