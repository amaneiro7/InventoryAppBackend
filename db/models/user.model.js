const { Model, DataTypes, Sequelize } = require('sequelize');
const bcrypt  = require('bcrypt')

const USER_TABLE = 'user';

const UserSchema = {
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
  lastname: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true,
  },
  username: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true,
  },
  password: {
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

class User extends Model {
  static associate() {
    //
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: USER_TABLE,
      modelName: 'User',
      timestamps: false,
      hooks: {
        beforeCreate: async (user) => user.password = await bcrypt.hash(user.password, 10)
      }
    }
  }
};

module.exports = { UserSchema, USER_TABLE, User}
