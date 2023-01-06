const express = require("express");
const app = express();
const todoRoutes = require("./routes/todo.routes");

const mongoDb = require("./database");

app.use(express.json());
mongoDb.connect();
app.use("/todos", todoRoutes);

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

module.exports = app;
