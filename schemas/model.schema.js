const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string();
const brandId = Joi.number().integer();

const createModelSchema = Joi.object({
  name: name.required(),
  brandId: brandId.required()
});

const updateModelSchema = Joi.object({
  name,
  brandId
})

const getModelSchema = Joi.object({
  id: id.required(),
})

module.exports =  { createModelSchema, updateModelSchema, getModelSchema };
