const express = require('express');
const bodyParser = require('body-parser');


const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');

const user = {name: 'bert'}

app.get('/', (req, res) => {
    res.render('index', {user: ''});
});

app.get('*', (req, res) => {
    res.send('That page does not exist');
});

app.listen(8000, 'localhost', () => {
    console.log('Server has started on port: 8000')
});