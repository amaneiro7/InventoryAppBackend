const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

class UserService {

  constructor() {

  }

  //POST
  async create(data) {
    const newUser = await models.User.create(data)
    delete newUser.dataValues.password;
    return newUser
  };
  //GET
  async find() {
    const users = await models.User.findAll();
    return users;
  }

  async findOne(id) {
    const user = await models.User.findByPk(id);
    if (!user) {
      throw boom.notFound('categoria no existe')
    }
    return user
  }

  //PATCH
  async update(id, changes) {
    const user = await this.findOne(id);
    const res = await user.update(changes);
    return res
  }

  //DELETE
  async delete(id) {
    const user = await this.findOne(id);
    await user.destroy();
    return { id };
  }

}

module.exports = UserService;
