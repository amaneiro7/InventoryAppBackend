const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

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
    const model = await models.Models.findAll();
    return model
  }

  async findOne(id) {
    const model = await models.Models.findByPk(id, {
      include: ['category', 'item', 'branch']
    });
    if (!model) {
      throw boom.notFound('modelo no existe')
    }
    return model
  }

  //PATCH
  async update(id, changes) {
    const model = await this.findOne(id);
    const res = await model.models.update(changes);
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
