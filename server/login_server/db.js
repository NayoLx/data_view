var express = require('express')
var router = express.Router()

var User = require('../model/user')

router.post('/validate', (req, res) => {
    User.findOne({ name: req.body.name, password: req.body.password }, (err, user) => {
        if (err) {
            console.log(err)
        }
        res.json(user)
    })
})

module.exports = router