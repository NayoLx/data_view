var mongoose = require('mongoose');

var userScheme = new mongoose.Schema({
    area: Number, updatetime: Number
}, { collection: 'user_stat'});

module.exports = mongoose.model('User', userScheme);