const express = require('express');
const ModelService = require("../services/model.service.js");
const validatorHandler = require("../middlewares/validator.handler.js");
const { createModelSchema, getModelSchema, updateModelSchema } = require("../schemas/model.schema.js");

const router = express.Router();
const service = new ModelService();

//POST
router.post('/',
  validatorHandler(createModelSchema, 'body'),
  async (request, response, next) => {
    try {
      const body = request.body;
      const newModel = await service.create(body);
      response.status(201).json(newModel);
    } catch (error) {
      next(error)
    };
  });

//GET
router.get('/',
  async (request, response, next) => {
    try {
      const model = await service.find(request)
      response.json(model)
    } catch (error) {
      next(error)
    }
  });
router.get('/:id',
  validatorHandler(getModelSchema, 'params'),
  async (request, response, next) => {
    try {
      const { id } = request.params;
      const model = await service.findOne(id)
      response.json(model)
    } catch (error) {
      next(error)
    }
  });

//PATCH
router.patch('/:id',
  validatorHandler(getModelSchema, 'params'),
  validatorHandler(updateModelSchema, 'body'),
  async (request, response, next) => {
    try {
      const { id } = request.params;
      const body = request.body;
      const model = await service.update(id, body)
      response.json(model)
    } catch (error) {
      next(error)
    }
  });

//DELETE
router.delete('/:id',
  validatorHandler(getModelSchema, 'params'),
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
