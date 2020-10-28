var express = require('express')
var router = express.Router()

var DailyExhib = require('../model/daily_exhib')
var Inside = require('../model/inside')
var Outside = require('../model/outside')
var Street = require('../model/street')
var Investment = require('../model/investment')

//获取所有数据
router.get('/getAllData', (req, res) => {
    DailyExhib.find({}).then(itme => {
        res.json(itme);
    })
})

//通过时间获取数据
router.post('/getDataWithTime', (req, res) => {
    DailyExhib.find({ publish_date: { $gte: req.body.startTime, $lte: req.body.endTime } }).then(itme => {
        res.json(itme);
    })
})

//正常订单流水表查询 
router.post('/getInsideOrder', (req, res) => {
    Inside.aggregate([
        { $match: { publishtime: { $gte: req.body.startTime, $lte: req.body.endTime } } },
        { $group: { _id: null, value: { $sum: 1 } } }
    ]).then(item => res.json(item));
})

router.post('/getOutsideOrder', (req, res) => {
    Outside.aggregate([
        { $match: { publishtime: { $gte: req.body.startTime, $lte: req.body.endTime } } },
        { $group: { _id: null, value: { $sum: 1 } } }
    ]).then(item => res.json(item));
})

router.post('/getStreetOrder', (req, res) => {
    Street.aggregate([
        { $match: { createtime: { $gte: req.body.startTime, $lte: req.body.endTime } } },
        { $group: { _id: null, value: { $sum: 1 } } }
    ]).then(item => res.json(item));
})

router.post('/getInvestmentOrder', (req, res) => {
    Investment.aggregate([
        { $match: { updatetime: { $gte: req.body.startTime, $lte: req.body.endTime } } },
        { $group: { _id: null, value: { $sum: 1 } } }
    ]).then(item => res.json(item));
})

//多表查询 -- 获取订单数
router.post('/getOrderAtCount', async (req, res) => {
    var count = 0;
    const inside = await Inside.aggregate([
        { $group: { _id: null, value: { $sum: 1 } } }
    ]);
    count += inside.length !== 0 && inside != null ? inside[0].value : 0;
    const outside = await Outside.aggregate([
        { $group: { _id: null, value: { $sum: 1 } } }
    ]);
    count += outside.length !== 0 && outside != null ? outside[0].value : 0;
    const street = await Street.aggregate([
        { $group: { _id: null, value: { $sum: 1 } } }
    ]);
    count += street.length !== 0 && street != null ? street[0].value : 0;
    const invest = await Investment.aggregate([
        { $group: { _id: null, value: { $sum: 1 } } }
    ]);
    count += invest.length !== 0 && invest != null ? invest[0].value : 0;
    res.json(count);
});


//多表查询 -- 发布分类
router.post('/getAllOrder', async (req, res) => {
    var itemArr = [];
    const inside = await Inside.aggregate([
        { $match: { publishtime: { $gte: req.body.startTime, $lte: req.body.endTime } } },
        { $group: { _id: null, value: { $sum: 1 } } }
    ]);
    itemArr.push({"name": "场内展", 'value': inside.length !== 0 && inside != null ? inside[0].value : 0});
    const outside = await Outside.aggregate([
        { $match: { publishtime: { $gte: req.body.startTime, $lte: req.body.endTime } } },
        { $group: { _id: null, value: { $sum: 1 } } }
    ]);
    itemArr.push({"name": "场外展", 'value': outside.length !== 0 && outside != null ? outside[0].value : 0});
    const street = await Street.aggregate([
        { $match: { createtime: { $gte: req.body.startTime, $lte: req.body.endTime } } },
        { $group: { _id: null, value: { $sum: 1 } } }
    ]);
    itemArr.push({"name": "尾货街", 'value': street.length !== 0 && street != null ? street[0].value : 0});
    const invest = await Investment.aggregate([
        { $match: { updatetime: { $gte: req.body.startTime, $lte: req.body.endTime } } },
        { $group: { _id: null, value: { $sum: 1 } } }
    ]);
    itemArr.push({"name": "招商", 'value': invest.length !== 0 && invest != null ? invest[0].value : 0});

    res.json(itemArr);
});

//多表查询 -- 区域分类
router.post('/getOrderWithArea', async (req, res) => {
    var areaArr = [];
    const inside = await Inside.aggregate([
        { $group: { _id: '$city', value: { $sum: 1 } } }
    ]);
    areaArr.push(inside);
    const outside = await Outside.aggregate([
        { $group: { _id: '$city', value: { $sum: 1 } } }
    ]);
    areaArr.push(outside);
    const street = await Street.aggregate([
        { $group: { _id: '$city', value: { $sum: 1 } } }
    ]);
    areaArr.push(street);
    const invest = await Investment.aggregate([
        { $group: { _id: '$city', value: { $sum: 1 } } }
    ]);
    areaArr.push(invest);
    res.json(areaArr);
});

module.exports = router;