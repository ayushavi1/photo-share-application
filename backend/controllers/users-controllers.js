const { v4: uuidv4 } = require('uuid');

const HttpError = require('../models/http-error');

let DUMMY_USERS = [
  {
    id: 'u1',
    name: 'John',
    email: 'test@gmail.com',
    password: 'tester',
  },
];

const getUsers = (req, res, next) => {
  res.json({ users: DUMMY_USERS });
};

const signup = (req, res, next) => {
  const { name, email, password } = req.body;

  const alreadySignedUp = DUMMY_USERS.find((u) => u.email === email);
  if (alreadySignedUp) {
    throw new HttpError(`User with email ${email} already exists.`, 422);
  }

  const createdUser = {
    id: uuidv4(),
    name: name,
    email: email,
    password: password,
  };

  DUMMY_USERS.push(createdUser);

  res.status(201).json({ user: createdUser });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  const user = DUMMY_USERS.find((u) => u.email === email);

  if (!user || user.password !== password) {
    return next(new HttpError('Invalid credentials.', 401));
  }

  res.json({ message: 'Logged in' });
};

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
