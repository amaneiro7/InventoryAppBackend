const boom = require('@hapi/boom');
const { Brand } = require('../db/models/brand.model');
const { Category } = require('../db/models/category.model');
const { Models } = require('../db/models/model.model');
const { models } = require('../libs/sequelize');


class ItemService {

  constructor() {

  }

//POST
  async create(data) {
      const newItem = await models.Item.create(data)
      return newItem
  };
//GET
  async find() {
    const items = await models.Item.findAll({
      include: [
        {
          model: Category,
          as: 'category',
          required: false
        },
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
      ],
    });
    return items;
  }

  async findOne(id) {
    const item = await models.Item.findByPk(id,
      {
        include: [
          {
            model: Category,
            as: 'category',
            required: false
          },
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
        ],
      });
    if (!item) {
      throw boom.notFound('item no existe')
    }
    return item
  }

  //PATCH
  async update(id, changes) {
    const item = await this.findOne(id);
    const res = await item.update(changes);
    return res
  }

  //DELETE
  async delete(id) {
    const item = await this.findOne(id);
    await item.destroy();
    return { id };
  }

}

module.exports = ItemService;
