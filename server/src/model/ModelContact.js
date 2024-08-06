const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ModelContact = new Schema({
    id: { type: Number, default: 0 },
    email: { type: String, default: '' },
    contactContent: { type: String, default: '' },
    contactAdmin: { type: String, default: '' },
    tinhTrang: { type: Boolean, default: false },
});

module.exports = mongoose.model('contact', ModelContact);
