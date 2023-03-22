const { Model, DataTypes, Sequelize } = require('sequelize');
const { CATEGORY_TABLE } = require('./category.model');
const { BRAND_TABLE } = require('./brand.model');
const { MODEL_TABLE } = require('./model.model');

const ITEM_TABLE = 'item';

const ItemSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  serial: {
    allowNull: true,
    type: DataTypes.STRING,
    unique: true,
  },
  activo: {
    allowNull: true,
    type: DataTypes.STRING,
    unique: true,
  },
  status: {
    allowNull: false,
    type: DataTypes.BOOLEAN,
  },
  obsolete: {
    allowNull: false,
    type: DataTypes.BOOLEAN,
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW
  },
  categoryId: {
    field: 'categroy_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: CATEGORY_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
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
  modelId: {
    field: 'model_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: MODEL_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  }
};

class Item extends Model {
  static associate(models) {
    this.belongsTo(models.Category, { as: 'category' }),
    this.belongsTo(models.Brand, { as: 'brand' }),
    this.belongsTo(models.Models, { as: 'model' })
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: ITEM_TABLE,
      modelName: 'Item',
      timestamps: false,
    }
  }
};

module.exports = { ItemSchema, ITEM_TABLE, Item}
