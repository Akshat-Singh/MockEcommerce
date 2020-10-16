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
const port = process.env.port || 5000; 

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
    console.log("[MongoDB]: Database connection established successfully"); 
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

