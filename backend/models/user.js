const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: {
      // eslint-disable-next-line no-useless-escape
      validator: (v) => /^https?:\/\/(www\.)?[a-z0-9-._~:\/?#[\]@!$&'()*+,;=]*#?/i.test(v),
      message: 'Указан невалидный формат ссылки',
    },
  },
  email: {
    type: String,
    require: true,
    unique: true,
    validate: {
      validator: (v) => validator.isEmail(v),
      message: 'Указан невалидный формат почты',
    },
  },
  password: {
    type: String,
    require: true,
    select: false,
    minlength: 8,
  },
}, {
  versionKey: false,
});

module.exports = mongoose.model('user', userSchema);
