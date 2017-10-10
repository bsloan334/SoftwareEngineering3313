const express = require('express');
const db = require('../db');

const router = express.Router();

router.get('/', (req, res, next) => {
    db.query('Select * from book', [], (err, data) => {
        if (err) {
            return next(err);
        }
        res.send(data.rows);
    })
})

router.get('/', (req, res, next) => {
    db.query('Select * from book where title=$1', req.query.title, (err, data) => {
        if (err) {
            return next(err);
        }
        res.send(data.rows)
    })
})

module.exports = router;