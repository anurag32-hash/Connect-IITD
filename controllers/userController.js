const express = require("express");
const userRouter = express.Router();
const passport = require("passport");
const mongoose = require("mongoose");
const User = mongoose.model("User");
const connectEnsureLogin = require("connect-ensure-login");

// this is for http://localhost:3000/user
userRouter.get("/", (req, res) => {
  res.render("user/addOrEdit", {
    viewTitle: "Add User",
  });
});

// This is for POST handling on http://localhost:3000/user
userRouter.post("/", (req, res) => {
  console.log(req.body);
  if (req.body._id == "") insertRecord(req, res);
  else updateRecord(req, res);
});

// To Insert a new Record in users:
function insertRecord(req, res) {
  console.log("New User: " + req);
  var user = new User();
  user.userName = req.body.userName;
  user.password = req.body.password;
  user.email = req.body.email;
  user.isVerified = req.body.isVerified;
  user.save((err, doc) => {
    if (!err) res.redirect("/user/list");
    else {
      if (err.name == "ValidationError") {
        handleValidationError(err, req.body);
        res.render("user/addOrEdit", {
          viewTitle: "Add User",
          user: req.body,
        });
      }
    }
  });
}

// To Update a Record in users:
function updateRecord(req, res) {
  User.findOneAndUpdate(
    { _id: req.body._id },
    req.body,
    { new: true },
    (err, doc) => {
      if (!err) {
        res.redirect("/user/list");
      } else {
        if (err.name == "ValidationError") {
          handleValidationError(err, req.body);
          res.render("user/addOrEdit", {
            viewTitle: "Update User",
            user: req.body,
          });
        } else {
          console.log("Error while Updating User Record: " + err);
        }
      }
    }
  );
}

// for login: show interface username/password
// http://localhost:3000/login
userRouter.get("/login", (req, res) => {
  res.render("user/login", {
    viewTitle: "Login Screen",
  });
});

// handle the submission of login form:
// req: Request has all the form data entered by user
// res: Response that we want to send to server...
userRouter.post("/login", (req, res, next) => {
  if (req.body.username.length == 0 || req.body.password.length == 0) {
    info = { info: "Please Enter both username and password" };
    return res.render("user/login", { info, body: req.body });
  }
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      console.log("Login Err: " + err);
      if (err.name == "ValidationError") {
        console.log("Login Validation Error");
        handleValidationError(err, req.body);
        res.render("user/login", { info });
      }
      return next(err);
    }
    if (!user) {
      info = { info: "User Does not Exist" };
      return res.render("user/login", { info });
    }

    if (user.password != req.body.password) {
      myinfo = { info: "Error in Username/Password" };
      return res.render("user/login", { info: myinfo });
    }

    req.logIn(user, function (err) {
      if (err) {
        return next(err);
      }

      // User Logged in Successfully
      // Send the user to main screen where all posts are shown:
      return res.redirect("/post/list");
    });
  })(req, res, next);
});

// User logout:
// http://locslhost:3000/logout
userRouter.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/user/login");
});

// Show List of users:
// http://localhost:3000/user/list
userRouter.get(
  "/list",
  connectEnsureLogin.ensureLoggedIn("/user/login"),
  (req, res) => {
    User.find((err, doc) => {
      if (!err) {
        res.render("user/list", {
          list: doc,
        });
      } else {
        console.log("Error in getting list of users from DB: " + err);
      }
    });
  }
);

function handleValidationError(err, body) {
  for (field in err.errors) {
    switch (err.errors[field].path) {
      case "userName":
        body["userNameError"] = err.errors[field].message;
        break;
      case "email":
        body["emailError"] = err.errors[field].message;
        break;
      case "password":
        body["passwordError"] = err.errors[field].message;
      default:
        break;
    }
  }
}

// Show Edit Screen for user record with id: userid
// http://localhost:3000/user/<userid>
userRouter.get("/:id", (req, res) => {
  User.findById(req.params.id, (err, doc) => {
    if (!err) {
      res.render("user/addOrEdit", {
        viewTitle: "Update User",
        user: doc,
      });
    }
  });
});

// Delete record with user id: <id>
// http://localhost:3000/user/delete/<id>
userRouter.get("/delete/:id", (req, res) => {
  User.findByIdAndRemove(req.params.id, (err, doc) => {
    if (!err) res.redirect("/user/list");
    else console.log("Error while Deleting User: " + err);
  });
});

module.exports = userRouter;
