const express = require("express");
const {
  createTodo,
  getTodos,
  getTodoById,
  updateTodo,
  deleteTodo,
} = require("../controllers/todo.controller");
const router = express.Router();

router.post("/", createTodo);
router.get("/", getTodos);
router.get("/:todoId", getTodoById);
router.put("/:todoId", updateTodo);
router.delete("/:todoId", deleteTodo);

module.exports = router;
