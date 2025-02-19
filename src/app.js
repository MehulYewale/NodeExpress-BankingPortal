const fs = require('fs');
const path = require('path');

const accountRoutes = require('./routes/accounts');
const serviceRoutes = require('./routes/services');

const express = require('express');
const app = express();

const { writeJSON, accounts, users } = require('./data');

console.log(path.join(__dirname));
app.set('views', path.join(__dirname) + '/views');
app.set('view engine', 'ejs');
// app.use(express.static(path.join(__dirname, '/public/')));
app.use('/css',express.static(path.join(__dirname, 'public/css')));
app.use('/js',express.static(path.join(__dirname, 'public/js')));

//middlware for handle form POST data instead of json
app.use(express.urlencoded({extended: true}));

app.use('/account', accountRoutes);
app.use('/services', serviceRoutes);

app.get('/', (req, res) => {
    res.render('index', {title: 'Account Summary', accounts: accounts});
});

app.get('/profile', (req, res) => {
    res.render('profile', {user: users[0]});
});

app.listen(3000, () => {
    console.log('PS Project Running on port 3000!');
});