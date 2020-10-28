var mongoose = require('mongoose');

var DailyTransflow = new mongoose.Schema({
    paiddate: Number, paidlist: Object
}, { collection: 'dailyTransflowStat' });

module.exports = mongoose.model('DailyTransflow', DailyTransflow);