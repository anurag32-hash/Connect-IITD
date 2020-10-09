const express = require("express");
const postRouter = express.Router();

const mongoose = require("mongoose");
const Post = mongoose.model("Post");

// http://localhost:3000/post/
postRouter.get("/", (req, res) => {
  res.render("post/list");
});

// List all posts:
// http://localhost:3000/post/list
postRouter.get("/list", (req, res) => {
  if (!req.user) {
    res.redirect("/user/login");
  } else {
    Post.find()
      .populate("user")
      .exec(function (err, doc) {
        if (!err) {
          var d = new Date();
          var n = d.toLocaleDateString() + " " + d.toLocaleTimeString();
          res.locals.username = req.user.userName;
          res.render("post/list", {
            list: doc,
            username: req.user.userName,
            showLogout: "hide",
            loginTime: n,
          });
        } else {
          console.log("Error in getting list of Posts from DB: " + err);
        }
      });
  }
});

// Handle posting from posts list =  new message/post
// http://localhost:3000/post/list
postRouter.post("/list", (req, res) => {
  if (!req.user) {
    // if there is no user logged on...timeout or server restarted...go back to login page:
    res.redirect("/user/login");
    return;
  }
  // Create a new post
  var post = new Post();
  var d = new Date();

  post.user = req.user;
  post.postContent = req.body.newmsg;
  post.postDateTime = d.toLocaleDateString() + " " + d.toLocaleTimeString(); //d.getDate() + d.getTime();
  post.postToUserId = null;
  post.save((err, doc) => {
    if (!err) res.redirect("/post/list");
    else {
      console.log("Error Sending Message: " + err);
    }
  });
});

// Handle Post Update
postRouter.post("/upd", (req, res) => {
  Post.findOneAndUpdate(
    { _id: req.body._id },
    req.body,
    { new: true },
    (err, doc) => {
      if (!err) {
        res.redirect("/post/list");
      } else {
        if (err.name == "ValidationError") {
          handleValidationError(err, req.body);
          res.render("post/addOrEdit", {
            viewTitle: "Update Post",
            user: req.body,
          });
        } else {
          console.log("Error while Updating Post: " + err);
        }
      }
    }
  );
});

// Get a Specific Post by Id
postRouter.get("/:id", (req, res) => {
  Post.findById(req.params.id, (err, doc) => {
    if (!err) {
      res.render("post/addOrEdit", {
        viewTitle: "Update Post",
        post: doc,
      });
    }
  });
});

// Delete a Post
postRouter.get("/delete/:id", (req, res) => {
  Post.findByIdAndRemove(req.params.id, (err, doc) => {
    if (!err) res.redirect("/post/list");
    else console.log("Error while Deleting Post: " + err);
  });
});

module.exports = postRouter;
