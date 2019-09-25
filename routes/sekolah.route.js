const express = require('express');
const router = express.Router();
const Sekolah = require('../models/sekolah.model');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/config');

router.post('/register', (req, res, next) => {
    let data = new Sekolah({
        username: req.body.username,
        password: req.body.password,
        namaInstitusi: req.body.namaInstitusi,
        derajat: req.body.derajat,
        akreditasi: req.body.akreditasi,
        statusSekolah: req.body.statusSekolah,
        tahunBerdiri: req.body.tahunBerdiri,
        npsn: req.body.npsn,
        provinsi: req.body.provinsi,
        kota: req.body.kota,
        kecamatan: req.body.kecamatan,
        alamatLengkap: req.body.alamatLengkap,
        email: req.body.email,
        notelp: req.body.notelp,
    });

    Sekolah.getSekolahByUsername(data.username, (err, user) => {
        if (err) throw err;
        if (user) {
            res.statusCode = 202;
            return res.json({
                success: false,
                message: 'Username sudah terdaftar'
            })
        } else {
            Sekolah.registerSekolah(data, (err, user) => {
                if (err) {
                    res.statusCode = 400;
                    
                    res.json({
                        success: false, 
                        message: 'Registrasi gagal', 
                        error: err,
                        data: user,
                        statusCode: 400
                    })
                } else {
                    res.json({
                        success: true, message: 'Registrasi Sukses'
                    })
                }
            })
        }
    })
})

router.post('/auth', (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    Sekolah.getSekolahByUsername(username, (err, user) => {
        if (err) throw err;
        if (!user) {
            res.statusCode = 404;
            return res.json({
                success: false, message: 'Username atau Password salah'
            })
        }

        Sekolah.comparePassword(password, user.password, (err, matched) => {
            if (err) throw err;
            if (matched) {
                const token = jwt.sign(user.toObject(), config.secret, {
                    expiresIn: 604800
                });

                res.json({
                    success: true,
                    token: 'jwt ' + token,
                    message: 'Login Sukses',
                    data: user
                })
            } else {
                return res.json({
                    success: false, message: 'Username atau Password Salah'
                });
            }
        })
    })
});

module.exports = router;

