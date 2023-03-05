const { Model, DataTypes, Sequelize } = require('sequelize');

const BRAND_TABLE = 'brand';

const BrandSchema = {
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
};

class Brand extends Model {
  static associate(models) {
    this.hasMany(models.Item, {
      as: 'item',
      foreignKey: 'brandId'
    }),
    this.hasMany(models.Models, {
      as: 'model',
      foreignKey: 'brandId'
    })
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: BRAND_TABLE,
      modelName: 'Brand',
      timestamps: false,
    }
  }
};

module.exports = { BrandSchema, BRAND_TABLE, Brand}
