const mongoose = require("mongoose");

mongoose.connect(
  "mongodb://localhost:27017/ConnectDB",
  { useNewUrlParser: true },
  (err) => {
    if (!err) {
      console.log("MongoDB Connected Successfully");
    } else {
      console.log("Error while connecting to DB: " + err);
    }
  }
);

require("./user.model"); // Include user model
require("./post.model"); // Include post model
require("./comment.model"); // Include comment model
require("./session.model"); // Include session model
