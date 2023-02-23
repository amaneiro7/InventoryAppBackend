const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

class BranchService {

  constructor() {

  }

//POST
  async create(data) {
      const newBranch = await models.Branch.create(data)
      return newBranch
  };
//GET
  async find() {
    const branchs = await models.Branch.findAll();
    return branchs;
  }

  async findOne(id) {
    const branch = await models.Branch.findByPk(id);
    if (!branch) {
      throw boom.notFound('no existe esa Marca')
    }
    return branch
  }
  //PATCH
  async update(id, changes) {
    const branch = await this.findOne(id);
    const res = await branch.models.update(changes);
    return res
  }
  //DELETE
  async delete(id) {
    const branch = await this.findOne(id);
    await branch.destroy();
    return { id };
  }
}

module.exports = BranchService;
