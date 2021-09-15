const Card = require('../models/card');
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');

const getAllCards = async (req, res, next) => {
  try {
    res.send(await Card.find({}));
  } catch (err) {
    next(err);
  }
};

const createCard = async (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  try {
    res.send(await Card.create({ name, link, owner }));
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(new BadRequestError(`Переданы некорректные данные при создании карточки.
      В поле ${err.message.replace('card validation failed: ', '')}`));
    }
    next(err);
  }
};

const deleteCard = async (req, res, next) => {
  try {
    const owner = req.user._id;
    const card = await Card.findById(req.params.id);
    if (!card) {
      throw new NotFoundError('Карточка с указанным id не найдена');
    }
    if (owner === card.owner.toString()) {
      await Card.findByIdAndRemove(req.params.id);
      res.send({ message: 'пост удален' });
    }
    throw new ForbiddenError('Вы не можете удалять карточки других пользователей');
  } catch (err) {
    next(err);
  }
};

const likeCard = async (req, res, next) => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    );
    if (!card) {
      throw new NotFoundError('Карточка с указанным id не найдена');
    }
    res.send(card);
  } catch (err) {
    next(err);
  }
};

const dislikeCard = async (req, res, next) => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } },
      { new: true },
    );
    if (!card) {
      throw new NotFoundError('Карточка с указанным id не найдена');
    }
    res.send(card);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
