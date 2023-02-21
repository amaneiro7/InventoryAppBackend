const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string();

const createModelSchema = Joi.object({
  name: name.required(),
});

const updateModelSchema = Joi.object({
  name
})

const getModelSchema = Joi.object({
  id: id.required(),
})

module.exports =  { createModelSchema, updateModelSchema, getModelSchema };
