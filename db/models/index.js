
const { Category, CategorySchema } = require('./category.model');
const { Item, ItemSchema } = require('./item.model');
const { Brand, BrandSchema } = require('./brand.model');
const { Models, ModelSchema } = require('./model.model');

function SetupModels(sequelize) {
  Category.init(CategorySchema, Category.config(sequelize));
  Item.init(ItemSchema, Item.config(sequelize));
  Brand.init(BrandSchema, Brand.config(sequelize));
  Models.init(ModelSchema, Models.config(sequelize));

  Category.associate(sequelize.models);
  Item.associate(sequelize.models);
  Brand.associate(sequelize.models);
  Models.associate(sequelize.models);
};

module.exports = SetupModels;
