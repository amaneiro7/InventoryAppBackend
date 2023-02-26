const express = require('express');
const CategoryService = require("../services/category.service.js");
const validatorHandler = require("../middlewares/validator.handler.js");
const { createCategorySchema, getCategorySchema, updateCategorySchema } = require("../schemas/category.schema.js");

const router = express.Router();
const service = new CategoryService();

//POST
router.post('/',
  validatorHandler(createCategorySchema, 'body'),
  async (request, response, next) => {
    try {
      const body = request.body;
      const newCategory = await service.create(body);
      response.status(201).json(newCategory);
    } catch (error) {
      next(error)
    };
  });

//GET
router.get('/', async (request, response, next) => {
  try {
    const categories = await service.find();
    response.json(categories);
  } catch (error) {
    next(error);
  };
});

router.get('/:id',
  validatorHandler(getCategorySchema, 'params'),
  async (request, response, next) => {
    try {
      const { id } = request.params;
      const category = await service.findOne(id);
      response.json(category);
    } catch (error) {
      next(error)
    }
  });

//PATCH
router.patch('/:id',
  validatorHandler(getCategorySchema, 'params'),
  validatorHandler(updateCategorySchema, 'body'),
  async (request, response, next) => {
    try {
      const { id } = request.params;
      const body = request.body;
      const category = await service.update(id, body);
      response.json(category)
    } catch (error) {
      next(error)
    };
  });

//DELETE
router.delete('/:id',
  validatorHandler(getCategorySchema, 'params'),
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
