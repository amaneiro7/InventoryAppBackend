const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');
const { Brand } = require('../db/models/brand.model')
const { Item } = require('../db/models/item.model')


class ModelService {

  constructor() {

  }

  //POST
  async create(data) {
    const newModel = await models.Models.create(data)
    return newModel
  }

  //GET
  async find() {
    const model = await models.Models.findAll({
      include: [
        {
          model: Brand,
          as: 'brand',
          required: false
        },
        {
          model: Item,
          as: 'item',
          required: false
        },
      ],
    });
    return model
  }

  async findOne(id) {
    const model = await models.Models.findByPk(id);
    if (!model) {
      throw boom.notFound('modelo no existe')
    }
    return model
  }

  //PATCH
  async update(id, changes) {
    const model = await this.findOne(id);
    const res = await model.update(changes);
    return res
  }

  //DELETE
  async delete(id) {
    const model = await this.findOne(id);
    await model.destroy()
    return { id }
  }
}

module.exports = ModelService;
