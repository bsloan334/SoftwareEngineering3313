const express = require("express");
const db = require("../db");

const router = express.Router();

router.get("/", (req, res, next) => {
  db.query('Select * from public."users"', [], (err, data) => {
    if (err) {
      return next(err);
    }
    //res.render("index", { Users: data.rows[0] });
    res.send(data.rows);
  });
});

router.get("/:id", (req, res, next) => {
  const { id } = req.params;
  db.query('Select * from public."users" where id = $1', [id], (err, data) => {
    if (err) {
      return next(err);
    }
    res.send(data.rows);
  });
});

module.exports = router;
