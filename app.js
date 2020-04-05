const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.listen(3000, () => console.log('Yelpcamp Server has Started!'));

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render('index');
});