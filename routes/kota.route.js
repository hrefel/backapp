let express = require('express');
let router = express.Router();
let Kota = require('../models/kota.model');

router.post('/save-kota', function (req, res, next) {
    Kota.insertMany(req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    })
});

router.get('/get-kota', function (req, res, next) {
    Kota.find(function (err, data) {
        if (err) return next(err);
        res.json({
            success: true,
            data: data
        })
    })
});

router.get('/get-kota-by-provinsi', function (req, res, next) {
    Kota.find({ provinsi: req.query.provinsi }, function (err, data) {
        if (err) return next(err);
        res.json({
            success: true,
            data: data
        });
    })
})

module.exports = router;