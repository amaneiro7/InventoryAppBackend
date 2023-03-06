const boom = require('@hapi/boom');
const { Category } = require('../db/models/category.model');
const { Item } = require('../db/models/item.model');
const { Models } = require('../db/models/model.model');
const { models } = require('../libs/sequelize');

class BrandService {

  constructor() {

  }

//POST
  async create(data) {
      const newBrand = await models.Brand.create(data)
      return newBrand
  };
//GET
  async find(req) {
    const brands = await models.Brand.findAll({
      include: [
        // {
        //   model: Category,
        //   as: 'category',
        //   required: false,
        //   where: {
        //     id: req.query.category
        //   }
        // },
        {
          model: Item,
          as: 'item',
          required: false
        },
        {
          model: Models,
          as: 'model',
          required: false
        },
      ],
    });
    return brands;
  }

  async findOne(id) {
    const brand = await models.Brand.findByPk(id,{
      include: [
        {
          model: Item,
          as: 'item',
          required: false
        },
        {
          model: Models,
          as: 'model',
          required: false
        },
      ],
    });
    if (!brand) {
      throw boom.notFound('no existe esa Marca')
    }
    return brand
  }
  //PATCH
  async update(id, changes) {
    const brand = await this.findOne(id);
    const res = await brand.update(changes);
    return res
  }
  //DELETE
  async delete(id) {
    const brand = await this.findOne(id);
    await brand.destroy();
    return { id };
  }
}

module.exports = BrandService;
