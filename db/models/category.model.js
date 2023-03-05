const { Model, DataTypes, Sequelize } = require('sequelize');
const { BRAND_TABLE } = require('./brand.model');

const CATEGORY_TABLE = 'category';

const CategorySchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true,
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW
  },
  brandId: {
    field: 'brand_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    defaultValue: 1,
    references: {
      model: BRAND_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
};
class Category extends Model {
  static associate(models) {
    this.belongsTo(models.Brand, { as: 'brand' }),
    this.hasMany(models.Item, {
      as: 'item',
      foreignKey: 'categoryId'
    })
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: CATEGORY_TABLE,
      modelName: 'Category',
      timestamps: false,
    }
  }
};

module.exports = { CategorySchema, CATEGORY_TABLE, Category}
