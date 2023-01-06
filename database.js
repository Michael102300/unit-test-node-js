const mongoose = require("mongoose");

async function connect() {
  try {
    await mongoose.connect(
      "mongodb+srv://Michael1023:Michael1023@testcourse.jy6pomn.mongodb.net/?retryWrites=true&w=majority"
    );
  } catch (error) {
    console.log(error);
    console.log("Error conecting to mongoDb");
  }
}

module.exports = { connect };
