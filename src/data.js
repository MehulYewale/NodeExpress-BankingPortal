const fs = require('fs');
const path = require('path');

const accountData = fs.readFileSync('./src/json/accounts.json', { encoding: 'UTF8'})
const accounts = JSON.parse(accountData);

const userData = fs.readFileSync('./src/json/users.json', { encoding: 'UTF8'});
const users = JSON.parse(userData);

const writeJSON = () => {
    const jsonData = JSON.stringify(accounts);
    fs.writeFileSync(path.join(__dirname, '/json/accounts.json'), jsonData, { encoding: 'utf8'});
}

module.exports = {
 writeJSON, users, accounts
};