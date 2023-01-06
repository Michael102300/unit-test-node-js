const express = require("express");
const {
  createTodo,
  getTodos,
  getTodoById,
  updateTodo,
} = require("../controllers/todo.controller");
const router = express.Router();

router.post("/", createTodo);
router.get("/", getTodos);
router.get("/:todoId", getTodoById);
router.put("/:todoId", updateTodo);

module.exports = router;
