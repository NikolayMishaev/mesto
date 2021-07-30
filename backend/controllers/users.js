const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const ConflictError = require('../errors/ConflictError');
const UnauthorizedError = require('../errors/UnauthorizedError');

const { NODE_ENV, JWT_SECRET } = process.env;

const getDataUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      throw new NotFoundError('Пользователь по указанному id не найден');
    }
    res.send(user);
  } catch (err) {
    if (err.name === 'CastError') {
      next(new BadRequestError('Указан не валидный номер id пользователя'));
    }
    next(err);
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      throw new UnauthorizedError('Неправильные почта или пароль');
    }
    const matched = await bcrypt.compare(password, user.password);
    if (!matched) {
      throw new UnauthorizedError('Неправильные почта или пароль');
    }
    const token = jwt.sign(
      { _id: user._id },
      NODE_ENV === 'production' ? JWT_SECRET : 'protected-key',
      { expiresIn: '7d' },
    );
    res.send({ token });
  } catch (err) {
    next(err);
  }
};

const getAllUsers = async (req, res, next) => {
  try {
    res.send(await User.find({}));
  } catch (err) {
    next(err);
  }
};

const getUserId = async (req, res, next) => {
  try {
    const user = (await User.findById(req.params.id));
    if (!user) {
      throw new NotFoundError('Пользователь по указанному id не найден');
    }
    res.send(user);
  } catch (err) {
    next(err);
  }
};

const createUser = async (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  try {
    const hashPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name, about, avatar, email, password: hashPassword,
    });
    res.send({
      name: user.name, about: user.about, avatar: user.avatar, user: user.email,
    });
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(
        new BadRequestError(
          `Переданы некорректные данные при создании пользователя. В поле ${err.message.replace(
            'user validation failed: ',
            '',
          )}`,
        ),
      );
    }
    if (err.name === 'MongoError' && err.code === 11000) {
      next(new ConflictError('Пользователь с таким email уже зарегистрирован'));
    }
    next(err);
  }
};

const updateDataUser = async (req, res, next) => {
  const { name, about } = req.body;
  try {
    res.send(await User.findByIdAndUpdate(
      req.user._id,
      { name, about },
      {
        new: true,
        runValidators: true,
        upsert: true,
      },
    ));
  } catch (err) {
    if (err.name === 'CastError') {
      next(new NotFoundError('Пользователь с указанным id не найден'));
    }
    next(err);
  }
};

const updateUserAvatar = async (req, res, next) => {
  const { avatar } = req.body;
  try {
    res.send(await User.findByIdAndUpdate(
      req.user._id,
      { avatar },
      {
        new: true,
        runValidators: true,
        upsert: true,
      },
    ));
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(
        new BadRequestError(
          `Переданы некорректные данные при обновлении поля ${err.message.replace(
            'Validation failed: ',
            '',
          )}`,
        ),
      );
    }
    if (err.name === 'CastError') {
      next(new NotFoundError('Пользователь с указанным id не найден'));
    }
    next(err);
  }
};

module.exports = {
  getAllUsers,
  getUserId,
  createUser,
  updateDataUser,
  updateUserAvatar,
  login,
  getDataUser,
};
