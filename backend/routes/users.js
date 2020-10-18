const router = require('express').Router();  
const bcrypt = require('bcryptjs'); 

/* Calling the mongoose model we just created */
let user = require('../models/user.model'); 
const userSecondary = require('../models/user_secondary.model');

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
router.route('/register').post((req, res) => {
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
                .then(() => {
                    const dummyStr = "";
                    const dummyArr = new Array();  
                    const userData = new userSecondary({email: email, address: "", phone: "", purchases: new Array(), wishlist: new Array(), cart: new Array()});
                    userData.save()
                            .then(() => {res.json("User Added Successfully!")})
                            .catch(err => res.json("Error: " + err)); 
                })
                .catch(err => res.status(400).json("Error: " + err));    
        }); 
    }); 
}); 

/* Trigger the following if "http//www.website.com/users/login" is called */
router.route('/login')
    .post((req, res) => {
        /* A POST route that logs-in an existing user */

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
                        return res.redirect('/users/profile'); 
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
router.route('/profile')
    
    /* If the route is reached through a GET request */
    .get((req, res) => {
        /* A GET route triggered as the user information page. */
        if (req.session.user) {
            res.json(req.session.user); 
        }
        else {
            console.log("Not signed in"); 
            res.json("Not signed in!"); 
        }
    })

    /* If the route is reached through a POST request */ 
    .post((req, res) => {

        /* Extract the name and email from json object/html form */
        console.log(req.session.user); 

        /* Hash the newly entered password */ 
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(req.body.password, salt, (err, hash) => {                
                 
                /* Find the user id of the currently logged in user */
                user.findById(req.session.user._id)
                    
                    /* If found, update the values */
                    .then((_user) => {
                        if (req.body.password === "")
                            hash = _user.passwordHash;
                        _user.passwordHash = hash; 
                        _user.name = req.body.name;
                        _user.email = req.body.email;
                        console.log(_user.email); 
                        _user.save() 
                            .then(() => {
                                req.session.user = _user; 
                                res.json("User Updated Successfully")
                            })
                            .catch(err => res.json("Error: " + err)); 
                    })
                    
                    /* And then send a json response with status */ 

                    .catch(err => res.status(400).json("Error: " + err)); 
            }); 
        });
    }); 


/* Trigger the following if "http//www.website.com/users/landing" is called */
router.route('/landing').get((req, res) => {
    /* A GET route triggered as the user information page. */
    
    /* If there is a valid session in place, send back the data of the user */
    if (req.session.user) {
        res.json (req.session.user);
    }

    /* Otherwise, send a negative response */ 
    else {
        res.json(req.session.user); 
    }
});



router.route('/wishlist').get((req, res) => {
    if (req.session.user) {
        let email = req.session.user.email;

            userSecondary
                .findOne({email})
                .then(_userData => {
 
                    if (!_userData)         
                        return res.json("Error: Data Corrupt");   
                    else {  
                        res.json(_userData.wishlist);
                    }
                })                      
                .catch(error => res.status(400).json("Error: " + error));
    }
    else
        res.json("Error: Not Signed In"); 
});


router.route('/cart').get((req, res) => {
    if (req.session.user) {
        let email = req.session.user.email;

            userSecondary
                .findOne({email})
                .then(_userData => {
 
                    if (!_userData)         
                        return res.json("Error: Data Corrupt");   
                    else {  
                        res.json(_userData.cart);
                    }
                })                      
                .catch(error => res.status(400).json("Error: " + error));
    }
    else
        res.json("Error: Not Signed In");
})


router.route('/signout')
    .get((req, res) => {
        req.session.user = null; 
        res.json("Signed Out"); 
    });


module.exports = router;


router.route('/cart/add/:id').post((req, res) => {
    if (req.session.user) {
        let email = req.session.user.email;

            userSecondary
                .findOne({email})
                .then(_userData => {
 
                    if (!_userData)         
                        return res.json("Error: Data Corrupt");   
                    else {
                        if (_userData.cart.indexOf(req.params.id) > -1)
                            res.json(req.params.id + ": Item is already in cart");
                        else {  
                            _userData.cart.push(req.params.id);
                            _userData.save(); 
                            res.json(req.params.id + ": Item has been successfully added to your cart");
                        }
                    }
                })                      
                .catch(error => res.status(400).json("Error: " + error));
    }
    else
        res.json("Error: Not Signed In");
})


router.route('/wishlist/add/:id').post((req, res) => {
    if (req.session.user) {
        let email = req.session.user.email;

            userSecondary
                .findOne({email})
                .then(_userData => {
 
                    if (!_userData)         
                        return res.json("Error: Data Corrupt");   
                    else {  
                        if (_userData.wishlist.indexOf(req.params.id) > -1)
                            res.json(req.params.id + ": Item is already in wishlist"); 
                        else {       
                            _userData.wishlist.push(req.params.id);
                            _userData.save();
                            res.json(req.params.id + ": Item has been successfully added to your cart");
                        } 
                    }
                })                      
                .catch(error => res.status(400).json("Error: " + error));
    }
    else
        res.json("Error: Not Signed In");
})


router.route('/wishlist/delete/:id').post((req, res) => {
    if (req.session.user) {
        let email = req.session.user.email;

            userSecondary
                .findOne({email})
                .then(_userData => {
 
                    if (!_userData)         
                        return res.json("Error: Data Corrupt");   
                    else {  
                        let index = _userData.wishlist.indexOf(req.params.id);
                        _userData.wishlist.splice(index, 1); 
                        _userData.save(); 
                        res.json(req.params.id + ": Item has been successfully removed from your wishlist");
                    }
                })                      
                .catch(error => res.status(400).json("Error: " + error));
    }
    else
        res.json("Error: Not Signed In");
})


router.route('/cart/delete/:id').post((req, res) => {
    if (req.session.user) {
        let email = req.session.user.email;

            userSecondary
                .findOne({email})
                .then(_userData => {
 
                    if (!_userData)         
                        return res.json("Error: Data Corrupt");   
                    else {  
                        let index = _userData.cart.indexOf(req.params.id);
                        _userData.cart.splice(index, 1); 
                        _userData.save(); 
                        res.json(req.params.id + ": Item has been successfully removed from your wishlist");   
                    }
                })                      
                .catch(error => res.status(400).json("Error: " + error));
    }
    else
        res.json("Error: Not Signed In");
})


router.route('/purchase').get((req, res) => {
    if (req.session.user) {
        let email = req.session.user.email; 

        userSecondary.findOne({email})
            .then(_userData => {
                if(!_userData)
                    return res.json("Error: Data Corrupt"); 
                
                else {
                    if (_userData.cart && _userData.cart.length) {
                        _userData.purchases = _userData.purchases.concat(_userData.cart); 
                        _userData.cart = []; 
                        _userData.save()
                            .then(() => res.json("Order Placed :)")) 
                            .catch(err => res.json(err)); 
                    }
                    else {
                        return res.json("Your Cart is Empty!!"); 
                    }
                }
            })
            .catch(err => res.json(err)); 
    }

    else
        res.json("Email Not found!");
})

router.route('/profile/purchases').get((req, res) => {
    if (req.session.user) {
        let email = req.session.user.email; 
        userSecondary.findOne({email})
            .then(_userData => {
                if(!_userData)
                    return res.json("Error: Data Corrupt"); 
                
                else {
                    res.json(_userData.purchases); 
                }
            })
            .catch(err => res.json(err)); 
    }

    else
        res.json("Email Not Found"); 
})