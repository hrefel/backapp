let express = require('express');
let router = express.Router();
let Kecamatan = require('../models/kecamatan.model');

router.post('/save-kecamatan', function (req, res, next) {
    Kecamatan.insertMany(req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    })
});

router.get('/get-kecamatan', function (req, res, next) {
    Kecamatan.find(function (err, data) {
        if (err) return next(err);
        res.json({
            success: true,
            data: data
        })
    })
});

router.get('/get-kecamatan-by-kota', function (req, res, next) {
    Kecamatan.find({ kabupaten: req.query.kota }, function (err, data) {
        if (err) return next(err);
        res.json({
            success: true,
            data: data
        });
    })
    
})

module.exports = router;