const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProvinsiSchema = Schema({
    namaProvinsi: String,
    kodeProvinsi: Number,
    nickname: String
});

module.exports = mongoose.model('Provinsi', ProvinsiSchema);
