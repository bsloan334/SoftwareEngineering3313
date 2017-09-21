const express = require('express');
const bodyParser = require('body-parser');


const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
    console.log('--------------');
    console.log(req);
    res.render('./index.html');
});

app.get('*', (req, res) => {
    res.send('That page does not exist');
});

app.listen(8000, 'localhost', () => {
    console.log('Server has started on port: 8000')
});