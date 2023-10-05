const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../config');
const Todo = require('./todo');
class User extends Model {}

User.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    username: {
      type: DataTypes.STRING,
    },
    pin: {
      type: DataTypes.STRING,
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
  },
  {
    sequelize,
    modelName: 'User',
    tableName: 'Users',
    underscored: false,
    updatedAt: true,
  }
);

User.getData = async function (username) {
  try {
    const data = await this.findOne({
      where: {
        username,
      },
      attributes: ['username', 'pin', 'id'],
      raw: true,
    });
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

User.insertData = async function (username, pin) {
  try {
    const insertData = await this.create({ username, pin });
    return insertData;
  } catch (error) {
    console.log(error);
    return error;
  }
};

module.exports = User;