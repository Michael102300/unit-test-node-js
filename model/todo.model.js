const moongose = require("mongoose");

const TodoSchema = new moongose.Schema({
  title: {
    type: String,
    required: true,
  },
  done: {
    type: Boolean,
    required: true,
  },
});

const TodoModel = moongose.model("Todo", TodoSchema);

module.exports = TodoModel;
