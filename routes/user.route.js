const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/user.model');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/config');

// get
router.get('/', function (req, res, next) {
    User.find(function (err, post) {
        if (err) return next(err);
        res.json(post);
        console.log(res.json)
    });
});

// registration
router.post('/register', (req, res, next) => {
    let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    });

    User.getUserByUsername(newUser.username, (err, user) => {
        if (err) throw err;
        if (user) {
            res.statusCode = 202;
            return res.json({
                success: false, message: 'Username sudah terdaftar'
            })
        } else {
            User.addUser(newUser, (err, user) => {
                if (err) {
                    res.json({
                        success: false, message: 'Failed to register user'
                    });
                } else {
                    res.json({
                        success: true, message: 'User Register Success'
                    });
                }
            })
        }
    })


});

router.put('/edit/:id', (req, res, next) => {
    User.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, user) => {
        if (err) {
            res.send({
                success: false, message: 'Failed'
            });
        } else {
            res.send({
                success: true, message:"Success", data: user
            })
        }
    });
});

// auth
router.post('/authenticate', (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    User.getUserByUsername(username, (err, user) => {
        if (err) throw err;
        if (!user) {
            return res.json({
                success: false, message: 'Username atau Password Salah'
            })
        }

        User.comparePassword(password, user.password, (err, isMatch) => {
            if (err) throw err;
            if (isMatch) {
                const token = jwt.sign(user.toObject(), config.secret, {
                    expiresIn: 604800 // 1 week
                })
                res.json({
                    success: true,
                    token: 'jwt ' + token,
                    message: 'Login Sukses',
                    data: {
                        id: user._id,
                        name: user.name,
                        username: user.username,
                        email: user.email
                    }
                })
            } else {
                return res.json({
                    success: false, message: 'Username atau Password Salah'
                })
            }
        })
    })
});

// Profile
// passport.authorize('jwt', {session:false})
router.get('/profile', passport.authorize('jwt', { session: false }), (req, res, next) => {
    // console.log(res)
    res.json({
        user: req.account
    })
});

router.get('/all', passport.authorize('jwt', { session: false }), function (req, res, next) {
    User.find((err, data) => {
        res.json(data)
    })
})

// Validate
router.get('/validate', (req, res, next) => {

    console.log(res)
})

// post
router.post('/', function (req, res, next) {
    User.create(req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

// delete 
router.delete('/:id', function (req, res, next) {
    User.findByIdAndRemove(req.params.id, req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

module.exports = router;