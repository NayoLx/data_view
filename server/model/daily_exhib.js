var mongoose = require('mongoose');

var DailyExhib = new mongoose.Schema({
    paiddate: Number, paidlist: Object
}, { collection: 'dailyExhibStat' });

module.exports = mongoose.model('DailyExhib', DailyExhib);