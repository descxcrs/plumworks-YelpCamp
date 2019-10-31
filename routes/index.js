var express = require("express");
var router = express.Router(); //use express router
var passport = require("passport"); //define passport
var User = require("../models/user"); //Define user

router.get("/", function(req, res) {
  res.render("landing");
});

//Show REGISTER form
router.get("/register", function(req, res) {
  res.render("register");
});

//handle REGISTER logic
router.post("/register", function(req, res) {
  var newUser = new User({
    username: req.body.username
  });
  User.register(newUser, req.body.password, function(err, user) {
    if (err) {
      req.flash("error", err.message);
      return res.redirect("register");
    }
    passport.authenticate("local")(req, res, function() {
      req.flash("success", `Welcome to Yelpcamp, ${user.username}`);
      res.redirect("/campgrounds");
    });
  });
});

// show LOGIN form
router.get("/login", function(req, res) {
  res.render("login");
});

//handling LOGIN logic
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "/login",
    failureFlash: true
  }),
  function(req, res) {}
);

// LOGOUT route
router.get("/logout", function(req, res) {
  req.logout();
  req.flash("success", "Logged you out!");
  res.redirect("/campgrounds");
});

module.exports = router;
