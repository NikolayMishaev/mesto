const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const validator = require('validator');
const {
  getAllUsers,
  getUserId,
  updateDataUser,
  updateUserAvatar,
  getDataUser,
} = require('../controllers/users');
const BadRequestError = require('../errors/BadRequestError');

const method = (value) => {
  const result = validator.isURL(value);
  if (result) {
    return value;
  }
  throw new BadRequestError('указанный URL не прошел валидацию');
};

router.get('/me', getDataUser);

router.get('/', getAllUsers);

router.get('/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().hex().length(24),
  }),
}), getUserId);

router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(30).required(),
  }),
}), updateDataUser);

router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().custom(method),
  }),
}), updateUserAvatar);

module.exports = router;
