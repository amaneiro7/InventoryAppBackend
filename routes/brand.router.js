const express = require('express');
const BrandService = require("../services/brand.service.js");
const validatorHandler = require("../middlewares/validator.handler.js");
const { createBrandSchema, getBrandSchema, updateBrandSchema } = require("../schemas/brand.schema.js");

const router = express.Router();
const service = new BrandService();

//POST
router.post('/',
  validatorHandler(createBrandSchema, 'body'),
  async (request, response, next) => {
    try {
      const body = request.body;
      const newBrand = await service.create(body);
      response.status(201).json(newBrand);
    } catch (error) {
      next(error)
    };
  });

//GET
router.get('/',
  async (request, response, next) => {
    try {
      const brand = await service.find(request)
      response.json(brand)
    } catch (error) {
      next(error)
    }
  });
router.get('/:id',
  validatorHandler(getBrandSchema, 'params'),
  async (request, response, next) => {
    try {
      const { id } = request.params;
      const brand = await service.findOne(id)
      response.json(brand)
    } catch (error) {
      next(error)
    }
  });

//PATCH
router.patch('/:id',
  validatorHandler(getBrandSchema, 'params'),
  validatorHandler(updateBrandSchema, 'body'),
  async (request, response, next) => {
    try {
      const { id } = request.params;
      const body = request.body;
      const brand = await service.update(id, body)
      response.json(brand)
    } catch (error) {
      next(error)
    }
  });

//DELETE
router.delete('/:id',
  validatorHandler(getBrandSchema, 'params'),
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
