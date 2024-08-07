require("dotenv").config();
require("./models/connection");
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

//Mise ne place des routes
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var bikesRouter = require("./routes/bikes");
var statsRouter = require("./routes/stats");
var ridesRouter = require("./routes/rides");
var alertsRouter = require("./routes/alerts");

var app = express();
//Mise en place de cors pour sécuriser le backend
const cors = require("cors");
app.use(cors());

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

//définition des familles de routes
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/bikes", bikesRouter);
app.use("/stats", statsRouter);
app.use("/rides", ridesRouter);
app.use("/alerts", alertsRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
