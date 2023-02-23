const express = require('express');
const ItemService = require("../services/item.service.js");
const validatorHandler = require("../middlewares/validator.handler.js");
const { createItemSchema, getItemSchema, updateItemSchema } = require("../schemas/item.schema");

const router = express.Router();
const service = new ItemService();

//POST
router.post('/',
  validatorHandler(createItemSchema, 'body'),
  async (request, response, next) => {
    try {
      const body = request.body;
      const newItem = await service.create(body);
      response.status(201).json(newItem);
    } catch (error) {
      next(error)
    };
  });

//GET
router.get('/', async (request, response, next) => {
  try {
    const items = await service.find();
    response.json(items);
  } catch (error) {
    next(error);
  };
});

router.get('/:id',
  validatorHandler(getItemSchema, 'params'),
  async (request, response, next) => {
    try {
      const { id } = request.params;
      const item = await service.findOne(id);
      response.json(item);
    } catch (error) {
      next(error)
    }
  });

//PATCH
router.patch('/:id',
  validatorHandler(getItemSchema, 'params'),
  validatorHandler(updateItemSchema, 'body'),
  async (request, response, next) => {
    try {
      const { id } = request.params;
      const body = request.body;
      const item = await service.update(id, body);
      response.json(item)
    } catch (error) {
      next(error)
    };
  });

//DELETE
router.delete('/:id',
  validatorHandler(getItemSchema, 'params'),
  async (request, response, next) => {
    try {
      const { id } = request.params;
      await service.delete(id);
      response.json(201).json({ id })
    } catch (error) {
      next(error)
    }
  });

module.exports = router;
