const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const KecamatanSchema = Schema({
    namaKecamatan: String,
    provinsi: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Provinsi'
    },
    kabupaten: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Kota'
    }
});

module.exports = mongoose.model('Kecamatan', KecamatanSchema);
