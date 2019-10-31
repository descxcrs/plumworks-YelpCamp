var express = require("express");
var router = express.Router({ mergeParams: true }); //use express router
var Campground = require("../models/campground"); // define Campground
var Comment = require("../models/comment"); //define Comment
var middleware = require("../middleware");

//Set up NEW Comment form
router.get("/new", middleware.isLoggedIn, function(req, res) {
  //find campground by id
  Campground.findById(req.params.id, function(err, campground) {
    if (err || !campground) {
      req.flash("error", "Campground not found");
      res.redirect("back");
    } else {
      //once we find campground by id, define it as a parameter
      res.render("comments/new", { campground: campground });
    }
  });
});

// Set up SUBMIT form for comments
router.post("/", middleware.isLoggedIn, function(req, res) {
  //lookup campground using ID
  Campground.findById(req.params.id, function(err, campground) {
    if (err) {
      console.log(err);
      res.redirect("/campgrounds");
    } else {
      //create new comment
      Comment.create(req.body.comment, function(err, comment) {
        if (err) {
          req.flash("error", "Something went wrong.");
          console.log(err);
        } else {
          //add username and ID to comment
          comment.author.id = req.user._id;
          comment.author.username = req.user.username;
          //Save comment
          comment.save();
          //connect new comment to campground
          campground.comments.push(comment);
          campground.save();
          console.log(comment);
          //redirect to campground show page
          req.flash("success", "Successfully added comment.");
          res.redirect(`/campgrounds/${campground._id}`);
        }
      });
    }
  });
});

//EDIT comment
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(
  req,
  res
) {
  //check if campground in the url exists
  Campground.findById(req.params.id, function(err, foundCampground) {
    if (err || !foundCampground) {
      req.flash("error", "Cannot find campground.");
      return res.redirect("back");
    }
    // If campground exists, check if comment exists
    Comment.findById(req.params.comment_id, function(err, foundComment) {
      if (err) {
        req.flash("error", "Comment not found.");
        res.redirect("back");
      } else {
        res.render("comments/edit", {
          campground_id: req.params.id,
          comment: foundComment
        });
      }
    });
  });
});

//COMMENT UPDATE
router.put("/:comment_id", middleware.checkCommentOwnership, function(
  req,
  res
) {
  Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(
    err,
    updatedComment
  ) {
    if (err) {
      res.redirect("back");
    } else {
      res.redirect(`/campgrounds/${req.params.id}`);
    }
  });
});

// COMMENT DESTROY ROUTE
router.delete("/:comment_id", middleware.checkCommentOwnership, function(
  req,
  res
) {
  //findByIdAndRemove
  Comment.findByIdAndRemove(req.params.comment_id, function(err) {
    if (err) {
      res.redirect("back");
    } else {
      req.flash("success", "Comment deleted.");
      res.redirect(`/campgrounds/${req.params.id}`);
    }
  });
});

module.exports = router;
