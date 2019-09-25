const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SubjectSchema = mongoose.Schema({
    code: String,
    name: String
});

module.exports = mongoose.model('Subject', SubjectSchema);
