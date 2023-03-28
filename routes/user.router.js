const express = require('express');
const UserService = require("../services/user.services");
const validatorHandler = require("../middlewares/validator.handler.js");
const { createUserSchema, updateUserSchema, getUserSchema } = require("../schemas/user.schema");

const router = express.Router();
const service = new UserService();

//POST
router.post('/',
  validatorHandler(createUserSchema, 'body'),
  async (request, response, next) => {
    try {
      const body = request.body;
      const newUser = await service.create(body);
      response.status(201).json(newUser);
    } catch (error) {
      next(error)
    };
  });

//GET
router.get('/', async (request, response, next) => {
  try {
    const users = await service.find();
    response.json(users);
  } catch (error) {
    next(error);
  };
});

router.get('/:id',
  validatorHandler(getUserSchema, 'params'),
  async (request, response, next) => {
    try {
      const { id } = request.params;
      const user = await service.findOne(id);
      response.json(user);
    } catch (error) {
      next(error)
    }
  });

//PATCH
router.patch('/:id',
  validatorHandler(getUserSchema, 'params'),
  validatorHandler(updateUserSchema, 'body'),
  async (request, response, next) => {
    try {
      const { id } = request.params;
      const body = request.body;
      const user = await service.update(id, body);
      response.json(user)
    } catch (error) {
      next(error)
    };
  });

//DELETE
router.delete('/:id',
  validatorHandler(getUserSchema, 'params'),
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
