const User = require('./user');
const Todo = require('./todo');

Todo.belongsTo(User, {
  foreignKey: 'userId',
  as: 'user',
});
User.hasMany(Todo, {
  foreignKey: 'userId',
  as: 'todos',
});

module.exports = { User, Todo };