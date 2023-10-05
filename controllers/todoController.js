const {Todo}  = require('../models/todo');

class TodoController {
  static async createTask(req, res) {
    try {
      const { task } = req.body;
      const userId = req.params.userId;
      const newTask = await Todo.create({ task, userId });
      res.status(201).json(newTask);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  static async getUserTasks(req, res) {
    try {
      const userId = req.params.userId;
      // const username = req.params.username
      console.log('userId:', userId);
      // console.log('todo', Todo)
      const tasks = await Todo.findAll({
        where: { userId },
        attributes: ['id', 'task'],
      });

      res.status(200).json(tasks);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  static async deleteTask(req, res) {
    try {
      const taskId = req.params.id;
      await Todo.destroy({ where: { id: taskId } });
      res.status(204).send();
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
  
}

module.exports = { TodoController };