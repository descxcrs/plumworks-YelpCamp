var mongoose = require("mongoose"),
  Campground = require("./models/campground"),
  Comment = require("./models/comment");

//Specify data to populate database with
//This array of campground objects follow the same structure
// of the Campground Schema
var data = [
  {
    name: "Starry Night",
    image:
      "https://images.unsplash.com/photo-1500581276021-a4bbcd0050c5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
    description:
      "Pok pok vinyl succulents food truck meggings distillery. Salvia letterpress skateboard, vegan taxidermy swag af. Authentic butcher intelligentsia viral lyft tacos. Gastropub twee waistcoat kogi. Cloud bread succulents man braid, heirloom crucifix vexillologist cronut man bun listicle fashion axe enamel pin. Everyday carry bitters selvage distillery PBR&B. Asymmetrical succulents venmo, letterpress la croix fixie art party selvage typewriter tacos hoodie crucifix ramps four dollar toast. Ugh lo-fi taxidermy celiac. Poke helvetica pop-up chia single-origin coffee, salvia ugh prism bespoke shoreditch vape chillwave. Wayfarers mixtape ramps, church-key pitchfork taiyaki waistcoat enamel pin health goth hashtag pabst affogato vice echo park."
  },
  {
    name: "Foxsquirrel Mounds",
    image:
      "https://images.unsplash.com/photo-1445308394109-4ec2920981b1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1053&q=80",
    description:
      "Pok pok vinyl succulents food truck meggings distillery. Salvia letterpress skateboard, vegan taxidermy swag af. Authentic butcher intelligentsia viral lyft tacos. Gastropub twee waistcoat kogi. Cloud bread succulents man braid, heirloom crucifix vexillologist cronut man bun listicle fashion axe enamel pin. Everyday carry bitters selvage distillery PBR&B. Asymmetrical succulents venmo, letterpress la croix fixie art party selvage typewriter tacos hoodie crucifix ramps four dollar toast. Ugh lo-fi taxidermy celiac. Poke helvetica pop-up chia single-origin coffee, salvia ugh prism bespoke shoreditch vape chillwave. Wayfarers mixtape ramps, church-key pitchfork taiyaki waistcoat enamel pin health goth hashtag pabst affogato vice echo park."
  },
  {
    name: "Desert Pass",
    image:
      "https://images.unsplash.com/photo-1478810810369-07072c5ef88b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
    description:
      "Pok pok vinyl succulents food truck meggings distillery. Salvia letterpress skateboard, vegan taxidermy swag af. Authentic butcher intelligentsia viral lyft tacos. Gastropub twee waistcoat kogi. Cloud bread succulents man braid, heirloom crucifix vexillologist cronut man bun listicle fashion axe enamel pin. Everyday carry bitters selvage distillery PBR&B. Asymmetrical succulents venmo, letterpress la croix fixie art party selvage typewriter tacos hoodie crucifix ramps four dollar toast. Ugh lo-fi taxidermy celiac. Poke helvetica pop-up chia single-origin coffee, salvia ugh prism bespoke shoreditch vape chillwave. Wayfarers mixtape ramps, church-key pitchfork taiyaki waistcoat enamel pin health goth hashtag pabst affogato vice echo park."
  }
];

//THIS FUNCTION WILL BE CALLED IN APP.JS TO SEED THE DATABASE
// Remove all entries in the database & repopulate
function seedDB() {
  //Remove all campgrounds
  Campground.remove({}, function(err) {
    if (err) {
      console.log(err);
    }
    console.log("removed campgrounds");
    //Add a few starter campgrounds
    // THIS STEP IS ADDED INSIDE THE CALLBACK FUNCTION OF CAMPGROUND.REMOVE
    /* Added to callback of Campground.remove
            so it runs after .remove() has been executed!!*/
    data.forEach(function(seed) {
      Campground.create(seed, function(err, campground) {
        if (err) {
          console.log(err);
        } else {
          console.log("added a campgrond!");
          //create a comment
          Comment.create(
            {
              text: "This place was great, but I wish there was internet",
              author: "Homer"
            },
            function(err, comment) {
              if (err) {
                console.log(err);
              } else {
                campground.comments.push(comment);
                campground.save();
                console.log("Created new comment");
              }
            }
          );
        }
      });
    });
  });
}

module.exports = seedDB;
