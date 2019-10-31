require("dotenv").config();

const express = require("express"),
  app = express(),
  bodyParser = require("body-parser"),
  mongoose = require("mongoose"),
  flash = require("connect-flash"),
  passport = require("passport"),
  LocalStrategy = require("passport-local"),
  methodOverride = require("method-override"),
  Campground = require("./models/campground"),
  Comment = require("./models/comment"),
  User = require("./models/user"),
  seedDB = require("./seeds");

//Require Routes
var commentRoutes = require("./routes/comments"),
  campgroundRoutes = require("./routes/campgrounds"),
  authRoutes = require("./routes/index");

/* ======================================================= */
/*                      PACKAGE SET UP                     */
/* ======================================================= */
//PACKAGE SET UP: Connect to Database & Enable bodyParser
mongoose.connect("mongodb://localhost/yelp_camp_v12");
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
//setup our custom css stylesheets
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
// seedDB(); //Seed the database

/* =================== PASSPORT CONFIG  ================== */
app.use(
  require("express-session")({
    secret: "Nova is the sciencedog",
    resave: false,
    saveUninitialized: false
  })
);
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Create our own middleware, called on every route
//pass request.user to every template/route
app.use(function(req, res, next) {
  //Available inside our template
  res.locals.currentUser = req.user;
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  next(); //move on to next middleware
});

/* ======================================================= */
/*                            ROUTES                       */
/* ======================================================= */

app.use("/", authRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

/* =================== START UP SERVER  ================== */
app.listen(3000, function() {
  console.log("The YelpCamp Server Has Started!");
});
