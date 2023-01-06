const TodoModel = require("../model/todo.model");

exports.createTodo = async (req, res, next) => {
  try {
    const createdTodo = await TodoModel.create(req.body);
    res.status(201).json(createdTodo);
  } catch (error) {
    next(error);
  }
};

exports.getTodos = async (req, res, next) => {
  try {
    const listTodos = await TodoModel.find({});
    res.status(200).json(listTodos);
  } catch (error) {
    next(error);
  }
};

exports.getTodoById = async (req, res, next) => {
  try {
    const todoId = req.params.todoId;
    const todoById = await TodoModel.findById(todoId);
    if (todoById) {
      res.status(200).json(todoById);
    } else {
      res.status(404).send();
    }
  } catch (error) {
    next(error);
  }
};
