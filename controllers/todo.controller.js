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
