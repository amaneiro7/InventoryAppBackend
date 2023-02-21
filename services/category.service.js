const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

class CategoryService {

  constructor() {

  }

//POST
  async create(data) {
      const newCategory = await models.Category.create(data)
      return newCategory
  };
//GET
  async find() {
    const categories = await models.Category.findAll();
    return categories;
  }

  async findOne(id) {
    const category = await models.Category.findByPk(id, {
      include: ['branch', 'model', 'specs']
    });
    if (!category) {
      throw boom.notFound('categoria no existe')
    }
    return category
  }

  //PATCH
  async update(id, changes) {
    const category = await models.Category.findOne(id);
    const res = await category.models.update(changes);
    return res
  }

  //DELETE
  async delete(id) {
    const category = await models.Category.findOne(id);
    await category.destroy();
    return { id };
  }

}

module.exports = CategoryService;
