const express = require('express');
const db = require('../db');

const router = express.Router();

router.get('/', (req, res, next) => {
    db.query('Select * from books', [], (err, data) => {
        if (err) {
            return next(err);
        }
        res.send(data.rows);
    })
})

module.exports = router;