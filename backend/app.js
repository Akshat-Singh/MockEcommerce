/* Express -> Backend client; Cors -> Middleware; Mongoose -> Helps ease connection to MongoDB */
const express = require('express'); 
const cors = require('cors');
const mongoose = require('mongoose');

/* Modules needed to implement User Auths and Sessions */
/* Router -> for routes; bcrypt -> For password security; Session -> User login sessions */ 
const router = require('express').Router();  
const bcrypt = require('bcryptjs'); 
const session = require('express-session'); 

require('dotenv').config(); 

/* Set up the application and the localhost port */
const app = express();
const port = process.env.port || 7500; 

app.use(cors());
app.use(express.json()); 

/* Session attributes */ 
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

/* If connection is successfully established, give textual confirmation */
connection.once('open', () => {
    console.log("Database connection established successfully"); 
}) 

/* Mandating the requirement of the asked routes, and then using them when triggered */
const shopRouter = require('./routes/shop'); 
const userRouter = require('./routes/users'); 

/* Declaring larger routes */ 
app.use('/shop', shopRouter);
app.use('/users', userRouter);

/* Listen to any modifications made on the application */ 
app.listen(port, () => {
    console.log(`Server deployed on port ${port}`); 
}); 


let user = require(__dirname + '/models/user.model');
/* Trigger the following if "http//www.website.com/users/register" is called */
app.route('/login').post((req, res) => {
    /* A POST route that logs-in an existing user */

    /* Calling the mongoose model we just created */
    let user = require(__dirname + '/models/user.model');  

    /* Extracting values of email and raw password from the JSON object / HTML form */ 
    const email = req.body.email;
    const password = req.body.password;

    
    /* Look for the email in the database */
    user.findOne({email})
        
        /* Do not confuse var "user" with var "_user". "user" refers to the local instance of the MongoDB Schema
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

                /* If the passwords match, store the users data in the session and redirect him to the landing page */ 
                if (_res) {
                    req.session.user = _user; 
                    return res.redirect('/landing'); 
                }

                /* Else, return a negative response */
                else {
                    return res.json("Passwords do not match"); 
                }
            }); 
        })
        .catch(error => res.status(400).json("Error: " + error));  
});


/* Trigger the following if "http//www.website.com/users/landing" is called */
app.route('/landing').get((req, res) => {
    /* A GET route triggered as the user information page. */
    
    /* If there is a valid session in place, send back the data of the user */
    if (req.session.user) {
        res.json (req.session.user);
    }

    /* Otherwise, send a negative response */ 
    else {
        res.json("Not signed in!"); 
    }
});


/* Trigger the following if "http//www.website.com/users/landing" is called */
app.route('/profile')
    
    /* If the route is reached through a GET request */
    .get((req, res) => {
        /* A GET route triggered as the user information page. */
        if (req.session.user) {
            res.json (req.session.user);
        }
        else {
            res.json("Not signed in!"); 
        }
    })

    /* If the route is reached through a POST request */ 
    .post((req, res) => {

        /* Extract the name and email from json object/html form */
        req.session.user.name = req.body.name; 
        req.session.user.email = req.body.email; 

        /* Hash the newly entered password */ 
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(req.body.passwordHash, salt, (err, hash) => {
                
                /* Extract the bare password from the html form/json object */
                req.session.user.passwordHash = hash; 

                /* Find the user id of the currently logged in user */
                user.findById(req.session.user._id)
                    
                    /* If found, update the values */
                    .then((_user) => {
                        _user.passwordHash = hash; 
                        _user.name = req.body.name;
                        _user.email = req.body.email;
                        _user.save(); 
                    })
                    
                    /* And then send a json response with status */ 
                    .then(() => res.json("User Updated Successfully!"))
                    .catch(err => res.status(400).json("Error: " + err)); 
            }); 
        });
    }); 
