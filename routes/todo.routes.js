const express = require("express");
const {
  createTodo,
  getTodos,
  getTodoById,
} = require("../controllers/todo.controller");
const router = express.Router();

router.post("/", createTodo);
router.get("/", getTodos);
router.get("/:todoId", getTodoById);

module.exports = router;
