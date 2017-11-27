const express = require("express");
const db = require("../db");
const fb = require("../utilities/firebase");

const router = express.Router();

router.get("/", (req, res) => {
  db.query('Select * from public."users"', [], (err, data) => {
    if (err) {
      return res.status(500).send('Unable to fetch users');
    }
    //res.render("index", { Users: data.rows[0] });
    res.status(200).send(data.rows);
  });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  db.query('Select * from public."users" where id = $1', [id], (err, data) => {
    if (err) {
      return res.status(500).send('Unable to query user');
    }
    res.status(200).send(data.rows);
  });
});

router.post('/', (req, res) => {
  const { firstName, lastName, email, password} = req.body;
  db.query('Select * from public."users" where email = $1', [email], (err, data) => {
    if (err) return res.status(500).send('Unable to query user');
    if (data.rows.length != 0) return res.status(500).send('User already exists');
    db.query('Insert into public."users" (firstname, lastname, email) values ($1, $2, $3)', [firstName, lastName, email], (err, data) => {
      if (err) {
        console.log('Error', err)
        return res.status(500).send('Unable to add user');
      }
      fb.auth().createUserWithEmailAndPassword(email, password)
        .then( () => {
          return res.status(200).send('Successfully added user');
        })
       .catch(err => {
         return res.status(500).send('Unable to add user in firebase');
       })
    })
  })
})

module.exports = router;
