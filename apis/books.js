const express = require("express");
const db = require("../db");

const router = express.Router();

// router.get("/", (req, res, next) => {
//   const query = req.query;
//   if (Object.keys(query).length > 0) {
//     db.query(
//       'Select * from public."books" where title=$1',
//       [req.query.title],
//       (err, data) => {
//         if (err) {
//           return res.status(500).send('Unable to query books');
//         }
//         res.status(200).send(data.rows);
//       }
//     );
//   } else {
//     db.query('Select * from public."books"', [], (err, data) => {
//       if (err) {
//         return res.status(500).send('Unable to query books');
//       }
//       res.status(200).send(data.rows);
//     });
//   }
// });




module.exports = router;
