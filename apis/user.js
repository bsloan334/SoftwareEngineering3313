const express = require('express');
const db = require('../db');

const router = express.Router();

router.get('/', (req, res, next) => {
    db.query('Select * from users', [], (err, data) => {
        if (err) {
            return next(err)
        }
        res.render('index',{user: data.rows[0]})
    })
})

router.get('/:id', (req, res, next) => {
    const { id } = req.params;
    db.query('Select * from users where user_id = $1', [id], (err, data) => {
        if (err) {
            return next(err);
        }
        res.send(data.rows);
    })
})

module.exports = router;