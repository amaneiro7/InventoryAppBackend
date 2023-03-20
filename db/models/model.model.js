const { Model, DataTypes, Sequelize } = require('sequelize');
const { BRAND_TABLE } = require('./brand.model');
const { CATEGORY_TABLE } = require('./category.model');

const MODEL_TABLE = 'model';

const ModelSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  name: {
    allowNull: true,
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
    references: {
      model: BRAND_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
  categoryId: {
    field: 'category_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: CATEGORY_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  }
};

class Models extends Model {
  static associate(models) {
    this.belongsTo(models.Category, { as: 'category' }),
    this.belongsTo(models.Brand, { as: 'brand' }),
    this.hasMany(models.Item, {
      as: 'item',
      foreignKey: 'modelId',
  })
}

  static config(sequelize) {
    return {
      sequelize,
      tableName: MODEL_TABLE,
      modelName: 'Models',
      timestamps: false,
    }
  }
};

module.exports = { ModelSchema, MODEL_TABLE, Models}
