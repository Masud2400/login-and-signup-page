const express = require('express');
const app = express();
const path = require('path');
const {readFile, writeFile} = require('fs');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/login.html'));
});

app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/signUp.html'));
});

app.post('/login', (req,res) => {
    const {username, password} = req.body;
    readFile('./info.json', 'utf-8', (err,result) => {
        if (err) {
            console.error(err);
        }
        const data = JSON.parse(result)
        if (data.username === username && data.password === password) {
            res.sendFile(path.join(__dirname, '/public/dashboard.html'));
        } else {
            res.send('Your username or password is not correct.');
        }
    })
})

app.post('/signup', (req,res) => {
    const {username, password} = req.body;
    const data = {"username": username, "password": password};
    writeFile('./info.json', JSON.stringify(data), (err) => {
        if (err) {
            console.error(err);
        }
    })
    res.redirect('/signup');
})

app.listen(5000, () => {
    console.log('Server listening on port 5000');
})
