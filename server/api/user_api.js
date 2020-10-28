var express = require('express')
var router = express.Router()

var User = require('../model/user')
var DailyUser = require('../model/daily_user')

//获取所有user_stat数据
//user_stat 注册表
router.post('/getAllUser', (req, res) => {
    User.aggregate([
        { $match: { updatetime: { $gte: req.body.startTime, $lte: req.body.endTime } } },
        { $group: { _id: null, value: { $sum: 1 } } },
    ]).then(item => res.json(item));
})

//获取数量
router.get('/getUserAtCount', (req, res) => {
    User.aggregate([
        { $group: { _id: null, value: { $sum: 1 } } }
    ]).then(item => res.json(item));
})

//聚合
router.get('/getGroundUser', (req, res) => {
    User.aggregate([
        { $group: { _id: "$area", value: { $sum: 1 } } }
    ]).then(item => res.json(item));
})

//通过时间获取用户数据
router.post('/getUserWithTime', (req, res) => {
    DailyUser.find({ updatetime: { $gte: req.body.startTime, $lte: req.body.endTime } }).then(itme => {
        res.json(itme);
    })
})


module.exports = router