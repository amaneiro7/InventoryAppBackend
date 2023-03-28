const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string().min(3);
const lastanme = Joi.string().min(3);
const email = Joi.string().email(3);
const username = Joi.string().min(3);
const password = Joi.string().min(8);

const createUserSchema = Joi.object({
  name: name.required(),
  lastanme: lastanme.required(),
  email: email.required(),
  username: username.required(),
  password: password.required(),
});

const updateUserSchema = Joi.object({
  name,
  lastanme,
  email,
  username,
  password
});

const getUserSchema = Joi.object({
  id: id.required(),
});

module.exports = { createUserSchema, updateUserSchema, getUserSchema };
