const express = require('express');
const categoriesRouter = require('./categories.router');
const itemsRouter = require('./items.router');
const brandRouter = require("./brand.router.js");
const modelsRouter = require("./model.router.js");
const usersRouter = require("./user.router.js");


function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router)
  router.use('/categories', categoriesRouter);
  router.use('/items', itemsRouter);
  router.use('/brand', brandRouter);
  router.use('/models', modelsRouter);
  router.use('/users', usersRouter);
};

module.exports = routerApi;
