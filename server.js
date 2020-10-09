require("./models/db");

const express = require("express");
const path = require("path");
const http = require("http");
const handlebars = require("handlebars");
const exphbs = require("express-handlebars");
const {
  allowInsecurePrototypeAccess,
} = require("@handlebars/allow-prototype-access");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const passportLocalMongoose = require("passport-local-mongoose");
const bodyparser = require("body-parser");
const mongoose = require("mongoose");
const socketio = require("socket.io");
const sessionController = require("./controllers/sessionController");
const userController = require("./controllers/userController");
const postController = require("./controllers/postController");
const connectEnsureLogin = require("connect-ensure-login");

const formatMessage = require("./controllers/messages");

var app = express();

app.use(
  session({
    secret: "mYs0c1aL",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

const User = mongoose.model("User");

// Takes care of login:
passport.use(
  new LocalStrategy(
    {
      userName: "user[userame]",
      password: "user[password]",
    },
    (username, password, done) => {
      User.findOne({ userName: username })
        .then((user) => {
          if (!user || !user.validatePassword(password)) {
            return done(null, false, { info: "Error in Username/Password" });
          }
          return done(null, user);
        })
        .catch(done);
    }
  )
);

// Define public folder for static elements:
// So everything in public folder can be accessed directly, others have to use the server...

var dir = path.join(__dirname, "public");
app.use(express.static(dir));

app.use(
  bodyparser.urlencoded({
    extended: true,
  })
);
app.use(bodyparser.json());

// Define Views Folder: for templates/layouts
app.set("views", path.join(__dirname, "/views/"));

// Initialize handlebars template engine:
app.engine(
  "hbs",
  exphbs({
    extname: "hbs",
    defaultLayout: "mainLayout",
    handlebars: allowInsecurePrototypeAccess(handlebars),
    layoutsDir: __dirname + "/views/layouts",
    helpers: {
      ifCond: function (v1, v2, options) {
        if (v1 === v2) {
          return options.fn(this);
        }
        return options.inverse(this);
      },
    },
  })
);
app.set("view engine", "hbs");

// Define PORT to use by server:
const PORT = process.env.PORT || 3000;

// Define Server:
const server = http.createServer(app);

// Create Socket for IO
const io = socketio(server);

// Start the server and listen on defined port
server.listen(PORT, () => {
  // Show console message that server is started...
  console.log("Express Server Started Successfully at Port: " + PORT);
});

// Include all controllers:
app.use("/session", sessionController);
app.use("/user", userController);
app.use("/post", postController);

io.on("connection", (socket) => {
  socket.on("postMsg", (msg) => {
    io.emit("message", formatMessage(msg.username, msg.msg));
  });
});
