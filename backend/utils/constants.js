const SETUP_MONGO = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
};

const URL_MONGO = 'mongodb://localhost:27017/mestodb';

module.exports = {
  SETUP_MONGO,
  URL_MONGO,
};
