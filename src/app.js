const fs = require('fs');
const path = require('path');

const express = require('express');
const { writeJSON, accounts, users } = require('./data');
const app = express();
console.log(path.join(__dirname));
app.set('views', path.join(__dirname) + '/views');
app.set('view engine', 'ejs');
// app.use(express.static(path.join(__dirname, '/public/')));
app.use('/css',express.static(path.join(__dirname, 'public/css')));
app.use('/js',express.static(path.join(__dirname, 'public/js')));

//middlware for handle form POST data instead of json
app.use(express.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.render('index', {title: 'Account Summary', accounts: accounts});
});

app.get('/savings', (req, res) => {
    res.render('account', { account: accounts.savings});
});

app.get('/checking', (req, res) => {
    res.render('account', {account: accounts.checking});
});

app.get('/credit', (req, res) => {
    res.render('account', {account: accounts.credit});
});

app.get('/profile', (req, res) => {
    res.render('profile', {user: users[0]});
});

app.get('/transfer', (req, res) => {
    res.render('transfer');
});

app.get('/payment', (req, res) => {
    res.render('payment', {account: accounts.credit});
});

app.post('/transfer', (req, res) => {
    const amount =  parseInt(req.body.amount);
    accounts[req.body.from].balance = accounts[req.body.from].balance - amount;
    accounts[req.body.to].balance = accounts[req.body.to].balance + amount;
    writeJSON();
    res.render('transfer', {message: "Transfer Completed"});
});

app.post('/payment', (req, res) => {
    const amount =  parseInt(req.body.amount);
    accounts.credit.balance =  accounts.credit.balance - amount;
    accounts.credit.available = accounts.credit.available +  amount;
    writeJSON();
    res.render('payment', { message: "Payment Successful", account: accounts.credit });
});

app.listen(3000, () => {
    console.log('PS Project Running on port 3000!');
});