
const router = require('express').Router();  
const bcrypt = require('bcryptjs'); 

/* Calling the mongoose model we just created */
let user = require('../models/user.model'); 

/* Trigger the following when "http//www.website.com/users/" is called */
router.route('/').get((req, res) => {
    /* A GET route that returns the list of all users from the MongoDB database */

    /* If users are found in the MongoDB */
    user.find()

        /* Return the users you got from the database in JSON format */ 
        .then(users => res.json(users))

        /* In case you hit an error */
        .catch(error => res.status(400).json("Error: " + error)); 
}); 

/* Trigger the following if "http//www.website.com/users/register" is called */
router.route('/signup').post((req, res) => {
    /* A POST router that registers a new user */
    const name = req.body.name; 
    const email = req.body.email;
    const passwordHash = req.body.password;

    const newUser = new user({name, email, passwordHash}); 

    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.passwordHash, salt, (err, hash) => {
            newUser.passwordHash = hash; 
            newUser
                .save()
                .then(() => res.json("User Added Successfully!"))
                .catch(err => res.status(400).json("Error: " + err)); 
        }); 
    }); 
}); 

/* Trigger the following if "http//www.website.com/users/add" is called */ 
router.route('/add').post((req, res) => {
    /* A POST route that adds a user to the database */

    const username = req.body.username; 
    const newUser = new user({username}); 

    newUser.save()
        .then(() => res.json("User Added!"))
        .catch(err => res.status(400).json("Error: " + err)); 
}); 

/* Trigger the following if "http//www.website.com/users/delete" is called */ 
router.route('/delete/:id').delete((req, res) => {
    /* A POST route that adds a user to the database */

    user.findByIdAndDelete(req.params.id)
        .then(() => res.json("User Deleted Successfully!"))
        .catch(err => res.status(400).json("Error: " + err)); 
}); 


module.exports = router;