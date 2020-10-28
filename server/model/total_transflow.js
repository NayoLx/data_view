var mongoose = require('mongoose');

var TotalTransflow = new mongoose.Schema({
    paidtime: Number, paid_channel: Number, amount: Number
}, { collection: 'totalTransflowStat' });

module.exports = mongoose.model('TotalTransflow', TotalTransflow);