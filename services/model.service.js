const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');
const { Brand } = require('../db/models/brand.model')
const { Item } = require('../db/models/item.model');
const { Category } = require('../db/models/category.model');

class ModelService {

  constructor() {

  }

  //POST
  async create(data) {
    const newModel = await models.Models.create(data)
    return newModel
  }

  //GET
  async find(req) {
    let where = {}
    if (req.query.brandId) {
      where.brandId = req.query.brandId
    }
    if (req.query.name) {
      where.name = req.query.name
    }
    const model = await models.Models.findAll({
      where: where,
      include: [
        {
          model: Brand,
          as: 'brand',
          required: false,
        },
        {
          model: Category,
          as: 'category',
          required: false,
        },
        {
          model: Item,
          as: 'item',
          required: false
        }
      ],
    });
    return model
  }
  async findOneFilter(brandId) {
    const model = await models.Models.findAll({
      where: {
        brandId: brandId
      }
    });
    if (!model) {
      throw boom.notFound('modelo no existe')
    }
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
