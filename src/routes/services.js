const express = require('express');
const router = express.Router();

const { writeJSON, accounts, users } = require('../data');

router.get('/transfer', (req, res) => {
    res.render('transfer');
});

router.get('/payment', (req, res) => {
    res.render('payment', {account: accounts.credit});
});

router.post('/transfer', (req, res) => {
    const amount =  parseInt(req.body.amount);
    accounts[req.body.from].balance = accounts[req.body.from].balance - amount;
    accounts[req.body.to].balance = accounts[req.body.to].balance + amount;
    writeJSON();
    res.render('transfer', {message: "Transfer Completed"});
});

router.post('/payment', (req, res) => {
    const amount =  parseInt(req.body.amount);
    accounts.credit.balance =  accounts.credit.balance - amount;
    accounts.credit.available = accounts.credit.available +  amount;
    writeJSON();
    res.render('payment', { message: "Payment Successful", account: accounts.credit });
});

module.exports = router;