const express = require("express");
const fb = require("../utilities/firebase");

const router = express.Router();

router.post('/login', (req, res) => {
    const { email, password } = req.body;
    fb.auth().signInWithEmailAndPassword(email, password)
    .then(() => {
        return res.status(200).send({
            message: "Successfully logged in",
            email,
            password
        })
    })
    .catch(err => {
        return res.status(403).send("does not have access");
    })
})

router.post('/logout', (req, res) => {
    fb.auth().signOut()
    .then( () => {
        return res.status(200).send('Successfully logged out');
    })
    .catch( err => {
        return res.status(500).send('Unable to log out');
    })
})

module.exports = router;