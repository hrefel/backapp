const Subject = require('./subject.model');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StudentSchema = mongoose.Schema({
    firstname: String,
    lastname: String,
    age: { type: Number, required: true },
    subject: [
        { type: Schema.Types.ObjectId, ref: 'Subject' }
    ]
});

module.exports = mongoose.model('Student', StudentSchema);
