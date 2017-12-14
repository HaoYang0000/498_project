var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');
var Image = require('../models/image');


/**
* Specifies what strategy we'll use
*/
module.exports = function(passport) {
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    // Registration Strategy
    passport.use('local-signup', new LocalStrategy({
        usernameField : 'email',
        passwordField : 'password',
    },
    function(email, password, done) {
        User.findOne({'email' : email}, function(err, user) {
            if ( err ) {
                return done(err);
            } else if ( user ) {
                return done(null, false);
            } else {
                var newUser = new User();

                newUser.email = email;
                newUser.password = newUser.generateHash(password);

                var image = new Image();
                        image.original_name = "random_"+(Math.floor(Math.random() * 6) + 1)+".png";
                        image.hashed_name = image.generateHash(image.original_name);
                        image.user_id = newUser._id;
                        image.path = 'uploads/' + image.original_name;
                        image.type = "Profile";
                        image.save();

                newUser.profile_image = image.path;

                newUser.save(function(err) {
                    return done(null, newUser);
                });
            }
        });
    }));

    // Login Strategy
    passport.use('local-login', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
    },
    function(email, password, done) {
        User.findOne({'email': email}, function(err, user) {
            if ( err ) {
                return done(err);
            } else if ( !user || !user.validPassword(password) ) {
                return done(null, false);
            }

            return done(null, user);
        });
    }));
};
