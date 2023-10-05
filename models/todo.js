const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../config');
const User = require('../models/user')
class Todo extends Model {}

Todo.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    task: {
      type: DataTypes.STRING,
    },
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
  },
  {
    sequelize,
    modelName: 'Todo',
    tableName: 'todos',
    underscored: false,
    updatedAt: true,
  }
);

module.exports = {Todo};