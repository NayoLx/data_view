var mongoose = require('mongoose');

var Inside = new mongoose.Schema({
    city: Number, publishtime: Number, expiretime: Number
}, { collection: 'insidepublicity_stat' });

module.exports = mongoose.model('Inside', Inside);