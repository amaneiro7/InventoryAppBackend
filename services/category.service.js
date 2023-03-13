const boom = require('@hapi/boom');
const { Brand } = require('../db/models/brand.model');
const { Item } = require('../db/models/item.model');
const { Models } = require('../db/models/model.model');
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
    const categories = await models.Category.findAll({
      include: [
        {
          model: Item,
          as: 'item',
          required: false,
          include: [
            {
              model: Brand,
              as: 'brand',
              required: false
            },
            {
              model: Models,
              as: 'model',
              required: false
            },

          ]
        },
      ],
    });
    return categories;
  }

  async findOne(id) {
    const category = await models.Category.findByPk(id);
    if (!category) {
      throw boom.notFound('categoria no existe')
    }
    return category
  }

  //PATCH
  async update(id, changes) {
    const category = await this.findOne(id);
    const res = await category.update(changes);
    return res
  }

  //DELETE
  async delete(id) {
    const category = await this.findOne(id);
    await category.destroy();
    return { id };
  }

}

module.exports = CategoryService;
