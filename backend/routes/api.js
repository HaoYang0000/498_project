var User = require('../models/user');
var Story = require('../models/storySchema');
var Image = require('../models/image');
//For upload
const multer  = require('multer');
const upload = multer({ dest: 'backend/static/uploads/'});
const fs = require('fs');
var type = upload.single('file');

module.exports = function(router, passport) {
    // part one: filter out desired users
    // router.post('/main/filter/getDisiredUser', function(req, res){
    //     var ret = User.find({"prefered_user_gender":req.body.user_gender,
    //                         "age":req.body.user_age_min,
    //                         "age":req.body.user_age_min,
    //                         "prefered_user_age_max":req.body.user_age_max,
    //                         "prefered_species":req.body.user_prefered_species});
    //
    //     ret.exec(function(err, filter) {
    //         if (err) {
    //             res.status(500).send({
    //                         message: err,
    //                         data:[]
    //                     });
    //                 } else {
    //                     res.status(200).send({
    //                         message: "OK" ,
    //                         data: filter
    //                     });
    //             }
    //         });
    // });

    router.put('/main/filter/updateUserPreference', function(req, res){


        // updsate data base
        let newSetting = {
            prefered_user_gender: req.body.user_gender || "",
            prefered_user_age_min:parseInt(req.body.user_age_min,10) || 0,
            prefered_user_age_max: parseInt(req.body.user_age_max, 10) || 100,
            prefered_species: req.body.user_prefered_species || ""
        }
        // console.log("sbsbsb");
        // console.log(req.body);


        User.findByIdAndUpdate(req.user.id, newSetting, {new: true}, function(err, target) {
            //console.dir("caooooooo");
            //console.log(newSetting);
            //console.dir(req.user.id);
            if (err) {
                //console.dir(err);
                //console.dir("kakakaakakak");
                res.status(500).send({
                    message: err,
                    data: []
                });
            } else {
                if (target == null){
                    res.status(404).send({
                    message: 'Not Found',
                    data: []
            });
               } else {
                    res.status(200).send({
                    message: 'OK',
                    data: target
                });
               }
            }
        })
    });

    router.post('/register',
        passport.authenticate('local-signup'),
        function(req, res) {
            res.status(200).json({ user: req.user.email
        });
    });

    router.post('/login',
        passport.authenticate('local-login'),
        function(req, res) {
            console.log(req.isAuthenticated());
            res.status(200).json({ user: req.user.email
        });
    });

    router.get('/profile',
        isLoggedIn,
        function(req, res) {
            console.log(req.isAuthenticated());
            res.status(200).json({ user: req.user, message: "Welcome!"
        });
    });

    router.get('/logout', function(req, res) {
        req.logOut();
        res.status(200).json({ message: "logged out "});
    });
    //CHANGE-BACK-END
    router.post('/create_new_story',
        function(req, res) {
            //console.log(req.body.title);
            var newStory = new Story();
                newStory.title = req.body.title;
                newStory.text = req.body.text;
                newStory.author = req.body.author;
                newStory._authorid = req.body._authorid;
                newStory.save();
            res.status(200).json({ title:newStory.title,text:newStory.text, author: newStory.author, id: newStory._authorid, message: "Welcome!"
        });
    });

    router.get('/delete_story',function(req, res){
        Story.remove();
    });

    router.get('/get_stories', function(req, res){
        Story.find({}, function(err, stories) {
            if(err) {
                res.status(500).send({
                message: err,
                data: []
            });
            } else {
                res.status(200).send({
                    message: 'OK',
                    data: stories
                });
            }
        });
    });

    router.get('/get_current_match', function(req, res){
        User.findOne({"_id":req.user.id}, function(err, user) {
            if(err) {
                res.status(500).send({
                message: err,
                data: []
            });
            } else {
                res.status(200).send({
                    message: 'OK',
                    data: user.matched_users
                });
            }
        });
    });

    router.get('/check_match', function(req, res){
        User.findOne({"_id":req.user.id}, function(err, user) {
            if(err) {
                res.status(500).send({
                message: err,
                data: []
            });
            } else {
                res.status(200).send({
                    message: 'OK',
                    data: user.matched_users
                });
            }
        });
    });

    router.get('/get_current_user',
        function(req, res) {
            console.log(req.user.id);
            res.status(200).json({ user: req.user
        });
    });


    //----------------Show the User Table--------------------------
    router.get('/users', function(req, res){
        User.find({}, function(err, users) {
            if(err) {
                res.status(500).send({
                message: err,
                data: []
            });
            } else {
                res.status(200).send({
                    message: 'OK',
                    data: users
                });
            }
        });
    });

    router.get('/liked_users', function(req, res){
        //console.log("user id is", req.user.id);
        User.findOne({"_id": req.user.id/*req.user.id*/}, function(err, user) {

            var liked_users = user.liked_users;

            User.find({"_id":liked_users}, function(err, users){
                if(err) {
                    res.status(500).send({
                        message: err,
                        data: []
                    });
                } else {
                    if (users) {
                        res.status(200).send({
                            message: 'OK',
                            data: users
                        });
                    } else {
                        res.status(404).send({
                            message: 'User does not exist',
                            data: []
                        });
                    }
                }
            });

        });
    });

   //  router.get('/users/:id', function(req, res){
   //      console.log(req.params.id);
   //      let quest = User.findById(req.params.id);
   //      //console.dir(quest);
   //      quest.exec(function(err, target){
			// if (err) {
			// 	res.status(500).send({
			// 		message: err,
			// 		data: []
			// 	});
			// } else {
   //              if (target == null){
   //                  res.status(404).send({
   //  					message: 'Not Found',
   //  					data: []
   //  				});
   //              } else {
			// 	    res.status(200).send({
			// 		    message: 'OK',
			// 		    data: target
			// 	    });
   //              }
			// }
   //      });
   //  });

    router.get('/get_profile_image',
        function(req, res) {

            Image.findOne({user_id:req.user._id, type:"Profile"}, function(err, image) {
                if (err) {
                    res.status(500).json({
                        image:'error'
                    });
                } else {
                    if (image == null){
                        res.status(404).json({
                            image:''
                        });
                    } else {
                        res.status(200).json({
                            image:image
                        });
                    }
                }
            });
    });

    router.post('/get_profile_image',
        function(req, res) {

            Image.findOne({user_id:req.body._id, type:"Profile"}, function(err, image) {
                if (err) {
                    res.status(500).json({
                        image:'error'
                    });
                } else {
                    if (image == null){
                        res.status(404).json({
                            image:''
                        });
                    } else {
                        res.status(200).json({
                            image:image
                        });
                    }
                }
            });
    });

    //Upload image
    router.post('/upload', type, function (req,res) {
      console.log(req.user.id);


      var tmp_path = req.file.path;

      var target_path = 'backend/static/uploads/' + req.file.originalname;

      //For type profile
      if(req.body.type == "Profile"){
        //Try to find the profile picture first
          Image.findOne({user_id:req.user._id, type:"Profile"}, function(err, image) {
                if (err) {
                    res.status(500).json({
                        image:'error'
                    });
                } else {
                    if (image == null){
                        //Didn't find the picture, create new one
                        var image = new Image();
                          image.original_name = req.file.originalname;
                          image.hashed_name = image.generateHash(req.file.originalname);
                          image.user_id = req.user._id;
                          image.path = 'uploads/' + req.file.originalname;
                          image.type = req.body.type;
                          image.save();

                          User.findOne({_id:req.user._id}, function(err, user) {
                                user.profile_image = image.path;
                                user.save();
                          });



                          var src = fs.createReadStream(tmp_path);
                          var dest = fs.createWriteStream(target_path);
                          src.pipe(dest);
                          src.on('end', function() {
                            console.log('complete');
                            res.redirect('/setting');
                          });
                          src.on('error', function(err) {
                            console.log('complete');
                            res.redirect('/error');
                           });

                    } 
                    else {
                        //Find the picture, update
                        image.original_name = req.file.originalname;
                          image.hashed_name = image.generateHash(req.file.originalname);
                          image.user_id = req.user._id;
                          image.path = 'uploads/' + req.file.originalname;
                          image.type = req.body.type;
                          image.save();

                          User.findOne({_id:req.user._id}, function(err, user) {
                                user.profile_image = image.path;
                                user.save();
                          });



                          var src = fs.createReadStream(tmp_path);
                          var dest = fs.createWriteStream(target_path);
                          src.pipe(dest);
                          src.on('end', function() {
                            console.log('complete');
                            res.redirect('/setting');
                          });
                          src.on('error', function(err) {
                            console.log('complete');
                            res.redirect('/error');
                           });

                    }
                }
            });
      }
      //For type Story
      else if(req.body.type == "Story"){
        //Try to find the profile picture first
          Image.findOne({user_id:req.user._id, type:"Story", story_id:req.body.story_id}, function(err, image) {
                if (err) {
                    res.status(500).json({
                        image:'error'
                    });
                } else {
                    if (image == null){
                        //Didn't find the picture, create new one
                        var image = new Image();
                          image.original_name = req.file.originalname;
                          image.hashed_name = image.generateHash(req.file.originalname);
                          image.user_id = req.user._id;
                          image.path = 'uploads/' + req.file.originalname;
                          image.type = req.body.type;
                          image.story_id = req.body.story_id;
                          image.save();

                          Story.findOne({_id:req.body.story_id}, function(err, story) {
                                story.image_path = image.path;
                                story.save();
                          });



                          var src = fs.createReadStream(tmp_path);
                          var dest = fs.createWriteStream(target_path);
                          src.pipe(dest);
                          src.on('end', function() {
                            console.log('complete');
                            res.redirect('/explore');
                          });
                          src.on('error', function(err) {
                            console.log('complete');
                            res.redirect('/explore');
                           });

                    } 
                    else {
                        //Find the picture, update
                        image.original_name = req.file.originalname;
                          image.hashed_name = image.generateHash(req.file.originalname);
                          image.user_id = req.user._id;
                          image.path = 'uploads/' + req.file.originalname;
                          image.type = req.body.type;
                          image.story_id = req.body.story_id;
                          image.save();

                          Story.findOne({_id:req.body.story_id}, function(err, story) {
                                story.image_path = 'uploads/' + req.file.originalname;
                                story.save();
                          });



                          var src = fs.createReadStream(tmp_path);
                          var dest = fs.createWriteStream(target_path);
                          src.pipe(dest);
                          src.on('end', function() {
                            console.log('complete');
                            res.redirect('/explore');
                          });
                          src.on('error', function(err) {
                            console.log('complete');
                            res.redirect('/explore');
                           });

                    }
                }
            });
      }

      

    });

    //----------------Show story line------------------------------
    router.get('/story', function(req, res){
        Story.find({}, function(err, users) {
            //TODO
            if(err) {

            } else {
                res.status(200).send({
                    message: 'OK',
                    data: users
                });
            }
        });
    });

//----------------Update User------------------------------
        router.put('/users/:id', function(req, res){
        let newSetting = {
            first_name: req.body.firstName,
            last_name: req.body.lastName,
            age: req.body.age,
            user_gender: req.body.gender,
            prefered_user_gender: req.body.preferedGender,
            prefered_user_age_min: req.body.preferedUserAgeMin,
            prefered_user_age_max: req.body.preferedUserAgeMax,
            address: req.body.address,
            city: req.body.city,
            state: req.body.state,
            country: req.body.country,
            pet_spiecie: req.body.species,
            prefered_species: req.body.preferedSpecies,
            pet_age: req.body.petAge,
            prefered_pet_gender: req.body.petGender,
            prefered_pet_age_min: req.body.preferedPetAgeMin,
            prefered_pet_age_max: req.body.preferedPetAgeMax
        }
        ////console.dir(newSetting);
        ////console.dir(req.body);
        User.findByIdAndUpdate(req.params.id, newSetting, {new: true}, function(err, target) {
            if (err) {
                res.status(500).send({
                    message: err,
                    data: []
                });
            } else {
                if (target == null){
                    res.status(404).send({
                        message: 'Not Found',
                        data: []
                    });
                } else {
                    res.status(200).send({
                        message: 'OK',
                        data: target
                    });
                }
            }
        })
        ////console.dir(req.params);
    });

    router.put('/story', function(req, res){
        //TODO
    });

//----------------Populate queue-------------------jianlin--------
    router.get('/populateQueue', function(req, res){
        //get user id
        var user_id = req.user.id;

        //get user preference filter
        User.findById(user_id, function(err, user_pref) {
        
            console.log(user_pref.prefered_user_gender);
            console.log(user_pref.prefered_user_age_min);
            console.log(user_pref.prefered_user_age_max);
            console.log(user_pref.prefered_species);

            var query = User.find({
                "prefered_user_gender": user_pref.prefered_user_gender || "",
                "prefered_user_age_min": user_pref.prefered_user_age_min || 0,
                "prefered_user_age_max": user_pref.prefered_user_age_max || 100,
                "prefered_species": user_pref.prefered_species || ""
            }).limit(10);



            query.exec(function(err, users) {
                if(err) {
                    res.status(500).send({
                        message: err,
                        data: []
                    });
                } else {
                    res.status(200).send({
                        message: 'OK',
                        data: users
                    });
                }
            });

        });

    });

    router.get('/disliked_users', function(req, res){
        //get user id
        var user_id = req.user.id;
        //get user preference filter
        User.findById(user_id, function(err, user) {

            if(err) {
                res.status(500).send({
                    message: 'Error',
                    dislike_list: []
                });
            } else {
                res.status(200).send({
                    message: 'OK',
                    dislike_list: user.disliked_users
                });
            }

        });

    });





// updated by 霖霖 周日 12/10
//----------------Like User--------------------------------
    router.put('/like', function(req, res){
        console.log("user id is", req.user.id);
        console.log("user id is", req.body.other_user_id);
        User.findOne({"_id": req.user.id/*req.user.id*/}, {liked_users: 1}, function(err, users) {

            var new_liked_users = users.liked_users;
            new_liked_users.push(req.body.other_user_id);
            // add cur_other_user to liked_users
            let updates = {
                liked_users: new_liked_users,
            }


            User.findByIdAndUpdate(req.user.id, updates, function(err, users){
                if(err) {
                    res.status(500).send({
                        message: err,
                        data: []
                    });
                } else {
                    if (users) {
                        res.status(200).send({
                            message: 'OK',
                            data: users
                        });
                    } else {
                        res.status(404).send({
                            message: 'User does not exist',
                            data: []
                        });
                    }
                }
            });


             // check if we are in other user's liked_users list
            User.findById(req.body.other_user_id, function(err, other_user) {
                //get other user's liked_users
                var other_user_liked = other_user.liked_users;
                //console.log("liiiiikkk");
                ////console.dir(other_user.liked_users);


                //Now, let's check if we are in other's liked_user list
                // IF WE GOT A MATCH
                if (other_user_liked.indexOf(req.user.id) >= 0) {   //req.bod.user_id is a STRING
                    console.log("we found a match!!!!!!");

                    //把other user id加入 user的 match_list
                    User.findOne({"_id": req.user.id}, function(err, user){
                        console.log("aa");
                        console.log(user.matched_users);
                        var new_matched_users = user.matched_users || [];
                        new_matched_users.push(req.body.other_user_id);
                        // add cur_other_user to liked_users
                        let updates = {
                            matched_users: new_matched_users,
                        }
                        console.log("Add "+req.body.other_user_id+" to "+req.user.id)
                        user.save();
                    });


                    //把user_id加入other user’s match_list
                    User.findOne({"_id": req.body.other_user_id/*req.user.id*/}, function(err, users) {
                        let new_matched_users = users.matched_users;
                        new_matched_users.push(req.user.id);
                        // add other_user_id to matched_users
                        let updates = {
                            matched_users: new_matched_users,
                        }

                        console.log("Add "+req.user.id+" to "+req.body.other_user_id)

                        users.save();

                    });
                }//
            });




        });



       

    });

    router.put('/dislike', function(req, res){
        //console.log("user id is", req.user.id);
        User.findOne({"_id": req.body.user_id/*req.user.id*/}, {disliked_users: 1}, function(err, users) {

            var new_disliked_users = users.disliked_users;
            new_disliked_users.push(req.body.other_user_id);
            // add cur_other_user to liked_users
            let updates = {
                disliked_users: new_disliked_users,
            }


            User.findByIdAndUpdate(req.body.user_id, updates, function(err, users){
                if(err) {
                    res.status(500).send({
                        message: err,
                        data: []
                    });
                } else {
                    if (users) {
                        res.status(200).send({
                            message: 'OK',
                            data: users
                        });
                    } else {
                        res.status(404).send({
                            message: 'User does not exist',
                            data: []
                        });
                    }
                }
            });

        });
    });




    //----------------Delete User------------------------------
    router.delete('/user', function(req, res){
        //TODO
    });

    //----------------Next User--------------------------------
    router.get('/nextuser', function(req, res){
        //TODO
    });

    return router;
}

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    return res.status(401).json({ message: "unable to auth" });
}
