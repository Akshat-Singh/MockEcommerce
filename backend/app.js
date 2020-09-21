/* Express -> Backend client; Cors -> Middleware; Mongoose -> Helps ease connection to MongoDB */
const express = require('express'); 
const cors = require('cors');
const mongoose = require('mongoose');

const router = require('express').Router();  
const bcrypt = require('bcryptjs'); 
const session = require('express-session'); 

require('dotenv').config(); 

/* Set up the application and the localhost port */
const app = express();
const port = process.env.port || 7500; 

app.use(cors());
app.use(express.json()); 
app.use(session({
    secret: 'meowoof',
    cookie: {
        path    : '/',
        httpOnly: false,
        maxAge  : 24*60*60*1000
    }
})); 

/* Pull in the Mongo credentials from .env, and connect */
const uri = process.env.MDBATLS; 
mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true}); 

const connection = mongoose.connection; 

connection.once('open', () => {
    console.log("Database connection established successfully"); 
}) 

/* Mandating the requirement of the asked routes, and then using them when triggered */
const shopRouter = require('./routes/shop'); 
const userRouter = require('./routes/users'); 
const e = require('express');

app.use('/shop', shopRouter);
app.use('/users', userRouter);

/* Send intimation to express that sessions will be used */
app.use(session({
    secret: 'meowoof', 
    resave: false, 
    cookie: {secure: true}
}))

/* Listen to any modifications made on the application */ 
app.listen(port, () => {
    console.log(`Server deployed on port ${port}`); 
}); 


/* Trigger the following if "http//www.website.com/users/register" is called */
app.route('/login').post((req, res) => {
    /* Calling the mongoose model we just created */
    let user = require(__dirname + '/models/user.model');  
    /* A POST router that logs-in an existing user */ 
    const email = req.body.email;
    const password = req.body.password;

    user.findOne({email})
        /* Do not confuse var "user" with var "_user". "user" refers to the MongoDB Schema
           while "_user" refers to the result of the findOne operation */ 
        .then(_user => {
            if (!_user)
                return res.status(400).json("Error: Email Not Found");   
            
            /* Do not confuse var "res" with var "_res". "res" refers to the response of the router
               while "_res" refers to the response of the user entered password vs database hash comparison */
            bcrypt.compare(password, _user.passwordHash, function(err, _res) {
                if (err){
                    return res.json("Error: " + err.message); 
                }
                if (_res) {
                    req.session.user = _user; 
                    return res.redirect('/landing'); 
                }
                else {
                    return res.json("Passwords do not match"); 
                }
            }); 
        })
        .catch(error => res.status(400).json("Error: " + error));  
});

/* Trigger the following if "http//www.website.com/users/register" is called */
app.route('/landing').get((req, res) => {

    /* Calling the mongoose model we just created */
    if (req.session.user) {
        res.json(req.session.user);
    }
    else {
        res.json("Not signed in!"); 
    }
});


