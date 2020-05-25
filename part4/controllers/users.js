const usersRouter = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');

usersRouter.get('/', async (request, response, next) => {
  const users = await User.find({});

  response.status(200).json(users.map((user) => user.toJSON()));
});

usersRouter.post('/', async (request, response, next) => {
  const body = request.body;
  console.log(body)

  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(body.password, saltRounds);

  const newUser = new User({
    username: body.username,
    name: body.name,
    passwordHash: hashedPassword,
  });

  const savedUser = await newUser.save();

  response.status(200).json(savedUser);
});

module.exports = usersRouter;
