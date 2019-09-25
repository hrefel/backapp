const mongoose = require('mongoose');
const config = require('../config/config');
const bcrypt = require('bcrypt');

const SekolahSchema = new mongoose.Schema({
    username: { type: String, required: [true, 'Username kosong'] },
    password: { type: String, required: true },
    namaInstitusi: { type: String, required: true },
    derajat: { type: String, required: true },
    akreditasi: { type: String, required: true },
    statusSekolah: { type: String, required: true },
    tahunBerdiri: { type: String },
    npsn: String,
    provinsi: String,
    kota: String,
    kecamatan: String,
    alamatLengkap: String,
    email: String,
    notelp: String
});

const Sekolah = module.exports = mongoose.model('Sekolah', SekolahSchema);

module.exports.getSekolahById = function (id, callback) {
    Sekolah.findById(id, callback);
}

module.exports.getSekolahByUsername = function (username, callback) {
    const query = { username: username }
    Sekolah.findOne(query, callback);
}

module.exports.registerSekolah = function (data, callback) {
    if (data) {
        bcrypt.hash(data.password, 10, (err, hash) => {
            if(err) throw err;
            data.password = hash;
            data.save(callback);
        })
    }
}

module.exports.comparePassword = function (candidate, hash, callback) {
    bcrypt.compare(candidate, hash, (err, matched) => {
        if(err) throw err;
        callback(null, matched);
    })
}