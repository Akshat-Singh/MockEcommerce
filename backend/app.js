/* Express -> Backend client; Cors -> Middleware; Mongoose -> Helps ease connection to MongoDB */
const express = require('express'); 
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config(); 

/* Set up the application and the localhost port */
const app = express();
const port = process.env.port || 7500; 

app.use(cors())
app.use(express.json()); 

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

app.use('/shop', shopRouter);
app.use('/users', userRouter);

/* Listen to any modifications made on the application */ 
app.listen(port, () => {
    console.log(`Server deployed on port ${port}`); 
}); 
