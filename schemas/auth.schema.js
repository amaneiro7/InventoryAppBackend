const Joi = require('joi');

const username = Joi.string().email();
const password = Joi.string().min(8);

const loginAuthSchema = Joi.object({
  username: username.required(),
  password: password.required(),
});

module.exports = { loginAuthSchema };
