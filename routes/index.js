const express = require("express");
const request = require("request");
const fb = require("../utilities/firebase");
const db = require("../db");

const router = express.Router();

router.get('/', (req, res) => {
    res.render("home-page");
});

router.get("/books", (req, res, next) => {
  const query = req.query;
  if (Object.keys(query).length > 0) {
    db.query(
      'Select * from public."books" where title=$1',
      [req.query.title],
      (err, data) => {
        if (err) {
          return res.render('error');
        }
        res.render('book-results', {books:data.rows})
      }
    );
  } else {
    db.query('Select * from public."books"', [], (err, data) => {
      if (err) {
        return res.render('error');
      }
      res.render('book-results', {books: data.rows});
    });
  }
});

router.post('/book', (req, res) => {
    const { title, author, isbn, cost } = req.body;
    db.query('Select id from public."users" where email=$1', [res.app.locals.currentUser.email], (err, data) => {
      if (err) return res.redirect('/error');
      db.query('Insert into public."books" (isbn, title, author, rented, owner) values($1, $2, $3, $4, $5);', [isbn, title, author, false, data.rows[0].id], (err, data) => {
        if (err) {
          return res.redirect('/error');
        }
        res.redirect('/');
      })
    })
})

router.get('/book/new', (req, res) => {
  res.render('book-upload');
});

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
        db.query('Select firstname, lastname, email from public."users" where email=$1',[email], (err, data) => {
            if (err) {return res.render("error"); }
            res.app.locals.currentUser = data.rows[0];
            return res.redirect('/');
        })
    })
    .catch(err => {
        res.redirect('/signup')
    })
})

router.get('/logout', (req, res) => {
    fb.auth().signOut()
    .then(() => {
        res.app.locals.currentUser = '';
        return res.redirect('/');
    })
    .catch(() => {
        res.render('error')
    })
})

router.get('/error', (req, res) => {
  res.render('error');
})


module.exports = router;