const Joi = require('joi');

const id = Joi.number().integer();
const serial = Joi.string().allow(null).allow('').optional();
const activo = Joi.string().allow(null).allow('').optional();
const status = Joi.boolean();
const obsolete = Joi.boolean();
const categoryId = Joi.number().integer();
const brandId = Joi.number().integer();
const modelId = Joi.number().integer();

const createItemSchema = Joi.object({
  serial: serial,
  activo: activo,
  status: status.required(),
  obsolete: obsolete.required(),
  categoryId: categoryId.required(),
  brandId: brandId.required(),
  modelId: modelId.required()
});

const updateItemSchema = Joi.object({
  serial,
  activo,
  status,
  obsolete,
  categoryId,
  brandId,
  modelId
});

const getItemSchema = Joi.object({
  id: id.required(),
});

module.exports = { createItemSchema, updateItemSchema, getItemSchema };
