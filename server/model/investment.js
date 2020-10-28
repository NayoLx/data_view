var mongoose = require('mongoose');

var Investment = new mongoose.Schema({
    exhibitionname: String, updatetime: Number, expiretime: Number, investmenttype: String
}, { collection: 'investment_stat' });

module.exports = mongoose.model('Investment', Investment);