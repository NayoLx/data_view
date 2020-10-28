var express = require('express')
var router = express.Router()

var DailyTransflow = require('../model/daily_transflow')
var TotalTransflow = require('../model/total_transflow')

// pay_channel_10 支付宝
// pay_channel_11 微信支付
// pay_channel_12 苹果支付

//获取所有数据
router.get('/getAllData', (req, res) => {
    DailyTransflow.find({}).then(itme => {
        res.json(itme);
    })
})

//通过时间获取数据
router.post('/getDataWithTime', (req, res) => {
    DailyTransflow.find({ paiddate: { $gte: req.body.startTime, $lte: req.body.endTime } }).then(itme => {
        res.json(itme);
    })
})

//正常支付流水表查询
router.post('/getTotalTransflowWithTime', (req, res) => {
    TotalTransflow.aggregate([
        { $match: { paidtime: { $gte: req.body.startTime, $lte: req.body.endTime } } },
        { $group: { _id: "$paid_channel", value: { $sum: "$amount" } } }
    ]).then(item => res.json(item));
});

module.exports = router;