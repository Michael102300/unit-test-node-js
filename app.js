const express = require("express");
const app = express();
const todoRoutes = require("./routes/todo.routes");

const mongoDb = require("./database");

app.use(express.json());
mongoDb.connect();
app.use("/todos", todoRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

module.exports = app;
