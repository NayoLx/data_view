var mongoose = require('mongoose');

var Street = new mongoose.Schema({
    createtime: Number
}, { collection: 'tbstreet_stat' });

module.exports = mongoose.model('Street', Street);