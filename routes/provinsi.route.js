let express = require('express');
let router = express.Router();
let Provinsi = require('../models/provinsi.model');

router.get('/get-provinsi', function (req, res, next) {
    Provinsi.find(function (err, data) {
        if (err) return next(err);
        res.json({
            success: true,
            data: data
        })
    })
});

router.post('/save-provinsi', function (req, res, next) {
    Provinsi.create(req.body, function (err, post) {
        if(err) return next(err);
        res.json(post);
    })
});

module.exports = router;