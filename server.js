const express = require('express');
const {readFile} = require('fs').promises;
const bcrypt = require('bcrypt');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

// db stuff
const mongoose = require('mongoose');
const User = require('./models/userModel.js').User;

mongoose.connect(process.env.DB_URI_DOCKER).then(() => {
    console.log('Listening on port: ' + PORT);
    app.listen(PORT);
});

//TODO: Make this user list remote through MongoDB

// Home

app.get('/', async (req, res) => {
    try {
        res.send( await readFile('./views/home.html', 'utf-8'));
    } catch(err) {
        res.status(500).send();
    };
});

// users

app.get('/users' , (req , res) => {
    User.find(async (err, users) => {
        if (err) {
            res.status(500).send('Couldn\'t retrieve users');
        } else {
            res.status(200).send(users);
        }
    });
})

// register

app.get('/register', async (req, res) => {
    try {
        res.send(await readFile('./views/register.html', 'utf-8'));
    } catch (err) {
        res.status(500).send();
    }
})

app.post('/register' , async (req , res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const newUser = new User({
            email: req.body.email,
            password: hashedPassword,
        });

        await newUser.save();
        console.log('Created user ' + req.body.email);
        res.status(200).redirect(301, "http://localhost:3000/login");
    } catch(err) {
        res.status(500).send();
    }
})

// Login
app.get('/login', async (req, res) => {
    try {
        res.send(await readFile('./views/login.html', 'utf-8'));
    } catch (err) {
        res.status(500).send();
    }
})

app.post('/login' , async (req , res)=>{

    User.findOne({email: req.body.email}, async (err, user) => {
        try {
            if (user != null && await bcrypt.compare(req.body.password, user.password)) {
                console.log(req.body.email + ' connected.');
                res.status(200).redirect(301, "http://localhost:3000");
            } else {
                res.send('Invalid email or Password');
            }
        } catch (err) {
            console.log(err)
            res.status(500).send();
        }
    });
});

// logout

app.post('/logout' , (req , res)=>{

    loggedIn = false;
    res.send('Logged out.')

})
