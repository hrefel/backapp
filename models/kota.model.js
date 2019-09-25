const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const KotaSchema = Schema({
    namaKota: String,
    provinsi: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Provinsi'
    }
});

module.exports = mongoose.model('Kota', KotaSchema);
