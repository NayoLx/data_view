var mongoose = require('mongoose');

var DailyUser = new mongoose.Schema({
    people_count: Number, updatetime: Number
}, { collection: 'daily_user_stat'});

module.exports = mongoose.model('DailyUser', DailyUser);