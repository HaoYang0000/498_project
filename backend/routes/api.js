var User = require('../models/user');
var Story = require('../models/storySchema');

module.exports = function(router, passport) {

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
                newStory.author = "test";
                newStory._authorid = "test";
                newStory.save();
            res.status(200).json({ title:newStory.title,text:newStory.text, message: "Welcome!"
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

    router.get('/get_current_user',
        function(req, res) {
            console.log(req.isAuthenticated());
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
    router.put('/story', function(req, res){
        //TODO
    });

    //----------------Populate queue-------------------jianlin--------
    router.put('/populateQueue/:id', function(req, res){
        //TODO
        //get user id
        var user_id = req.params.id;

        //get user preference filter
        var user_preference;
        User.find(req.params.id, function(err, user) {
            user_preference = user;
        });

        User.find("prefered_species=\'" + user_preference.pre + "\'").limit(100);

    });



//----------------Like User--------------------------------
    router.put('/like', function(req, res){
        //TODO
        var userPost = {
            name: req.body.user_id,
        }


        User.findByIdAndUpdate(req.params.id, userPost, {new: true}, function(err, user) {
            if(err) {
                res.status(500).send({
                    message: err,
                    data: []
                });
            } else {
                if (user) {
                    res.status(200).send({
                        message: 'OK',
                        data: user
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
