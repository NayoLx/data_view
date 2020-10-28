var mongoose = require('mongoose');

var Outside = new mongoose.Schema({
    city: String, publishtime: Number, expiretime: Number
}, { collection: 'outsidepublicity_stat' });

module.exports = mongoose.model('Outside', Outside);