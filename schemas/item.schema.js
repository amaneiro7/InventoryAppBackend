const Joi = require('joi');

const id = Joi.number().integer();
const serial = Joi.string().allow(null).allow('').optional();
const activo = Joi.string().allow(null).allow('').optional();
const categoryId = Joi.number().integer();
const branchId = Joi.number().integer();
const modelId = Joi.number().integer();


const createItemSchema = Joi.object({
  serial: serial,
  activo: activo,
  categoryId: categoryId.required(),
  branchId: branchId.required(),
  modelId: modelId.required()
});

const updateItemSchema = Joi.object({
  serial,
  activo,
  categoryId,
  branchId,
  modelId
});

const getItemSchema = Joi.object({
  id: id.required(),
});

module.exports = { createItemSchema, updateItemSchema, getItemSchema };
