var request = require('request');

module.exports = function (app) {
    var passport = require("passport");
    var userModel = require("../model/user/user.model.server");
    var reviewModel = require("../model/review/review.model.server");
    var productModel = require("../model/product/product.model.server");
    var movieModel = require("../model/movie/movie.model.server");
    var mongoose = require('mongoose');
    var bcrypt = require("bcrypt-nodejs");

    var LocalStrategy = require('passport-local').Strategy;
    var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
    var FacebookStrategy = require('passport-facebook').Strategy;

    userModel
        .findUserByUsername("admin")
        .then(function (user) {
            if (!user) {
                console.log("Making admin user");
                userModel
                    .create({
                        username: "admin",
                        password: bcrypt.hashSync("admin"),
                        role: "admin",
                        email: "silva.w@husky.neu.edu",
                        firstName: "William",
                        lastName: "Silva"
                    });
            }
        });


    passport.use(new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);


    app.post("/project-api/login", passport.authenticate('local'), login);
    app.post('/project-api/logout', logout);

    app.post("/project-api/register", register);
    app.post("/project-api/user", registerUser);
    app.get("/project-api/user", findUser);
    app.get("/project-api/user/:userId", getUserById);
    app.put("/project-api/user/:userId", authorizedUserIdParam, updateUser);
    app.delete("/project-api/user/:userId", authorizedUserIdParam, deleteUser);

    app.get("/project-api/user-follow/", authorizedUserIdQuery, followUser);
    app.get("/project-api/user-unfollow/", authorizedUserIdQuery, unfollowUser);
    app.get("/project-api/user-who-follows/:userId", whoFollows);

    app.get("/project-api/search-user/", searchUserByName);

    app.get("/project-api/admin/user", authorizedAdmin, getAllUsers);

    app.get("/project-api/checkLogin", checkLogin);

    app.get("/project-api/auth/google", passport.authenticate('google', {scope: ['profile', 'email']}));

    app.get('/project-api/auth/facebook', passport.authenticate('facebook', {scope: 'email'}));

    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect: '/project/index.html#!/user',
            failureRedirect: '/project/index.html#!/login'
        }));

    app.get('/google/oauth/callback',
        passport.authenticate('google', {
            successRedirect: '/project/index.html#!/user',
            failureRedirect: '/project/index.html#!/login'
        }));

    app.get("/project-api/user-populate/:userId", getUserByIdPopulated);
    app.get('/project-api/loggedin', loggedin);

    function loggedin(req, res) {
        res.send(req.isAuthenticated() ? req.user : '0');
    }


    function authorized(req, res, next) {
        if (!req.isAuthenticated()) {
            res.send(401);
        } else {
            next();
        }
    };

    function authorizedUserIdParam(req, res, next) {
        if (!req.isAuthenticated()) {
            res.send(401);
        } else if (req.user.role === "admin") {
            next();
        } else if (req.params.userId === req.user.id) {
            next();
        } else {
            res.send(401);
        }
    }

    function authorizedUserIdQuery(req, res, next) {
        if (!req.isAuthenticated()) {
            res.send(401);
        } else if (req.user.role === "admin") {
            next();
        } else if (req.query.userId === req.user.id) {
            next();
        } else {
            res.send(401);
        }
    }

    function authorizedAdmin(req, res, next) {
        if (!req.isAuthenticated()) {
            res.send(401);
        } else if (req.user.role !== "admin") {
            res.send(401);
        } else {
            next();
        }
    }

    function register(req, res) {
        var user = req.body;
        user.password = bcrypt.hashSync(user.password);

        userModel
            .createUser(user)
            .then(function (user) {
                if (user) {
                    req.login(user, function (err) {
                        if (err) {
                            res.status(400).send(err);
                        } else {
                            res.json(user);
                        }
                    });
                }
            }, function (err) {
                res.status(500).send(err);
            });
    }

    var googleConfig = {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL
    };

    var facebookConfig = {
        clientID: process.env.FACEBOOK_CLIENT_ID,
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
        callbackURL: process.env.FACEBOOK_CALLBACK_URL
    };


    passport.use(new GoogleStrategy(googleConfig, googleStrategy));

    passport.use(new FacebookStrategy(facebookConfig, facebookStrategy));

    function facebookStrategy(token, refreshToken, profile, done) {
        userModel
            .findUserByFacebookId(profile.id)
            .then(
                function (user) {
                    if (user) {
                        return done(null, user);
                    } else {
                        var names = profile.displayName.split(" ");
                        var newFacebookUser = {
                            username: "FB-" + names[0] + "-" + names[1],
                            lastName: names[1],
                            firstName: names[0],
                            email: profile.emails ? profile.emails[0].value : "",
                            facebook: {
                                id: profile.id,
                                token: token
                            }
                        };
                        return userModel
                            .createUser(newFacebookUser);
                    }
                },
                function (err) {
                    if (err) {
                        return done(err);
                    }
                }
            )
            .then(
                function (user) {
                    return done(null, user);
                },
                function (err) {
                    if (err) {
                        return done(err);
                    }
                }
            );
    }


    function googleStrategy(token, refreshToken, profile, done) {
        userModel
            .findUserByGoogleId(profile.id)
            .then(
                function (user) {
                    if (user) {
                        return done(null, user);
                    } else {
                        var email = profile.emails[0].value;
                        var emailParts = email.split("@");
                        var newGoogleUser = {
                            username: emailParts[0],
                            firstName: profile.name.givenName,
                            lastName: profile.name.familyName,
                            email: email,
                            google: {
                                id: profile.id,
                                token: token
                            }
                        };
                        return userModel.createUser(newGoogleUser);
                    }
                },
                function (err) {
                    if (err) {
                        return done(err);
                    }
                }
            )
            .then(
                function (user) {
                    return done(null, user);
                },
                function (err) {
                    if (err) {
                        return done(err);
                    }
                }
            );
    }

    function checkLogin(req, res) {
        res.send(req.isAuthenticated() ? req.user : '0');
    }

    function localStrategy(username, password, done) {
        userModel
            .findUserByUsername(username)
            .then(
                function (user) {
                    if (user && bcrypt.compareSync(password, user.password)) {
                        return done(null, user);
                    } else {
                        return done(null, false);
                    }
                },
                function (err) {
                    if (err) {
                        return done(err);
                    }
                }
            );
    }

    function login(req, res) {
        var user = req.user;
        res.json(user);
    }

    function logout(req, res) {
        req.logOut();
        res.send(200);
    }

    function registerUser(req, res) {
        var user = req.body;
        user.password = bcrypt.hashSync(user.password);
        userModel
            .createUser(user)
            .then(function (user) {
                res.json(user);
            }, function (err) {
                res.status(500).send(err);
            });
    }

    function findUser(req, res) {
        var username = req.params.username;
        var password = req.params.password;

        if (username && password) {
            userModel
                .findUserByCredentials(username, password)
                .then(function (user) {
                    if (user === null) {
                        res.send("0");
                        return;
                    }
                    res.json(user);
                    return;
                }, function (err) {
                    res.sendStatus(404).send(err);
                    return;
                });
            return;
        } else if (username) {
            userModel
                .findUserByUsername(username)
                .then(function (user) {
                    if (user === null) {
                        res.send("0");
                        return;
                    }
                    res.json(user);
                    return;
                }, function (err) {
                    res.status(500).send(err);
                    return;
                });
            return;
        }

        res.send("0");
    }

    function getUserById(req, response) {
        userModel
            .findUserById(req.params.userId)
            .then(function (user) {
                response.json(user);
            }, function (err) {
                response.status(500).send(err);
            });
    }

    function getUserByIdPopulated(req, response) {
        userModel
            .findUserByIdPopulated(req.params.userId)
            .then(function (user) {
                response.json(user);
            }, function (err) {
                response.status(500).send(err);
            });
    }

    function updateUser(req, res) {
        var userId = req.params.userId;
        var user = req.body;

        if (req.query.encrypt) {
            user.password = bcrypt.hashSync(user.password);
        }

        return userModel
            .updateUser(userId, user)
            .then(function (user) {
                movieModel.addMoviesIfMissing(user.likedMovies);
                res.json(user);
            }, function (err) {
                res.sendStatus(404).send(err);
            });
    }

    function deleteUser(req, res) {
        var userId = req.params.userId;

        userModel
            .deleteUser(userId)
            .then(function (status) {
                reviewModel
                    .remove({_userId: userId})
                    .then(function (success) {

                    });
                productModel
                    .remove({_userId: userId})
                    .then(function (success) {

                    });
                res.sendStatus(200);
            }, function (err) {
                res.status(500).send(err);
                return;
            });
    }

    function followUser(req, res) {
        var userId = req.query.userId;
        var otherUserId = req.query.otherUserId;

        userModel
            .followUser(userId, otherUserId)
            .then(function (status) {
                res.json(status);
            }, function (err) {
                res.status(500).send(err);
                return;
            });
    }

    function unfollowUser(req, res) {
        var userId = req.query.userId;
        var otherUserId = req.query.otherUserId;

        userModel
            .unfollowUser(userId, otherUserId)
            .then(function (status) {
                res.json(status);
            }, function (err) {
                res.status(500).send(err);
                return;
            });
    }

    function whoFollows(req, res) {
        var userId = req.params.userId;

        userModel
            .whoFollows(userId)
            .then(function (users) {
                res.json(users);
            }, function (err) {
                res.status(500).send(err);
                return;
            });
    }

    function searchUserByName(req, res) {
        var username = req.query.username;

        userModel
            .searchUserByName(username)
            .then(function (users) {
                res.json(users);
            }, function (err) {
                res.status(500).send(err);
                return;
            });
    }

    function getAllUsers(req, res) {
        userModel
            .getAllUsers()
            .then(function (users) {
                res.json(users);
            }, function (err) {
                res.status(500).send(err);
                return;
            });
    }

    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        userModel
            .findUserById(user._id)
            .then(
                function (user) {
                    done(null, user);
                },
                function (err) {
                    done(err, null);
                }
            );
    }
};
