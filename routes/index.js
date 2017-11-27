const express = require("express");
const request = require("request");
const fb = require("../utilities/firebase");
const db = require("../db");

const router = express.Router();

router.get('/', (req, res) => {
    res.render("home-page");
});

router.get('/books', (req, res) => {
    db.query('Select * from public."books"', [], (err, data) => {
        if (err) {
            res.render("book-results", {error: true})
        } else {
            res.render("book-results", {books: data.rows})
        }
    })
})

router.get('/signup', (req, res) => {
    res.render("signup");
})

router.post('/signup', (req, res) => {
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
            res.redirect("/");
          })
         .catch(err => {
           return res.status(500).send('Unable to add user in firebase');
         })
      })
    });
});

router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login', (req, res) => {
    const { email, password } = req.body;
    fb.auth().signInWithEmailAndPassword(email, password)
    .then(() => {
        res.redirect('/');
    })
    .catch(err => {
        res.redirect('/signup')
    })
})

module.exports = router;